const statusStyles = {
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Pending Review": "bg-amber-50 text-amber-700 ring-amber-200",
  Exception: "bg-rose-50 text-rose-700 ring-rose-200",
  Paid: "bg-slate-100 text-slate-700 ring-slate-200",
  Processing: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Review: "bg-amber-50 text-amber-700 ring-amber-200",
};

export default function StatusBadge({ s }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${
        statusStyles[s] ||
        "bg-slate-100 text-slate-700 ring-slate-200"
      }`}
    >
      {s}
    </span>
  );
}
