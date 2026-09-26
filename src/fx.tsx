import { useEffect, useRef, useState, type ReactNode } from "react";

const STILL =
  typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- the living hex field ---------- */

export function HexField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const STEP = 78;
    const HR = STEP * 0.3;
    let cells: { x: number; y: number; k: number }[] = [];
    let motes: { x: number; y: number; vx: number; vy: number; r: number; a: number; c: number }[] = [];
    const base = document.createElement("canvas");
    const bctx = base.getContext("2d");

    const hexPath = (c: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
      c.beginPath();
      for (let i = 0; i < 6; i++) {
        const ang = (Math.PI / 3) * i - Math.PI / 2;
        const x = cx + r * Math.cos(ang);
        const y = cy + r * Math.sin(ang);
        if (i === 0) c.moveTo(x, y);
        else c.lineTo(x, y);
      }
      c.closePath();
    };

    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cells = [];
      const cols = Math.ceil(w / STEP) + 2;
      const rows = Math.ceil(h / (STEP * 0.87)) + 2;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          cells.push({
            x: i * STEP + (j % 2 ? STEP * 0.5 : 0) - STEP,
            y: j * STEP * 0.87 - STEP,
            k: (i + j) % 4,
          });
        }
      }

      motes = Array.from({ length: 64 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 10,
        vy: -6 - Math.random() * 14,
        r: 0.8 + Math.random() * 1.7,
        a: 0.12 + Math.random() * 0.4,
        c: Math.random() < 0.35 ? 1 : 0,
      }));

      base.width = cv.width;
      base.height = cv.height;
      if (bctx) {
        bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        bctx.clearRect(0, 0, w, h);
        bctx.lineWidth = 1;
        for (const c of cells) {
          bctx.strokeStyle = c.k === 0 ? "rgba(112,178,232,0.055)" : "rgba(42,182,166,0.05)";
          hexPath(bctx, c.x, c.y, HR);
          bctx.stroke();
        }
      }
    };

    const blobs = [
      { x: 0.14, y: 0.12, r: 0.56, c: "42,182,166", s: 0.19, d: 0.3 },
      { x: 0.86, y: 0.22, r: 0.46, c: "112,178,232", s: 0.15, d: 0.28 },
      { x: 0.58, y: 0.9, r: 0.52, c: "23,121,110", s: 0.17, d: 0.32 },
    ];

    let last = 0;
    const paint = (ms: number, dt: number) => {
      const t = ms / 1000;

      ctx.clearRect(0, 0, w, h);
      const big = Math.max(w, h);

      for (const b of blobs) {
        const cx = (b.x + b.d * 0.5 * Math.sin(t * b.s)) * w;
        const cy = (b.y + b.d * 0.4 * Math.cos(t * b.s * 1.31)) * h;
        const rad = big * b.r * (1 + 0.1 * Math.sin(t * b.s * 0.9));
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${b.c},0.13)`);
        g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.drawImage(base, 0, 0, w, h);

      ctx.lineWidth = 1.2;
      for (const c of cells) {
        const wave = Math.sin(t * 0.62 - (c.x / w) * 3.1 - (c.y / h) * 1.7);
        const lit = Math.pow(wave * 0.5 + 0.5, 5);
        if (lit < 0.16) continue;
        const col = c.k === 0 ? "112,178,232" : "42,182,166";
        ctx.strokeStyle = `rgba(${col},${(0.42 * lit).toFixed(3)})`;
        hexPath(ctx, c.x, c.y, HR * (0.92 + 0.16 * lit));
        ctx.stroke();
        if (lit > 0.62) {
          ctx.fillStyle = `rgba(${col},${(0.5 * (lit - 0.62)) / 0.38})`;
          ctx.beginPath();
          ctx.arc(c.x, c.y, 1.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (const m of motes) {
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        if (m.y < -12) {
          m.y = h + 12;
          m.x = Math.random() * w;
        }
        if (m.x < -12) m.x = w + 12;
        if (m.x > w + 12) m.x = -12;
        const tw = 0.6 + 0.4 * Math.sin(t * 1.6 + m.x * 0.02);
        ctx.fillStyle = m.c
          ? `rgba(112,178,232,${(m.a * tw).toFixed(3)})`
          : `rgba(42,182,166,${(m.a * tw).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const sweep = (t * 0.07) % 1;
      const sy = -160 + sweep * (h + 320);
      const sg = ctx.createLinearGradient(0, sy - 150, 0, sy + 150);
      sg.addColorStop(0, "rgba(112,178,232,0)");
      sg.addColorStop(0.5, "rgba(112,178,232,0.045)");
      sg.addColorStop(1, "rgba(112,178,232,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(0, sy - 150, w, 300);
    };

    const draw = (ms: number) => {
      raf = requestAnimationFrame(draw);
      const dt = last ? Math.min((ms - last) / 1000, 0.1) : 0.016;
      last = ms;
      paint(ms, dt);
    };

    const still = matchMedia("(prefers-reduced-motion: reduce)");
    const first = () => paint(performance.now(), 0);

    size();
    first();
    if (!still.matches) raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      size();
      first();
    });
    ro.observe(cv);

    const vis = () => {
      if (still.matches) return;
      cancelAnimationFrame(raf);
      last = 0;
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", vis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return (
    <div className="field" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}

/* ---------- reveal on scroll ---------- */

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(STILL || typeof IntersectionObserver !== "function");

  useEffect(() => {
    const el = ref.current;
    if (!el || STILL || typeof IntersectionObserver !== "function") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setOn(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "none" : `translateY(${y}px)`,
        transition: `opacity .7s var(--ease) ${delay}s, transform .7s var(--ease) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- a number that counts up when seen ---------- */

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [n, setN] = useState(STILL ? to : 0);

  useEffect(() => {
    const el = ref.current;
    if (!el || STILL) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (ms: number) => {
          const p = Math.min(1, (ms - t0) / 1100);
          const e = 1 - Math.pow(1 - p, 3);
          setN(Math.round(to * e));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} className="num">
      {n.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
