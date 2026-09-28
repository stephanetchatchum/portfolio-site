"use client";

import { useState } from "react";

export default function Avatar({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const base = `h-24 w-24 shrink-0 rounded-md border border-line-strong ${className}`;

  if (failed) {
    return (
      <div
        className={`${base} flex items-center justify-center bg-panel text-xl font-semibold text-ink`}
        role="img"
        aria-label="Stephane Tchatchum Chassem"
      >
        ST
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/photo.jpg"
      alt="Stephane Tchatchum Chassem"
      onError={() => setFailed(true)}
      className={`${base} object-cover`}
    />
  );
}
