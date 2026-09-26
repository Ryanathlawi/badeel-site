import { useEffect, useRef, useState, type ReactNode } from "react";
import { PlatformIcon } from "./icons.tsx";
import { PLATFORMS, type Lang } from "./i18n.ts";

const STILL =
  typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- a card that leans toward the cursor ---------- */

export function Tilt({
  children,
  className,
  max = 8,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || STILL) return;
    let raf = 0;

    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--rx", `${(-py * max).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(px * max).toFixed(2)}deg`);
        el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);

  return (
    <div ref={ref} className={`tilt ${glare ? "tilt-glare" : ""} ${className ?? ""}`}>
      <div className="tilt-in">{children}</div>
    </div>
  );
}

/* ---------- the promo band that never stops ---------- */

export function Marquee({
  items,
  reverse,
  speed = 42,
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
}) {
  const row = [...items, ...items];
  return (
    <div className="mq" aria-hidden="true">
      <div
        className={`mq-track ${reverse ? "rev" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {row.map((x, i) => (
          <span className="mq-item" key={`${x}-${i}`}>
            <i className="mq-hex" />
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- the seven platforms on a turning ring ---------- */

export function Orbit({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const n = PLATFORMS.length;
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="orbit-wrap">
      <div className="orbit" style={{ ["--n" as string]: n }}>
        {PLATFORMS.map((p, i) => (
          <button
            key={p.id}
            className="orbit-face"
            style={{
              ["--i" as string]: i,
              ["--c" as string]: p.color,
            }}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
            title={ar ? p.ar : p.en}
          >
            <PlatformIcon id={p.id} size={30} />
          </button>
        ))}
      </div>
      <div className="orbit-label">
        {hover === null
          ? ar
            ? "سبع منصّات"
            : "seven platforms"
          : ar
            ? PLATFORMS[hover].ar
            : PLATFORMS[hover].en}
      </div>
    </div>
  );
}

/* ---------- a layer that drifts as you scroll ---------- */

export function Parallax({
  children,
  depth = 18,
  className,
}: {
  children: ReactNode;
  depth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || STILL) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2 - innerHeight / 2;
        el.style.transform = `translate3d(0, ${((-mid / innerHeight) * depth).toFixed(2)}px, 0)`;
      });
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", on);
    };
  }, [depth]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ---------- the emblem, given real depth ---------- */

/** المقاس يأتي من CSS عبر المتغيّر --em حتى يصغر مع الشاشة */
export function Emblem3D() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || STILL) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const px = e.clientX / innerWidth - 0.5;
        const py = e.clientY / innerHeight - 0.5;
        el.style.setProperty("--ex", `${(px * 26).toFixed(2)}deg`);
        el.style.setProperty("--ey", `${(-py * 18).toFixed(2)}deg`);
      });
    };
    addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
    };
  }, []);

  const layers = [
    { z: 64, s: 0.52, o: 0.95, c: "var(--live)" },
    { z: 40, s: 0.68, o: 0.5, c: "var(--accent)" },
    { z: 16, s: 0.84, o: 0.34, c: "var(--accent)" },
    { z: -10, s: 1, o: 0.22, c: "var(--accent-2)" },
    { z: -38, s: 1.18, o: 0.12, c: "var(--accent-2)" },
  ];

  return (
    <div className="em3-scene">
      <div className="em3" ref={ref}>
        {layers.map((l, i) => (
          <div
            key={i}
            className="em3-hex"
            style={{
              transform: `translateZ(${l.z}px) scale(${l.s})`,
              borderColor: l.c,
              opacity: l.o,
            }}
          />
        ))}
        <div className="em3-ring em3-r1" />
        <div className="em3-ring em3-r2" />
        <div className="em3-core">
          <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="var(--live)" strokeWidth="1.8" strokeLinecap="round">
            <rect x="4" y="10" width="16" height="11" rx="3" fill="var(--live)" fillOpacity="0.14" />
            <path d="M7.5 10V7a4.5 4.5 0 0 1 9 0v3" />
            <circle cx="12" cy="15.5" r="1.4" fill="var(--live)" stroke="none" />
          </svg>
        </div>
        <div className="em3-scan" />
      </div>
    </div>
  );
}
