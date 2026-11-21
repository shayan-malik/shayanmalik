"use client";

export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";

    root.classList.add("theme-transition");
    if (next === "dark") root.dataset.theme = "dark";
    else root.removeAttribute("data-theme");

    try {
      localStorage.setItem("theme", next);
    } catch {}

    setTimeout(() => root.classList.remove("theme-transition"), 450);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark and light theme"
      title="Toggle theme"
      className="relative h-10 w-10 shrink-0 rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      {/* Sun */}
      <svg
        className="theme-icon theme-icon-sun"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      {/* Moon */}
      <svg
        className="theme-icon theme-icon-moon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}