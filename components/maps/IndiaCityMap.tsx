import states from "@/data/india-states.json";

const VIEW = { x: -15, y: -15, w: 642, h: 726 };
const XS = 20.94637646;
const XO = -1428.45636827;
const YS = -1194.27247055;
const YO = 833.48323686;
const D2R = Math.PI / 180;
const RINGS = [50, 150, 300];

function project(lat: number, lon: number): [number, number] {
  return [XS * lon + XO, YS * Math.log(Math.tan(Math.PI / 4 + (lat * D2R) / 2)) + YO];
}

function kmPerUnit(lat: number) {
  return (111.32 * Math.cos(lat * D2R)) / XS;
}

const LAT_LINES = [10, 15, 20, 25, 30, 35].map((lat) => {
  const [x1, y] = project(lat, 67);
  const [x2] = project(lat, 98);
  return { lat, x1, x2, y };
});

const LON_LINES = [70, 75, 80, 85, 90, 95].map((lon) => {
  const [x, y1] = project(37.5, lon);
  const [, y2] = project(6.5, lon);
  return { lon, x, y1, y2 };
});

const FOCUS: Record<string, { state: string; lat: number; lon: number; note?: string }> = {
  "delhi-ncr": { state: "Delhi", note: "National capital", lat: 28.61, lon: 77.21 },
  mumbai: { state: "Maharashtra", lat: 19.08, lon: 72.88 },
  chennai: { state: "Tamil Nadu", lat: 13.08, lon: 80.27 },
  hyderabad: { state: "Telangana", lat: 17.39, lon: 78.49 },
  bengaluru: { state: "Karnataka", lat: 12.97, lon: 77.59 },
  kolkata: { state: "West Bengal", lat: 22.57, lon: 88.36 },
};

