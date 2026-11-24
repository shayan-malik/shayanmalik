"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionHead from "./SectionHead";

const ease = [0.22, 1, 0.36, 1];

const steps = [
  {
    label: "Problem",
    chip: "Inconsistent data",
    text: "At checkout, the order, the stock update and the cart clearing all had to happen together. If one step failed, customers could be charged for items that were out of stock, or keep a stale cart.",
  },
  {
    label: "Solution",
    chip: "SQL transaction",
    text: "I wrapped the whole flow in a single PostgreSQL transaction: create the order, reduce stock and clear the cart. If anything fails, everything rolls back.",
  },
  {
    label: "Result",
    chip: "All-or-nothing",
    text: "Checkout is atomic. The database never ends up half-updated, and stock stays consistent with orders.",
  },
];

const flow = ["Create order", "Reduce stock", "Clear cart"];

const meta = {
  idle: { label: "Waiting", cls: "border-white/10 text-white/50", dot: "bg-white/25" },
  run: { label: "Running…", cls: "border-[var(--accent)] text-white", dot: "bg-[var(--accent)] animate-pulse" },
  ok: { label: "Done", cls: "border-emerald-400/60 text-white", dot: "bg-emerald-400" },
  err: { label: "Failed", cls: "border-red-400/70 text-white", dot: "bg-red-400" },
  back: { label: "Rolled back", cls: "border-amber-400/60 text-white/60", dot: "bg-amber-400" },
};

// Simplified illustration of the idea
const code = [
  { t: "BEGIN;", k: true },
  { t: "  INSERT INTO orders ...;" },
  { t: "  UPDATE products SET stock = stock - qty ...;" },
  { t: "  DELETE FROM cart_items ...;" },
  { t: "COMMIT;", k: true, c: "  -- on any error: ROLLBACK;" },
];

function Simulator() {
  const [fail, setFail] = useState(false);
  const [st, setSt] = useState(["idle", "idle", "idle"]);
  const [msg, setMsg] = useState("Press run to simulate a checkout.");
  const [busy, setBusy] = useState(false);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const set = (i, v) => setSt((p) => p.map((x, k) => (k === i ? v : x)));

  function run() {
    if (busy) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setBusy(true);
    setSt(["idle", "idle", "idle"]);
    setMsg("BEGIN");
    set(0, "run");

    later(() => {
      set(0, "ok");
      set(1, "run");
    }, 700);

    later(() => {
      if (fail) {
        set(1, "err");
        setMsg("Error while updating stock → ROLLBACK");
      } else {
        set(1, "ok");
        set(2, "run");
      }
    }, 1400);

    later(() => {
      if (fail) {
        set(0, "back");
        setMsg("Rolled back. Nothing was saved.");
      } else {
        set(2, "ok");
        setMsg("COMMIT. All 3 steps saved together.");
      }
      setBusy(false);
    }, 2100);
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#141414] text-[#e9e4d8] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]">
      {/* title bar */}
      <div className="flex items-center gap-1.5 border-b border-white/10 px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-tag text-[11px] text-white/50">interactive demo</span>
      </div>

      <div className="p-5 md:p-6">
        {/* controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={fail}
            onClick={() => !busy && setFail(!fail)}
            className="flex items-center gap-3 text-sm text-white/70"
          >
            <span
              className={`relative h-6 w-11 rounded-full transition-colors ${
                fail ? "bg-red-500" : "bg-white/15"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                  fail ? "left-6" : "left-1"
                }`}
              />
            </span>
            Simulate failure
          </button>

          <button
            onClick={run}
            disabled={busy}
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {busy ? "Running…" : "Run checkout ▸"}
          </button>
        </div>

        {/* steps */}
        <ul className="mt-5 space-y-2.5">
          {flow.map((name, i) => {
            const m = meta[st[i]];
            return (
              <li
                key={name}
                className={`flex items-center justify-between rounded-2xl border bg-white/[0.03] px-4 py-3.5 transition-colors duration-300 ${m.cls}`}
              >
                <span className="flex items-center gap-3">
                  <span className="font-tag text-xs text-white/40">0{i + 1}</span>
                  <span className={`text-sm ${st[i] === "back" ? "line-through" : ""}`}>{name}</span>
                </span>
                <span className="flex items-center gap-2 font-tag text-[11px]">
                  <span className={`h-2 w-2 rounded-full ${m.dot}`} />
                  {m.label}
                </span>
              </li>
            );
          })}
        </ul>

        <p aria-live="polite" className="mt-4 min-h-[1.25rem] font-tag text-xs text-[var(--accent)]">
          &gt; {msg}
        </p>
      </div>

      {/* code */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="px-5 pt-3 font-tag text-[10px] uppercase tracking-[0.18em] text-white/40 md:px-6">
          checkout flow (illustrative example)
        </div>
        <pre className="overflow-x-auto px-5 pb-5 pt-2 font-tag text-xs leading-6 md:px-6">
          {code.map((l, i) => (
            <div key={i}>
              <span className={l.k ? "text-[var(--accent)]" : ""}>{l.t}</span>
              {l.c && <span className="text-white/35">{l.c}</span>}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

export default function CaseStudy() {
  const tl = useRef(null);
  const { scrollYProgress } = useScroll({ target: tl, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section id="case-study" className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--card)]">
      {/* soft background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[var(--accent)] opacity-10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6 section-y">
        <SectionHead num="04 — Case Study" title="Avenzo: Atomic Checkout" />

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* timeline */}
          <div className="min-w-0 lg:col-span-6">
            <div className="mb-8 flex flex-wrap items-center gap-2">
              {["PostgreSQL", "SQL Transactions", "Node.js", "Express.js"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--line)] bg-[var(--bg)] px-3 py-1 font-tag text-xs"
                >
                  {t}
                </span>
              ))}
              <a
                href="https://avenzo-plum.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="link-underline ml-1 text-sm text-[var(--accent)]"
              >
                View project ↗
              </a>
            </div>

            <div ref={tl} className="relative">
              <div className="absolute bottom-2 left-5 top-2 w-px -translate-x-1/2 bg-[var(--line)]">
                <motion.div style={{ scaleY: fill }} className="h-full w-full origin-top bg-[var(--accent)]" />
              </div>

              {steps.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.05, ease }}
                  className="relative pb-10 pl-16 last:pb-0"
                >
                  <motion.span
                    initial={{ scale: 0.6 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-[var(--accent)] bg-[var(--bg)] font-tag text-xs text-[var(--accent)]"
                  >
                    0{i + 1}
                  </motion.span>

                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-3xl">{s.label}</h3>
                    <span className="rounded-full bg-[var(--ink)] px-3 py-1 font-tag text-[11px] text-[var(--bg)]">
                      {s.chip}
                    </span>
                  </div>
                  <p className="mt-3 leading-relaxed text-[var(--muted)]">{s.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* simulator */}
          <motion.div
            className="min-w-0 lg:sticky lg:top-24 lg:col-span-6"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease }}
          >
            <Simulator />
          </motion.div>
        </div>
      </div>
    </section>
  );
}