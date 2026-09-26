import { useState } from "react";
import { Download, Languages } from "lucide-react";
import { HexField } from "./fx.tsx";
import { BrandMark, GithubMark } from "./icons.tsx";
import { REPO_URL, setLang, type Lang } from "./i18n.ts";
import { useRoute, type Route } from "./router.ts";
import {
  Hero,
  Try,
  Live,
  Platforms,
  Features,
  How,
  Security,
  MapTeaser,
  Shots,
  Cta,
  Footer,
} from "./sections.tsx";
import { InsidePage, MapPage, StoryPage } from "./pages.tsx";

export default function App() {
  const [lang, setL] = useState<Lang>(
    (document.documentElement.dataset.lang as Lang) || "ar",
  );
  const [route] = useRoute();

  const flip = () => {
    const next: Lang = lang === "ar" ? "en" : "ar";
    setLang(next);
    setL(next);
  };

  const ar = lang === "ar";
  const tabs: { id: Route; label: string; href: string }[] = [
    { id: "home", label: ar ? "الرئيسية" : "Home", href: "#/" },
    { id: "inside", label: ar ? "داخل بديل" : "Inside badeel", href: "#/inside" },
    { id: "map", label: ar ? "المخطط" : "The map", href: "#/map" },
    { id: "story", label: ar ? "القصة والفريق" : "Story and team", href: "#/story" },
  ];

  return (
    <>
      <HexField />
      <div className="shell">
        <header className="nav">
          <div className="wrap nav-in">
            <a className="brand" href="#/">
              <BrandMark />
              <span>{ar ? "بديل" : "badeel"}</span>
            </a>
            <nav className="nav-links">
              {tabs.map((tab) => (
                <a key={tab.id} href={tab.href} className={route === tab.id ? "on" : undefined}>
                  {tab.label}
                </a>
              ))}
            </nav>
            <div className="nav-side">
              <button className="btn btn-ghost btn-sm" onClick={flip}>
                <Languages />
                {ar ? "EN" : "عربي"}
              </button>
              <a
                className="btn btn-ghost btn-sm"
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <GithubMark />
              </a>
              <a className="btn btn-primary btn-sm" href="#get">
                <Download />
                {ar ? "تحميل" : "Download"}
              </a>
            </div>
          </div>
          <nav className="tabbar">
            {tabs.map((tab) => (
              <a key={tab.id} href={tab.href} className={route === tab.id ? "on" : undefined}>
                {tab.label}
              </a>
            ))}
          </nav>
        </header>

        <main id="top">
          {route === "home" && (
            <>
              <Hero lang={lang} />
              <Try lang={lang} />
              <Live lang={lang} />
              <Platforms lang={lang} />
              <Features lang={lang} />
              <How lang={lang} />
              <Security lang={lang} />
              <MapTeaser lang={lang} />
              <Shots lang={lang} />
              <Cta lang={lang} />
            </>
          )}
          {route === "inside" && (
            <>
              <InsidePage lang={lang} />
              <Cta lang={lang} />
            </>
          )}
          {route === "map" && (
            <>
              <MapPage lang={lang} />
              <Cta lang={lang} />
            </>
          )}
          {route === "story" && (
            <>
              <StoryPage lang={lang} />
              <Cta lang={lang} />
            </>
          )}
        </main>

        <Footer lang={lang} />
      </div>
    </>
  );
}
