"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Service = { name: string; body: string; includes: string[] };

/** Motion: an accordion where the open row grows with a spring and its details stagger in. */
export function ServiceList({ services }: { services: readonly Service[] }) {
  const [open, setOpen] = useState(0);

  return (
    <ul className="border-t border-ink">
      {services.map((s, i) => {
        const isOpen = open === i;
        return (
          <li key={s.name} className="border-b border-ink">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`svc-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="display text-[clamp(1.9rem,4.6vw,3.75rem)] font-medium transition-colors group-hover:text-cobalt">
                  {s.name}
                </span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "#2a35ff" : "#0f1222" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="grid size-11 shrink-0 place-items-center rounded-full text-2xl leading-none text-white"
                >
                  +
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`svc-${i}`}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-6 pb-8 md:grid-cols-2">
                    <p className="prose-serif">{s.body}</p>
                    <ul className="space-y-2">
                      {s.includes.map((x, j) => (
                        <motion.li
                          key={x}
                          initial={{ x: -16, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.08 * j + 0.1 }}
                          className="flex gap-3 border-b border-line pb-2"
                        >
                          <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-cobalt" />
                          {x}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
