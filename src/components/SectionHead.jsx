"use client";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function SectionHead({ num, title }) {
  return (
    <motion.div
      className="mb-8 md:mb-10"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      <div className="flex items-end justify-between gap-4 pb-4">
        <div className="overflow-hidden py-1">
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-6xl"
            variants={{
              hidden: { y: "110%" },
              show: { y: 0, transition: { duration: 0.8, ease } },
            }}
          >
            {title}
          </motion.h2>
        </div>
        <motion.span
          className="hidden shrink-0 font-tag text-sm text-[var(--accent)] sm:block"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { delay: 0.4 } },
          }}
        >
          {num}
        </motion.span>
      </div>
      <motion.div
        className="h-px origin-left bg-[var(--line)]"
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 1, ease } },
        }}
      />
    </motion.div>
  );
}