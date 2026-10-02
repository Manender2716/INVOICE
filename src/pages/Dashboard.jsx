import StatCard from "../components/StatCard";
import InvoiceTable from "../components/InvoiceTable";
import { inr } from "../data/mockData";

export default function Dashboard({
  openReview,
  invoices,
}) {
  const pendingCount = invoices.filter(
    (invoice) => invoice.status === "Pending Review"
  ).length;

  const approvedCount = invoices.filter((invoice) =>
    ["Approved", "Paid"].includes(invoice.status)
  ).length;

  const exceptionCount = invoices.filter(
    (invoice) => invoice.status === "Exception"
  ).length;

  const processedAmount = invoices
    .filter((invoice) =>
      ["Approved", "Paid"].includes(invoice.status)
    )
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard
          label="Total invoices"
          value={invoices.length}
        />

        <StatCard
          label="Pending review"
          value={pendingCount}
          sub={
            pendingCount
              ? "needs attention"
              : "all caught up"
          }
        />

        <StatCard
          label="Approved"
          value={approvedCount}
        />

        <StatCard
          label="Exceptions"
          value={exceptionCount}
          sub={
            exceptionCount
              ? "needs attention"
              : "none"
          }
          tone="rose"
        />

        <StatCard
          label="Amount processed"
          value={inr(processedAmount)}
          sub="approved invoices"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-200">
          <p className="font-semibold text-sm">
            Recent invoices
          </p>
        </div>

        <InvoiceTable
          rows={invoices}
          onOpen={openReview}
          compact
        />
      </div>
    </div>
  );
}
