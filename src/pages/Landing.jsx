import StatusBadge from "../components/StatusBadge";
import ConfBar from "../components/ConfBar";
import { I } from "../components/icons";
import { sampleInvoices, inr } from "../data/mockData";

export default function Landing({ goApp, goSupplier, goLogin }) {
  const nav = ["Product", "How it works", "Pricing"];
  return (
    <div className="bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            {I.logo}LedgerAI
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            {nav.map((n) => (
              <a key={n} className="hover:text-slate-900 cursor-pointer">
                {n}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={goLogin}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              Login
            </button>
            <button
              onClick={goApp}
              className="text-sm bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto text-center px-6 pt-20 pb-14">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 ring-1 ring-indigo-200 px-3 py-1 rounded-full mb-6">
          A shared invoice workspace for buyers and suppliers
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Invoices ready to approve. Payments easier to track.
        </h1>
        <p className="text-slate-600 mt-5 text-lg max-w-2xl mx-auto">
          Suppliers check invoices against buyer requirements before sending.
          Buyers receive validated invoices with PO, GST, and total checks
          already attached.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={goSupplier}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
          >
            Try supplier preflight
          </button>
          <button
            onClick={goApp}
            className="border border-slate-300 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50"
          >
            Open buyer workspace
          </button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="rounded-xl border border-slate-200 shadow-sm bg-slate-50 p-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">
                Invoice readiness across both sides
              </p>
              <StatusBadge s="Approved" />
            </div>
            <div className="grid grid-cols-4 gap-3 text-xs text-slate-500 mb-2">
              <span>Supplier</span>
              <span>Invoice total</span>
              <span>Buyer PO</span>
              <span>AI checks</span>
            </div>
            {sampleInvoices.slice(0, 3).map((inv) => (
              <div
                key={inv.id}
                className="grid grid-cols-4 gap-3 text-sm py-2 border-t border-slate-100 items-center"
              >
                <span className="font-medium">{inv.vendor}</span>
                <span>{inr(inv.amount)}</span>
                <span className="text-slate-500">{inv.po}</span>
                <ConfBar v={inv.conf} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-slate-200">
        <h2 className="text-2xl font-semibold text-center mb-10">
          One clear path from draft to payment
        </h2>
        <div className="grid md:grid-cols-4 gap-6 text-sm">
          {[
            "Supplier enters or uploads an invoice",
            "LedgerAI checks buyer rules, PO, and GST",
            "Both teams resolve exceptions together",
            "Buyer approves a complete invoice",
          ].map((s, i) => (
            <div key={s} className="text-center">
              <div className="w-9 h-9 mx-auto rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold mb-3">
                {i + 1}
              </div>
              <p className="text-slate-700">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-slate-200">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Fewer rejections. Less invoice chasing.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            [
              "Supplier-side preflight",
              "Catch missing details and mismatches before an invoice reaches the buyer.",
            ],
            [
              "Buyer-specific checks",
              "Validate PO references, GSTIN, tax totals, and required invoice fields.",
            ],
            [
              "Shared exception resolution",
              "Give both teams one place to clarify a mismatch and attach context.",
            ],
            [
              "Payment-ready packet",
              "Keep the invoice, validation results, and supporting details together.",
            ],
            [
              "Clear invoice status",
              "Suppliers see where an invoice stands without chasing email threads.",
            ],
            [
              "Buyer workflow",
              "Route validated invoices into review with less manual correction.",
            ],
          ].map(([t, d]) => (
            <div key={t} className="border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold mb-1.5">{t}</h3>
              <p className="text-sm text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-slate-200 flex items-center gap-4">
        {I.shield}
        <p className="text-sm text-slate-600">
          Data encrypted in transit and at rest. Role-based access, full audit
          trails, and SOC2-style controls designed in from day one.
        </p>
      </section>

      <section className="bg-slate-900 text-white text-center py-16">
        <h2 className="text-2xl font-semibold mb-4">
          Start with the next invoice you send or receive.
        </h2>
        <button
          onClick={goSupplier}
          className="bg-white text-slate-900 px-5 py-2.5 rounded-lg text-sm font-medium"
        >
          Run a supplier preflight
        </button>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        © 2026 LedgerAI. Demo product — not affiliated with any accounting
        provider.
      </footer>
    </div>
  );
}