import { useState } from "react";
import { motion } from "motion/react";
import { supabase } from "../lib/supabase";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const signIn = async () => {
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setBusy(false);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[#20372f] p-6 font-['DM_Sans']">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm border border-white/10 bg-[#f8f4ed] p-8 shadow-2xl">
        <span className="font-['Fraunces'] text-[30px] font-semibold leading-none tracking-[-.05em] text-[#20372f]">
          <i className="mr-0.5 text-[#ff674d]">l</i>leano
        </span>
        <p className="mt-1 font-['DM_Mono'] text-[7px] uppercase tracking-[.22em] text-[#20372f]/50">office · admin sign in</p>

        <label className="mt-8 block">
          <span className="font-['DM_Mono'] text-[7px] uppercase tracking-[.15em] text-[#20372f]/60">Email</span>
          <input
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && signIn()}
            className="mt-2 h-11 w-full border border-[#d8d2c6] bg-white px-3 text-[11px] outline-none focus:border-[#ff674d]"
          />
        </label>
        <label className="mt-4 block">
          <span className="font-['DM_Mono'] text-[7px] uppercase tracking-[.15em] text-[#20372f]/60">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && signIn()}
            className="mt-2 h-11 w-full border border-[#d8d2c6] bg-white px-3 text-[11px] outline-none focus:border-[#ff674d]"
          />
        </label>

        {error && <p className="mt-4 border border-[#d8a49a] bg-[#f6e3df] px-3 py-2 text-[9px] text-[#8a3a2a]">{error}</p>}

        <button
          onClick={signIn}
          disabled={busy || !email || !password}
          className="mt-6 h-11 w-full bg-[#20372f] text-[10px] font-semibold text-white transition hover:bg-[#ff674d] disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <p className="mt-4 text-center text-[8px] leading-4 text-[#20372f]/50">Only admin accounts can open the office.</p>
      </motion.div>
    </div>
  );
}

export function SetupScreen() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#20372f] p-6 font-['DM_Sans']">
      <div className="w-full max-w-md border border-white/10 bg-[#f8f4ed] p-8">
        <span className="font-['Fraunces'] text-[26px] font-semibold text-[#20372f]">
          <i className="mr-0.5 text-[#ff674d]">l</i>leano <span className="text-[15px] font-normal">office setup</span>
        </span>
        <p className="mt-4 text-[11px] leading-5 text-[#20372f]/70">
          Supabase isn't configured yet. Create <code className="bg-[#e8e2d6] px-1">apps/portal/.env</code> with:
        </p>
        <pre className="mt-3 overflow-x-auto border border-[#d8d2c6] bg-[#20372f] p-4 font-['DM_Mono'] text-[9px] leading-5 text-[#f8f4ed]">
{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key`}
        </pre>
        <p className="mt-4 text-[10px] leading-5 text-[#20372f]/70">
          Then restart the dev server. Run <code className="bg-[#e8e2d6] px-1">supabase/schema.sql</code> in your project's SQL editor first.
        </p>
      </div>
    </div>
  );
}
