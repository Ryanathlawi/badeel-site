import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { PlatformIcon, BrandMark } from "./icons.tsx";
import { PLATFORMS, type Lang } from "./i18n.ts";

const W = 1000;
const H = 620;
const MIN_SCALE = 0.6;

type Account = { id: string; name: string; note: string };

const ACCOUNTS: Record<string, Account[]> = {
  steam: [
    { id: "s-ryan", name: "Ryan", note: "ryan_main" },
    { id: "s-moayad", name: "Moayad", note: "moayad" },
    { id: "s-ryan-alt", name: "Ryan Alt", note: "ryan_ranked" },
    { id: "s-moayad-alt", name: "Moayad Alt", note: "moayad_smurf" },
  ],
  battlenet: [
    { id: "b-ryan", name: "Ryan", note: "#1194" },
    { id: "b-moayad", name: "Moayad", note: "#2271" },
  ],
  riot: [{ id: "r-ryan", name: "Ryan", note: "#GULF" }],
  epic: [{ id: "e-moayad", name: "Moayad", note: "epicgames" }],
  ubisoft: [{ id: "u-ryan", name: "Ryan", note: "ubisoft connect" }],
  rockstar: [{ id: "k-moayad", name: "Moayad", note: "social club" }],
  gog: [],
};

const STEPS_AR = ["أغلق المنصّة…", "أحفظ الحساب الحالي…", "أركّب الحساب…", "أشغّل…", "تم"];
const STEPS_EN = [
  "Closing the platform…",
  "Saving current account…",
  "Restoring account…",
  "Launching…",
  "Done",
];

function hue(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % 360;
}

