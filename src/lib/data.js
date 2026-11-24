export const profile = {
  name: "Shayan Malik",
  email: "shayaaanmalik@gmail.com",
  whatsapp: "https://wa.me/923442614050",
  linkedin: "https://linkedin.com/in/shayan-malik-43a93139b",
  github: "https://github.com/shayan-malik",
  location: "Karachi, Pakistan",
};

// image: apne screenshot /public/projects/ me rakh ke yahan path do, e.g. "/projects/avenzo.png"
// Khali chhodoge to temporary auto-screenshot dikhega.
export const projects = [
  {
    title: "Avenzo",
    type: "Full-Stack E-Commerce",
    description:
      "A complete online store with search, cart, checkout, orders and an admin panel. Secure JWT auth with httpOnly cookies, Google sign-in and role-based access.",
    tags: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "JWT", "Google OAuth"],
    live: "https://avenzo-plum.vercel.app",
    links: [
      // TODO: dono repo ke asli links daalo
      { label: "Frontend", url: "https://github.com/shayan-malik" },
      { label: "Backend", url: "https://github.com/shayan-malik" },
    ],
    image: "/projects/avenzo.png",
    dark: false,
  },
  {
    title: "HCM Lite",
    type: "AI-Assisted HR System",
    description:
      "Role-based system for Admin, HR and Employees covering attendance, leave, payroll and PDF payslips. Includes an AI assistant for leave and policy questions, with server-side role checks and rate limits.",
    tags: ["React.js", "Node.js", "Express.js", "PostgreSQL", "JWT", "LLM API"],
    live: "https://hcm-lite-j1rp.vercel.app",
    links: [{ label: "GitHub", url: "https://github.com/shayan-malik/hcm-lite" }],
    image: "projects/hcm-lite.png",
    dark: false,
  },
  {
    title: "SMX Creators",
    type: "Agency Website",
    description:
      "A responsive, dark-themed agency website with dynamic pages for 11 services, SEO-friendly metadata and a contact form that delivers messages by email using Resend.",
    tags: ["Next.js", "Tailwind CSS", "Resend", "SEO"],
    live: "https://smxcreators.com",
    links: [],
    image: "projects/smx-creators.png",
    dark: true,
  },
  {
    // TODO: description aur tags apne project ke hisaab se edit karo
    title: "Travel Agency",
    type: "Travel Website",
    description:
      "A modern, responsive travel agency website designed to showcase destinations and make it easy for visitors to explore and get in touch.",
    tags: ["Frontend", "Responsive UI"],
    live: "https://travel-agency-bice-nu.vercel.app",
    links: [],
    image: "projects/travel-agency.png",
    dark: false,
  },
  {
    title: "Social App",
    type: "Facebook-Style Network",
    description:
      "A social app with Google sign-in where users can post photos, like and comment. Owners can delete only their own posts, enforced through Firestore rules.",
    tags: ["React.js", "Firebase Auth", "Cloud Firestore", "Firebase Hosting"],
    live: "https://login-user-2b797.web.app",
    links: [],
    image: "projects/social-app.png",
    dark: false,
  },
];

export const skills = [
  { title: "Frontend", items: ["React.js", "Next.js", "Vite", "Tailwind CSS", "React Router", "TanStack Query", "Recharts", "SEO"] },
  { title: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT", "Google OAuth", "bcrypt", "RBAC"] },
  { title: "Database", items: ["PostgreSQL", "MongoDB", "SQL Transactions", "Firebase Firestore"] },
  { title: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "SQL"] },
  { title: "Tools", items: ["Git", "GitHub", "Vercel", "Neon", "Firebase", "Cloudinary", "Resend", "Axios", "Postman", "VS Code"] },
];

export const marquee = [
  "React.js", "Next.js", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS",
  "JWT", "Google OAuth", "Firebase", "MongoDB", "Vercel", "REST APIs",
];