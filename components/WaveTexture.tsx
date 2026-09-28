// Superposed sinusoids: two wave trains with slightly different wavelengths
// beat against each other, giving an interference envelope. Static and
// computed at render time.

const VB_W = 1200;
const VB_H = 220;

function curve(amp1: number, k1: number, ph1: number, amp2: number, k2: number, ph2: number) {
  let d = "";
  for (let x = 0; x <= VB_W; x += 6) {
    const y =
      VB_H / 2 +
      amp1 * Math.sin((2 * Math.PI * x) / k1 + ph1) +
      amp2 * Math.sin((2 * Math.PI * x) / k2 + ph2);
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)} `;
  }
  return d;
}

export default function WaveTexture({ className = "" }: { className?: string }) {
  const paths = [0, 1, 2, 3, 4].map((i) => ({
    d: curve(26, 300, i * 0.45, 26, 340, i * 0.45 + 0.6),
    o: (0.1 + i * 0.07).toFixed(2),
  }));

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
      fill="none"
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          stroke="currentColor"
          strokeOpacity={p.o}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
