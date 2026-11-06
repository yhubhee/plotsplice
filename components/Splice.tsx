// The motif in its plainest form: two strands braid together and leave as one.
export function Splice({ className = "" }: { className?: string }) {
  const strand = (a: number, b: number) =>
    `M0 ${a} C180 ${a} 300 24 420 24 S540 ${a} 600 24 S720 ${b} 780 24 S1000 24 1200 24`;
  return (
    <svg aria-hidden viewBox="0 0 1200 48" preserveAspectRatio="none" className={`block h-12 w-full ${className}`}>
      {[strand(6, 42), strand(42, 6)].map((d) => (
        <path key={d} d={d} fill="none" stroke="var(--color-gold)" strokeWidth={2} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
