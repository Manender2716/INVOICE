export default function StatCard({
  label,
  value,
  sub,
  tone = "slate",
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="text-2xl font-semibold mt-1 text-slate-900">
        {value}
      </p>

      {sub && (
        <p
          className={`text-xs mt-1 ${
            tone === "rose"
              ? "text-rose-600"
              : "text-slate-400"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
