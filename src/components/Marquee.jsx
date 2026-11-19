import { marquee } from "@/lib/data";

function Row({ items, reverse = false, outline = false }) {
  const list = [...items, ...items];
  return (
    <div className="marquee overflow-hidden">
      <div className={`marquee-track flex ${reverse ? "reverse" : ""}`}>
        {list.map((t, i) => (
          <span
            key={i}
            className={`font-display text-3xl md:text-4xl whitespace-nowrap flex items-center gap-10 pr-10 ${
              outline ? "text-outline" : ""
            }`}
          >
            {t}
            <span className="text-[var(--accent)] text-xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="border-y border-[var(--line)] bg-[var(--card)] py-6 space-y-3">
      <Row items={marquee} />
      <Row items={[...marquee].reverse()} reverse outline />
    </div>
  );
}