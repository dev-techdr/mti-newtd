"use client";

import { PageTransition } from "@/components/motion/SmoothScroll";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
