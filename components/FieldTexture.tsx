// The electric field of a dipole, sampled on a coarse grid and drawn as
// short strokes along the field direction (a "hedgehog" plot). Stroke
// opacity follows field strength. Computed at render time, so it is
// exact rather than hand-drawn, and used once as texture.

const VB_W = 360;
const VB_H = 240;
const COLS = 20;
const ROWS = 14;
const Q = 1;
const SEP = 1.15; // half-separation of the charges in field units

export default function FieldTexture({ className = "" }: { className?: string }) {
  const lines: { x1: string; y1: string; x2: string; y2: string; o: string }[] =
    [];

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      const px = ((i + 0.5) / COLS) * VB_W;
      const py = ((j + 0.5) / ROWS) * VB_H;
      // Map to field coordinates centred on the dipole.
      const x = ((i + 0.5) / COLS - 0.5) * 6;
      const y = ((j + 0.5) / ROWS - 0.5) * 4;

      let ex = 0;
      let ey = 0;
      for (const [qx, q] of [
        [-SEP, Q],
        [SEP, -Q],
      ] as const) {
        const dx = x - qx;
        const dy = y;
        const r2 = dx * dx + dy * dy;
        if (r2 < 0.12) {
          ex = NaN;
          break;
        }
        const r3 = r2 * Math.sqrt(r2);
        ex += (q * dx) / r3;
        ey += (q * dy) / r3;
      }
      if (Number.isNaN(ex)) continue;

      const mag = Math.hypot(ex, ey);
      const ux = ex / mag;
      const uy = ey / mag;
      const half = 6.5;
      const strength = Math.min(1, mag / 1.6);
      lines.push({
        x1: (px - ux * half).toFixed(1),
        y1: (py - uy * half).toFixed(1),
        x2: (px + ux * half).toFixed(1),
        y2: (py + uy * half).toFixed(1),
        o: (0.12 + 0.6 * strength).toFixed(2),
      });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {lines.map((l, k) => (
        <line
          key={k}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="currentColor"
          strokeOpacity={l.o}
          strokeWidth="1"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
