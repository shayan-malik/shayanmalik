import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Tilt from "./Tilt";
import { projects } from "@/lib/data";

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-14 md:py-20">
      <SectionHead num="02 — Work" title="Selected Work" />

      {projects.map((p, i) => {
        const img = p.image || `https://image.thum.io/get/width/1200/crop/800/${p.live}`; // temporary screenshot
        const host = p.live.replace(/^https?:\/\//, "");

        return (
          <Reveal key={p.title} className="border-b border-[var(--line)] last:border-0">
            <article className="grid md:grid-cols-12 gap-8 md:gap-12 py-8 md:py-10">
              <div className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                <Tilt>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className={`group relative block overflow-hidden rounded-2xl border border-[var(--line)] shadow-[0_24px_50px_-28px_rgba(0,0,0,0.35)] ${
                      p.dark ? "bg-[#0d0d0d]" : "bg-white"
                    }`}
                  >
                    {/* browser bar */}
                    <div
                      className={`flex items-center gap-1.5 border-b px-4 py-3 ${
                        p.dark ? "border-white/10 bg-[#161616]" : "border-[var(--line)] bg-[var(--card)]"
                      }`}
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                      <span className="ml-3 truncate font-tag text-[11px] text-[var(--muted)]">{host}</span>
                    </div>

                    <div className="overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${p.title} screenshot`}
                        loading="lazy"
                        className="w-full aspect-[3/2] object-cover object-top transition duration-700 group-hover:scale-105"
                      />
                    </div>

                    <span className="absolute bottom-4 right-4 translate-y-3 rounded-full bg-[var(--ink)] px-4 py-2 text-xs text-[var(--bg)] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      View live ↗
                    </span>
                  </a>
                </Tilt>
              </div>

              <div className="md:col-span-5 flex flex-col justify-center">
                <span className="font-tag text-xs text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")} / {p.type}
                </span>
                <h3 className="font-display text-4xl md:text-5xl mt-2 mb-4">{p.title}</h3>
                <p className="text-[var(--muted)] leading-relaxed">{p.description}</p>

                <ul className="flex flex-wrap gap-2 mt-6">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="font-tag text-xs rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 mt-8 text-sm">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[var(--ink)] text-[var(--bg)] px-5 py-2.5 hover:bg-[var(--accent)] transition-colors"
                  >
                    Live ↗
                  </a>
                  {p.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[var(--ink)] px-5 py-2.5 hover:bg-[var(--ink)] hover:text-[var(--bg)] transition"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </section>
  );
}