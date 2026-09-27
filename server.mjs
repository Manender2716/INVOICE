import { randomBytes, randomUUID, scryptSync, timingSafeEqual, createHash } from "node:crypto";
import { existsSync, mkdirSync, unlinkSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import express from "express";
import multer from "multer";
import { createServer as createViteServer } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(process.env.LEDGERAI_DATA_DIR || path.join(rootDir, "data"));
const uploadDir = path.join(dataDir, "uploads");
const databasePath = path.join(dataDir, "ledgerai.sqlite");
const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT || 5173);
const sessionCookieName = "ledgerai_session";
const sessionDurationMs = 7 * 24 * 60 * 60 * 1000;

mkdirSync(uploadDir, { recursive: true });

const database = new Database(databasePath);
database.pragma("journal_mode = WAL");
database.pragma("foreign_keys = ON");
database.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_salt TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL,
    last_login_at TEXT NOT NULL,
    sign_in_count INTEGER NOT NULL DEFAULT 1
  );
  CREATE TABLE IF NOT EXISTS sessions (
    id_hash TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vendor TEXT NOT NULL,
    invoice_number TEXT NOT NULL,
    amount REAL NOT NULL,
    gst REAL NOT NULL DEFAULT 0,
    invoice_date TEXT NOT NULL,
    po_number TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'Pending Review',
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS invoices_user_created_idx ON invoices(user_id, created_at DESC);
  CREATE INDEX IF NOT EXISTS sessions_expiry_idx ON sessions(expires_at);
`);

database.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(Date.now());

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

const passwordHash = (password, salt) => scryptSync(password, salt, 64).toString("hex");
const sessionHash = (sessionId) => createHash("sha256").update(sessionId).digest("hex");
const sessionIdFromRequest = (req) => {
  const cookie = req.headers.cookie?.split(";").map((part) => part.trim())
    .find((part) => part.startsWith(`${sessionCookieName}=`));
  return cookie ? cookie.slice(sessionCookieName.length + 1) : null;
};

const publicUser = (user) => ({
  email: user.email,
  createdAt: user.created_at,
  lastLoginAt: user.last_login_at,
  signInCount: user.sign_in_count,
});

function setSessionCookie(res, sessionId, maxAgeSeconds) {
  const secure = isProduction ? "; Secure" : "";
  res.setHeader("Set-Cookie", `${sessionCookieName}=${sessionId}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure}`);
}

function issueSession(res, user) {
  const sessionId = randomBytes(32).toString("base64url");
  database.prepare("INSERT INTO sessions (id_hash, user_id, expires_at) VALUES (?, ?, ?)")
    .run(sessionHash(sessionId), user.id, Date.now() + sessionDurationMs);
  setSessionCookie(res, sessionId, sessionDurationMs / 1000);
  return publicUser(user);
}

function requireUser(req, res, next) {
  const sessionId = sessionIdFromRequest(req);
  if (!sessionId) return res.status(401).json({ error: "Please sign in to continue." });

  const session = database.prepare(`
    SELECT users.*, sessions.id_hash
    FROM sessions JOIN users ON users.id = sessions.user_id
    WHERE sessions.id_hash = ? AND sessions.expires_at > ?
  `).get(sessionHash(sessionId), Date.now());

  if (!session) {
    setSessionCookie(res, "", 0);
    return res.status(401).json({ error: "Your session has expired. Please sign in again." });
  }
  req.user = session;
  req.sessionIdHash = session.id_hash;
  next();
}

app.post("/api/auth/register", (req, res) => {
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body.password === "string" ? req.body.password : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "Enter a valid work email." });
  if (password.length < 10 || password.length > 256) return res.status(400).json({ error: "Password must be between 10 and 256 characters." });
  if (database.prepare("SELECT 1 FROM users WHERE email = ?").get(email)) {
    return res.status(409).json({ error: "An account with this email already exists. Sign in instead." });
  }

  const now = new Date().toISOString();
  const salt = randomBytes(16).toString("hex");
  const user = { id: randomUUID(), email, created_at: now, last_login_at: now, sign_in_count: 1 };
  try {
    database.prepare(`INSERT INTO users (id, email, password_salt, password_hash, created_at, last_login_at)
      VALUES (?, ?, ?, ?, ?, ?)`)
      .run(user.id, email, salt, passwordHash(password, salt), now, now);
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") return res.status(409).json({ error: "An account with this email already exists." });
    throw error;
  }
  res.status(201).json({ user: issueSession(res, user) });
});

app.post("/api/auth/login", (req, res) => {
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body.password === "string" ? req.body.password : "";
  const user = database.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user || password.length > 256) return res.status(401).json({ error: "Email or password is incorrect." });

  const actualHash = Buffer.from(passwordHash(password, user.password_salt), "hex");
  const expectedHash = Buffer.from(user.password_hash, "hex");
  if (!timingSafeEqual(actualHash, expectedHash)) return res.status(401).json({ error: "Email or password is incorrect." });

  const now = new Date().toISOString();
  database.prepare("UPDATE users SET last_login_at = ?, sign_in_count = sign_in_count + 1 WHERE id = ?").run(now, user.id);
  const updatedUser = database.prepare("SELECT * FROM users WHERE id = ?").get(user.id);
  res.json({ user: issueSession(res, updatedUser) });
});

app.get("/api/auth/me", (req, res) => {
  if (!sessionIdFromRequest(req)) return res.json({ user: null });
  requireUser(req, res, () => res.json({ user: publicUser(req.user) }));
});

app.post("/api/auth/logout", (req, res) => {
  const sessionId = sessionIdFromRequest(req);
  if (sessionId) database.prepare("DELETE FROM sessions WHERE id_hash = ?").run(sessionHash(sessionId));
  setSessionCookie(res, "", 0);
  res.status(204).end();
});

app.get("/api/invoices", requireUser, (req, res) => {
  const rows = database.prepare("SELECT * FROM invoices WHERE user_id = ? ORDER BY created_at DESC")
    .all(req.user.id);
  res.json({ invoices: rows.map((row) => ({
    id: row.id,
    vendor: row.vendor,
    amount: row.amount,
    gst: row.gst,
    date: new Date(row.invoice_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    po: row.po_number,
    status: row.status,
    conf: 0,
    fileName: row.file_name,
    fileUrl: `/api/uploads/${row.id}`,
  })) });
});

const allowedFiles = new Map([
  [".pdf", new Set(["application/pdf"])],
  [".png", new Set(["image/png"])],
  [".jpg", new Set(["image/jpeg"])],
  [".jpeg", new Set(["image/jpeg"])],
]);
const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, uploadDir),
    filename: (_req, file, callback) => callback(null, `${randomUUID()}${path.extname(file.originalname).toLowerCase()}`),
  }),
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (!allowedFiles.get(extension)?.has(file.mimetype)) return callback(new Error("Upload a PDF, PNG, or JPG invoice."));
    callback(null, true);
  },
});

app.post("/api/invoices", requireUser, (req, res, next) => {
  upload.single("invoice")(req, res, (error) => error ? next(error) : next());
}, (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Choose an invoice file to upload." });
  const vendor = typeof req.body.vendor === "string" ? req.body.vendor.trim().slice(0, 160) : "";
  const invoiceNumber = typeof req.body.invoiceNumber === "string" ? req.body.invoiceNumber.trim().slice(0, 80) : "";
  const poNumber = typeof req.body.poNumber === "string" ? req.body.poNumber.trim().slice(0, 80) : "";
  const amount = Number(req.body.amount);
  const gst = Number(req.body.gst || 0);
  if (!vendor || !invoiceNumber || !Number.isFinite(amount) || amount < 0 || !Number.isFinite(gst) || gst < 0) {
    unlinkSync(req.file.path);
    return res.status(400).json({ error: "Enter a vendor, invoice number, and valid non-negative amounts." });
  }

  const invoice = {
    id: `INV-${randomUUID().slice(0, 8).toUpperCase()}`,
    userId: req.user.id,
    vendor,
    invoiceNumber,
    amount,
    gst,
    invoiceDate: new Date().toISOString(),
    poNumber,
    status: "Pending Review",
    fileName: path.basename(req.file.originalname).slice(0, 180),
    filePath: req.file.path,
    createdAt: new Date().toISOString(),
  };
  try {
    database.prepare(`INSERT INTO invoices (id, user_id, vendor, invoice_number, amount, gst, invoice_date, po_number, status, file_name, file_path, created_at)
      VALUES (@id, @userId, @vendor, @invoiceNumber, @amount, @gst, @invoiceDate, @poNumber, @status, @fileName, @filePath, @createdAt)`)
      .run(invoice);
  } catch (error) {
    unlinkSync(req.file.path);
    throw error;
  }
  res.status(201).json({ invoice: {
    id: invoice.id,
    vendor: invoice.vendor,
    amount: invoice.amount,
    gst: invoice.gst,
    date: new Date(invoice.invoiceDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    po: invoice.poNumber,
    status: invoice.status,
    conf: 0,
    fileName: invoice.fileName,
    fileUrl: `/api/uploads/${invoice.id}`,
  } });
});

app.get("/api/uploads/:invoiceId", requireUser, (req, res) => {
  const invoice = database.prepare("SELECT file_path, file_name FROM invoices WHERE id = ? AND user_id = ?")
    .get(req.params.invoiceId, req.user.id);
  if (!invoice || !existsSync(invoice.file_path)) return res.status(404).json({ error: "Invoice file not found." });
  res.type(path.extname(invoice.file_name)).sendFile(invoice.file_path);
});

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) {
    const message = error.code === "LIMIT_FILE_SIZE" ? "Invoice files must be 10 MB or smaller." : "Only one invoice file can be uploaded at a time.";
    return res.status(400).json({ error: message });
  }
  if (error.message === "Upload a PDF, PNG, or JPG invoice.") return res.status(400).json({ error: error.message });
  console.error(error);
  res.status(500).json({ error: "Something went wrong. Please try again." });
});

if (isProduction) {
  const distDir = path.join(rootDir, "dist");
  app.use(express.static(distDir));
  app.use((req, res) => {
    if (req.method !== "GET") return res.status(404).end();
    res.sendFile(path.join(distDir, "index.html"));
  });
} else {
  const vite = await createViteServer({ server: { middlewareMode: true }, appType: "custom" });
  app.use(vite.middlewares);
  app.use(async (req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api/")) return next();
    try {
      const template = await readFile(path.join(rootDir, "index.html"), "utf8");
      const html = await vite.transformIndexHtml(req.originalUrl, template);
      res.status(200).type("html").send(html);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      next(error);
    }
  });
}

app.listen(port, "127.0.0.1", () => {
  console.log(`LedgerAI running at http://127.0.0.1:${port}`);
});
