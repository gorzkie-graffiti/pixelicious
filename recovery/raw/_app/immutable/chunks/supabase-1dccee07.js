import { c as m, s as n } from "./index-fd111bee.js";
const u = "@supabase/auth-helpers-sveltekit",
  r = "0.8.6";
function b(s, t, a, e) {
  var l;
  const I = {
      ...a,
      global: {
        ...(a == null ? void 0 : a.global),
        headers: {
          ...((l = a == null ? void 0 : a.global) == null ? void 0 : l.headers),
          "X-Client-Info": `${u}@${r}`,
        },
      },
      auth: { storageKey: (e == null ? void 0 : e.name) ?? "supabase-auth-token" },
    },
    c = m({ supabaseUrl: s, supabaseKey: t, options: I, cookieOptions: e });
  return (
    n({
      globalInstance: c,
      supabaseUrl: s,
      supabaseKey: t,
      options: I,
      cookieOptions: {
        name: "supabase-auth-token",
        path: "/",
        sameSite: "lax",
        maxAge: 1e3 * 60 * 60 * 24 * 365,
        ...e,
      },
    }),
    c
  );
}
const h =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qYW1wenJ2cWp2Z3F5amxvZXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM1MDk1MDYsImV4cCI6MTk4OTA4NTUwNn0.y5koAdz2ac2s-3xPjbSfOeovSgobyBfueFgUd3-N8uc",
  C = "https://mjampzrvqjvgqyjloepn.supabase.co",
  g = b(C, h);
export { g as s };
