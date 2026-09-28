import {
  Download,
  Lock,
  ShieldCheck,
  Cpu,
  EyeOff,
  Users,
  Radar,
  ArrowDownToLine,
  RotateCcw,
  KeyRound,
  Server,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal, Counter } from "./fx.tsx";
import { Emblem3D, Marquee, Tilt, Orbit } from "./three.tsx";
import { Replica } from "./replica.tsx";
import { PlatformIcon, BrandMark, GithubMark } from "./icons.tsx";
import { PLATFORMS, REPO_URL, t, type Lang } from "./i18n.ts";
import { stats, type Stats } from "./github.ts";

const RELEASES = `${REPO_URL}/releases/latest`;

const FEATURE_ICONS = [Cpu, Lock, EyeOff, Users, Radar, ArrowDownToLine];
const CHIP_ICONS = [ShieldCheck, Lock, Cpu, EyeOff];
const CHAIN_ICONS = [Lock, KeyRound, ShieldCheck];

export function Hero({ lang }: { lang: Lang }) {
  const d = t(lang).hero;
  return (
    <section className="hero">
      <div className="wrap hero-in">
        <div className="hero-copy">
          <Reveal>
            <span className="chip hero-badge">
              <i className="dot" />
              {d.badge}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1>
              {d.title1}
              <br />
              <span className="grad">{d.title2}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lead">{d.lead}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="hero-cta">
              <a className="btn btn-primary" href={RELEASES} target="_blank" rel="noreferrer">
                <Download />
                {d.download}
              </a>
              <a className="btn btn-ghost" href={REPO_URL} target="_blank" rel="noreferrer">
                <GithubMark />
                {d.source}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="hero-note">{d.note}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="hero-chips">
              {d.chips.map((c, i) => {
                const I = CHIP_ICONS[i];
                return (
                  <span className="assure" key={c}>
                    <I />
                    {c}
                  </span>
                );
              })}
            </div>
          </Reveal>
        </div>

        <Reveal className="hero-art" delay={0.1} y={30}>
          <div className="emblem-wrap">
            <Emblem3D />
          </div>
        </Reveal>
      </div>
      <p className="hero-by">{d.by}</p>
      <Marquee items={lang === "ar" ? BAND_AR : BAND_EN} speed={46} />
      <Marquee items={lang === "ar" ? BAND2_AR : BAND2_EN} speed={58} reverse />
    </section>
  );
}

const BAND_AR = [
  "بلا كلمة سر",
  "AES-256-GCM",
  "مربوط بجهازك وحده",
  "سبع منصّات",
  "بلا صلاحيات مدير",
  "ملف واحد بلا مثبِّت",
  "مفتوح المصدر",
  "بلا خوادم",
  "بلا تتبّع",
  "عربي وإنجليزي",
];

const BAND2_AR = [
  "ستيم",
  "باتل نت",
  "رايوت",
  "إيبك جيمز",
  "يوبيسوفت كونكت",
  "روكستار",
  "جوج جالاكسي",
  "ملفات شخصية لكل من يستخدم الجهاز",
  "استرجاع كامل لو تعثّر التبديل",
];

const BAND_EN = [
  "no passwords",
  "AES-256-GCM",
  "bound to this PC alone",
  "seven platforms",
  "no admin rights",
  "one file, no installer",
  "open source",
  "no servers",
  "no tracking",
  "Arabic and English",
];

const BAND2_EN = [
  "Steam",
  "Battle.net",
  "Riot Games",
  "Epic Games",
  "Ubisoft Connect",
  "Rockstar",
  "GOG Galaxy",
  "a profile for everyone on the machine",
  "full rollback if a switch stumbles",
];

