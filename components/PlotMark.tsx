// A small plotted curve on axes — the literal output of the work
// (simulations, ML, orbital mechanics), not decoration borrowed from
// elsewhere. Reads as "someone who makes plots for a living."
export default function PlotMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* axes */}
      <line
        x1="6"
        y1="6"
        x2="6"
        y2="54"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
      />
      <line
        x1="6"
        y1="54"
        x2="58"
        y2="54"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
      />
      {/* damped-oscillation style data curve */}
      <path
        d="M6 30 C 14 8, 22 8, 26 22 C 29 32, 34 40, 40 30 C 44 23, 48 27, 52 24 C 55 22, 56 22, 58 23"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
