"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import Magnetic from "./Magnetic";
import { useReady } from "./LoaderContext";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "case-study", label: "Case Study" },
];

export default function Navbar() {
  const ready = useReady();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      if (window.scrollY < 300) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    [...links.map((l) => l.id), "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "bg-[var(--bg)]/85 backdrop-blur-md border-[var(--line)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 h-[72px] flex items-center justify-between">
        <a href="#" aria-label="Home">
          <Logo />
        </a>

        <ul className="hidden md:flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--card)]/70 p-1 text-sm">
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="relative block rounded-full px-4 py-1.5">
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[var(--ink)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    active === l.id
                      ? "text-[var(--bg)]"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {l.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
           <ThemeToggle />
          <Magnetic strength={0.25}>
            <a
              href="#contact"
              className="block text-sm rounded-full bg-[var(--accent)] text-white px-5 py-2.5 hover:opacity-90 transition"
            >
              Hire me
            </a>
          </Magnetic>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden relative h-10 w-10 rounded-full border border-[var(--line)] bg-[var(--card)]"
          >
            <span
              className={`absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 bg-[var(--ink)] transition-transform duration-300 ${
                open ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 bg-[var(--ink)] transition-transform duration-300 ${
                open ? "-rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-[var(--line)]"
          >
            <ul className="px-6 py-4">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-3xl border-b border-[var(--line)] last:border-0"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}