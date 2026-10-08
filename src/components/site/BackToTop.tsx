"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";

/** Motion: appears after the first screen; the ring around it fills as you read down the page. */
export function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const ring = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600));

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.4, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 24 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="no-print fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-ink text-white shadow-lg shadow-ink/30 md:bottom-8 md:right-8"
        >
          <svg viewBox="0 0 56 56" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
            <circle cx="28" cy="28" r="25" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="3" />
            <motion.circle
              cx="28"
              cy="28"
              r="25"
              fill="none"
              stroke="#ffd84d"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: ring }}
            />
          </svg>
          <svg viewBox="0 0 24 24" className="relative size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
