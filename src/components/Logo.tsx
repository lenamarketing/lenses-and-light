import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`font-display text-2xl md:text-[26px] font-semibold tracking-[-0.05em] leading-none text-foreground ${className}`}
    >
      Mary.
    </Link>
  );
}
