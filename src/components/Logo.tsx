import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`font-display text-2xl tracking-tight leading-none inline-flex items-baseline gap-1 ${className}`}>
      <span className="italic">Mary</span>
      <span className="text-accent">.</span>
    </Link>
  );
}
