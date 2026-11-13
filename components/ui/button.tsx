import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

const styles = {
  accent:
    "bg-accent text-accent-ink hover:brightness-95",
  navy: "bg-secondary text-background",
  outline: "border border-secondary/20 bg-transparent text-foreground hover:bg-surface",
  ghost: "bg-transparent text-foreground",
} as const;

type Variant = keyof typeof styles;

export function Button({
  href,
  variant = "accent",
  className,
  children,
  external,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: Variant;
  external?: boolean;
}) {
  const classNames = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5",
    styles[variant],
    className,
  );
  if (href && (external || href.startsWith("http") || href.startsWith("tel:"))) {
    return (
      <a href={href} className={classNames}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={classNames}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}