export function Platforms({ lang }: { lang: Lang }) {
  const d = t(lang).platforms;
  return (
    <section id="platforms">
      <div className="wrap">
        <Reveal className="head">
          <span className="eyebrow">{d.eyebrow}</span>
          <h2>{d.title}</h2>
          <p>{d.lead}</p>
        </Reveal>
        <div className="plat-grid">
          {PLATFORMS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <div className="plat" style={{ ["--c" as string]: p.color }}>
                <PlatformIcon id={p.id} size={30} />
                <b>{lang === "ar" ? p.ar : p.en}</b>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="plat-note">{d.note}</p>
        </Reveal>
        <Reveal delay={0.26} y={26}>
          <Orbit lang={lang} />
        </Reveal>
      </div>
    </section>
  );
}

export function Features({ lang }: { lang: Lang }) {
  const d = t(lang).features;
  return (
    <section id="features">
      <div className="wrap">
        <Reveal className="head">
          <span className="eyebrow">{d.eyebrow}</span>
          <h2>{d.title}</h2>
          <p>{d.lead}</p>
        </Reveal>
        <div className="feat-grid">
          {d.items.map((f, i) => {
            const I = FEATURE_ICONS[i % FEATURE_ICONS.length];
            return (
              <Reveal key={f.title} delay={(i % 3) * 0.06}>
                <Tilt>
                <article className="card feat">
                  <span className="feat-ico">
                    <I />
                  </span>
                  <span className="tag">{f.tag}</span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </article>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function How({ lang }: { lang: Lang }) {
  const d = t(lang).how;
  return (
    <section id="how">
      <div className="wrap">
        <Reveal className="head">
          <span className="eyebrow">{d.eyebrow}</span>
          <h2>{d.title}</h2>
          <p>{d.lead}</p>
        </Reveal>
        <ol className="steps">
          {d.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <li className="step">
                <span className="step-n num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Security({ lang }: { lang: Lang }) {
  const d = t(lang).security;
  return (
    <section id="security">
      <div className="wrap">
        <Reveal className="head">
          <span className="eyebrow">{d.eyebrow}</span>
          <h2>{d.title}</h2>
          <p>{d.lead}</p>
        </Reveal>

        <div className="chain">
          {d.chain.map((c, i) => {
            const I = CHAIN_ICONS[i];
            return (
              <Reveal key={c.title} delay={i * 0.08}>
                <article className="card link">
                  <span className="link-n num">{i + 1}</span>
                  <span className="link-ico">
                    <I />
                  </span>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="sec-bottom">
          <Reveal delay={0.1}>
            <article className="card rollback">
              <span className="feat-ico">
                <RotateCcw />
              </span>
              <h3>{d.rollback.title}</h3>
              <p>{d.rollback.body}</p>
            </article>
          </Reveal>
          <Reveal delay={0.16}>
            <ul className="facts card">
              {d.facts.map((f) => (
                <li key={f.k}>
                  <span>{f.k}</span>
                  <b>
                    <Server />
                    {f.v}
                  </b>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Story({ lang }: { lang: Lang }) {
  const d = t(lang).story;
  return (
    <section id="story" className="story">
      <div className="wrap story-in">
        <Reveal className="head">
          <span className="eyebrow">{d.eyebrow}</span>
          <h2>{d.title}</h2>
        </Reveal>
        <div className="story-body">
          {d.paras.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className={i === 0 ? "lede" : undefined}>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Team({ lang }: { lang: Lang }) {
  const d = t(lang).team;
  const initials = (n: string) =>
    n
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("");
  return (
    <section id="team">
      <div className="wrap">
        <Reveal className="head">
          <span className="eyebrow">{d.eyebrow}</span>
          <h2>{d.title}</h2>
          <p>{d.lead}</p>
        </Reveal>
        <div className="team-grid">
          {d.people.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className="card person">
                <div className="person-top">
                  <span className="mono-hex">{initials(p.name)}</span>
                  <div>
                    <h3>{p.name}</h3>
                    <span className="person-role">{p.role}</span>
                  </div>
                </div>
                <p>{p.bio}</p>
                <div className="person-tags">
                  {p.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                {p.links?.length ? (
                  <div className="person-links">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                        <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cta({ lang }: { lang: Lang }) {
  const d = t(lang).cta;
  return (
    <section id="get" className="get">
      <div className="wrap">
        <Reveal>
          <div className="card get-card">
            <BrandMark size={52} />
            <h2>{d.title}</h2>
            <p>{d.lead}</p>
            <div className="hero-cta">
              <a className="btn btn-primary" href={RELEASES} target="_blank" rel="noreferrer">
                <Download />
                {d.download}
              </a>
              <a className="btn btn-ghost" href={REPO_URL} target="_blank" rel="noreferrer">
                <GithubMark />
                {d.source}
              </a>
            </div>
            <span className="hero-note">{d.note}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const d = t(lang).footer;
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div className="foot-brand">
          <BrandMark size={26} />
          <b>{lang === "ar" ? "بديل" : "badeel"}</b>
        </div>
        <p>{d.built}</p>
        <p className="foot-dim">{d.licence}</p>
        <p className="foot-dim small">{d.rights}</p>
      </div>
    </footer>
  );
}

export function Try({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <section id="try">
      <div className="wrap">
        <Reveal className="head">
          <span className="eyebrow">{ar ? "جرّبه" : "Try it"}</span>
          <h2>{ar ? "البرنامج داخل متصفحك" : "The app, running in your browser"}</h2>
          <p>
            {ar
              ? "نسخة تفاعلية من نافذة بديل، اختر منصّة وتصفّح الحسابات وجرّب التبديل، ولا شيء يُثبَّت ولا شيء يُرسَل إلى أي مكان"
              : "A working replica of the badeel window. Pick a platform, browse the accounts, run a switch — nothing is installed and nothing is sent anywhere."}
          </p>
        </Reveal>
        <Reveal delay={0.08} y={28}>
          <div className="try-frame">
            <Replica lang={lang} />
          </div>
          <p className="try-hint">
            {ar
              ? "اضغط أي منصّة من الشريط أو من البطاقات، ثم اضغط زر التبديل لتشوف خطوات المحرّك واحدة واحدة"
              : "Click any platform in the rail or the tiles, then Switch to this account to watch the engine steps"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Live({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const [s, setS] = useState<Stats | null>(null);

  useEffect(() => {
    let alive = true;
    stats().then((d) => {
      if (alive) setS(d);
    });
    return () => {
      alive = false;
    };
  }, []);

  if (!s) return null;

  const cells: { k: string; n: number; suffix?: string }[] = [
    { k: ar ? "تنزيل" : "downloads", n: s.downloads, suffix: "+" },
    { k: ar ? "نجمة على GitHub" : "GitHub stars", n: s.stars },
    { k: ar ? "إصدار" : "releases", n: s.releases },
  ];

  return (
    <section id="live" className="live">
      <div className="wrap">
        <Reveal>
          <div className="live-grid card">
            {cells.map((c) => (
              <div key={c.k}>
                <b>
                  <Counter to={c.n} suffix={c.suffix} />
                </b>
                <span>{c.k}</span>
              </div>
            ))}
            <div>
              <b className="num">v{s.version}</b>
              <span>{ar ? `أحدث إصدار · ${s.size}` : `latest · ${s.size}`}</span>
            </div>
          </div>
        </Reveal>
        <p className="live-note">{ar ? "مباشر من GitHub" : "live from GitHub"}</p>
      </div>
    </section>
  );
}

const SHOTS = ["home", "profiles", "settings", "team", "story"] as const;

export function Shots({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const [pick, setPick] = useState(0);
  const labels = ar
    ? ["الشاشة الرئيسية", "اختيار الملف الشخصي", "الإعدادات", "الفريق", "القصة"]
    : ["Home screen", "Profile picker", "Settings", "Team", "Story"];
  const base = import.meta.env.BASE_URL;

  return (
    <section id="shots">
      <div className="wrap">
        <Reveal className="head">
          <span className="eyebrow">{ar ? "لقطات" : "Screenshots"}</span>
          <h2>{ar ? "نظرة أقرب على البرنامج" : "A closer look"}</h2>
          <p>
            {ar
              ? "لقطات حقيقية من النسخة المنشورة، بلا تجميل ولا تركيب"
              : "Real captures from the published build, with nothing retouched."}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="shot-tabs">
            {labels.map((l, i) => (
              <button
                key={l}
                className={i === pick ? "on" : undefined}
                onClick={() => setPick(i)}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="card shot-frame">
            <img
              src={`${base}img/shots/${SHOTS[pick]}.png`}
              alt={labels[pick]}
              loading="lazy"
              width={1325}
              height={700}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function MapTeaser({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const [svg, setSvg] = useState("");
  const url = `${import.meta.env.BASE_URL}diagram/badeel-${lang}.svg`;
  const view = `${import.meta.env.BASE_URL}map.html?lang=${lang}`;

  useEffect(() => {
    let alive = true;
    fetch(url)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error("no map"))))
      .then((text) => {
        if (alive) setSvg(text);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [url]);

  return (
    <section id="map-teaser">
      <div className="wrap">
        <Reveal className="head">
          <span className="eyebrow">{ar ? "المخطط" : "Project map"}</span>
          <h2>{ar ? "المشروع كله في صورة واحدة" : "The whole project in one picture"}</h2>
          <p>
            {ar
              ? "كل قطعة في بديل وكيف تتحدث مع التي بعدها، مع لقطات حقيقية وأرقام تشير إلى كل جزء، ورحلة التبديل كاملة من الضغطة إلى اللعب"
              : "Every piece of badeel and how it talks to the next, with real captures, numbers pointing at each part, and the full journey of a switch from click to play."}
          </p>
        </Reveal>
        <Reveal delay={0.08} y={24}>
          <div className="teaser">
            <a className="card teaser-frame" href="#/map" aria-label={ar ? "افتح المخطط" : "Open the map"}>
              {svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : null}
            </a>
            <div className="teaser-actions">
              <a className="btn btn-primary btn-sm" href="#/map">
                {ar ? "افتح المخطط كاملًا" : "Open the full map"}
              </a>
              <a className="btn btn-ghost btn-sm" href={view} target="_blank" rel="noreferrer">
                {ar ? "المخطط في صفحة كاملة" : "The map on its own page"}
              </a>
              <a className="btn btn-ghost btn-sm" href={url} download={`badeel-map-${lang}.svg`}>
                {ar ? "نزّل الملف" : "Download it"}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
