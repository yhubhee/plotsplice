import Link from "next/link";

const variants = {
  primary: "bg-ink-green text-paper hover:bg-ink-green-deep",
  secondary: "border border-ink-green/40 text-ink-green hover:border-ink-green hover:bg-ink-green/5",
  gold: "bg-gold text-ink hover:bg-[#d6b15b]",
};

type ButtonProps = {
  href: string;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
};

export function Button({ href, variant = "primary", className = "", children }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-center font-medium transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
