"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHead from "./SectionHead";

const ease = [0.22, 1, 0.36, 1];
const dv = (name) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;

// i = logo url (nahi ho ya load na ho to letter tile dikhta hai), mono = black logo
const layers = [
  {
    key: "core",
    label: "Core",
    tag: "Languages",
    desc: "The foundation everything else is built on.",
    items: [
      { n: "HTML5", i: dv("html5") },
      { n: "CSS3", i: dv("css3") },
      { n: "JavaScript (ES6+)", i: dv("javascript") },
      { n: "TypeScript", i: dv("typescript") },
      { n: "SQL" },
    ],
  },
  {
    key: "frontend",
    label: "Frontend",
    tag: "What users see",
    desc: "Fast, responsive interfaces with React and Next.js.",
    items: [
      { n: "React.js", i: dv("react") },
      { n: "Next.js", i: dv("nextjs"), mono: true },
      { n: "Tailwind CSS", i: dv("tailwindcss") },
      { n: "Vite", i: dv("vitejs") },
      { n: "React Router" },
      { n: "TanStack Query" },
      { n: "Recharts" },
      { n: "SEO" },
    ],
  },
  {
    key: "backend",
    label: "Backend",
    tag: "API layer",
    desc: "Secure REST APIs with authentication and role-based access.",
    items: [
      { n: "Node.js", i: dv("nodejs") },
      { n: "Express.js", i: dv("express"), mono: true },
      { n: "REST APIs" },
      { n: "JWT" },
      { n: "Google OAuth", i: dv("google") },
      { n: "bcrypt" },
      { n: "RBAC" },
    ],
  },
  {
    key: "database",
    label: "Database",
    tag: "Data layer",
    desc: "Relational and NoSQL storage, with transactions where it matters.",
    items: [
      { n: "PostgreSQL", i: dv("postgresql") },
      { n: "MongoDB", i: dv("mongodb") },
      { n: "SQL Transactions" },
      { n: "Firebase Firestore", i: dv("firebase") },
    ],
  },
];

const tools = [
  { n: "Git", i: dv("git") },
  { n: "GitHub", i: dv("github"), mono: true },
  { n: "Vercel", i: dv("vercel"), mono: true },
  { n: "Neon" },
  { n: "Firebase", i: dv("firebase") },
  { n: "Cloudinary" },
  { n: "Resend" },
  { n: "Axios" },
  { n: "Postman", i: dv("postman") },
  { n: "VS Code", i: dv("vscode") },
];

function Logo({ item, size = 28 }) {
  const [failed, setFailed] = useState(false);

  if (!item.i || failed) {
    return (
      <span
        className="grid shrink-0 place-items-center rounded-lg border border-[var(--line)] bg-[var(--bg)] font-tag text-[var(--accent)]"
        style={{ width: size, height: size, fontSize: size * 0.42 }}
      >
        {item.n[0]}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.i}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`shrink-0 ${item.mono ? "logo-mono" : ""}`}
      style={{ width: size, height: size }}
    />
  );
}

function Connector() {
  return (
    <div
      aria-hidden
      className="relative mx-auto h-5 w-px shrink-0 bg-[var(--line)] md:mx-0 md:h-px md:w-10 md:self-center"
    >
      <span className="flow-dot" />
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(1);
  const layer = layers[active];
  const total = layers.reduce((n, l) => n + l.items.length, 0) + tools.length;

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 section-t section-b">
      <SectionHead num="03 — Skills" title="Toolbox" />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 font-tag text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
        <span>How a request travels through my stack</span>
        <span>{total} tools</span>
      </div>

      {/* Flow */}
      <div className="flex flex-col md:flex-row md:items-stretch">
        {layers.map((l, i) => {
          const on = i === active;
          const logos = l.items.filter((x) => x.i).slice(0, 3);
          return (
            <div key={l.key} className="contents">
              <motion.button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={on}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                whileHover={{ y: -4 }}
                className={`relative flex-1 rounded-3xl border p-4 md:p-5 text-left transition-colors duration-300 ${
                  on
                    ? "border-[var(--accent)] bg-[var(--card)] shadow-[0_20px_40px_-24px_var(--accent)]"
                    : "border-[var(--line)] bg-[var(--card)]/60 hover:border-[var(--accent)]"
                }`}
              >
                <div className="flex items-center justify-between font-tag text-[11px] uppercase tracking-[0.18em]">
                  <span
                    className={
                      on ? "text-[var(--accent)]" : "text-[var(--muted)]"
                    }
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[var(--muted)]">
                    {l.items.length} tools
                  </span>
                </div>

                <div className="mt-4 md:mt-6 flex h-8 items-center">
                  {logos.length ? (
                    logos.map((it, k) => (
                      <span
                        key={it.n}
                        className="-ml-2 first:ml-0 grid h-8 w-8 place-items-center rounded-full border border-[var(--line)] bg-[var(--bg)]"
                      >
                        <Logo item={it} size={18} />
                      </span>
                    ))
                  ) : (
                    <span className="font-tag text-xs text-[var(--muted)]">
                      {"</>"}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 md:mt-4 font-display text-2xl md:text-3xl">
                  {l.label}
                </h3>
                <p className="mt-1 font-tag text-[11px] uppercase tracking-wider text-[var(--muted)]">
                  {l.tag}
                </p>

                {on && (
                  <motion.span
                    layoutId="skill-underline"
                    className="absolute inset-x-5 bottom-0 h-[2px] rounded-full bg-[var(--accent)]"
                  />
                )}
              </motion.button>

              {i < layers.length - 1 && <Connector />}
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="mt-4 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)]">
        <div className="h-[2px] w-full bg-[var(--line)]">
          <motion.div
            key={layer.key}
            className="min-w-0 p-4 sm:p-5 md:p-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={layer.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
            className="p-5 md:p-8"
          >
            <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
              <h4 className="font-display text-3xl md:text-4xl">
                {layer.label}
                <span className="text-[var(--accent)]">.</span>
              </h4>
              <p className="max-w-md text-sm text-[var(--muted)]">
                {layer.desc}
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
              {layer.items.map((it, i) => (
                <motion.li
                  key={it.n}
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.35, ease }}
                  whileHover={{ y: -4 }}
                  className="flex min-w-0 cursor-default flex-col items-start gap-2 rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-3 transition-colors hover:border-[var(--accent)] sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-3.5"
                >
                  <Logo item={it} size={28} />
                  <span className="min-w-0 text-[13px] leading-tight [overflow-wrap:anywhere] sm:text-sm">
                    {it.n}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tools strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease }}
        className="mt-4 flex flex-col gap-4 rounded-3xl border border-[var(--line)] bg-[var(--card)] p-5 md:flex-row md:items-center md:p-6"
      >
        <span className="shrink-0 font-tag text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
          Tools &amp; platforms
        </span>
        <ul className="flex flex-wrap gap-2">
          {tools.map((t) => (
            <li
              key={t.n}
              className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--bg)] py-1.5 pl-2 pr-3.5 font-tag text-xs transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Logo item={t} size={18} />
              {t.n}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
