import { useState } from "react";
import { I } from "../components/icons";

export default function LoginPage({ onSignIn, onBack, initialMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  const [mode, setMode] = useState(initialMode);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setNotice("");
    try {
      await onSignIn(email, password, mode);
    } catch (error) {
      setNotice(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
        <div className="flex items-center gap-2 font-bold text-lg">
          {I.logo}LedgerAI
        </div>
        <button
          onClick={onBack}
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          Back to home
        </button>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <section className="w-full max-w-md">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <p className="text-xs font-medium uppercase text-indigo-700">
              Buyer and supplier workspace
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 mt-2">
              {mode === "register" ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              {mode === "register"
                ? "Create an account to manage and review invoices."
                : "Sign in to review invoices and track their status."}
            </p>
            <form className="mt-6 space-y-4" onSubmit={submit}>
              <label className="block text-sm font-medium text-slate-700">
                Work email
                <input
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  className="mt-1.5 w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Password
                <div className="relative mt-1.5">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      mode === "register" ? "new-password" : "current-password"
                    }
                    minLength={mode === "register" ? 10 : undefined}
                    maxLength={256}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={
                      mode === "register"
                        ? "At least 10 characters"
                        : "Enter your password"
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 pr-16 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute inset-y-0 right-3 text-xs font-medium text-slate-500 hover:text-slate-800"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </label>
              {notice && (
                <p role="alert" className="text-sm text-rose-700">
                  {notice}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-slate-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-slate-800 disabled:opacity-60"
              >
                {submitting
                  ? "Please wait..."
                  : mode === "register"
                    ? "Create account"
                    : "Sign in"}
              </button>
            </form>
            <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">
              Accounts are stored in the local database. Passwords are stored as
              salted hashes.
            </p>
          </div>
          <p className="text-center text-sm text-slate-500 mt-5">
            {mode === "register"
              ? "Already have an account?"
              : "New to LedgerAI?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "register" ? "login" : "register");
                setNotice("");
              }}
              className="font-medium text-indigo-700 hover:text-indigo-900"
            >
              {mode === "register" ? "Sign in" : "Create an account"}
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}