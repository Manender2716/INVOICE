import StatusBadge from "./StatusBadge";
import ConfBar from "./ConfBar";
import { I } from "./icons";
import { inr } from "../data/mockData";

export default function InvoiceTable({
  rows,
  onOpen,
  compact = false,
}) {
  if (rows.length === 0) {
    return (
      <div className="p-12 text-center text-sm text-slate-500">
        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
          {I.file}
        </div>

        No invoices match this filter.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b border-slate-200">
            <th className="px-5 py-3 font-medium">Invoice #</th>
            <th className="px-3 py-3 font-medium">Vendor</th>
            <th className="px-3 py-3 font-medium">Amount</th>

            {!compact && (
              <th className="px-3 py-3 font-medium">GST</th>
            )}

            <th className="px-3 py-3 font-medium">Date</th>
            <th className="px-3 py-3 font-medium">PO</th>
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-3 py-3 font-medium">Confidence</th>
            <th className="px-5 py-3 font-medium text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((inv) => (
            <tr
              key={inv.id}
              className="border-b border-slate-100 hover:bg-slate-50"
            >
              <td className="px-5 py-3 font-medium text-slate-800">
                {inv.id}
              </td>

              <td className="px-3 py-3">
                {inv.vendor}
              </td>

              <td className="px-3 py-3">
                {inr(inv.amount)}
              </td>

              {!compact && (
                <td className="px-3 py-3 text-slate-500">
                  {inr(inv.gst)}
                </td>
              )}

              <td className="px-3 py-3 text-slate-500">
                {inv.date}
              </td>

              <td className="px-3 py-3 text-slate-500">
                {inv.po}
              </td>

              <td className="px-3 py-3">
                <StatusBadge s={inv.status} />
              </td>

              <td className="px-3 py-3">
                <ConfBar v={inv.conf} />
              </td>

              <td className="px-5 py-3 text-right">
                <button
                  onClick={() => onOpen(inv)}
                  className="text-indigo-600 hover:text-indigo-800 text-xs font-medium"
                >
                  Review →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
