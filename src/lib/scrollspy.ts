"use client";

import { useEffect, useMemo, useState } from "react";

export function useScrollSpy(sectionIds: string[]) {
  const ids = useMemo(() => sectionIds.filter(Boolean), [sectionIds]);
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "home");

  useEffect(() => {
    if (!ids.length) return;

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // pick the most visible intersecting entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!visible?.target?.id) return;

        const id = visible.target.id;
        setActiveId(id);
        try {
          localStorage.setItem("p26:lastSection", id);
        } catch {}
      },
      {
        root: null,
        // When the top of a section hits ~30% from top, it becomes active
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0.1, 0.2, 0.4, 0.6],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  useEffect(() => {
    // initial highlight from storage (no auto-scroll)
    try {
      const saved = localStorage.getItem("p26:lastSection");
      if (saved && ids.includes(saved)) setActiveId(saved);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeId;
}
