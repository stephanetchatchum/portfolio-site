// A quiet nod to the orbital-mechanics/simulation work — not decoration for
// its own sake, but the one recurring visual thread across the actual
// projects (orbit predictor, n-body simulator, exoplanet classifier).
export default function OrbitMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="32"
        cy="32"
        rx="28"
        ry="12"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
        transform="rotate(-18 32 32)"
      />
      <circle cx="32" cy="32" r="3.5" fill="currentColor" />
      <circle cx="9" cy="24" r="2" fill="currentColor" />
    </svg>
  );
}