import { useEffect, useState } from "react";
import { Reveal } from "./fx.tsx";
import { PlatformIcon } from "./icons.tsx";
import { inside } from "./content.ts";
import { REPO_URL, t, type Lang } from "./i18n.ts";
import { Story, Team } from "./sections.tsx";

export function InsidePage({ lang }: { lang: Lang }) {
  const d = inside(lang);
  const ar = lang === "ar";
  return (
    <>
      <section className="page-top">
        <div className="wrap">
          <Reveal className="head wide">
            <span className="eyebrow">{ar ? "الشفافية" : "Transparency"}</span>
            <h2>{d.title}</h2>
            <p>{d.lead}</p>
          </Reveal>
        </div>
      </section>

      <section id="tools">
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow">{ar ? "الأدوات" : "Tooling"}</span>
            <h2>{d.toolsTitle}</h2>
            <p>{d.toolsLead}</p>
          </Reveal>
          <div className="tool-grid">
            {d.tools.map((tool, i) => (
              <Reveal key={tool.name} delay={(i % 2) * 0.05}>
                <article className="card tool">
                  <div className="tool-head">
                    <b className="mono">{tool.name}</b>
                    <span>{tool.kind}</span>
                  </div>
                  <p>{tool.why}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="card no-list">
              <h3>{d.noTitle}</h3>
              <ul>
                {d.no.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="life">
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow">{ar ? "دورة الحياة" : "Lifecycle"}</span>
            <h2>{d.lifeTitle}</h2>
            <p>{d.lifeLead}</p>
          </Reveal>
          <ol className="life">
            {d.life.map((s, i) => (
              <Reveal key={s.n} delay={Math.min(i, 4) * 0.04}>
                <li className="stage">
                  <span className="stage-n num">{s.n}</span>
                  <div className="stage-body">
                    <h3>{s.title}</h3>
                    <p className="stage-lead">{s.body}</p>
                    <ul>
                      {s.detail.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="touch">
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow">{ar ? "الملفات" : "Files"}</span>
            <h2>{d.touchTitle}</h2>
            <p>{d.touchLead}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="card touch-wrap">
              <table className="touch">
                <thead>
                  <tr>
                    <th>{d.touchCols[0]}</th>
                    <th>{d.touchCols[1]}</th>
                  </tr>
                </thead>
                <tbody>
                  {d.touch.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <span className="touch-plat">
                          <PlatformIcon id={row.id} size={19} />
                          {row.where}
                        </span>
                      </td>
                      <td>
                        <ul className="touch-files">
                          {row.files.map((f) => (
                            <li key={f} className="mono">
                              {f}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="never">
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow">{ar ? "الحدود" : "Boundaries"}</span>
            <h2>{d.neverTitle}</h2>
            <p>{d.neverLead}</p>
          </Reveal>
          <div className="never-grid">
            {d.never.map((n, i) => (
              <Reveal key={n} delay={(i % 3) * 0.05}>
                <div className="never">
                  <span className="never-x">✕</span>
                  {n}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="verify">
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow">{ar ? "التحقّق" : "Verify"}</span>
            <h2>{d.verifyTitle}</h2>
            <p>{d.verifyLead}</p>
          </Reveal>
          <div className="verify-grid">
            {d.verify.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.05}>
                <article className="card verify">
                  <span className="verify-n num">{i + 1}</span>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                  {v.cmd ? <code className="cmd mono">{v.cmd}</code> : null}
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.12}>
            <a className="btn btn-ghost verify-cta" href={REPO_URL} target="_blank" rel="noreferrer">
              {ar ? "افتح المستودع واقرأ بنفسك" : "Open the repository and read it yourself"}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function MapPage({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const [svg, setSvg] = useState("");
  const [fail, setFail] = useState(false);
  const url = `${import.meta.env.BASE_URL}diagram/badeel-${lang}.svg`;
  const view = `${import.meta.env.BASE_URL}map.html?lang=${lang}`;

  useEffect(() => {
    let alive = true;
    fetch(url)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error("no map"))))
      .then((text) => {
        if (alive) setSvg(text);
      })
      .catch(() => {
        if (alive) setFail(true);
      });
    return () => {
      alive = false;
    };
  }, [url]);

  return (
    <>
      <section className="page-top">
        <div className="wrap">
          <Reveal className="head wide">
            <span className="eyebrow">{ar ? "المخطط" : "The map"}</span>
            <h2>{ar ? "المشروع كله في صورة واحدة" : "The whole project in one picture"}</h2>
            <p>
              {ar
                ? "كل قطعة في بديل وكيف تتحدث مع التي بعدها، مع لقطات حقيقية من البرنامج وأرقام تشير إلى كل جزء فيها، جهازك في الأعلى يمينًا، والخزنة وبياناتك المشفّرة على اليسار، وتحتهما المصدر والتحديثات، وفي الأسفل رحلة التبديل كاملة من الضغطة إلى اللعب."
                : "Every piece of badeel and how it talks to the next, with real captures from the app and numbers pointing at each part. Your machine at the top, the vault and your encrypted data beside it, the source and updates below, and at the bottom the full journey of a switch from click to play."}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="map-sec">
        <div className="wrap">
          <Reveal delay={0.06} y={26}>
            <a
              className="card map-frame"
              href={view}
              target="_blank"
              rel="noreferrer"
              title={ar ? "افتح المخطط في صفحة كاملة" : "Open the map on its own page"}
            >
              {svg ? (
                <div className="map-svg" dangerouslySetInnerHTML={{ __html: svg }} />
              ) : (
                <p className="map-wait">
                  {fail
                    ? ar
                      ? "تعذّر تحميل المخطط"
                      : "The map could not be loaded"
                    : ar
                      ? "يُحمّل المخطط"
                      : "Loading the map"}
                </p>
              )}
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="map-hint">
              {ar
                ? "اسحب المخطط يمينًا ويسارًا لتقرأه، أو افتحه في صفحة كاملة لتكبّره"
                : "Swipe the map sideways to read it, or open it on its own page to zoom"}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="map-actions">
              <a className="btn btn-primary btn-sm" href={view} target="_blank" rel="noreferrer">
                {ar ? "افتح المخطط في صفحة كاملة" : "Open the map on its own page"}
              </a>
              <a className="btn btn-ghost btn-sm" href={url} download={`badeel-map-${lang}.svg`}>
                {ar ? "نزّل الملف" : "Download the file"}
              </a>
            </div>
            <div className="legend">
              <span>
                <i style={{ background: "#7fd6ca" }} />
                {ar ? "جهاز اللاعب" : "your machine"}
              </span>
              <span>
                <i style={{ background: "#40c694" }} />
                {ar ? "الخزنة والبيانات" : "vault and data"}
              </span>
              <span>
                <i style={{ background: "#e4b052" }} />
                {ar ? "المصدر والتحديثات" : "source and updates"}
              </span>
              <span>
                <i style={{ background: "#70b2e8" }} />
                {ar ? "رحلة التبديل" : "the journey of a switch"}
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function StoryPage({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const d = t(lang);
  return (
    <>
      <section className="page-top">
        <div className="wrap">
          <Reveal className="head wide">
            <span className="eyebrow">{ar ? "من نحن" : "About us"}</span>
            <h2>{ar ? "من نحن ولماذا بنينا هذا" : "Who we are, and why we built this"}</h2>
            <p>{d.team.lead}</p>
          </Reveal>
        </div>
      </section>
      <Story lang={lang} />
      <Team lang={lang} />
    </>
  );
}
