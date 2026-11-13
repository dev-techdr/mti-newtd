import { ImageResponse } from "next/og";

export const alt = "TechDr Medical Tourism";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function OgImage({ title, kicker = "TechDr Medical Tourism", footer = "Indicative estimates in USD" }: { title: string; kicker?: string; footer?: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0B2545", color: "white", padding: 64 }}>
        <div style={{ display: "flex", fontSize: 28, color: "#8EF0E6" }}>{kicker}</div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 24, color: "#FF7A59" }}>{footer}</div>
      </div>
    ),
    { ...size },
  );
}
