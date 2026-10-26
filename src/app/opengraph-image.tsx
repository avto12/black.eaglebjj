import { ImageResponse } from "next/og";

export const alt = "Black Eagle BJJ — Built through discipline";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#f4f4f0",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22, letterSpacing: 6, color: "#a3a39c" }}>
          <div style={{ display: "flex", width: 120, height: 10 }}>
            <div style={{ flex: 1, border: "2px solid #343434" }} />
            <div style={{ width: 56, background: "#b3201b" }} />
            <div style={{ width: 12, border: "2px solid #343434" }} />
          </div>
          BRAZILIAN JIU-JITSU · GEORGIA
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 168, fontWeight: 900, lineHeight: 0.86, letterSpacing: -4 }}>
          <span>BLACK EAGLE</span>
          <span style={{ color: "#d22a22", fontSize: 60, letterSpacing: 10, marginTop: 24 }}>BUILT THROUGH DISCIPLINE</span>
        </div>
      </div>
    ),
    size,
  );
}
