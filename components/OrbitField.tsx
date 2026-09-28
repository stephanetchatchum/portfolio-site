"use client";

import { useEffect, useRef } from "react";

/*
  A small live numerical experiment used as the hero background.

  Test particles move in the field of one central mass (GM = MU) and are
  advanced with a kick-drift-kick leapfrog integrator, which is symplectic
  and keeps orbital energy bounded over long runs. The faint ellipses are the
  analytic Kepler orbits for the same initial conditions, so the particles
  should ride along them. Nothing here is random at runtime: a seeded PRNG
  fixes the initial conditions.

  Units are screen pixels and seconds. MU is chosen so an orbit with a
  semi-major axis of 250px takes about 50 seconds: slow enough to stay in
  the background.
*/

const MU = 2.2e5; // px^3 / s^2
const DT = 1 / 240; // fixed integrator step, seconds
const TRAIL = 360; // recorded points per particle
const RECORD_EVERY = 8; // integrator steps between trail samples
const CHUNKS = 14; // trail segments drawn with rising opacity

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number; // semi-major axis
  e: number; // eccentricity
  w: number; // direction of periapsis
  trail: Float32Array;
  head: number;
  count: number;
}

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function accel(x: number, y: number): [number, number] {
  const r2 = x * x + y * y;
  const r3 = r2 * Math.sqrt(r2);
  return [(-MU * x) / r3, (-MU * y) / r3];
}

function leapfrog(b: Body, dt: number) {
  let [ax, ay] = accel(b.x, b.y);
  b.vx += 0.5 * dt * ax;
  b.vy += 0.5 * dt * ay;
  b.x += dt * b.vx;
  b.y += dt * b.vy;
  [ax, ay] = accel(b.x, b.y);
  b.vx += 0.5 * dt * ax;
  b.vy += 0.5 * dt * ay;
}

function record(b: Body) {
  b.trail[b.head * 2] = b.x;
  b.trail[b.head * 2 + 1] = b.y;
  b.head = (b.head + 1) % TRAIL;
  b.count = Math.min(b.count + 1, TRAIL);
}

function createBodies(w: number, h: number, staticFrame: boolean): Body[] {
  const rand = mulberry32(20260924);
  const scale = Math.min(Math.max(w, h), 1400);
  const n = w < 640 ? 4 : 6;
  const bodies: Body[] = [];

  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    const a = scale * (0.13 + 0.37 * t) * (0.92 + 0.16 * rand());
    const e = 0.1 + 0.5 * rand();
    const wDir = rand() * Math.PI * 2;
    const dir = i % 4 === 3 ? -1 : 1; // one retrograde orbit

    // Start at apoapsis, moving tangentially.
    const rAp = a * (1 + e);
    const vAp = Math.sqrt((MU * (1 - e)) / (a * (1 + e)));
    const b: Body = {
      x: -rAp * Math.cos(wDir),
      y: -rAp * Math.sin(wDir),
      vx: dir * vAp * Math.sin(wDir),
      vy: dir * -vAp * Math.cos(wDir),
      a,
      e,
      w: wDir,
      trail: new Float32Array(TRAIL * 2),
      head: 0,
      count: 0,
    };

    // Advance to a random phase so the particles do not start in a line.
    const period = 2 * Math.PI * Math.sqrt((a * a * a) / MU);
    const steps = Math.floor((rand() * period) / DT);
    for (let s = 0; s < steps; s++) leapfrog(b, DT);

    // Pre-fill the trail so the first frame is complete. The static
    // (reduced-motion) frame samples more sparsely to show a longer arc.
    const every = staticFrame ? 20 : RECORD_EVERY;
    for (let k = 0; k < TRAIL; k++) {
      for (let s = 0; s < every; s++) leapfrog(b, DT);
      record(b);
    }
    bodies.push(b);
  }
  return bodies;
}

export default function OrbitField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let W = 0;
    let H = 0;
    let builtWidth = 0;
    let bodies: Body[] = [];
    let raf = 0;
    let visible = true;
    let acc = 0;
    let steps = 0;
    let last = 0;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      if (W === 0 || H === 0) return;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rebuild only on a substantial width change so mobile browser
      // chrome resizing does not reshuffle the orbits.
      if (!bodies.length || Math.abs(W - builtWidth) / builtWidth > 0.25) {
        bodies = createBodies(W, H, reduceMotion);
        builtWidth = W;
      }
      draw();
    }

    function draw() {
      if (!ctx || W === 0) return;
      ctx.clearRect(0, 0, W, H);
      // On wide screens the system sits in the free space right of the
      // headline; on narrow screens it is centred behind the content.
      const cx = W >= 1200 ? W * 0.88 : W / 2;
      const cy = H * 0.5;

      // Analytic Kepler orbits.
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(232, 237, 245, 0.07)";
      for (const b of bodies) {
        const bb = b.a * Math.sqrt(1 - b.e * b.e);
        ctx.beginPath();
        ctx.ellipse(
          cx - b.a * b.e * Math.cos(b.w),
          cy - b.a * b.e * Math.sin(b.w),
          b.a,
          bb,
          b.w,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }

      // Trajectories: opacity rises toward the current position.
      ctx.lineCap = "round";
      ctx.lineWidth = 1.5;
      for (const b of bodies) {
        const per = Math.floor(b.count / CHUNKS);
        if (per < 2) continue;
        const start = (b.head - b.count + TRAIL) % TRAIL;
        for (let c = 0; c < CHUNKS; c++) {
          const alpha = 0.04 + 0.62 * Math.pow((c + 1) / CHUNKS, 1.7);
          ctx.strokeStyle = `rgba(0, 210, 255, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          const from = c * per;
          const to = c === CHUNKS - 1 ? b.count : (c + 1) * per + 1;
          for (let k = from; k < to; k++) {
            const idx = ((start + k) % TRAIL) * 2;
            const px = cx + b.trail[idx];
            const py = cy + b.trail[idx + 1];
            if (k === from) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
      }

      // Particles.
      for (const b of bodies) {
        const px = cx + b.x;
        const py = cy + b.y;
        ctx.fillStyle = "rgba(0, 210, 255, 0.14)";
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(0, 210, 255, 0.95)";
        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // The central mass: the one plasma-gold element in the hero.
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      glow.addColorStop(0, "rgba(255, 159, 0, 0.2)");
      glow.addColorStop(1, "rgba(255, 159, 0, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255, 159, 0, 0.85)";
      ctx.beginPath();
      ctx.arc(cx, cy, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    function frame(t: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      acc += dt;
      while (acc >= DT) {
        for (const b of bodies) leapfrog(b, DT);
        acc -= DT;
        steps++;
        if (steps % RECORD_EVERY === 0) for (const b of bodies) record(b);
      }
      draw();
    }

    function start() {
      if (reduceMotion || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className={className} />
  );
}
