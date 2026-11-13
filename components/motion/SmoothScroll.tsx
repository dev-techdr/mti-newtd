"use client";

import { useEffect, useState } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let active = true;
    let destroy: (() => void) | undefined;
    void import("lenis").then(({ default: Lenis }) => {
      if (!active) return;
      const lenis = new Lenis({ autoRaf: true });
      destroy = () => lenis.destroy();
    });
    return () => {
      active = false;
      destroy?.();
    };
  }, []);
  return null;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
      const seen = sessionStorage.getItem("page-booted");
      sessionStorage.setItem("page-booted", "1");
      return seen === "1";
    } catch {
      return false;
    }
  });
  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
