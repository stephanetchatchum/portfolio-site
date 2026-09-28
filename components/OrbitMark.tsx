// A quiet nod to the orbital-mechanics work: one elliptical orbit, a
// central mass and a body on the path.
export default function OrbitMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse
        cx="32"
        cy="32"
        rx="28"
        ry="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.45"
        transform="rotate(-18 32 32)"
      />
      <circle cx="32" cy="32" r="4" fill="#ff9f00" />
      <circle cx="9" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}
