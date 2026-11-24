"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";
import { useReady } from "./LoaderContext";

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

  // desktop size par jaate hi mobile menu band
  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "bg-[var(--bg)]/90 backdrop-blur-md border-[var(--line)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 md:h-[72px]">
        <a href="#" aria-label="Home" className="min-w-0 shrink">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--card)]/70 p-1 text-sm md:flex">
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

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {/* Hire me: sirf sm+ screens par. Mobile par menu ke andar hai */}
          <div className="hidden sm:block">
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                className="block rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm text-white transition hover:opacity-90"
              >
                Hire me
              </a>
            </Magnetic>
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative h-10 w-10 shrink-0 rounded-full border border-[var(--line)] bg-[var(--card)] md:hidden"
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
            className="overflow-hidden border-t border-[var(--line)] md:hidden"
          >
            <ul className="px-4 py-3 sm:px-6">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block border-b border-[var(--line)] py-3.5 font-display text-2xl"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pb-2 pt-4">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-[var(--accent)] py-3 text-center text-sm font-medium text-white"
                >
                  Hire me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}