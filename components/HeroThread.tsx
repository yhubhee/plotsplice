"use client";

import { useEffect, useRef, useState } from "react";
import { THREAD_HEIGHT } from "./threadHeight";

// The gold thread: it underlines "the path to them", runs out to the edge of the page,
// then drops down and into the books. The path is measured from the real layout, so it
// stays attached to the words at every screen size.
export function HeroThread() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [path, setPath] = useState("");

  useEffect(() => {
    const hero = svgRef.current?.parentElement;
    const words = hero?.querySelector("[data-thread-start]");
    const shelf = hero?.querySelector("[data-shelf]");
    if (!hero || !words || !shelf) return;

    const measure = () => {
      const box = hero.getBoundingClientRect();
      const w = words.getBoundingClientRect();
      const s = shelf.getBoundingClientRect();
      const plankHeight = 12;

      const left = w.left - box.left;
      const right = w.right - box.left;
      const y = w.bottom - box.top - w.height * 0.02;
      const edge = box.width - 12;
      const shelfY = s.bottom - box.top - plankHeight - THREAD_HEIGHT - 1;

      // A slightly hand-drawn underline.
      let d = `M ${left} ${y + 2} C ${left + (right - left) * 0.3} ${y + 7}, ${left + (right - left) * 0.65} ${y - 2}, ${right} ${y + 3}`;

      if (box.width >= 1024) {
        // On wide screens, tie a loop in the open space beside the headline.
        const knot = right + (edge - right) * 0.5;
        d += ` C ${right + 40} ${y + 6}, ${knot - 30} ${y + 46}, ${knot + 8} ${y + 26}`;
        d += ` C ${knot + 44} ${y + 7}, ${knot + 10} ${y - 26}, ${knot - 10} ${y + 2}`;
        d += ` C ${knot - 30} ${y + 30}, ${edge - 30} ${y + 60}, ${edge} ${y + 120}`;
      } else {
        d += ` C ${right + 20} ${y + 4}, ${edge} ${y + 8}, ${edge} ${y + 70}`;
      }
      // Down the margin, then turn into the line of the thread on the shelf.
      d += ` L ${edge} ${shelfY - 22} Q ${edge} ${shelfY} ${edge - 22} ${shelfY}`;
      setPath(d);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(hero);
    // Web fonts can change where the headline wraps after first paint.
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={svgRef} aria-hidden className="pointer-events-none absolute inset-0 z-0 size-full overflow-visible">
      {path && (
        <path d={path} pathLength={1} fill="none" stroke="var(--color-gold)" strokeWidth={2.5} strokeLinecap="round" className="thread-draw" />
      )}
    </svg>
  );
}
