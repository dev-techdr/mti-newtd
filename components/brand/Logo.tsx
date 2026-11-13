import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-9 shrink-0", className)} aria-hidden="true">
      <rect width="40" height="40" rx="11" className="fill-primary" />
      <path d="M20 10v20M10 20h20" className="stroke-white" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-inherit", className)}>
      <LogoMark className={markClassName} />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-heading text-lg font-bold tracking-tight whitespace-nowrap">
          tech<span className="text-primary">Dr</span>
        </span>
        <span className="mt-1 text-[0.62rem] font-semibold tracking-[0.14em] whitespace-nowrap uppercase opacity-80">
          Medical tourism
        </span>
      </span>
    </span>
  );
}
