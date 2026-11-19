import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const facts = [
  { k: "Currently", v: "MERN Stack Development at SMIT" },
  { k: "Certification", v: "Cisco: JavaScript Essentials 1" },
  { k: "Education", v: "Intermediate, Jinnah Government College" },
  { k: "Languages", v: "English, Urdu" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-14 md:py-20">
      <SectionHead num="01 — About" title="About me" />
      <div className="grid md:grid-cols-12 gap-12 mt-8">
        <Reveal className="md:col-span-4">
          {/* Photo lagani ho to /public/me.jpg rakho aur is div ko <img src="/me.jpg" className="h-full w-full object-cover rounded-2xl" /> se replace karo */}
          {/* <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] flex items-center justify-center">
            <div className="spin-slow absolute inset-10 rounded-full border border-dashed border-[var(--accent)]" />
            <span className="font-display text-8xl text-[var(--accent)]">SM</span>
          </div> */}
          <img src="/me.png" className="h-full w-full object-cover rounded-2xl" />
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-8 flex flex-col justify-center">
          <p className="font-display text-3xl md:text-4xl leading-[1.15]">
            I&apos;m a front-end developer from Karachi who likes owning a feature
            from the interface all the way down to the database.
          </p>
          <p className="mt-6 text-[var(--muted)] leading-relaxed max-w-2xl">
            I work with React.js and Next.js on the front and Node.js, Express and
            PostgreSQL on the back. I&apos;ve built and deployed 5 projects, including
            an e-commerce store, an agency website and an AI-assisted HR system. I care
            about clean UI, secure authentication and code that is easy to maintain.
          </p>
          <ul className="mt-8 grid sm:grid-cols-2 gap-3 text-sm">
            {facts.map((f) => (
              <li
                key={f.k}
                className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-4 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]"
              >
                <span className="font-tag text-xs text-[var(--accent)] block mb-1">{f.k}</span>
                {f.v}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}