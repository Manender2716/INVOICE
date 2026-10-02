import StatusBadge from "../components/StatusBadge";
import { vendors, inr } from "../data/mockData";

export default function VendorsPage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="px-5 py-3 font-medium">Vendor</th>
              <th className="px-3 py-3 font-medium">GSTIN</th>
              <th className="px-3 py-3 font-medium">Invoices</th>
              <th className="px-3 py-3 font-medium">Total amount</th>
              <th className="px-3 py-3 font-medium">Last invoice</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((vendor) => (
              <tr
                key={vendor.name}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <td className="px-5 py-3 font-medium">
                  {vendor.name}
                </td>

                <td className="px-3 py-3 text-slate-500">
                  {vendor.gstin}
                </td>

                <td className="px-3 py-3">
                  {vendor.count}
                </td>

                <td className="px-3 py-3">
                  {inr(vendor.total)}
                </td>

                <td className="px-3 py-3 text-slate-500">
                  {vendor.last}
                </td>

                <td className="px-5 py-3">
                  <StatusBadge s={vendor.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
