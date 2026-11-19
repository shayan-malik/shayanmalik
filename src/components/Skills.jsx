"use client";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHead num="03 — Skills" title="Toolbox" />
      <div className="grid md:grid-cols-3 gap-4 mt-10">
        {skills.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.07} className={i === 0 ? "md:col-span-2" : ""}>
            <div className="h-full rounded-2xl border border-[var(--line)] bg-[var(--card)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]">
              <h3 className="font-display text-3xl mb-5">{s.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((it, idx) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + idx * 0.03, duration: 0.4 }}
                    className="font-tag text-xs rounded-full border border-[var(--line)] bg-[var(--bg)] px-3 py-1.5 cursor-default transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {it}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}