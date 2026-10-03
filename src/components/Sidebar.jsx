import { I } from "./icons";

export default function Sidebar({
  view,
  setView,
  currentUser,
}) {
  const items = [
    ["Overview", "grid"],
    ["Invoices", "file"],
    ["Supplier portal", "upload"],
    ["Review", "check"],
    ["Vendors", "building"],
    ["Purchase Orders", "po"],
    ["Reports", "reports"],
    ["Settings", "settings"],
  ];

  const getView = (label) =>
    label.toLowerCase().includes("overview")
      ? "dashboard"
      : label.toLowerCase();

  return (
    <aside className="w-56 bg-white border-r border-slate-200 h-full flex-col hidden md:flex">
      <div className="h-16 flex items-center gap-2 px-5 font-bold border-b border-slate-200">
        {I.logo}
        LedgerAI
      </div>

      <nav className="flex-1 py-3 px-2 space-y-1">
        {items.map(([label, icon]) => {
          const targetView = getView(label);

          return (
            <button
              key={label}
              onClick={() => setView(targetView)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left ${
                view === targetView
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {I[icon]}
              {label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <p className="text-[11px] text-slate-400">
          Signed in as
        </p>

        <p
          className="text-xs font-medium text-slate-600 truncate"
          title={currentUser?.email || "Demo user"}
        >
          {currentUser?.email || "Demo user"}
        </p>

        <p className="text-[11px] text-slate-400 mt-1">
          {currentUser
            ? `Sign-ins: ${currentUser.signInCount}`
            : "v0.1 demo build"}
        </p>
      </div>
    </aside>
  );
}
