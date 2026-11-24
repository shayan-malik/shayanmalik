"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { profile } from "@/lib/data";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-[var(--line)] bg-[var(--card)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)] transition-colors";

  return (
    <section id="contact" className="bg-[var(--dark)] text-[var(--on-dark)]">
      <div className="mx-auto max-w-6xl px-6 section-y">
        <SectionHead num="05 — Contact" title="Contact" />

        <div className="grid md:grid-cols-2 gap-14">
          <Reveal>
            <h3 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[1.02]">
              Let&apos;s build something{" "}
              <span className="text-[var(--accent)]">together.</span>
            </h3>
            <ul className="mt-10 space-y-3 text-sm">
              <li>
                <a
                  className="link-underline break-all hover:text-[var(--accent)]"
                  href={`mailto:${profile.email}`}
                >
                  ✉ {profile.email}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--accent)]"
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  ☎ WhatsApp
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--accent)]"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  in LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--accent)]"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  ⌘ GitHub
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="space-y-4 text-[var(--ink)]">
              <input
                name="name"
                required
                placeholder="Your name"
                className={field}
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Your email"
                className={field}
              />
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project"
                className={field}
              />
              <button
                disabled={status === "sending"}
                className="rounded-full bg-[var(--accent)] text-white px-8 py-3.5 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition"
              >
                {status === "sending" ? "Sending..." : "Send message →"}
              </button>
              {status === "success" && (
                <p className="text-green-400 text-sm">
                  Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm">
                  Something went wrong. Please email me directly.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
