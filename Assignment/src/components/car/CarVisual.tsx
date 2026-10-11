import { useState } from "react";
import carAsset from "@/assets/mclaren-720s-top.png.asset.json";

// Source PNG faces right; it is rotated 90deg so the nose points down.
export function CarVisual() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative w-[clamp(120px,14vw,220px)] aspect-[1901/3981]">
      {failed ? (
        <svg viewBox="0 0 100 210" className="h-full w-full" aria-label="Sports car top view">
          <rect x="8" y="5" width="84" height="200" rx="40" className="fill-accent-red" />
          <rect x="22" y="60" width="56" height="70" rx="18" className="fill-ink" />
          <rect x="26" y="140" width="48" height="30" rx="10" className="fill-ink" opacity="0.7" />
        </svg>
      ) : (
        <img
          src={carAsset.url}
          alt="McLaren 720S top view"
          onError={() => setFailed(true)}
          className="absolute left-1/2 top-1/2 max-w-none"
          style={{ width: "209.4%", height: "47.75%", transform: "translate(-50%,-50%) rotate(90deg)" }}
        />
      )}
    </div>
  );
}
