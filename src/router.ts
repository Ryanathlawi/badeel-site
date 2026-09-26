import { useEffect, useState } from "react";

export const ROUTES = ["home", "inside", "map", "story"] as const;
export type Route = (typeof ROUTES)[number];

function read(): Route {
  const h = location.hash.replace(/^#\/?/, "");
  return (ROUTES as readonly string[]).includes(h) ? (h as Route) : "home";
}

export function useRoute(): [Route, (r: Route) => void] {
  const [route, set] = useState<Route>(read);

  useEffect(() => {
    const on = () => {
      set(read());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);

  const go = (r: Route) => {
    location.hash = r === "home" ? "/" : `/${r}`;
  };

  return [route, go];
}
