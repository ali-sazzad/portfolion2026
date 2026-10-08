"use client";

import { motion } from "motion/react";
import { useRef } from "react";

type Group = { group: string; items: readonly string[] };

const skins = [
  "bg-cobalt text-white",
  "bg-butter text-ink",
  "bg-ink text-white",
  "bg-white text-ink border-2 border-ink",
];

/** Motion: skills as stickers on a pinboard. Drag them around; they spring when released. */
export function StickerBoard({ groups }: { groups: readonly Group[] }) {
  const board = useRef<HTMLDivElement>(null);
  const stickers = groups.flatMap((g, gi) => g.items.map((label) => ({ label, skin: skins[gi % skins.length] })));

  return (
    <>
      <div
        ref={board}
        className="dots relative mx-auto flex max-w-6xl flex-wrap justify-center gap-3 rounded-[2rem] border-2 border-ink bg-white p-6 md:gap-4 md:p-12"
      >
        {stickers.map((s, i) => (
          <motion.span
            key={s.label}
            drag
            dragConstraints={board}
            dragElastic={0.25}
            dragMomentum={false}
            initial={{ rotate: ((i * 37) % 13) - 6 }}
            whileHover={{ rotate: 0, scale: 1.06 }}
            whileDrag={{ scale: 1.14, rotate: 0, zIndex: 20, cursor: "grabbing" }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={`display relative cursor-grab select-none rounded-full px-5 py-2.5 text-xl font-medium shadow-[0_3px_0_rgba(15,18,34,.9)] md:px-7 md:py-3 md:text-3xl ${s.skin}`}
            style={{ touchAction: "pan-y" }}
          >
            {s.label}
          </motion.span>
        ))}
      </div>
      <ul className="sr-only">
        {stickers.map((s) => (
          <li key={s.label}>{s.label}</li>
        ))}
      </ul>
    </>
  );
}
