"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * LazyMotion + domAnimation: solo le feature necessarie (animazioni, exit, hover/tap) invece
 * dell'intero bundle di Motion. `strict` fa fallire il build mentale se qualcuno usa `motion.*` al posto di `m.*`.
 * `reducedMotion="user"` rispetta prefers-reduced-motion.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
