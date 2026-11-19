"use client";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function SectionHead({ num, title }) {
  return (
    <div className="mb-4">
      <div className="flex items-end justify-between pb-4">
        <div className="overflow-hidden py-1">
          <motion.h2
            className="font-display text-4xl md:text-6xl"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            {title}
          </motion.h2>
        </div>
        <motion.span
          className="font-tag text-sm text-[var(--accent)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {num}
        </motion.span>
      </div>
      <motion.div
        className="h-px bg-[var(--line)] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
      />
    </div>
  );
}