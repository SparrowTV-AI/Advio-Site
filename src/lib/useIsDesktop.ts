"use client";
import { useEffect, useState } from "react";

/**
 * True at the md breakpoint (768px) and up. Starts false so phones never get
 * desktop-only scroll effects, then updates after mount and on resize.
 */
export function useIsDesktop(query = "(min-width: 768px)") {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}
