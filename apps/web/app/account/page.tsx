"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, User } from "lucide-react"
import { SiteHeader } from "@/components/storefront/storefront"
import { supabase } from "@/lib/supabase"

type Mode = "sign-in" | "sign-up"

export default function AccountPage() {
  const [mode, setMode] = useState<Mode>("sign-up")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ kind: "error" | "ok"; text: string } | null>(null)
  const [session, setSession] = useState<{ email: string; name: string } | null | undefined>(undefined)

  useEffect(() => {
    const resolve = (s: any) =>
      setSession(s ? { email: s.user.email ?? "", name: s.user.user_metadata?.full_name ?? "" } : null)
    supabase.auth.getSession().then(({ data }) => resolve(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => resolve(s))
    return () => listener.subscription.unsubscribe()
  }, [])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setMessage(null)
    if (mode === "sign-up") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      })
      if (error) setMessage({ kind: "error", text: error.message })
      else setMessage({ kind: "ok", text: "Account created. If email confirmation is enabled, check your inbox — otherwise you're signed in and ready to shop." })
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage({ kind: "error", text: error.message })
    }
    setBusy(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <>
      <SiteHeader />
      <main className="search-page">
        <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Your account</span></div>

        {session === undefined ? (
          <>
            <p className="eyebrow">LOADING</p>
            <h1>One moment<em>.</em></h1>
          </>
        ) : session ? (
          <>
            <p className="eyebrow">YOUR ACCOUNT</p>
            <h1>Hello{session.name ? `, ${session.name.split(" ")[0]}` : ""}<em>.</em></h1>
            <div className="wishlist-empty" style={{ textAlign: "left", alignItems: "flex-start" }}>
              <User />
              <h2>{session.name || "Leano customer"}</h2>
              <p>{session.email}</p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link className="button button-dark" href="/wishlist">Your wishlist <ArrowRight /></Link>
                <button className="button button-quiet" onClick={signOut}>Sign out</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="eyebrow">{mode === "sign-up" ? "JOIN LEANO" : "WELCOME BACK"}</p>
            <h1>{mode === "sign-up" ? <>Create your <em>account.</em></> : <>Sign <em>in.</em></>}</h1>

            <div className="category-tabs" role="tablist" style={{ marginTop: "1.5rem" }}>
              <button role="tab" aria-selected={mode === "sign-up"} className={mode === "sign-up" ? "active" : ""} onClick={() => { setMode("sign-up"); setMessage(null) }}>Create account</button>
              <button role="tab" aria-selected={mode === "sign-in"} className={mode === "sign-in" ? "active" : ""} onClick={() => { setMode("sign-in"); setMessage(null) }}>Sign in</button>
            </div>

            <form onSubmit={submit} style={{ maxWidth: "26rem", marginTop: "1.5rem", display: "grid", gap: "1rem" }}>
              {mode === "sign-up" && (
                <label style={{ display: "grid", gap: "0.35rem" }}>
                  <span>Your name</span>
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Natasha Mokoena" style={{ padding: "0.8rem 1rem", border: "1px solid currentColor", background: "transparent" }} />
                </label>
              )}
              <label style={{ display: "grid", gap: "0.35rem" }}>
                <span>Email address</span>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={{ padding: "0.8rem 1rem", border: "1px solid currentColor", background: "transparent" }} />
              </label>
              <label style={{ display: "grid", gap: "0.35rem" }}>
                <span>Password</span>
                <input required type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={mode === "sign-up" ? "At least 6 characters" : "Your password"} style={{ padding: "0.8rem 1rem", border: "1px solid currentColor", background: "transparent" }} />
              </label>

              {message && (
                <p style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: message.kind === "error" ? "#b75543" : "#476b57" }}>
                  {message.kind === "ok" && <Check size={16} />} {message.text}
                </p>
              )}

              <button className="button button-coral" disabled={busy} style={{ justifySelf: "start" }}>
                {busy ? "One moment…" : mode === "sign-up" ? <>Create account <ArrowRight /></> : <>Sign in <ArrowRight /></>}
              </button>
            </form>
          </>
        )}
      </main>
    </>
  )
}
