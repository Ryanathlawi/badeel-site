import { REPO } from "./i18n.ts";

export type Stats = {
  stars: number;
  releases: number;
  downloads: number;
  version: string;
  size: string;
  url: string;
};

type Release = {
  tag_name: string;
  draft: boolean;
  prerelease: boolean;
  html_url: string;
  assets: { name: string; size: number; download_count: number }[];
};

const API = `https://api.github.com/repos/${REPO}`;
const CACHE = "bd-stats";
const TTL = 30 * 60 * 1000;

function cached(): Stats | null {
  try {
    const raw = localStorage.getItem(CACHE);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw) as { at: number; data: Stats };
    return Date.now() - at < TTL ? data : null;
  } catch {
    return null;
  }
}

function keep(data: Stats) {
  try {
    localStorage.setItem(CACHE, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* private mode */
  }
}

export async function stats(): Promise<Stats | null> {
  const hit = cached();
  if (hit) return hit;

  try {
    const [repoRes, relRes] = await Promise.all([
      fetch(API),
      fetch(`${API}/releases?per_page=100`),
    ]);
    if (!repoRes.ok || !relRes.ok) return null;

    const repo = (await repoRes.json()) as { stargazers_count: number };
    const releases = (await relRes.json()) as Release[];
    const live = releases.filter((r) => !r.draft);
    if (live.length === 0) return null;

    const newest = live.find((r) => !r.prerelease) ?? live[0];
    const exe =
      newest.assets.find((a) => a.name.toLowerCase().endsWith(".exe")) ?? newest.assets[0];

    const data: Stats = {
      stars: repo.stargazers_count ?? 0,
      releases: live.length,
      downloads: live.reduce(
        (n, r) => n + r.assets.reduce((m, a) => m + (a.download_count ?? 0), 0),
        0,
      ),
      version: newest.tag_name.replace(/^v/, ""),
      size: exe ? `${(exe.size / 1024 / 1024).toFixed(1)} MB` : "",
      url: newest.html_url,
    };
    keep(data);
    return data;
  } catch {
    return null;
  }
}
