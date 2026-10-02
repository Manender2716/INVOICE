import { useState } from "react";

export default function SettingsPage() {
  const [tab, setTab] = useState("Company");
  const tabs = [
    "Company",
    "Users",
    "Notifications",
    "Integrations",
    "Security",
  ];
  const integrations = ["Tally", "Zoho Books", "QuickBooks", "Xero"];
  return (
    <div className="p-6 grid grid-cols-[160px_1fr] gap-6">
      <div className="space-y-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm ${tab === t ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        {tab === "Company" && (
          <div className="space-y-3 max-w-sm text-sm">
            <div>
              <p className="text-xs text-slate-500 mb-1">Company name</p>
              <input
                defaultValue="Acme Manufacturing Pvt Ltd"
                className="w-full border border-slate-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">GSTIN</p>
              <input
                defaultValue="27AACME1234F1Z9"
                className="w-full border border-slate-200 rounded-lg px-3 py-2"
              />
            </div>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm mt-2">
              Save changes
            </button>
          </div>
        )}
        {tab === "Users" && (
          <div className="text-sm space-y-2">
            {[
              ["Aditi Rao", "Finance Lead", "Admin"],
              ["Karan Shah", "AP Analyst", "Reviewer"],
            ].map(([n, r, role]) => (
              <div
                key={n}
                className="flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2"
              >
                <div>
                  <p className="font-medium">{n}</p>
                  <p className="text-xs text-slate-500">{r}</p>
                </div>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                  {role}
                </span>
              </div>
            ))}
          </div>
        )}
        {tab === "Notifications" && (
          <div className="space-y-3 text-sm">
            {[
              "Email me on new exceptions",
              "Weekly summary report",
              "Vendor GSTIN mismatch alerts",
            ].map((n) => (
              <label key={n} className="flex items-center gap-2">
                <input type="checkbox" defaultChecked /> {n}
              </label>
            ))}
          </div>
        )}
        {tab === "Integrations" && (
          <div className="grid grid-cols-2 gap-4">
            {integrations.map((n) => (
              <div
                key={n}
                className="border border-slate-200 rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{n}</p>
                  <p className="text-xs text-slate-500">Not connected</p>
                </div>
                <button className="text-xs border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50">
                  Connect
                </button>
              </div>
            ))}
          </div>
        )}
        {tab === "Security" && (
          <div className="text-sm space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked /> Require two-factor
              authentication
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Restrict login to company domain
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
