import Clock from "./Clock";

export default function Footer() {
  return (
    <footer className="bg-[var(--dark)] text-[var(--muted)] border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-6 flex flex-wrap justify-between gap-2 font-tag text-xs">
        <span>© {new Date().getFullYear()} Shayan Malik</span>
        <span>Karachi · <Clock /></span>
      </div>
    </footer>
  );
}