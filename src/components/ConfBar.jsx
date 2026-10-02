export default function ConfBar({ v }) {
  return (
    <div className="flex items-center gap-2 w-24">
      <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${
            v >= 90
              ? "bg-emerald-500"
              : v >= 1
                ? "bg-amber-500"
                : "bg-slate-300"
          }`}
          style={{ width: `${v}%` }}
        />
      </div>

      <span className="text-xs text-slate-500 w-8">
        {v > 0 ? `${v}%` : "—"}
      </span>
    </div>
  );
}
