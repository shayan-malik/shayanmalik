"use client";
import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { useSetReady } from "./LoaderContext";

const ease = [0.76, 0, 0.24, 1];
const READY_DELAY = 450; // ms: curtain khulne ke kitni der baad website animations start hon
const NAME = "Shayan Malik".split("");

export default function Preloader() {
  const setReady = useSetReady();
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | exit | gone

  // counter + real loading wait
  useEffect(() => {
    window.scrollTo(0, 0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loaded = new Promise((res) => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", res, { once: true });
    });
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const resources = Promise.race([
      Promise.all([loaded, fonts]),
      new Promise((r) => setTimeout(r, 6000)), // safety cap
    ]);

    let cancelled = false;
    const controls = animate(0, 100, {
      duration: reduce ? 0.6 : 2.2,
      ease: [0.65, 0, 0.35, 1],
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

  // scroll lock
  useEffect(() => {
    if (phase === "gone") return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  // exit sequence
  useEffect(() => {
    if (phase !== "exit") return;
    const t1 = setTimeout(() => setReady(true), READY_DELAY);
    const t2 = setTimeout(() => setPhase("gone"), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase, setReady]);

  if (phase === "gone") return null;

  const exiting = phase === "exit";

  return (
    <div className="preloader fixed inset-0 z-[100]" aria-hidden="true">
      {/* back layer (accent) */}
      <motion.div
        className="absolute inset-0 bg-[var(--accent)]"
        animate={{ y: exiting ? "-100%" : 0 }}
        transition={{ duration: 0.9, delay: exiting ? 0.12 : 0, ease }}
      />

      {/* front layer (dark) */}
      <motion.div
        className="absolute inset-0 bg-[var(--ink)] text-[var(--bg)]"
        animate={{ y: exiting ? "-100%" : 0 }}
        transition={{ duration: 0.9, ease }}
      >
        <div className="relative flex h-full w-full flex-col justify-between p-6 md:p-10">
          {/* top row */}
          <div className="flex justify-between font-tag text-[11px] uppercase tracking-[0.2em] text-white/50">
            <span>Portfolio</span>
            <span>Karachi, PK</span>
          </div>

          {/* center */}
          <div className="flex flex-col items-center text-center">
            <motion.svg
              width="76"
              height="76"
              viewBox="0 0 32 32"
              fill="none"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
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
                transition={{ duration: 1.3, ease: "easeInOut", delay: 0.2 }}
              />
              <motion.circle
                cx="25.5"
                cy="25.5"
                r="1.8"
                fill="#E4572E"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3, type: "spring", stiffness: 400, damping: 12 }}
              />
            </motion.svg>

            <div className="mt-8 flex overflow-hidden pb-1 font-display text-4xl md:text-6xl">
              {NAME.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-3 font-tag text-[11px] uppercase tracking-[0.25em] text-white/50"
            >
              Front-End &amp; Full-Stack Developer
            </motion.p>
          </div>

          {/* bottom row */}
          <div className="flex items-end justify-between">
            <span className="font-display text-7xl md:text-9xl leading-none tabular-nums">
              {String(count).padStart(2, "0")}
            </span>
            <span className="mb-2 font-tag text-[11px] uppercase tracking-[0.2em] text-white/50">
              Loading experience
            </span>
          </div>

          {/* progress line */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
            <div
              className="h-full origin-left bg-[var(--accent)]"
              style={{ transform: `scaleX(${count / 100})` }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}