"use client";
import { motion } from "framer-motion";
import { useReady } from "./LoaderContext";

export default function Logo({ size = 38, showText = true }) {
    const ready = useReady();
  return (
    <span className="inline-flex items-center gap-3">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        whileHover={{ rotate: -8, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <rect width="32" height="32" rx="9" style={{ fill: "var(--ink)" }} />
        <motion.path
          d="M22 7.5H14A4.5 4.5 0 0 0 14 16.5H18A4.5 4.5 0 0 1 18 25.5H10"
          style={{ stroke: "var(--bg)" }}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: ready ? 1 : 0 }}
          transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.circle
          cx="25.5"
          cy="25.5"
          r="1.8"
          style={{ fill: "var(--accent)", transformBox: "fill-box", transformOrigin: "center" }}
          initial={{ scale: 0 }}
          animate={{ scale: ready ? 1 : 0 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 400, damping: 12 }}
        />
      </motion.svg>

      {showText && (
        <span className="leading-none">
          <span className="block font-display text-[17px]">Shayan Malik</span>
          <span className="block font-tag text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] mt-1.5">
            Front-End Dev
          </span>
        </span>
      )}
    </span>
  );
}