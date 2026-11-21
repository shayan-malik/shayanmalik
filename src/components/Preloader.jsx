"use client";
import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { useSetReady } from "./LoaderContext";

const ease = [0.76, 0, 0.24, 1];
const READY_DELAY = 650; // ms: shutters khulne ke dauran website animations start hon
const WORDS = ["Design", "Develop", "Deploy", "Shayan Malik"];
const LINE = 1.2; // em, har word ki line height

export default function Preloader() {
  const setReady = useSetReady();
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | exit | gone

  const index = Math.min(WORDS.length - 1, Math.floor(count / (100 / WORDS.length)));

  // counter + real loading wait
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loaded = new Promise((res) => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", res, { once: true });
    });
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const resources = Promise.race([
      Promise.all([loaded, fonts]),
      new Promise((r) => setTimeout(r, 5000)), // safety cap
    ]);

    let cancelled = false;
    const controls = animate(0, 100, {
      duration: reduce ? 0.5 : 1.4,
      ease: "linear",
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: async () => {
        await resources;
        if (!cancelled) setTimeout(() => setPhase("exit"), 250);
      },
    });

    return () => {
      cancelled = true;
      controls.stop();
    };
  }, []);

  // scroll lock (scrollbar-gutter ki wajah se layout nahi hilta)
  useEffect(() => {
    if (phase !== "loading") return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    html.classList.add("is-loading");
    return () => {
      html.style.overflow = "";
      html.classList.remove("is-loading");
    };
  }, [phase]);

  // exit sequence
  useEffect(() => {
    if (phase !== "exit") return;
    const t1 = setTimeout(() => setReady(true), READY_DELAY);
    const t2 = setTimeout(() => setPhase("gone"), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase, setReady]);

  if (phase === "gone") return null;

  const exiting = phase === "exit";

  return (
    <div className="preloader fixed inset-0 z-[100]" aria-hidden="true">
      {/* shutters (thora overlap taake beech me line na dikhe) */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[51%] bg-[var(--dark)]"
        animate={{ y: exiting ? "-100%" : 0 }}
        transition={{ duration: 0.75, delay: exiting ? 0.35 : 0, ease }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[51%] bg-[var(--dark)]"
        animate={{ y: exiting ? "100%" : 0 }}
        transition={{ duration: 0.75, delay: exiting ? 0.35 : 0, ease }}
      />

      {/* accent line jo exit pe phailti hai */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 z-20 h-[2px] -translate-y-1/2 origin-center bg-[var(--accent)]"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={exiting ? { scaleX: 1, opacity: 0 } : { scaleX: 0, opacity: 1 }}
        transition={{
          scaleX: { duration: 0.4, ease },
          opacity: { delay: 0.4, duration: 0.25 },
        }}
      />

      {/* content */}
      <motion.div
        className="absolute inset-0 z-10 text-[var(--on-dark)]"
        animate={exiting ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            WebkitMaskImage: "radial-gradient(ellipse at center, #000 10%, transparent 70%)",
            maskImage: "radial-gradient(ellipse at center, #000 10%, transparent 70%)",
          }}
        />

        {/* glow */}
        <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="h-full w-full rounded-full bg-[var(--accent)] opacity-20 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* corners */}
        <div className="absolute inset-x-0 top-0 flex justify-between p-6 font-tag text-[11px] uppercase tracking-[0.2em] text-white/50 md:p-10">
          <span>Portfolio</span>
          <span>Karachi, PK</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 font-tag text-[11px] uppercase tracking-[0.2em] text-white/50 md:p-10">
          <span className="tabular-nums">{String(count).padStart(3, "0")}%</span>
          <span className="hidden sm:block">Front-End &amp; Full-Stack Developer</span>
        </div>

        {/* center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <motion.svg
            width="60"
            height="60"
            viewBox="0 0 32 32"
            fill="none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <rect width="32" height="32" rx="9" fill="#F6F2EA" />
            <motion.path
              d="M22 7.5H14A4.5 4.5 0 0 0 14 16.5H18A4.5 4.5 0 0 1 18 25.5H10"
              stroke="#1A1A1A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
            />
            <motion.circle
              cx="25.5"
              cy="25.5"
              r="1.8"
              fill="#E4572E"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 400, damping: 12 }}
            />
          </motion.svg>

          <span className="mt-8 font-tag text-[11px] uppercase tracking-[0.25em] text-white/40 tabular-nums">
            0{index + 1} / 0{WORDS.length}
          </span>

          {/* slot-machine word window */}
          <div
            className="mt-3 overflow-hidden font-display text-[clamp(2.5rem,9vw,6rem)]"
            style={{ height: `${LINE}em`, lineHeight: `${LINE}em` }}
          >
            <motion.div
              animate={{ y: `${(-index * 100) / WORDS.length}%` }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {WORDS.map((w) => (
                <div key={w} className="whitespace-nowrap text-center" style={{ height: `${LINE}em` }}>
                  {w}
                  <span className="text-[var(--accent)]">.</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* progress line */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
          <div
            className="h-full origin-left bg-[var(--accent)]"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
      </motion.div>
    </div>
  );
}