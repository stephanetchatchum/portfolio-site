import OrbitMark from "./OrbitMark";

export default function NavMark() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line-strong text-cherenkov">
      <OrbitMark className="h-5 w-5" />
    </span>
  );
}
