"use client";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Clock from "./Clock";
import Magnetic from "./Magnetic";
import CountUp from "./CountUp";
import { useReady } from "./LoaderContext";

const ease = [0.22, 1, 0.36, 1];
const roles = [
  "Front-End Developer",
  "Next.js Developer",
  "Full-Stack Builder",
];
const stats = [
  { n: 5, label: "Live projects" },
  { n: 3, label: "Databases used" },
  { n: 11, label: "Service pages built" },
];

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-flex h-[1.5em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          className="font-medium text-[var(--ink)]"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const ready = useReady();

  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left - 200);
    my.set(e.clientY - r.top - 200);
  }

  const lines = [
    <span key="1" className="text-[var(--muted)]">
      Hi, I&apos;m Shayan.
    </span>,
    <span key="2">
      I build fast{" "}
      <span className="whitespace-nowrap text-[var(--accent)]">front-ends</span>
    </span>,
    <span key="3">&amp; full-stack products.</span>,
  ];

  return (
    <section id="home" onMouseMove={onMove} className="relative overflow-hidden">
      {/* background layers */}
      <div aria-hidden className="dot-grid absolute inset-0" />
      <div
        aria-hidden
        className="blob pointer-events-none absolute -top-24 -right-32 h-[26rem] w-[26rem] rounded-full bg-[var(--accent)] opacity-20 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-[var(--accent)] opacity-10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-8 md:pt-12 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease }}
          className="flex flex-wrap items-center gap-3 font-tag text-xs text-[var(--muted)] mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Available for work
          </span>
          <span>
            Karachi, PK · <Clock />
          </span>
        </motion.div>

        <h1 className="font-display text-[clamp(2.2rem,7vw,5.75rem)] leading-[1.02]">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.12em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={ready ? { y: 0 } : undefined}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="mt-6 max-w-xl text-lg text-[var(--muted)] leading-relaxed"
        >
          I&apos;m a <RoleRotator /> from Karachi, working with React.js and
          Next.js, backed by Node.js, Express and PostgreSQL. I turn ideas into
          deployed, real-world apps.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.65, ease }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Magnetic>
            <a
              href="#work"
              className="inline-flex rounded-full bg-[var(--accent)] text-white px-7 py-3.5 text-sm font-medium shadow-[0_12px_30px_-12px_var(--accent)] hover:opacity-90 transition"
            >
              View Work ↓
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="/shayan-malik-cv.pdf"
              download
              className="inline-flex rounded-full border border-[var(--ink)] px-7 py-3.5 text-sm font-medium hover:bg-[var(--ink)] hover:text-[var(--bg)] transition"
            >
              Download CV
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-[var(--line)] pt-6"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-4xl md:text-5xl">
                <CountUp to={s.n} />
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-[var(--line)] pt-6 md:gap-6">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
