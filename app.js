const {useState} = React;

/* ---------- icons (inline svg, no deps) ---------- */
const Icon = ({d, cls="w-4 h-4"}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>{d}</svg>
);
const I = {
  logo: <Icon cls="w-5 h-5" d={<><path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h8M8 17h5"/></>} />,
  search: <Icon d={<><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>} />,
  bell: <Icon d={<><path d="M6 8a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 6.5H4.5C4.5 13.5 6 12 6 8z"/><path d="M9.5 17a2.5 2.5 0 0 0 5 0"/></>} />,
  grid: <Icon d={<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>} />,
  file: <Icon d={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></>} />,
  check: <Icon d={<path d="M20 6 9 17l-5-5"/>} />,
  building: <Icon d={<><rect x="4" y="2" width="16" height="20"/><path d="M9 22v-4h6v4M9 6h1M9 10h1M14 6h1M14 10h1"/></>} />,
  po: <Icon d={<><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>} />,
  reports: <Icon d={<><path d="M3 3v18h18"/><path d="M7 13l4-4 3 3 5-6"/></>} />,
  settings: <Icon d={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9c.2.5.7 1 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1z"/></>} />,
  upload: <Icon d={<><path d="M12 15V3m0 0 4 4m-4-4L8 7"/><path d="M20 15v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"/></>} />,
  warn: <Icon d={<><path d="M12 9v4m0 4h.01"/><path d="M10.3 3.9 1.8 18a1.8 1.8 0 0 0 1.6 2.7h17.2a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0z"/></>} />,
  arrowR: <Icon cls="w-4 h-4" d={<path d="M5 12h14m-6-7 7 7-7 7"/>} />,
  shield: <Icon d={<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>} />,
  chevDown: <Icon cls="w-3.5 h-3.5" d={<path d="m6 9 6 6 6-6"/>} />,
};

/* ---------- mock data ---------- */
const invoices = [
  {id:"INV-2091", vendor:"Amazon Web Services", amount:284560, gst:51221, date:"18 Sep 2026", po:"PO-4471", status:"Approved", conf:98},
  {id:"INV-2092", vendor:"Microsoft", amount:612000, gst:110160, date:"19 Sep 2026", po:"PO-4488", status:"Pending Review", conf:91},
  {id:"INV-2093", vendor:"Infosys", amount:1450000, gst:261000, date:"20 Sep 2026", po:"PO-4502", status:"Exception", conf:76},
  {id:"INV-2094", vendor:"Razorpay", amount:38900, gst:7002, date:"21 Sep 2026", po:"PO-4510", status:"Approved", conf:99},
  {id:"INV-2095", vendor:"Zoho", amount:92400, gst:16632, date:"22 Sep 2026", po:"PO-4515", status:"Paid", conf:97},
  {id:"INV-2096", vendor:"Google Cloud", amount:376250, gst:67725, date:"23 Sep 2026", po:"PO-4519", status:"Processing", conf:0},
];
const vendors = [
  {name:"Amazon Web Services", gstin:"29AABCA1234F1Z5", count:14, total:2840000, last:"18 Sep 2026", status:"Active"},
  {name:"Microsoft", gstin:"07AAACM5678K1Z2", count:9, total:5120000, last:"19 Sep 2026", status:"Active"},
  {name:"Infosys", gstin:"29AABCI9701A1ZY", count:22, total:14500000, last:"20 Sep 2026", status:"Review"},
  {name:"Razorpay", gstin:"29AABCR3210P1Z8", count:31, total:980000, last:"21 Sep 2026", status:"Active"},
  {name:"Zoho", gstin:"33AABCZ4567Q1Z1", count:6, total:410000, last:"22 Sep 2026", status:"Active"},
];
const inr = n => "₹" + n.toLocaleString("en-IN");

/* ---------- shared bits ---------- */
const StatusBadge = ({s}) => {
  const map = {
    Approved:"bg-emerald-50 text-emerald-700 ring-emerald-200",
    "Pending Review":"bg-amber-50 text-amber-700 ring-amber-200",
    Exception:"bg-rose-50 text-rose-700 ring-rose-200",
    Paid:"bg-slate-100 text-slate-700 ring-slate-200",
    Processing:"bg-indigo-50 text-indigo-700 ring-indigo-200",
    Active:"bg-emerald-50 text-emerald-700 ring-emerald-200",
    Review:"bg-amber-50 text-amber-700 ring-amber-200",
  };
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${map[s]||"bg-slate-100 text-slate-700 ring-slate-200"}`}>{s}</span>;
};
const StatCard = ({label, value, sub, tone="slate"}) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="text-2xl font-semibold mt-1 text-slate-900">{value}</p>
    {sub && <p className={`text-xs mt-1 ${tone==="rose"?"text-rose-600":"text-slate-400"}`}>{sub}</p>}
  </div>
);
const ConfBar = ({v}) => (
  <div className="flex items-center gap-2 w-24">
    <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${v>=90?"bg-emerald-500":v>=1?"bg-amber-500":"bg-slate-300"}`} style={{width:`${v}%`}}/>
    </div>
    <span className="text-xs text-slate-500 w-8">{v>0?v+"%":"—"}</span>
  </div>
);

/* ---------- Landing ---------- */
function Landing({goApp, goSupplier, goLogin}) {
  const nav = ["Product","How it works","Pricing"];
  return (
    <div className="bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">{I.logo}LedgerAI</div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            {nav.map(n=><a key={n} className="hover:text-slate-900 cursor-pointer">{n}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={goLogin} className="text-sm text-slate-600 hover:text-slate-900">Login</button>
            <button onClick={goApp} className="text-sm bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800">Get Started</button>
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto text-center px-6 pt-20 pb-14">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 ring-1 ring-indigo-200 px-3 py-1 rounded-full mb-6">A shared invoice workspace for buyers and suppliers</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Invoices ready to approve. Payments easier to track.</h1>
        <p className="text-slate-600 mt-5 text-lg max-w-2xl mx-auto">Suppliers check invoices against buyer requirements before sending. Buyers receive validated invoices with PO, GST, and total checks already attached.</p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <button onClick={goSupplier} className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800">Try supplier preflight</button>
          <button onClick={goApp} className="border border-slate-300 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50">Open buyer workspace</button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="rounded-xl border border-slate-200 shadow-sm bg-slate-50 p-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Invoice readiness across both sides</p>
              <StatusBadge s="Approved"/>
            </div>
            <div className="grid grid-cols-4 gap-3 text-xs text-slate-500 mb-2">
              <span>Supplier</span><span>Invoice total</span><span>Buyer PO</span><span>AI checks</span>
            </div>
            {invoices.slice(0,3).map(inv=>(
              <div key={inv.id} className="grid grid-cols-4 gap-3 text-sm py-2 border-t border-slate-100 items-center">
                <span className="font-medium">{inv.vendor}</span>
                <span>{inr(inv.amount)}</span>
                <span className="text-slate-500">{inv.po}</span>
                <ConfBar v={inv.conf}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-slate-200">
        <h2 className="text-2xl font-semibold text-center mb-10">One clear path from draft to payment</h2>
        <div className="grid md:grid-cols-4 gap-6 text-sm">
          {["Supplier enters or uploads an invoice","LedgerAI checks buyer rules, PO, and GST","Both teams resolve exceptions together","Buyer approves a complete invoice"].map((s,i)=>(
            <div key={s} className="text-center">
              <div className="w-9 h-9 mx-auto rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold mb-3">{i+1}</div>
              <p className="text-slate-700">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-slate-200">
        <h2 className="text-2xl font-semibold text-center mb-10">Fewer rejections. Less invoice chasing.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[["Supplier-side preflight","Catch missing details and mismatches before an invoice reaches the buyer."],
            ["Buyer-specific checks","Validate PO references, GSTIN, tax totals, and required invoice fields."],
            ["Shared exception resolution","Give both teams one place to clarify a mismatch and attach context."],
            ["Payment-ready packet","Keep the invoice, validation results, and supporting details together."],
            ["Clear invoice status","Suppliers see where an invoice stands without chasing email threads."],
            ["Buyer workflow","Route validated invoices into review with less manual correction."]].map(([t,d])=>(
            <div key={t} className="border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold mb-1.5">{t}</h3>
              <p className="text-sm text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-slate-200 flex items-center gap-4">
        {I.shield}
        <p className="text-sm text-slate-600">Data encrypted in transit and at rest. Role-based access, full audit trails, and SOC2-style controls designed in from day one.</p>
      </section>

      <section className="bg-slate-900 text-white text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">Start with the next invoice you send or receive.</h2>
        <button onClick={goSupplier} className="bg-white text-slate-900 px-5 py-2.5 rounded-lg text-sm font-medium">Run a supplier preflight</button>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        © 2026 LedgerAI. Demo product — not affiliated with any accounting provider.
      </footer>
    </div>
  );
}

/* ---------- Login ---------- */
function saveDemoLogin(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const signedInAt = new Date().toISOString();
  const fallbackUser = {email:normalizedEmail, createdAt:signedInAt, lastLoginAt:signedInAt, signInCount:1};

  try {
    const parsedUsers = JSON.parse(localStorage.getItem("ledgerai_users") || "[]");
    const users = Array.isArray(parsedUsers) ? parsedUsers : [];
    const previousUser = users.find(user => user.email === normalizedEmail);
    const user = {
      email:normalizedEmail,
      createdAt:previousUser ? previousUser.createdAt : signedInAt,
      lastLoginAt:signedInAt,
      signInCount:previousUser ? previousUser.signInCount + 1 : 1,
    };
    const updatedUsers = users.filter(item => item.email !== normalizedEmail);
    updatedUsers.push(user);
    localStorage.setItem("ledgerai_users", JSON.stringify(updatedUsers));
    localStorage.setItem("ledgerai_current_user", JSON.stringify(user));
    return {user, persisted:true};
  } catch {
    return {user:fallbackUser, persisted:false};
  }
}

function LoginPage({onSignIn, onBack}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
        <div className="flex items-center gap-2 font-bold text-lg">{I.logo}LedgerAI</div>
        <button onClick={onBack} className="text-sm text-slate-600 hover:text-slate-900">Back to home</button>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <section className="w-full max-w-md">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <p className="text-xs font-medium uppercase text-indigo-700">Buyer and supplier workspace</p>
            <h1 className="text-2xl font-semibold text-slate-900 mt-2">Welcome back</h1>
            <p className="text-sm text-slate-500 mt-2">Sign in to review invoices and track their status.</p>
            <form className="mt-6 space-y-4" onSubmit={event=>{event.preventDefault(); onSignIn(email);}}>
              <label className="block text-sm font-medium text-slate-700">
                Work email
                <input type="email" autoComplete="username" required value={email} onChange={event=>setEmail(event.target.value)} placeholder="you@company.com" className="mt-1.5 w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"/>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Password
                <div className="relative mt-1.5">
                  <input type={showPassword?"text":"password"} autoComplete="current-password" required value={password} onChange={event=>setPassword(event.target.value)} placeholder="Enter your password" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 pr-16 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"/>
                  <button type="button" onClick={()=>setShowPassword(value=>!value)} className="absolute inset-y-0 right-3 text-xs font-medium text-slate-500 hover:text-slate-800">{showPassword?"Hide":"Show"}</button>
                </div>
              </label>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600"><input type="checkbox" className="rounded border-slate-300"/> Remember me</label>
                <button type="button" onClick={()=>setNotice("Password recovery is not connected in this demo.")} className="text-indigo-700 hover:text-indigo-900">Forgot password?</button>
              </div>
              {notice && <p role="status" className="text-xs text-amber-700">{notice}</p>}
              <button type="submit" className="w-full bg-slate-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-slate-800">Sign in</button>
            </form>
            <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">Demo only: your email and sign-in times are saved in this browser. Passwords are never saved; authentication is not connected.</p>
          </div>
          <p className="text-center text-sm text-slate-500 mt-5">New to LedgerAI? <button onClick={onBack} className="font-medium text-indigo-700 hover:text-indigo-900">Explore the product</button></p>
        </section>
      </div>
    </main>
  );
}

/* ---------- App shell ---------- */
function Sidebar({view, setView, currentUser}) {
  const items = [
    ["Overview","grid"], ["Invoices","file"], ["Supplier portal","upload"], ["Review","check"],
    ["Vendors","building"], ["Purchase Orders","po"], ["Reports","reports"], ["Settings","settings"],
  ];
  return (
    <aside className="w-56 bg-white border-r border-slate-200 h-full flex-col hidden md:flex">
      <div className="h-16 flex items-center gap-2 px-5 font-bold border-b border-slate-200">{I.logo}LedgerAI</div>
      <nav className="flex-1 py-3 px-2 space-y-1">
        {items.map(([label,icon])=>(
          <button key={label} onClick={()=>setView(label.toLowerCase().includes("overview")?"dashboard":label.toLowerCase())}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left ${view===(label.toLowerCase().includes("overview")?"dashboard":label.toLowerCase())?"bg-slate-900 text-white":"text-slate-600 hover:bg-slate-100"}`}>
            {I[icon]}{label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-200">
        <p className="text-[11px] text-slate-400">Signed in as</p>
        <p className="text-xs font-medium text-slate-600 truncate" title={currentUser ? currentUser.email : "Demo user"}>{currentUser ? currentUser.email : "Demo user"}</p>
        <p className="text-[11px] text-slate-400 mt-1">{currentUser ? `Sign-ins: ${currentUser.signInCount}` : "v0.1 demo build"}</p>
      </div>
    </aside>
  );
}
function Topbar({title, goLanding, currentUser}) {
  return (
    <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
      <div className="min-w-0">
        <h1 className="font-semibold text-lg leading-6">{title}</h1>
        {currentUser && <p className="text-[11px] leading-4 text-slate-500 truncate">{currentUser.email} · Sign-ins: {currentUser.signInCount}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5 text-sm text-slate-500">
          {I.search}<input placeholder="Search invoices, vendors..." className="bg-transparent outline-none w-48"/>
        </div>
        <button className="text-slate-500 hover:text-slate-800">{I.bell}</button>
        <button onClick={goLanding} className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-semibold">AP</button>
      </div>
    </div>
  );
}

/* ---------- Dashboard ---------- */
function Dashboard({openReview}) {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Total invoices" value="248"/>
        <StatCard label="Pending review" value="14" sub="needs attention"/>
        <StatCard label="Approved" value="209"/>
        <StatCard label="Exceptions" value="6" sub="3 urgent" tone="rose"/>
        <StatCard label="Amount processed" value="₹3.2Cr" sub="this month"/>
      </div>
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <p className="font-semibold text-sm">Recent invoices</p>
        </div>
        <InvoiceTable rows={invoices} onOpen={openReview} compact/>
      </div>
    </div>
  );
}

/* ---------- Supplier invoice preflight ---------- */
function SupplierPreflight() {
  const [form, setForm] = useState({
    vendor: "Amazon Web Services",
    invoiceNumber: "AWS-2026-0918",
    gstin: "29AABCA1234F1Z5",
    poNumber: "PO-4471",
    subtotal: "240000",
    tax: "43200",
    total: "283200",
  });
  const [hasRun, setHasRun] = useState(false);
  const [shared, setShared] = useState(false);
  const update = (field, value) => {
    setForm(current => ({...current, [field]:value}));
    setHasRun(false);
    setShared(false);
  };
  const hasValidAmounts = [form.subtotal,form.tax,form.total].every(value=>value.trim()!=="") && [form.subtotal,form.tax,form.total].every(value=>Number.isFinite(Number(value)));
  const checks = [
    ["Invoice number is present", Boolean(form.invoiceNumber.trim())],
    ["Purchase order is recognized", ["PO-4471","PO-4488","PO-4502","PO-4510","PO-4515","PO-4519"].includes(form.poNumber.trim().toUpperCase())],
    ["Supplier GSTIN format is valid", /^[0-9]{2}[A-Z0-9]{13}$/.test(form.gstin.trim().toUpperCase())],
    ["Subtotal + tax equals total", hasValidAmounts && Number(form.subtotal)>=0 && Number(form.tax)>=0 && Math.abs((Number(form.subtotal) + Number(form.tax)) - Number(form.total)) < 1],
  ];
  const isReady = checks.every(([,passed]) => passed);
  const inputClass = "w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
  const fields = [
    ["Supplier name", "vendor", "text"],
    ["Invoice number", "invoiceNumber", "text"],
    ["Supplier GSTIN", "gstin", "text"],
    ["Buyer PO number", "poNumber", "text"],
    ["Subtotal (INR)", "subtotal", "number"],
    ["GST / tax (INR)", "tax", "number"],
    ["Invoice total (INR)", "total", "number"],
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase text-indigo-700">Supplier workspace · Demo</p>
          <h2 className="text-2xl font-semibold mt-1">Invoice preflight</h2>
          <p className="text-sm text-slate-500 mt-1">Check this invoice against Acme Manufacturing's requirements before sending.</p>
        </div>
        <StatusBadge s={shared ? "Shared" : hasRun && isReady ? "Ready" : "Draft"}/>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] gap-5 items-start">
        <section className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <h3 className="font-semibold text-sm">Invoice details</h3>
              <p className="text-xs text-slate-500 mt-1">Sample supplier and buyer data. Edit a value to test the checks.</p>
            </div>
            <span className="text-xs text-slate-500">INR · GST</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map(([label,field,type])=>(
              <label key={field} className="block text-xs font-medium text-slate-600">
                {label}
                <input className={`${inputClass} mt-1.5`} type={type} value={form[field]} onChange={event=>update(field,event.target.value)}/>
              </label>
            ))}
          </div>
          {hasRun && !isReady && (
            <p className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-800">Fix the failed checks before sharing this invoice.</p>
          )}
          {hasRun && isReady && (
            <p className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm text-emerald-800">All buyer checks passed. The invoice packet is ready to share.</p>
          )}
          {shared && <p className="mt-3 text-sm text-indigo-700">Demo status: shared with Acme Manufacturing.</p>}
          <div className="flex flex-wrap gap-2 mt-5">
            <button onClick={()=>{setHasRun(true); setShared(false);}} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800">Run preflight checks</button>
            {hasRun && isReady && <button onClick={()=>setShared(true)} className="border border-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">Share validated invoice</button>}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-2">
            <div>
              <h3 className="font-semibold text-sm">Acme buyer requirements</h3>
              <p className="text-xs text-slate-500 mt-1">Readiness checks for this sample invoice</p>
            </div>
            <span className="text-sm font-semibold text-slate-700">{checks.filter(([,passed])=>passed).length}/{checks.length}</span>
          </div>
          <div className="divide-y divide-slate-100">
            {checks.map(([label,passed])=>(
              <div key={label} className="flex items-start gap-3 py-3 text-sm">
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${passed?"bg-emerald-100 text-emerald-700":"bg-rose-100 text-rose-700"}`}>{passed?"✓":"!"}</span>
                <span className={passed?"text-slate-700":"text-rose-700"}>{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
            <p className="font-medium text-slate-700">What happens next</p>
            <p className="mt-1">A passed invoice is prepared for buyer review with its checks attached. This prototype does not send data to a buyer.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- Invoice table (shared) ---------- */
function InvoiceTable({rows, onOpen, compact}) {
  if (rows.length===0) {
    return <div className="p-12 text-center text-sm text-slate-500">
      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">{I.file}</div>
      No invoices match this filter.
    </div>;
  }
  return (
    <div className="scrollx">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b border-slate-200">
            <th className="px-5 py-3 font-medium">Invoice #</th>
            <th className="px-3 py-3 font-medium">Vendor</th>
            <th className="px-3 py-3 font-medium">Amount</th>
            {!compact && <th className="px-3 py-3 font-medium">GST</th>}
            <th className="px-3 py-3 font-medium">Date</th>
            <th className="px-3 py-3 font-medium">PO</th>
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-3 py-3 font-medium">Confidence</th>
            <th className="px-5 py-3 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(inv=>(
            <tr key={inv.id} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="px-5 py-3 font-medium text-slate-800">{inv.id}</td>
              <td className="px-3 py-3">{inv.vendor}</td>
              <td className="px-3 py-3">{inr(inv.amount)}</td>
              {!compact && <td className="px-3 py-3 text-slate-500">{inr(inv.gst)}</td>}
              <td className="px-3 py-3 text-slate-500">{inv.date}</td>
              <td className="px-3 py-3 text-slate-500">{inv.po}</td>
              <td className="px-3 py-3"><StatusBadge s={inv.status}/></td>
              <td className="px-3 py-3"><ConfBar v={inv.conf}/></td>
              <td className="px-5 py-3 text-right">
                <button onClick={()=>onOpen(inv)} className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">Review →</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Invoices page ---------- */
function InvoicesPage({openReview, openUpload}) {
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const tabs = ["All","Pending Review","Approved","Exception","Paid"];
  const rows = invoices.filter(i=>(filter==="All"||i.status===filter) && (i.vendor.toLowerCase().includes(q.toLowerCase())||i.id.toLowerCase().includes(q.toLowerCase())));
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2">
          {tabs.map(t=>(
            <button key={t} onClick={()=>setFilter(t)} className={`px-3 py-1.5 rounded-lg text-sm ${filter===t?"bg-slate-900 text-white":"bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{t}</button>
          ))}
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm">
            {I.search}<input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search invoice # or vendor" className="outline-none w-48"/>
          </div>
          <button onClick={openUpload} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-lg text-sm font-medium">{I.upload}Upload Invoice</button>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200">
        <InvoiceTable rows={rows} onOpen={openReview}/>
      </div>
    </div>
  );
}

/* ---------- Upload modal ---------- */
function UploadModal({onClose, onDone}) {
  const [stage, setStage] = useState("drop"); // drop -> processing -> extracted
  const start = () => { setStage("processing"); setTimeout(()=>setStage("extracted"), 1400); };
  const fields = [["Vendor","Google Cloud"],["Invoice #","INV-2097"],["Invoice date","24 Sep 2026"],["Due date","24 Oct 2026"],
    ["Subtotal","₹3,10,000"],["GST","₹55,800"],["Total","₹3,65,800"],["PO number","PO-4522"]];
  return (
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <p className="font-semibold">Upload Invoice</p>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <div className="p-6">
          {stage==="drop" && (
            <div onClick={start} className="border-2 border-dashed border-slate-300 rounded-xl py-14 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/40">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">{I.upload}</div>
              <p className="font-medium">Drop your invoice here</p>
              <p className="text-xs text-slate-500 mt-1">Supports PDF, PNG, JPG · or click to browse</p>
            </div>
          )}
          {stage==="processing" && (
            <div className="py-14 text-center">
              <div className="w-8 h-8 mx-auto mb-4 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin"/>
              <p className="text-sm text-slate-600">AI is analyzing your invoice...</p>
            </div>
          )}
          {stage==="extracted" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {fields.map(([l,v])=>(
                  <div key={l} className="border border-slate-200 rounded-lg px-3 py-2">
                    <p className="text-xs text-slate-500">{l}</p>
                    <p className="text-sm font-medium">{v}</p>
                  </div>
                ))}
              </div>
              <button onClick={onDone} className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium">Review Invoice</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Review page ---------- */
function ReviewPage({invoice, back}) {
  const inv = invoice || invoices[2];
  const hasException = inv.status === "Exception";
  const checks = [
    ["Vendor verified", true], ["GST calculation correct", true],
    ["Duplicate check passed", true], ["PO matched", !hasException],
  ];
  return (
    <div className="p-6 space-y-4">
      <button onClick={back} className="text-sm text-slate-500 hover:text-slate-800">← Back to invoices</button>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 h-[560px] flex flex-col">
          <p className="text-sm font-semibold mb-3">Invoice document</p>
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 gap-2">
            {I.file}
            <p className="text-xs">{inv.id}.pdf preview</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-5">
          <div>
            <p className="text-sm font-semibold mb-3">AI extracted information</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-slate-500">Vendor</p><p className="font-medium">{inv.vendor}</p></div>
              <div><p className="text-xs text-slate-500">Invoice number</p><p className="font-medium">{inv.id}</p></div>
              <div><p className="text-xs text-slate-500">Invoice date</p><p className="font-medium">{inv.date}</p></div>
              <div><p className="text-xs text-slate-500">Due date</p><p className="font-medium">15 Oct 2026</p></div>
              <div><p className="text-xs text-slate-500">Subtotal</p><p className="font-medium">{inr(inv.amount-inv.gst)}</p></div>
              <div><p className="text-xs text-slate-500">CGST</p><p className="font-medium">{inr(Math.round(inv.gst/2))}</p></div>
              <div><p className="text-xs text-slate-500">SGST</p><p className="font-medium">{inr(Math.round(inv.gst/2))}</p></div>
              <div><p className="text-xs text-slate-500">IGST</p><p className="font-medium">₹0</p></div>
              <div><p className="text-xs text-slate-500">Total</p><p className="font-semibold">{inr(inv.amount)}</p></div>
              <div><p className="text-xs text-slate-500">PO number</p><p className="font-medium">{inv.po}</p></div>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-4 space-y-2">
            <p className="text-sm font-semibold mb-1">Validation</p>
            {checks.map(([label,ok])=>(
              <div key={label} className={`flex items-center gap-2 text-sm ${ok?"text-emerald-700":"text-rose-700"}`}>
                {ok ? "✓" : "⚠"} {label}
              </div>
            ))}
            {hasException && (
              <div className="mt-2 bg-rose-50 border border-rose-200 rounded-lg p-3 flex gap-2 text-sm text-rose-700">
                {I.warn}
                <span>Exception detected: invoice total does not match the purchase order amount for {inv.po}.</span>
              </div>
            )}
          </div>
          <div className="flex gap-2 pt-2">
            <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">Approve</button>
            <button className="flex-1 border border-rose-300 text-rose-700 py-2 rounded-lg text-sm font-medium hover:bg-rose-50">Reject</button>
            <button className="flex-1 border border-slate-300 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">Request Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Vendors ---------- */
function VendorsPage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl border border-slate-200 scrollx">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="px-5 py-3 font-medium">Vendor</th>
              <th className="px-3 py-3 font-medium">GSTIN</th>
              <th className="px-3 py-3 font-medium">Invoices</th>
              <th className="px-3 py-3 font-medium">Total amount</th>
              <th className="px-3 py-3 font-medium">Last invoice</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map(v=>(
              <tr key={v.name} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-5 py-3 font-medium">{v.name}</td>
                <td className="px-3 py-3 text-slate-500">{v.gstin}</td>
                <td className="px-3 py-3">{v.count}</td>
                <td className="px-3 py-3">{inr(v.total)}</td>
                <td className="px-3 py-3 text-slate-500">{v.last}</td>
                <td className="px-5 py-3"><StatusBadge s={v.status}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Settings ---------- */
function SettingsPage() {
  const [tab, setTab] = useState("Company");
  const tabs = ["Company","Users","Notifications","Integrations","Security"];
  const integrations = ["Tally","Zoho Books","QuickBooks","Xero"];
  return (
    <div className="p-6 grid grid-cols-[160px_1fr] gap-6">
      <div className="space-y-1">
        {tabs.map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={`w-full text-left px-3 py-2 rounded-lg text-sm ${tab===t?"bg-slate-900 text-white":"text-slate-600 hover:bg-slate-100"}`}>{t}</button>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        {tab==="Company" && (
          <div className="space-y-3 max-w-sm text-sm">
            <div><p className="text-xs text-slate-500 mb-1">Company name</p><input defaultValue="Acme Manufacturing Pvt Ltd" className="w-full border border-slate-200 rounded-lg px-3 py-2"/></div>
            <div><p className="text-xs text-slate-500 mb-1">GSTIN</p><input defaultValue="27AACME1234F1Z9" className="w-full border border-slate-200 rounded-lg px-3 py-2"/></div>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm mt-2">Save changes</button>
          </div>
        )}
        {tab==="Users" && (
          <div className="text-sm space-y-2">
            {[["Aditi Rao","Finance Lead","Admin"],["Karan Shah","AP Analyst","Reviewer"]].map(([n,r,role])=>(
              <div key={n} className="flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2">
                <div><p className="font-medium">{n}</p><p className="text-xs text-slate-500">{r}</p></div>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">{role}</span>
              </div>
            ))}
          </div>
        )}
        {tab==="Notifications" && (
          <div className="space-y-3 text-sm">
            {["Email me on new exceptions","Weekly summary report","Vendor GSTIN mismatch alerts"].map(n=>(
              <label key={n} className="flex items-center gap-2"><input type="checkbox" defaultChecked/> {n}</label>
            ))}
          </div>
        )}
        {tab==="Integrations" && (
          <div className="grid grid-cols-2 gap-4">
            {integrations.map(n=>(
              <div key={n} className="border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                <div><p className="font-medium">{n}</p><p className="text-xs text-slate-500">Not connected</p></div>
                <button className="text-xs border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50">Connect</button>
              </div>
            ))}
          </div>
        )}
        {tab==="Security" && (
          <div className="text-sm space-y-3">
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked/> Require two-factor authentication</label>
            <label className="flex items-center gap-2"><input type="checkbox"/> Restrict login to company domain</label>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- App root ---------- */
function App() {
  const [screen, setScreen] = useState("landing");
  const [view, setView] = useState("dashboard");
  const [showUpload, setShowUpload] = useState(false);
  const [reviewInvoice, setReviewInvoice] = useState(null);
  const [currentUser, setCurrentUser] = useState(()=>{
    try {
      return JSON.parse(localStorage.getItem("ledgerai_current_user") || "null");
    } catch {
      return null;
    }
  });

  if (screen==="landing") return <Landing goApp={()=>setScreen("app")} goSupplier={()=>{setScreen("app"); setView("supplier portal");}} goLogin={()=>setScreen("login")}/>;
  if (screen==="login") return <LoginPage onSignIn={email=>{
    const result = saveDemoLogin(email);
    setCurrentUser(result.user);
    setScreen("app");
    setView("dashboard");
  }} onBack={()=>setScreen("landing")}/>;

  const titles = {dashboard:"Overview", invoices:"Invoices", "supplier portal":"Supplier portal", review:"Invoice Review", vendors:"Vendors", "purchase orders":"Purchase Orders", reports:"Reports", settings:"Settings"};

  return (
    <div className="h-screen flex bg-slate-50">
      <Sidebar view={view} setView={v=>{setView(v); if(v!=="review") setReviewInvoice(null);}} currentUser={currentUser}/>
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={titles[view]||"Overview"} goLanding={()=>setScreen("landing")} currentUser={currentUser}/>
        <div className="flex-1 overflow-y-auto">
          {view==="dashboard" && <Dashboard openReview={inv=>{setReviewInvoice(inv); setView("review");}}/>}
          {view==="invoices" && <InvoicesPage openReview={inv=>{setReviewInvoice(inv); setView("review");}} openUpload={()=>setShowUpload(true)}/>}
          {view==="supplier portal" && <SupplierPreflight/>}
          {view==="review" && <ReviewPage invoice={reviewInvoice} back={()=>setView("invoices")}/>}
          {view==="vendors" && <VendorsPage/>}
          {view==="settings" && <SettingsPage/>}
          {(view==="purchase orders"||view==="reports") && (
            <div className="p-6"><div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-sm text-slate-500">
              This section is a placeholder in the demo — not built out yet.
            </div></div>
          )}
        </div>
      </div>
      {showUpload && <UploadModal onClose={()=>setShowUpload(false)} onDone={()=>{setShowUpload(false); setView("invoices");}}/>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
