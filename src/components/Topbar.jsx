import { I } from "./icons";

export default function Topbar({
  title,
  onSignOut,
  currentUser,
}) {
  return (
    <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
      <div className="min-w-0">
        <h1 className="font-semibold text-lg leading-6">
          {title}
        </h1>

        {currentUser && (
          <p className="text-[11px] leading-4 text-slate-500 truncate">
            {currentUser.email} · Sign-ins:{" "}
            {currentUser.signInCount}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5 text-sm text-slate-500">
          {I.search}

          <input
            placeholder="Search invoices, vendors..."
            className="bg-transparent outline-none w-48"
          />
        </div>

        <button className="text-slate-500 hover:text-slate-800">
          {I.bell}
        </button>

        <button
          onClick={onSignOut}
          title="Sign out"
          aria-label="Sign out"
          className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-semibold"
        >
          AP
        </button>
      </div>
    </div>
  );
}
