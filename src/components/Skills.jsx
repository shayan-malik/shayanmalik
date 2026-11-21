"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import { skills } from "@/lib/data";

const drivers = [
  { name: "React.js", role: "UI Library" },
  { name: "Next.js", role: "Framework" },
  { name: "Node.js", role: "Runtime" },
  { name: "PostgreSQL", role: "Database" },
];

const order = ["Frontend", "Languages", "Backend", "Database", "Tools"];
const spans = {
  Frontend: "md:col-span-4",
  Languages: "md:col-span-2",
  Backend: "md:col-span-3",
  Database: "md:col-span-3",
  Tools: "md:col-span-6",
};

const ease = [0.22, 1, 0.36, 1];

function Spot({ children, className = "" }) {
  const ref = useRef(null);
  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative h-full overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--line))] ${className}`}
    >
      {/* spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent) 16%, transparent), transparent 65%)",
        }}
      />
      {/* top accent line */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-[2px] w-0 bg-[var(--accent)] transition-all duration-500 group-hover:w-full"
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export default function Skills() {
  const cards = order
    .map((t) => skills.find((s) => s.title === t))
    .filter(Boolean);
  const total = skills.reduce((n, s) => n + s.items.length, 0);

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 section-t section-b">
      <SectionHead num="03 — Skills" title="Toolbox" />

      {/* Daily drivers */}
      <div className="mb-4 flex items-center justify-between font-tag text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
        <span>Daily drivers</span>
        <span>
          {total} tools · {skills.length} areas
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {drivers.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--dark)] p-5 text-[var(--on-dark)] md:p-6"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--accent)] transition-transform duration-500 ease-out group-hover:scale-y-100"
            />
            <div className="relative flex h-28 flex-col justify-between md:h-32">
              <span className="font-tag text-[11px] uppercase tracking-[0.18em] text-white/50 transition-colors group-hover:text-white/80">
                {String(i + 1).padStart(2, "0")} / {d.role}
              </span>
              <span className="font-display text-2xl leading-none md:text-3xl">
                {d.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Category bento */}
      <div className="mt-4 grid gap-3 md:grid-cols-6 md:gap-4">
        {cards.map((s, i) => (
          <motion.div
            key={s.title}
            className={spans[s.title]}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease }}
          >
            <Spot>
              <div className="relative p-6 md:p-8">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-[6rem] leading-none text-[var(--ink)] opacity-[0.05] md:text-[7.5rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative mb-6 flex items-center gap-3">
                  <h3 className="font-display text-2xl md:text-3xl">
                    {s.title}
                  </h3>
                  <span className="rounded-full border border-[var(--line)] bg-[var(--bg)] px-2.5 py-0.5 font-tag text-[11px] text-[var(--accent)]">
                    {String(s.items.length).padStart(2, "0")}
                  </span>
                </div>

                <ul className="relative flex flex-wrap gap-2">
                  {s.items.map((it, idx) => (
                    <motion.li
                      key={it}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.15 + idx * 0.035,
                        duration: 0.35,
                        ease,
                      }}
                      whileHover={{ y: -3 }}
                      className="cursor-default rounded-full border border-[var(--line)] bg-[var(--bg)] px-3.5 py-1.5 font-tag text-xs transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                    >
                      {it}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Spot>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