export function IndiaCityMap({ slug, label, code }: { slug: string; label: string; code: string }) {
  const focus = FOCUS[slug];
  if (!focus) return null;

  const [x, y] = project(focus.lat, focus.lon);
  const left = ((x - VIEW.x) / VIEW.w) * 100;
  const top = ((y - VIEW.y) / VIEW.h) * 100;
  const labelOnLeft = left > 58;
  const kpu = kmPerUnit(focus.lat);
  const glowId = `india-glow-${slug}`;
  const spotId = `india-spot-${slug}`;
  const highlighted = states.find((state) => state.name === focus.state);

  return (
    <figure className="relative overflow-hidden rounded-[28px] border border-[#1f2b47] bg-[#04060c] text-[#d8e3ff] shadow-[0_24px_70px_rgba(2,6,16,.35)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,#12305a_0%,#0a1224_42%,#04060c_78%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:linear-gradient(rgba(79,209,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(79,209,255,.045)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(circle_at_50%_42%,#000_18%,transparent_75%)]" />
      <style>{`
        @keyframes india-city-pulse { from { transform: scale(1); opacity: .9 } to { transform: scale(5.5); opacity: 0 } }
        .india-city-pulse { transform-box: fill-box; transform-origin: center; animation: india-city-pulse 1.7s ease-out infinite; }
      `}</style>

      <figcaption className="relative flex items-start justify-between gap-3 px-5 pt-5">
        <div>
          <p className="text-[10px] font-medium tracking-[0.22em] text-[#6b7a9c]">INDIA</p>
          <p className="mt-1 font-heading text-[1.65rem] font-semibold leading-none tracking-tight text-white">{label}</p>
          <p className="mt-1.5 text-sm text-[#4fd1ff]">{focus.note ?? focus.state}</p>
        </div>
        <p className="mt-1 rounded-full border border-[rgba(255,198,92,.55)] bg-[rgba(255,198,92,.08)] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#ffc65c]">
          {code}
        </p>
      </figcaption>

      <div className="px-2 pt-1">
        <div className="relative">
        <svg
          viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
          className="block h-auto w-full"
          role="img"
          aria-label={`Map of India with ${label} highlighted`}
        >
          <defs>
            <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id={spotId} cx={x} cy={y} r="210" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7adfff" stopOpacity="0.34" />
              <stop offset="42%" stopColor="#4fd1ff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#4fd1ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g fill="none" stroke="rgba(79,209,255,.16)" strokeWidth="0.8" strokeDasharray="3 5">
            {LAT_LINES.map((line) => (
              <line key={line.lat} x1={line.x1} y1={line.y} x2={line.x2} y2={line.y} />
            ))}
            {LON_LINES.map((line) => (
              <line key={line.lon} x1={line.x} y1={line.y1} x2={line.x} y2={line.y2} />
            ))}
          </g>
          <g fontSize="12" fill="rgba(107,122,156,.8)">
            {LAT_LINES.map((line) => (
              <text key={line.lat} x={VIEW.x + 10} y={line.y - 5}>{line.lat}°N</text>
            ))}
            {LON_LINES.map((line) => (
              <text key={line.lon} x={line.x + 4} y={line.y1 + 14}>{line.lon}°E</text>
            ))}
          </g>

          {states.map((state) => (
            <path key={state.name} d={state.path} fill={state.name === focus.state ? "#10192e" : "#0b1222"} stroke="#243352" strokeWidth="0.9" />
          ))}
          <circle cx={x} cy={y} r="230" fill={`url(#${spotId})`} />
          {highlighted ? (
            <path d={highlighted.path} fill="#1d4f8f" stroke="#7adfff" strokeWidth="2.2" filter={`url(#${glowId})`} />
          ) : null}
          <g fill="none" stroke="#4fd1ff" strokeWidth="1.35" opacity="0.42" filter={`url(#${glowId})`}>
            {states.map((state) => (
              <path key={state.name} d={state.path} />
            ))}
          </g>

          {RINGS.map((km) => {
            const radius = km / kpu;
            return (
              <g key={km}>
                <circle cx={x} cy={y} r={radius} fill="rgba(79,209,255,0.035)" stroke="#4fd1ff" strokeOpacity="0.55" strokeWidth="1.15" strokeDasharray="7 6" />
                <text x={x} y={y - radius - 6} textAnchor="middle" fontSize="13" fill="#8fe7ff">{km} km</text>
              </g>
            );
          })}

          <g transform={`translate(${x} ${y})`}>
            <circle r="7" fill="none" stroke="#ffc65c" strokeWidth="1.4" className="india-city-pulse" />
            <circle r="16" fill="#ffc65c" opacity="0.16" />
            <path d="M-18 0h-7M18 0h7M0 -18v-7M0 18v7" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
            <circle r="4.2" fill="#fff" stroke="#ffc65c" strokeWidth="1.6" />
          </g>
        </svg>

        <span className="pointer-events-none absolute z-10" style={{ left: `${left}%`, top: `${top}%` }}>
          <span
            className={`absolute top-0 -translate-y-1/2 whitespace-nowrap rounded-full border border-[rgba(255,198,92,.7)] bg-[rgba(8,12,24,.92)] px-2.5 py-1 text-xs font-semibold text-white shadow-[0_0_18px_rgba(255,198,92,.35)] ${
              labelOnLeft ? "right-4" : "left-4"
            }`}
          >
            {label}
          </span>
        </span>
        </div>
      </div>

      <div className="relative mx-4 mb-4 flex items-center justify-between gap-3 rounded-2xl border border-[rgba(79,209,255,.2)] bg-[rgba(8,14,28,.78)] px-3 py-2.5 text-[11px] text-[#8ea0c4] backdrop-blur">
        <span>{focus.lat.toFixed(2)}° N</span>
        <span className="text-[#4fd1ff]">50 · 150 · 300 km</span>
        <span>{focus.lon.toFixed(2)}° E</span>
      </div>
    </figure>
  );
}