function Avatar({ name, size = 38 }: { name: string; size?: number }) {
  const h = hue(name);
  return (
    <span
      className="rp-av"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(150deg, hsl(${h} 58% 42%), hsl(${(h + 48) % 360} 54% 28%))`,
        fontSize: size * 0.4,
      }}
    >
      {name.slice(0, 1).toUpperCase()}
    </span>
  );
}

function Emblem() {
  const pts = (r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
    }).join(" ");
  return (
    <svg className="rp-emblem" viewBox="0 0 100 100" width="104" height="104" aria-hidden="true">
      <g className="em-spin">
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.6"
          strokeWidth="2"
          strokeDasharray="34 58"
          strokeLinecap="round"
        />
      </g>
      <g className="em-spin-back">
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="var(--accent-2)"
          strokeOpacity="0.5"
          strokeWidth="1.8"
          strokeDasharray="18 46"
          strokeLinecap="round"
        />
      </g>
      <polygon points={pts(32)} fill="#0b0f15" fillOpacity="0.9" />
      <polygon points={pts(32)} fill="none" stroke="var(--accent)" strokeWidth="2" />
      <polygon points={pts(23)} fill="none" stroke="var(--accent)" strokeOpacity="0.3" />
      <g
        transform="translate(50 50)"
        stroke="var(--live)"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      >
        <rect x="-8" y="-1" width="16" height="12" rx="3" fill="var(--live)" fillOpacity="0.14" />
        <path d="M-5 -1v-4a5 5 0 0 1 10 0v4" />
      </g>
    </svg>
  );
}

export function Replica({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const box = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [view, setView] = useState<"home" | "accounts">("home");
  const [plat, setPlat] = useState(0);
  const [curtain, setCurtain] = useState(0);
  const [step, setStep] = useState<number | null>(null);
  const [active, setActive] = useState<Record<string, string>>({
    steam: "s-ryan",
    battlenet: "b-moayad",
  });
  const [picked, setPicked] = useState<string | null>("s-ryan");

  /* النافذة مقاسها ثابت، فتُصغَّر لتدخل في العرض المتاح. وتحت عرض
     معيّن يصير التصغير أصغر من أن يُقرأ، فنثبّت حدًّا أدنى ونترك
     الصندوق نفسه يُسحب يمينًا ويسارًا بدل أن تختفي التفاصيل. */
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(Math.max(Math.min(1, el.clientWidth / W), MIN_SCALE));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const falling = curtain > 0;
  useEffect(() => {
    if (!falling) return;
    let raf = 0;
    let last = performance.now();
    const tick = (ms: number) => {
      const dt = (ms - last) / 1000;
      last = ms;
      setCurtain((c) => Math.max(0, c - dt / 0.78));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [falling]);

  useEffect(() => {
    if (step === null) return;
    if (step >= 4) {
      const done = setTimeout(() => setStep(null), 900);
      return () => clearTimeout(done);
    }
    const nxt = setTimeout(() => setStep((s) => (s === null ? null : s + 1)), 850);
    return () => clearTimeout(nxt);
  }, [step]);

  const go = useCallback((i: number) => {
    setPlat(i);
    setView("accounts");
    setCurtain(1);
    const list = ACCOUNTS[PLATFORMS[i].id] ?? [];
    setPicked(list[0]?.id ?? null);
  }, []);

  const home = useCallback(() => {
    setView("home");
    setCurtain(1);
  }, []);

  const p = PLATFORMS[plat];
  const list = ACCOUNTS[p.id] ?? [];
  const shown = list.find((a) => a.id === picked) ?? list[0] ?? null;
  const live = active[p.id];
  const total = Object.values(ACCOUNTS).reduce((n, a) => n + a.length, 0);
  const isLive = shown ? live === shown.id : false;

  const doSwitch = () => {
    if (!shown || step !== null) return;
    setStep(0);
    setTimeout(() => setActive((a) => ({ ...a, [p.id]: shown.id })), 2600);
  };

  const veil = Math.min(1, curtain / 0.34);
  const markA = Math.max(0, Math.min(1, (curtain - 0.3) / 0.26));

  return (
    <div className="rp-box" ref={box} dir={ar ? "rtl" : "ltr"}>
      <div className="rp-track" style={{ width: W * scale, height: H * scale }}>
        <div
          className="rp"
          style={{ width: W, height: H, transform: `scale(${scale})` }}
          data-scaled={scale < 1 ? "yes" : "no"}
        >
        <div className="rp-title">
          <span className="rp-dots">
            <i /> <i /> <i />
          </span>
          <span className="rp-tt">
            {ar ? "بديل — مبدّل حسابات الألعاب" : "badeel — game account switcher"}
          </span>
        </div>

        <div className="rp-head">
          <div className="rp-brand">
            <BrandMark size={30} />
            <b>{ar ? "بديل" : "badeel"}</b>
          </div>
          <div className="rp-chips">
            <span className="rp-chip">
              <i className="d d-plat" />
              {`${ar ? p.ar : p.en} · ${list.length} ${ar ? "حساب" : "accounts"}`}
            </span>
            <span className="rp-chip">
              <i className="d d-live" />
              {ar ? "الخزنة · مفتوحة ومشفّرة" : "Vault · unlocked"}
            </span>
            <span className="rp-chip">
              <i className="d d-acc" />
              {ar ? "النسخة العربية · v0.1.5" : "English build · v0.1.5"}
            </span>
          </div>
        </div>

        <div className="rp-body">
          <div className="rp-rail">
            <button
              className={`rp-rb ${view === "home" ? "on" : ""}`}
              onClick={home}
              title={ar ? "الرئيسية" : "Home"}
            >
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l9-8 9 8" />
                <path d="M5 10v10h14V10" />
              </svg>
            </button>
            {PLATFORMS.map((q, i) => (
              <button
                key={q.id}
                className={`rp-rb ${view === "accounts" && i === plat ? "on" : ""}`}
                style={{ ["--c" as string]: q.color }}
                onClick={() => go(i)}
                title={ar ? q.ar : q.en}
              >
                <PlatformIcon id={q.id} size={20} />
                {(ACCOUNTS[q.id] ?? []).length > 0 && (
                  <span className="rp-badge">{(ACCOUNTS[q.id] ?? []).length}</span>
                )}
              </button>
            ))}
          </div>

          <div className="rp-stage">
            {view === "home" ? (
              <div className="rp-home">
                <div className="rp-hero">
                  <div className="rp-hero-em">
                    <Emblem />
                  </div>
                  <div className="rp-hero-txt">
                    <span className="rp-hi">{ar ? "مساء الخير، ريان" : "Good evening, Ryan"}</span>
                    <h4>{ar ? "أهلًا بك في بديل" : "Welcome to badeel"}</h4>
                    <p>
                      {ar
                        ? `حساباتك كلّها في نافذة واحدة · ${total} محفوظ على هذا الجهاز`
                        : `Every account in one window · ${total} stored on this PC`}
                    </p>
                    <div className="rp-assure">
                      <span>{ar ? "الخزنة مفتوحة" : "Vault open"}</span>
                      <span>AES-256-GCM</span>
                      <span>{ar ? "هذا الجهاز فقط" : "This PC only"}</span>
                    </div>
                  </div>
                  <div className="rp-hero-stats">
                    <div>
                      <b>{total}</b>
                      <span>{ar ? "حساب محفوظ" : "accounts"}</span>
                    </div>
                    <div>
                      <b>6/7</b>
                      <span>{ar ? "منصّة مثبّتة" : "platforms"}</span>
                    </div>
                  </div>
                </div>

                <div className="rp-band">{ar ? "منصّاتك" : "YOUR PLATFORMS"}</div>
                <div className="rp-plats">
                  {PLATFORMS.map((q, i) => (
                    <button
                      key={q.id}
                      className="rp-plat"
                      style={{ ["--c" as string]: q.color }}
                      onClick={() => go(i)}
                    >
                      <PlatformIcon id={q.id} size={26} />
                      <b>{ar ? q.ar : q.en}</b>
                      <span>
                        {(ACCOUNTS[q.id] ?? []).length} {ar ? "حساب" : "accounts"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rp-acc">
                {shown ? (
                  <div className="rp-card">
                    <Avatar name={shown.name} size={78} />
                    <h4>{shown.name}</h4>
                    <span className="rp-sub">{`${ar ? p.ar : p.en} · ${shown.note}`}</span>
                    {isLive && (
                      <span className="rp-livepill">
                        <i /> {ar ? "مسجَّل دخوله الآن" : "signed in right now"}
                      </span>
                    )}
                    <div className="rp-actions">
                      <button className="rp-primary" onClick={doSwitch} disabled={isLive}>
                        {isLive
                          ? ar
                            ? "شغّل المنصّة"
                            : "Launch platform"
                          : ar
                            ? "بدّل إلى هذا الحساب"
                            : "Switch to this account"}
                      </button>
                      <button className="rp-ghost">{ar ? "الصورة" : "Picture"}</button>
                      <button className="rp-ghost">{ar ? "التسمية" : "Rename"}</button>
                    </div>
                    <div className="rp-tiles">
                      <div>
                        <span>{ar ? "آخر استخدام" : "Last used"}</span>
                        <b>{ar ? "قبل ساعتين" : "2h ago"}</b>
                      </div>
                      <div>
                        <span>{ar ? "مرات التبديل" : "Switches"}</span>
                        <b>12</b>
                      </div>
                      <div>
                        <span>{ar ? "الحماية" : "Protection"}</span>
                        <b className="ok">AES-256</b>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rp-card rp-empty">
                    <PlatformIcon id={p.id} size={44} />
                    <h4>{ar ? "ما فيه حسابات محفوظة هنا بعد" : "No accounts saved here yet"}</h4>
                    <span className="rp-sub">
                      {ar
                        ? "سجّل دخولك في المنصّة، ثم اضغط «أضف الحساب الحالي»"
                        : "Sign in on the platform, then press Add current account"}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {view === "accounts" && (
            <div className="rp-list">
              <div className="rp-list-head">
                <b>{ar ? p.ar : p.en}</b>
                <span className="rp-count">{list.length}</span>
              </div>
              <div className="rp-rows">
                {list.map((a) => (
                  <button
                    key={a.id}
                    className={`rp-row ${picked === a.id ? "on" : ""}`}
                    onClick={() => setPicked(a.id)}
                  >
                    <Avatar name={a.name} />
                    <span className="rp-row-txt">
                      <b>{a.name}</b>
                      <i>{a.note}</i>
                    </span>
                    {live === a.id && <span className="rp-tag">{ar ? "المفعّل" : "active"}</span>}
                  </button>
                ))}
                {list.length === 0 && (
                  <p className="rp-none">{ar ? "لا حسابات محفوظة بعد" : "No saved accounts yet"}</p>
                )}
              </div>
              <button className="rp-add">{ar ? "أضف الحساب الحالي" : "Add current account"}</button>
            </div>
          )}
        </div>

        <div className="rp-foot">
          <span>
            {ar
              ? "بديل · تأسيس وتطوير: ريان الأثلاوي ومؤيد المطيري · GPL-3.0"
              : "badeel · founded by Ryan Athlawi & Moayad Almutairi · GPL-3.0"}
          </span>
          <span className="rp-keys">
            <kbd>1-7</kbd> {ar ? "المنصّة" : "platform"} <kbd>S</kbd> {ar ? "الإعدادات" : "settings"}
          </span>
        </div>

        {curtain > 0.002 && (
          <div className="rp-curtain" style={{ opacity: veil }}>
            <div className="rp-loader" style={{ opacity: markA }}>
              <Emblem />
              <span>{ar ? "لحظة…" : "one moment…"}</span>
            </div>
          </div>
        )}

        {step !== null && (
          <div className="rp-busy">
            <div className="rp-busy-card">
              <Emblem />
              <b>{ar ? "جارٍ التبديل" : "Switching"}</b>
              <span>{(ar ? STEPS_AR : STEPS_EN)[step]}</span>
              <div className="rp-bar">
                <i style={{ width: `${((step + 1) / 5) * 100}%` }} />
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
