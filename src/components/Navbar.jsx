"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";
import { useReady } from "./LoaderContext";
import { profile } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1];

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

  // menu khula ho to scroll lock + Escape se band
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // desktop size par jaate hi menu band
  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // mobile menu link: pehle menu band + scroll unlock, phir smooth scroll
  function goTo(e, id) {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.7, ease }}
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          open
            ? "bg-[var(--bg)] border-[var(--line)]"
            : scrolled
            ? "bg-[var(--bg)]/90 backdrop-blur-md border-[var(--line)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 md:h-[72px]">
          <a href="#" aria-label="Home" className="min-w-0 shrink" onClick={() => setOpen(false)}>
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
              aria-controls="mobile-menu"
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
      </motion.header>

      {/* Full-screen mobile menu (header ke bahar) */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[var(--bg)] px-6 pb-8 pt-24 md:hidden"
          >
            {/* soft glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-[var(--accent)] opacity-15 blur-3xl"
            />

            <ul className="relative">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => goTo(e, l.id)}
                    className="flex items-baseline gap-4 border-b border-[var(--line)] py-4"
                  >
                    <span className="font-tag text-xs text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-4xl transition-colors ${
                        active === l.id ? "text-[var(--accent)]" : ""
                      }`}
                    >
                      {l.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5, ease }}
              className="relative mt-auto pt-10"
            >
              <a
                href="#contact"
                onClick={(e) => goTo(e, "contact")}
                className="block rounded-full bg-[var(--accent)] py-3.5 text-center text-sm font-medium text-white"
              >
                Hire me
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="mt-6 block break-all font-tag text-xs text-[var(--muted)]"
              >
                {profile.email}
              </a>

              <div className="mt-3 flex gap-5 font-tag text-xs uppercase tracking-wider">
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                <a href={profile.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}