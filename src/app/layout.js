import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LoaderProvider } from "@/components/LoaderContext";
import Preloader from "@/components/Preloader";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "Shayan Malik | Front-End & Full-Stack Developer",
  description:
    "Front-End Developer from Karachi building fast React & Next.js interfaces and full-stack products with Node.js, Express and PostgreSQL.",
  openGraph: {
    title: "Shayan Malik | Front-End & Full-Stack Developer",
    description: "React, Next.js, Node.js, PostgreSQL. Selected work and case studies.",
    type: "website",
  },
};

// Sirf tab dark lagta hai jab user ne khud dark choose kiya ho. Warna hamesha light.
const themeScript = `try{if(localStorage.getItem("theme")==="dark"){document.documentElement.setAttribute("data-theme","dark")}}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        <LoaderProvider>
          <Preloader />
          {children}
        </LoaderProvider>
      </body>
    </html>
  );
}