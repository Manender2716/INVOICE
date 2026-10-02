export default function ReviewPage({ invoice, back }) {
  const inv = invoice;
  if (!inv)
    return (
      <div className="p-6">
        <button
          onClick={back}
          className="text-sm text-slate-500 hover:text-slate-800"
        >
          ← Back to invoices
        </button>
        <p className="mt-6 text-sm text-slate-500">
          Select an invoice to review.
        </p>
      </div>
    );
  const hasException = inv.status === "Exception";
  const checks = [
    ["Vendor verified", true],
    ["GST calculation correct", true],
    ["Duplicate check passed", true],
    ["PO matched", !hasException],
  ];
  return (
    <div className="p-6 space-y-4">
      <button
        onClick={back}
        className="text-sm text-slate-500 hover:text-slate-800"
      >
        ← Back to invoices
      </button>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 h-[560px] flex flex-col">
          <p className="text-sm font-semibold mb-3">Invoice document</p>
          <div className="flex-1 min-h-0 bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center text-slate-400">
            {inv.fileUrl && /\.pdf$/i.test(inv.fileName || "") ? (
              <iframe
                title={`${inv.id} invoice PDF`}
                src={inv.fileUrl}
                className="w-full h-full"
              />
            ) : inv.fileUrl ? (
              <img
                src={inv.fileUrl}
                alt={`${inv.id} invoice`}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <p className="text-xs">No uploaded document</p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-5">
          <div>
            <p className="text-sm font-semibold mb-3">Invoice details</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-slate-500">Vendor</p>
                <p className="font-medium">{inv.vendor}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Invoice number</p>
                <p className="font-medium">{inv.id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Invoice date</p>
                <p className="font-medium">{inv.date}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Due date</p>
                <p className="font-medium">15 Oct 2026</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Subtotal</p>
                <p className="font-medium">{inr(inv.amount - inv.gst)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">CGST</p>
                <p className="font-medium">{inr(Math.round(inv.gst / 2))}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">SGST</p>
                <p className="font-medium">{inr(Math.round(inv.gst / 2))}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">IGST</p>
                <p className="font-medium">₹0</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Total</p>
                <p className="font-semibold">{inr(inv.amount)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">PO number</p>
                <p className="font-medium">{inv.po}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-4 space-y-2">
            <p className="text-sm font-semibold mb-1">Validation</p>
            {checks.map(([label, ok]) => (
              <div
                key={label}
                className={`flex items-center gap-2 text-sm ${ok ? "text-emerald-700" : "text-rose-700"}`}
              >
                {ok ? "✓" : "⚠"} {label}
              </div>
            ))}
            {hasException && (
              <div className="mt-2 bg-rose-50 border border-rose-200 rounded-lg p-3 flex gap-2 text-sm text-rose-700">
                {I.warn}
                <span>
                  Exception detected: invoice total does not match the purchase
                  order amount for {inv.po}.
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-2 pt-2">
            <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
              Approve
            </button>
            <button className="flex-1 border border-rose-300 text-rose-700 py-2 rounded-lg text-sm font-medium hover:bg-rose-50">
              Reject
            </button>
            <button className="flex-1 border border-slate-300 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
              Request Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}