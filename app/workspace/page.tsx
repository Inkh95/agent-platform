"use client";

import { useState } from "react";
import Link from "next/link";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "Summarize my upcoming tasks",
  "Help draft a client follow-up",
  "Plan my workday",
  "Organize my project priorities",
];

export default function Workspace() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy || content.length > 4000) return;
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next);
    setDraft("");
    setBusy(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-20) }),
      });
      const data = await response.json();
      setMessages([...next, { role: "assistant", content: response.ok ? data.reply : (data.error || "Chat is unavailable.") }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Connection failed. Please try again later." }]);
    } finally {
      setBusy(false);
    }
  }

  return <main style={{ maxWidth: 850, margin: "0 auto", padding: "24px 18px 110px", minHeight: "100vh", boxSizing: "border-box" }}>
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
      <Link href="/" style={{ color: "#70f0b3", textDecoration: "none", fontWeight: 700 }}>AGENT PLATFORM</Link>
      <span style={{ color: "#b0c5ba", fontSize: 12 }}>EARLY PREVIEW</span>
    </header>
    <h1 style={{ fontSize: "clamp(30px, 6vw, 48px)", marginTop: 64 }}>What can I help you accomplish?</h1>
    <p style={{ color: "#a9bdb2" }}>A workspace preview. AI execution and connected actions are not yet enabled.</p>
    {messages.length === 0 && <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 12, marginTop: 36 }}>
      {suggestions.map(item => <button key={item} onClick={() => setDraft(item)} style={{ textAlign: "left", background: "#12241c", border: "1px solid #315342", color: "#e4fff0", borderRadius: 14, padding: 20, cursor: "pointer" }}>{item}</button>)}
    </div>}
    <section aria-label="Conversation" aria-live="polite" style={{ display: "grid", gap: 14, marginTop: 30 }}>
      {messages.map((message, index) => <div key={index} style={{ padding: 18, borderRadius: 14, background: message.role === "user" ? "#173c2b" : "#14221b", marginLeft: message.role === "user" ? 45 : 0, marginRight: message.role === "assistant" ? 45 : 0, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{message.content}</div>)}
    </section>
    <form onSubmit={event => { event.preventDefault(); void send(draft); }} style={{ display: "flex", gap: 10, marginTop: 32 }}>
      <input aria-label="Your message" maxLength={4000} value={draft} onChange={event => setDraft(event.target.value)} placeholder="Ask your assistant..." style={{ flex: 1, minWidth: 0, borderRadius: 12, padding: 16, border: "1px solid #42624f", background: "#112219", color: "white" }} />
      <button disabled={busy || !draft.trim()} type="submit" style={{ background: "#6ae5a6", color: "#062016", border: 0, borderRadius: 12, padding: "0 20px", fontWeight: 700, cursor: "pointer" }}>{busy ? "..." : "Send"}</button>
    </form>
  </main>;
}
