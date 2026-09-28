"use client";

import { useEffect, useRef } from "react";

// Real fragments from the actual work (orbital mechanics, N-body
// simulation, gradient-based ML) — each drifting on its own independent
// random path via canvas, the same underlying mechanic as a particle
// background, but recolored (warm mineral green, no glow, no gradient,
// no connecting-line network) so it reads as quiet texture, not
// generic AI-portfolio decoration.
const FRAGMENTS = [
  "T² ∝ a³",
  "F = G(m₁m₂)/r²",
  "θ_{t+1} = θ_t − η∇L(θ_t)",
  "Σ F = ma",
  "∇²ψ",
  "∂E/∂t",
];

interface Particle {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export default function FloatingEquations() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas || !ctx) return;
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = FRAGMENTS.map((text) => ({
      text,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: 12 + Math.random() * 6,
      alpha: 0.35 + Math.random() * 0.25,
    }));

    let raf: number;

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -80) p.x = width + 80;
        if (p.x > width + 80) p.x = -80;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.font = `${p.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(59, 110, 91, ${p.alpha})`; // mineral green, warm not neon
        ctx.fillText(p.text, p.x, p.y);
      });

      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}