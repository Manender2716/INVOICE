import { useState } from "react";
import StatusBadge from "../components/StatusBadge";

export default function SupplierPreflight() {
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
    setForm((current) => ({ ...current, [field]: value }));
    setHasRun(false);
    setShared(false);
  };
  const hasValidAmounts =
    [form.subtotal, form.tax, form.total].every(
      (value) => value.trim() !== "",
    ) &&
    [form.subtotal, form.tax, form.total].every((value) =>
      Number.isFinite(Number(value)),
    );
  const checks = [
    ["Invoice number is present", Boolean(form.invoiceNumber.trim())],
    [
      "Purchase order is recognized",
      [
        "PO-4471",
        "PO-4488",
        "PO-4502",
        "PO-4510",
        "PO-4515",
        "PO-4519",
      ].includes(form.poNumber.trim().toUpperCase()),
    ],
    [
      "Supplier GSTIN format is valid",
      /^[0-9]{2}[A-Z0-9]{13}$/.test(form.gstin.trim().toUpperCase()),
    ],
    [
      "Subtotal + tax equals total",
      hasValidAmounts &&
        Number(form.subtotal) >= 0 &&
        Number(form.tax) >= 0 &&
        Math.abs(
          Number(form.subtotal) + Number(form.tax) - Number(form.total),
        ) < 1,
    ],
  ];
  const isReady = checks.every(([, passed]) => passed);
  const inputClass =
    "w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
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
          <p className="text-xs font-medium uppercase text-indigo-700">
            Supplier workspace · Demo
          </p>
          <h2 className="text-2xl font-semibold mt-1">Invoice preflight</h2>
          <p className="text-sm text-slate-500 mt-1">
            Check this invoice against Acme Manufacturing's requirements before
            sending.
          </p>
        </div>
        <StatusBadge
          s={shared ? "Shared" : hasRun && isReady ? "Ready" : "Draft"}
        />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] gap-5 items-start">
        <section className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <h3 className="font-semibold text-sm">Invoice details</h3>
              <p className="text-xs text-slate-500 mt-1">
                Sample supplier and buyer data. Edit a value to test the checks.
              </p>
            </div>
            <span className="text-xs text-slate-500">INR · GST</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map(([label, field, type]) => (
              <label
                key={field}
                className="block text-xs font-medium text-slate-600"
              >
                {label}
                <input
                  className={`${inputClass} mt-1.5`}
                  type={type}
                  value={form[field]}
                  onChange={(event) => update(field, event.target.value)}
                />
              </label>
            ))}
          </div>
          {hasRun && !isReady && (
            <p className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-800">
              Fix the failed checks before sharing this invoice.
            </p>
          )}
          {hasRun && isReady && (
            <p className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm text-emerald-800">
              All buyer checks passed. The invoice packet is ready to share.
            </p>
          )}
          {shared && (
            <p className="mt-3 text-sm text-indigo-700">
              Demo status: shared with Acme Manufacturing.
            </p>
          )}
          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => {
                setHasRun(true);
                setShared(false);
              }}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800"
            >
              Run preflight checks
            </button>
            {hasRun && isReady && (
              <button
                onClick={() => setShared(true)}
                className="border border-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50"
              >
                Share validated invoice
              </button>
            )}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-2">
            <div>
              <h3 className="font-semibold text-sm">Acme buyer requirements</h3>
              <p className="text-xs text-slate-500 mt-1">
                Readiness checks for this sample invoice
              </p>
            </div>
            <span className="text-sm font-semibold text-slate-700">
              {checks.filter(([, passed]) => passed).length}/{checks.length}
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {checks.map(([label, passed]) => (
              <div key={label} className="flex items-start gap-3 py-3 text-sm">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${passed ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
                >
                  {passed ? "✓" : "!"}
                </span>
                <span className={passed ? "text-slate-700" : "text-rose-700"}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
            <p className="font-medium text-slate-700">What happens next</p>
            <p className="mt-1">
              A passed invoice is prepared for buyer review with its checks
              attached. This prototype does not send data to a buyer.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}