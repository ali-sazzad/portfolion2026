"use client";

import { motion } from "motion/react";

/** Motion: a short slide-up (transform only, so content never starts invisible) each time the route changes. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 16 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
