import { useEffect, useState } from "react";
import { outro as cfg } from "./outro.config";

/**
 * ElvionWeb 9:16 outro (1080 x 1920 canvas, scaled to fit the window).
 * Pure CSS animations: no extra dependencies besides React (+ Tailwind for layout).
 *
 * Preview tips:
 *   - Press R (or click the stage) to replay.
 *   - Add ?capture=1 to the URL to hide the preview hints before screen recording.
 *   - Add ?motion=on to play the animation even if your OS has "reduce motion" enabled.
 */

const W = 1080;
const H = 1920;

function LogoPlaceholder() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{
        width: cfg.logoSize,
        height: cfg.logoSize,
        border: `3px dashed ${cfg.colors.accent}`,
        borderRadius: 32,
        color: cfg.colors.accent,
        fontFamily: cfg.fonts.body,
        fontSize: 28,
        lineHeight: 1.4,
        letterSpacing: "0.08em",
      }}
    >
      LOGO PLACEHOLDER
      <span style={{ fontSize: 22, opacity: 0.8, marginTop: 10 }}>
        add public/elvionweb-logo.jpg
      </span>
    </div>
  );
}

function MessageIcon({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.6c-.5.4-1.3.1-1.3-.6V16A2.5 2.5 0 0 1 4 13.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="9.5" r="1.1" fill="currentColor" />
      <circle cx="12" cy="9.5" r="1.1" fill="currentColor" />
      <circle cx="15.5" cy="9.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

export default function ElvionWebOutro() {
  const params =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const capture = params.get("capture") === "1";
  const forceMotion = params.get("motion") === "on";

  const [scale, setScale] = useState(1);
  const [run, setRun] = useState(0); // bump to replay
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "r" || e.key === "R") setRun((n) => n + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const t = cfg.timing;
  const c = cfg.colors;
  const words = cfg.headline.split(" ");

  const d = (seconds) => ({ "--d": `${seconds}s` });

  return (
    <div
      className={`ew-root fixed inset-0 flex items-center justify-center overflow-hidden bg-black ${
        forceMotion ? "ew-force" : ""
      }`}
    >
      <style>{css(c)}</style>

      <div style={{ width: W * scale, height: H * scale, position: "relative" }}>
        <div
          key={run}
          onClick={() => setRun((n) => n + 1)}
          className="absolute left-0 top-0 overflow-hidden"
          style={{
            width: W,
            height: H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            background: c.background,
            color: c.text,
            fontFamily: cfg.fonts.body,
          }}
        >
          {/* soft accent glow behind the logo, very subtle */}
          <div
            className="ew-anim ew-bg absolute"
            style={{
              ...d(0),
              left: "50%",
              top: cfg.safe.top + cfg.logoSize / 2 - 80,
              width: 1100,
              height: 1100,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, color-mix(in srgb, ${c.accent} 14%, transparent) 0%, transparent 62%)`,
            }}
          />

          {/* content stays inside the platform-safe area */}
          <div
            className="absolute flex flex-col items-center justify-center text-center"
            style={{
              top: cfg.safe.top,
              bottom: cfg.safe.bottom,
              left: cfg.safe.side,
              right: cfg.safe.side,
            }}
          >
            {/* logo */}
            <div className="ew-anim ew-logo" style={d(t.logo)}>
              {logoFailed ? (
                <LogoPlaceholder />
              ) : (
                <img
                  src={cfg.logoSrc}
                  alt={`${cfg.brand} logo`}
                  onError={() => setLogoFailed(true)}
                  style={{
                    width: cfg.logoSize,
                    height: cfg.logoSize,
                    objectFit: "contain",
                    mixBlendMode: "lighten",
                  }}
                />
              )}
            </div>

            {/* brand name */}
            <div
              className="ew-anim ew-up"
              style={{
                ...d(t.name),
                marginTop: 28,
                fontFamily: cfg.fonts.display,
                fontSize: 104,
                fontWeight: 600,
                letterSpacing: "0.01em",
                lineHeight: 1.05,
              }}
            >
              {cfg.brand}
            </div>

            {/* tagline */}
            <div
              className="ew-anim ew-track"
              style={{
                ...d(t.tagline),
                marginTop: 22,
                fontSize: 30,
                fontWeight: 500,
                color: c.accent,
                whiteSpace: "nowrap",
              }}
            >
              {cfg.tagline}
            </div>

            {/* accent rule */}
            <div
              className="ew-anim ew-rule"
              style={{
                ...d(t.rule),
                marginTop: 64,
                width: 160,
                height: 3,
                borderRadius: 2,
                background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)`,
              }}
            />

            {/* headline, word by word */}
            <h1
              style={{
                marginTop: 56,
                maxWidth: 800,
                fontFamily: cfg.fonts.display,
                fontSize: 82,
                fontWeight: 600,
                lineHeight: 1.16,
              }}
            >
              {words.map((w, i) => (
                <span
                  key={i}
                  className="ew-anim ew-up"
                  style={{
                    ...d(t.headline + i * t.wordStagger),
                    display: "inline-block",
                    marginRight: i < words.length - 1 ? "0.26em" : 0,
                  }}
                >
                  {w}
                </span>
              ))}
            </h1>

            {/* subline */}
            <p
              className="ew-anim ew-up"
              style={{
                ...d(t.subline),
                marginTop: 34,
                fontSize: 42,
                lineHeight: 1.35,
                color: c.muted,
              }}
            >
              {cfg.subline}
            </p>

            {/* call to action */}
            <div
              className="ew-anim ew-cta"
              style={{ ...d(t.cta), marginTop: 84 }}
            >
              <div
                className="ew-anim ew-glow flex items-center"
                style={{
                  ...d(t.glow),
                  "--glow-dur": `${(t.total - t.glow) / 2}s`,
                  gap: 22,
                  padding: "30px 62px",
                  borderRadius: 999,
                  border: `2.5px solid ${c.accent}`,
                  color: c.accent,
                  background: `color-mix(in srgb, ${c.accent} 10%, transparent)`,
                  fontSize: 44,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                }}
              >
                <MessageIcon />
                {cfg.cta}
              </div>
            </div>
          </div>
        </div>
      </div>

      {!capture && (
        <div
          className="pointer-events-none absolute left-3 top-3 rounded bg-white/10 px-3 py-2 text-xs text-white/70"
          style={{ fontFamily: cfg.fonts.body }}
        >
          Press R or click to replay · add ?capture=1 to hide this note
        </div>
      )}
    </div>
  );
}

function css(c) {
  return `
.ew-root { --accent: ${c.accent}; }
.ew-anim { animation-fill-mode: both; animation-delay: var(--d, 0s); animation-timing-function: cubic-bezier(.22,.61,.36,1); }

.ew-bg    { animation-name: ew-fade; animation-duration: 1.4s; }
.ew-logo  { animation-name: ew-logo; animation-duration: 1.1s; }
.ew-up    { animation-name: ew-up; animation-duration: .7s; }
.ew-track { animation-name: ew-track; animation-duration: .9s; }
.ew-rule  { animation-name: ew-rule; animation-duration: .6s; transform-origin: center; }
.ew-cta   { animation-name: ew-cta; animation-duration: .6s; }
.ew-glow  { animation-name: ew-glow; animation-duration: var(--glow-dur, .7s); animation-iteration-count: 2; animation-timing-function: ease-in-out; }

@keyframes ew-fade  { from { opacity: 0 } to { opacity: 1 } }
@keyframes ew-logo  { from { opacity: 0; transform: scale(.94); filter: blur(10px) } to { opacity: 1; transform: none; filter: blur(0) } }
@keyframes ew-up    { from { opacity: 0; transform: translateY(26px); filter: blur(6px) } to { opacity: 1; transform: none; filter: blur(0) } }
@keyframes ew-track { from { opacity: 0; letter-spacing: .5em } to { opacity: 1; letter-spacing: .3em } }
@keyframes ew-rule  { from { opacity: 0; transform: scaleX(0) } to { opacity: 1; transform: scaleX(1) } }
@keyframes ew-cta   { from { opacity: 0; transform: translateY(18px) scale(.94) } to { opacity: 1; transform: none } }
@keyframes ew-glow  {
  0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 0%, transparent) }
  50%      { box-shadow: 0 0 56px 8px color-mix(in srgb, var(--accent) 45%, transparent) }
}

/* Final resting letter-spacing for the tagline when animation is off */
.ew-track { letter-spacing: .3em; }

/* Reduced motion: show the finished composition immediately */
@media (prefers-reduced-motion: reduce) {
  .ew-root:not(.ew-force) .ew-anim { animation: none !important; }
}
`;
}
