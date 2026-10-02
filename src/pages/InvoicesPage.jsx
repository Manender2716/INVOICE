import { useState } from "react";
import InvoiceTable from "../components/InvoiceTable";
import { I } from "../components/icons";

export default function InvoicesPage({
  invoices,
  openReview,
  openUpload,
}) {
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");

  const tabs = [
    "All",
    "Pending Review",
    "Approved",
    "Exception",
    "Paid",
  ];

  const rows = invoices.filter(
    (invoice) =>
      (filter === "All" || invoice.status === filter) &&
      (invoice.vendor
        .toLowerCase()
        .includes(q.toLowerCase()) ||
        invoice.id
          .toLowerCase()
          .includes(q.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                filter === tab
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm">
            {I.search}

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search invoice # or vendor"
              className="outline-none w-48"
            />
          </div>

          <button
            onClick={openUpload}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
          >
            {I.upload}
            Upload Invoice
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <InvoiceTable
          rows={rows}
          onOpen={openReview}
        />
      </div>
    </div>
  );
}
