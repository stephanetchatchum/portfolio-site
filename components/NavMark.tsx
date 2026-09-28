import OrbitMark from "./OrbitMark";

// A small bordered instrument mark for the nav — same visual language
// as the hero (orbit + data), not a generic logo glyph.
export default function NavMark() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-hairline text-status-shipped">
      <OrbitMark className="h-4 w-4" />
    </span>
  );
}