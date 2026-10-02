import { useState } from "react";
import { I } from "../components/icons";

export default function UploadModal({ onClose, onUpload }) {
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    vendor: "",
    invoiceNumber: "",
    poNumber: "",
    amount: "",
    gst: "0",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const inputClass =
    "w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
  const update = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));
  const submit = async (event) => {
    event.preventDefault();
    if (!file) return setError("Choose a PDF, PNG, or JPG invoice file.");
    setSaving(true);
    setError("");
    try {
      await onUpload(form, file);
    } catch (uploadError) {
      setError(uploadError.message);
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <p className="font-semibold">Upload Invoice</p>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        </div>
        <form className="p-6 space-y-4" onSubmit={submit}>
          <label className="block border-2 border-dashed border-slate-300 rounded-xl p-5 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/40">
            <span className="flex justify-center mb-2">{I.upload}</span>
            <span className="block text-sm font-medium">
              {file ? file.name : "Choose an invoice file"}
            </span>
            <span className="block text-xs text-slate-500 mt-1">
              PDF, PNG, or JPG · up to 10 MB
            </span>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
              required
              className="sr-only"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
            />
          </label>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-xs font-medium text-slate-600">
              Vendor
              <input
                required
                maxLength={160}
                value={form.vendor}
                onChange={(event) => update("vendor", event.target.value)}
                className={`${inputClass} mt-1`}
              />
            </label>
            <label className="text-xs font-medium text-slate-600">
              Invoice number
              <input
                required
                maxLength={80}
                value={form.invoiceNumber}
                onChange={(event) =>
                  update("invoiceNumber", event.target.value)
                }
                className={`${inputClass} mt-1`}
              />
            </label>
            <label className="text-xs font-medium text-slate-600">
              PO number
              <input
                maxLength={80}
                value={form.poNumber}
                onChange={(event) => update("poNumber", event.target.value)}
                className={`${inputClass} mt-1`}
              />
            </label>
            <label className="text-xs font-medium text-slate-600">
              Invoice total (INR)
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={(event) => update("amount", event.target.value)}
                className={`${inputClass} mt-1`}
              />
            </label>
            <label className="text-xs font-medium text-slate-600">
              GST / tax (INR)
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.gst}
                onChange={(event) => update("gst", event.target.value)}
                className={`${inputClass} mt-1`}
              />
            </label>
          </div>
          {error && (
            <p role="alert" className="text-sm text-rose-700">
              {error}
            </p>
          )}
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="border border-slate-300 px-4 py-2 rounded-lg text-sm"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
              disabled={saving}
            >
              {saving ? "Uploading..." : "Upload & review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}