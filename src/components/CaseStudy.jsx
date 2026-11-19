"use client";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const steps = [
  {
    label: "Problem",
    text: "At checkout, the order, the stock update and the cart clearing all had to happen together. If one step failed, customers could be charged for items that were out of stock, or keep a stale cart.",
  },
  {
    label: "Solution",
    text: "I wrapped the whole flow in a single PostgreSQL transaction: create the order, reduce stock and clear the cart. If anything fails, everything rolls back.",
  },
  {
    label: "Result",
    text: "Checkout is atomic. The database never ends up half-updated, and stock stays consistent with orders.",
  },
];

// Simplified illustration of the idea
const code = [
  { t: "BEGIN;", k: true },
  { t: "  INSERT INTO orders (user_id, total) VALUES ($1, $2);" },
  { t: "  UPDATE products SET stock = stock - $qty WHERE id = $id;" },
  { t: "  DELETE FROM cart_items WHERE user_id = $1;" },
  { t: "COMMIT;", k: true, c: "   -- any error → ROLLBACK;" },
];

export default function CaseStudy() {
  return (
    <section id="case-study" className="bg-[var(--card)] border-y border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <SectionHead num="04 — Case Study" title="Avenzo: Atomic Checkout" />

        <motion.div
          className="hidden md:block mt-8 h-px origin-left bg-[var(--accent)]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {steps.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12}>
              <div className="h-full rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-8 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]">
                <span className="font-tag text-xs text-[var(--accent)]">0{i + 1}</span>
                <h3 className="font-display text-3xl mt-2 mb-3">{s.label}</h3>
                <p className="text-[var(--muted)] leading-relaxed">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-6">
          <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[#141414] text-[#e9e4d8]">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-tag text-[11px] text-white/50">checkout flow (illustrative example)</span>
            </div>
            <pre className="overflow-x-auto p-6 font-tag text-xs md:text-sm leading-7">
              {code.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                >
                  <span className={l.k ? "text-[var(--accent)]" : ""}>{l.t}</span>
                  {l.c && <span className="text-white/40">{l.c}</span>}
                </motion.div>
              ))}
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}