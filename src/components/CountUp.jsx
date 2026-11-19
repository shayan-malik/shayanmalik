"use client";
import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { useReady } from "./LoaderContext";

export default function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const ready = useReady();

  useEffect(() => {
    if (!inView || !ready) return;
    const controls = animate(0, to, {
      duration: 1.6,
      delay: 0.9, // stats card ke fade-in ke saath match
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, ready, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}