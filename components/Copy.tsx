// Renders copy, highlighting any [[TODO ...]] so unfinished text is obvious on the page.
export function Copy({ text }: { text: string }) {
  return text.split(/(\[\[.*?\]\])/).map((part, index) =>
    part.startsWith("[[") ? (
      <mark key={index} className="rounded bg-gold/40 px-1 text-ink">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}
