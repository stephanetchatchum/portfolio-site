"use client";

import { useState } from "react";

export default function Avatar() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-hairline bg-surface font-[family-name:var(--font-display)] text-2xl italic text-ink">
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
      className="h-28 w-28 shrink-0 rounded-2xl border border-hairline object-cover"
    />
  );
}
