import { useEffect, useState } from "react";

import { requestJson } from "./utils/api";

import Landing from "./pages/Landing";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SupplierPreflight from "./pages/SupplierPreflight";
import InvoicesPage from "./pages/InvoicesPage";
import ReviewPage from "./pages/ReviewPage";
import VendorsPage from "./pages/VendorsPage";
import SettingsPage from "./pages/SettingsPage";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import UploadModal from "./modals/UploadModal";

function App() {
  const [screen, setScreen] = useState("landing");
  const [view, setView] = useState("dashboard");

  const [showUpload, setShowUpload] = useState(false);
  const [reviewInvoice, setReviewInvoice] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [invoices, setInvoices] = useState([]);

  const [authChecking, setAuthChecking] = useState(true);

  const [loginMode, setLoginMode] = useState("register");
  const [pendingView, setPendingView] = useState("dashboard");

  useEffect(() => {
    let active = true;

    requestJson("/api/auth/me")
      .then(async ({ user }) => {
        if (!user) return;

        const result = await requestJson("/api/invoices");

        if (active) {
          setCurrentUser(user);
          setInvoices(result.invoices);
          setScreen("app");
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) {
          setAuthChecking(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const handleAuth = async (
    email,
    password,
    mode
  ) => {
    const { user } = await requestJson(
      `/api/auth/${mode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const result = await requestJson("/api/invoices");

    setCurrentUser(user);
    setInvoices(result.invoices);
    setView(pendingView);
    setScreen("app");
  };

  const handleSignOut = async () => {
    try {
      await requestJson("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      setCurrentUser(null);
      setInvoices([]);
      setReviewInvoice(null);
      setScreen("landing");
    }
  };

  const openReview = (invoice) => {
    setReviewInvoice(invoice);
    setView("review");
  };

  const handleUpload = async (details, file) => {
    const body = new FormData();

    Object.entries(details).forEach(
      ([key, value]) => {
        body.append(key, value);
      }
    );

    body.append("invoice", file);

    const { invoice } = await requestJson(
      "/api/invoices",
      {
        method: "POST",
        body,
      }
    );

    setInvoices((current) => [
      invoice,
      ...current,
    ]);

    setReviewInvoice(invoice);
    setShowUpload(false);
    setView("review");
  };

  const changeView = (nextView) => {
    setView(nextView);

    if (nextView !== "review") {
      setReviewInvoice(null);
    }
  };

  if (authChecking) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 text-sm text-slate-500">
        Loading LedgerAI...
      </main>
    );
  }

  if (screen === "landing") {
    return (
      <Landing
        goApp={() => {
          setLoginMode("register");
          setPendingView("dashboard");
          setScreen("login");
        }}
        goSupplier={() => {
          setLoginMode("register");
          setPendingView("supplier portal");
          setScreen("login");
        }}
        goLogin={() => {
          setLoginMode("login");
          setPendingView("dashboard");
          setScreen("login");
        }}
      />
    );
  }

  if (screen === "login") {
    return (
      <LoginPage
        onSignIn={handleAuth}
        initialMode={loginMode}
        onBack={() => setScreen("landing")}
      />
    );
  }

  const titles = {
    dashboard: "Overview",
    invoices: "Invoices",
    "supplier portal": "Supplier portal",
    review: "Invoice Review",
    vendors: "Vendors",
    "purchase orders": "Purchase Orders",
    reports: "Reports",
    settings: "Settings",
  };

  return (
    <div className="h-screen flex bg-slate-50">
      <Sidebar
        view={view}
        setView={changeView}
        currentUser={currentUser}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          title={titles[view] || "Overview"}
          onSignOut={handleSignOut}
          currentUser={currentUser}
        />

        <div className="flex-1 overflow-y-auto">
          {view === "dashboard" && (
            <Dashboard
              invoices={invoices}
              openReview={openReview}
            />
          )}

          {view === "invoices" && (
            <InvoicesPage
              invoices={invoices}
              openReview={openReview}
              openUpload={() => setShowUpload(true)}
            />
          )}

          {view === "supplier portal" && (
            <SupplierPreflight />
          )}

          {view === "review" && (
            <ReviewPage
              invoice={reviewInvoice}
              back={() => changeView("invoices")}
            />
          )}

          {view === "vendors" && <VendorsPage />}

          {view === "settings" && <SettingsPage />}

          {(view === "purchase orders" ||
            view === "reports") && (
            <div className="p-6">
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-sm text-slate-500">
                This section is a placeholder in
                the demo — not built out yet.
              </div>
            </div>
          )}
        </div>
      </div>

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}

export default App;
