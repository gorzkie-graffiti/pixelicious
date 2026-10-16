import {
  S as he,
  i as _e,
  s as fe,
  k as h,
  q as S,
  a as V,
  l as _,
  m as y,
  r as R,
  h as n,
  c as M,
  n as c,
  b as B,
  H as o,
  R as we,
  u as re,
  B as z,
  D as Je,
  p as Me,
  W as ue,
  g as Ge,
  t as K,
  d as Se,
  f as q,
  U as ke,
  o as Ke,
  A as Qe,
  a8 as Ze,
  a0 as $e,
  w as ge,
  x as ve,
  y as be,
  z as ye,
} from "../../../../chunks/index-def40737.js";
import { p as Ue } from "../../../../chunks/stores-5af73cf6.js";
import { L as et } from "../../../../chunks/Login-2c7bb3ae.js";
import { s as We } from "../../../../chunks/supabase-1dccee07.js";
import { l as qe } from "../../../../chunks/loadingIconWhite-601de10e.js";
import { c as tt, u as Oe } from "../../../../chunks/checkIcon-aa2334e1.js";
import { t as rt } from "../../../../chunks/toast-e4c2af5c.js";
import { b as st } from "../../../../chunks/bgRemovalExample1-37f76e22.js";
import { b as lt } from "../../../../chunks/bgRemovalExample2-7c4dfee8.js";
const at = (a, e = {}) => {
  Fe(e);
  let {
    colors: t = ["#FFC700", "#FF0000", "#2E3191", "#41BBC7"],
    duration: r = 3500,
    force: s = 0.5,
    particleCount: l = 150,
    particleShape: i = "mix",
    particleSize: g = 12,
    destroyAfterDone: u = !0,
    stageHeight: p = 800,
    stageWidth: E = 1600,
  } = e;
  (function (b) {
    const D = Ee("style");
    (D.dataset.neoconfetti = ""),
      (D.textContent =
        '@keyframes fk9XWG_y-axis{to{transform:translate3d(0,var(--stage-height),0)}}@keyframes fk9XWG_x-axis{to{transform:translate3d(var(--x-landing-point),0,0)}}@keyframes fk9XWG_rotation{50%{transform:rotate3d(var(--half-rotation),180deg)}to{transform:rotate3d(var(--rotation),360deg)}}.fk9XWG_container{width:0;height:0;z-index:1200;position:relative;overflow:visible}.fk9XWG_particle{animation:x-axis var(--duration-chaos)forwards cubic-bezier(var(--x1),var(--x2),var(--x3),var(--x4));animation-name:fk9XWG_x-axis}.fk9XWG_particle>div{animation:y-axis var(--duration-chaos)forwards cubic-bezier(var(--y1),var(--y2),var(--y3),var(--y4));width:var(--width);height:var(--height);animation-name:fk9XWG_y-axis;position:absolute;top:0;left:0}.fk9XWG_particle>div:before{height:100%;width:100%;content:"";background-color:var(--bgcolor);animation:rotation var(--rotation-duration)infinite linear;border-radius:var(--border-radius);animation-name:fk9XWG_rotation;display:block}'),
      Pe(document.head, D);
  })(),
    a.classList.add("fk9XWG_container"),
    a.style.setProperty("--stage-height", p + "px");
  let w,
    d = Ne(l, t),
    v = je(a, d);
  function G(b, D) {
    const k = ce(J() * (ut - 1)),
      x = i !== "rectangles" && (i === "circles" || ft(k)),
      f = (L, W) => b.style.setProperty(L, W + "");
    f("--x-landing-point", xe(pe(Ae(D, 90) - 180), 0, 180, -E / 2, E / 2) + "px"),
      f("--duration-chaos", r - ce(1e3 * J()) + "ms");
    const m = J() < ot ? ie(J() * nt, 2) : 0;
    f("--x1", m),
      f("--x2", -1 * m),
      f("--x3", m),
      f("--x4", ie(pe(xe(pe(Ae(D, 90) - 180), 0, 180, -1, 1)), 4)),
      f("--y1", ie(J() * Ce, 4)),
      f("--y2", ie(J() * s * (Ye() ? 1 : -1), 4)),
      f("--y3", Ce),
      f("--y4", ie(ct(xe(pe(D - 180), 0, 180, s, -s), 0), 4)),
      f("--width", (x ? g : ce(4 * J()) + g / 2) + "px"),
      f("--height", (x ? g : ce(2 * J()) + g) + "px");
    const P = k.toString(2).padStart(3, "0").split("");
    f(
      "--half-rotation",
      P.map((L) => +L / 2 + ""),
    ),
      f("--rotation", P),
      f("--rotation-duration", ie(J() * (it - Te) + Te) + "ms"),
      f("--border-radius", x ? "50%" : 0);
  }
  for (const [b, D] of Object.entries(v)) G(D, d[+b].degree);
  return (
    Promise.resolve().then(() => (w = setTimeout(() => u && (a.innerHTML = ""), r))),
    {
      update(b) {
        Fe(b);
        const D = b.particleCount ?? l,
          k = b.colors ?? t,
          x = b.stageHeight ?? p;
        if (((d = Ne(D, k)), D === l && JSON.stringify(t) !== JSON.stringify(k)))
          for (const [f, { color: m }] of Object.entries(d)) v[+f].style.setProperty("--bgcolor", m);
        D !== l && ((a.innerHTML = ""), (v = je(a, d))),
          u && !b.destroyAfterDone && clearTimeout(w),
          a.style.setProperty("--stage-height", x + "px"),
          (t = k),
          (r = b.duration ?? r),
          (s = b.force ?? s),
          (l = D),
          (i = b.particleShape ?? i),
          (g = b.particleSize ?? g),
          (u = b.destroyAfterDone ?? u),
          (p = x),
          (E = b.stageWidth ?? E);
      },
      destroy() {
        clearTimeout(w);
      },
    }
  );
};
function je(a, e = []) {
  const t = [];
  for (const { color: r } of e) {
    const s = Ee("div");
    (s.className = "fk9XWG_particle"), s.style.setProperty("--bgcolor", r);
    const l = Ee("div");
    Pe(s, l), Pe(a, s), t.push(s);
  }
  return t;
}
const Te = 200,
  it = 800,
  ot = 0.1,
  nt = 0.3,
  Ce = 0.5,
  pe = Math.abs,
  J = Math.random,
  ce = Math.round,
  ct = Math.max,
  Ee = (a) => document.createElement(a),
  Pe = (a, e) => a.appendChild(e),
  Ne = (a, e) => Array.from({ length: a }, (t, r) => ({ color: e[r % e.length], degree: (360 * r) / a })),
  ie = (a, e = 2) => ce((a + Number.EPSILON) * 10 ** e) / 10 ** e,
  xe = (a, e, t, r, s) => ((a - e) * (s - r)) / (t - e) + r,
  Ae = (a, e) => (a + e > 360 ? a + e - 360 : a + e),
  Ye = () => J() > 0.5,
  ut = 6,
  ft = (a) => a !== 1 && Ye(),
  De = (a) => a === void 0,
  oe = (a, e) => {
    if (!De(a) && Number.isSafeInteger(a) && a < 0) throw new Error(e + " must be a positive integer");
  },
  Fe = ({
    particleCount: a,
    duration: e,
    colors: t,
    particleSize: r,
    force: s,
    stageHeight: l,
    stageWidth: i,
    particleShape: g,
  }) => {
    if (
      (oe(a, "particleCount"),
      oe(e, "duration"),
      oe(r, "particleSize"),
      oe(s, "force"),
      oe(l, "stageHeight"),
      oe(i, "stageWidth"),
      !De(g) && !/^(mix|circles|rectangles)$/i.test(g))
    )
      throw new Error('particlesShape should be either "mix" or "circles" or "rectangle"');
    if (!De(t) && !Array.isArray(t)) throw new Error("colors must be an array of strings");
    if (s > 1) throw new Error("force must be within 0 and 1");
  };
function dt(a) {
  let e, t;
  return {
    c() {
      (e = h("p")), (t = S("Active")), this.h();
    },
    l(r) {
      e = _(r, "P", { class: !0 });
      var s = y(e);
      (t = R(s, "Active")), s.forEach(n), this.h();
    },
    h() {
      c(e, "class", "text-xs px-2 py-1 rounded-md border border-Light-Blue text-Grey");
    },
    m(r, s) {
      B(r, e, s), o(e, t);
    },
    p: z,
    d(r) {
      r && n(e);
    },
  };
}
function mt(a) {
  let e,
    t,
    r = new Date(a[4].current_period_end * 1e3).toLocaleDateString() + "",
    s;
  return {
    c() {
      (e = h("p")), (t = S("active until ")), (s = S(r)), this.h();
    },
    l(l) {
      e = _(l, "P", { class: !0 });
      var i = y(e);
      (t = R(i, "active until ")), (s = R(i, r)), i.forEach(n), this.h();
    },
    h() {
      c(e, "class", "text-xs px-2 py-1 rounded-md border border-Light-Blue text-Grey");
    },
    m(l, i) {
      B(l, e, i), o(e, t), o(e, s);
    },
    p(l, i) {
      i & 16 && r !== (r = new Date(l[4].current_period_end * 1e3).toLocaleDateString() + "") && re(s, r);
    },
    d(l) {
      l && n(e);
    },
  };
}
function pt(a) {
  let e, t, r, s, l;
  return {
    c() {
      (e = h("div")),
        (t = h("p")),
        (r = S("Free background removal remaining: ")),
        (s = h("span")),
        (l = S(a[1])),
        this.h();
    },
    l(i) {
      e = _(i, "DIV", { class: !0 });
      var g = y(e);
      t = _(g, "P", { class: !0 });
      var u = y(t);
      (r = R(u, "Free background removal remaining: ")), (s = _(u, "SPAN", { class: !0 }));
      var p = y(s);
      (l = R(p, a[1])), p.forEach(n), u.forEach(n), g.forEach(n), this.h();
    },
    h() {
      c(s, "class", "text-Grey-White text-base font-calistoga"),
        c(t, "class", "font-merriweather text-Grey text-sm"),
        c(e, "class", "flex flex-row");
    },
    m(i, g) {
      B(i, e, g), o(e, t), o(t, r), o(t, s), o(s, l);
    },
    p(i, g) {
      g & 2 && re(l, i[1]);
    },
    d(i) {
      i && n(e);
    },
  };
}
function ht(a) {
  let e,
    t,
    r,
    s,
    l,
    i,
    g = a[0],
    u,
    p,
    E,
    w,
    d,
    v,
    G,
    b = ze(a);
  function D(f, m) {
    return f[4] && f[4].canceled_at ? gt : _t;
  }
  let k = D(a),
    x = k(a);
  return {
    c() {
      (e = h("div")),
        (t = h("p")),
        (r = S("Removed background this month:")),
        (s = V()),
        (l = h("div")),
        (i = h("div")),
        b.c(),
        (u = V()),
        (p = h("p")),
        (E = S(a[0])),
        (w = h("span")),
        (d = S("/")),
        (v = S(a[3])),
        (G = V()),
        x.c(),
        this.h();
    },
    l(f) {
      e = _(f, "DIV", { class: !0 });
      var m = y(e);
      t = _(m, "P", { class: !0 });
      var P = y(t);
      (r = R(P, "Removed background this month:")), P.forEach(n), (s = M(m)), (l = _(m, "DIV", { class: !0 }));
      var L = y(l);
      i = _(L, "DIV", { class: !0 });
      var W = y(i);
      b.l(W), W.forEach(n), (u = M(L)), (p = _(L, "P", { class: !0 }));
      var N = y(p);
      (E = R(N, a[0])), (w = _(N, "SPAN", { class: !0 }));
      var T = y(w);
      (d = R(T, "/")),
        (v = R(T, a[3])),
        T.forEach(n),
        N.forEach(n),
        L.forEach(n),
        (G = M(m)),
        x.l(m),
        m.forEach(n),
        this.h();
    },
    h() {
      c(t, "class", "font-merriweather text-Grey text-sm"),
        c(i, "class", "w-full bg-Deep-blue rounded-full max-w-xs"),
        c(w, "class", "text-Grey text-sm"),
        c(p, "class", "text-base flex flex-row justify-center items-center"),
        c(l, "class", "flex flex-row justify-start items-center space-x-3"),
        c(e, "class", "flex flex-col");
    },
    m(f, m) {
      B(f, e, m),
        o(e, t),
        o(t, r),
        o(e, s),
        o(e, l),
        o(l, i),
        b.m(i, null),
        o(l, u),
        o(l, p),
        o(p, E),
        o(p, w),
        o(w, d),
        o(w, v),
        o(e, G),
        x.m(e, null);
    },
    p(f, m) {
      m & 1 && fe(g, (g = f[0])) ? (b.d(1), (b = ze(f)), b.c(), b.m(i, null)) : b.p(f, m),
        m & 1 && re(E, f[0]),
        m & 8 && re(v, f[3]),
        k === (k = D(f)) && x ? x.p(f, m) : (x.d(1), (x = k(f)), x && (x.c(), x.m(e, null)));
    },
    d(f) {
      f && n(e), b.d(f), x.d();
    },
  };
}
function ze(a) {
  let e;
  return {
    c() {
      (e = h("div")), this.h();
    },
    l(t) {
      (e = _(t, "DIV", { class: !0, style: !0 })), y(e).forEach(n), this.h();
    },
    h() {
      c(e, "class", "h-2 rounded-full bg-Light-Blue"), Me(e, "width", (a[0] / a[3]) * 100 + "%");
    },
    m(t, r) {
      B(t, e, r);
    },
    p(t, r) {
      r & 9 && Me(e, "width", (t[0] / t[3]) * 100 + "%");
    },
    d(t) {
      t && n(e);
    },
  };
}
function _t(a) {
  let e,
    t,
    r = (a[4] ? new Date(a[4].current_period_end * 1e3).toLocaleDateString() : "") + "",
    s;
  return {
    c() {
      (e = h("p")), (t = S("Your usage will be reset on ")), (s = S(r)), this.h();
    },
    l(l) {
      e = _(l, "P", { class: !0 });
      var i = y(e);
      (t = R(i, "Your usage will be reset on ")), (s = R(i, r)), i.forEach(n), this.h();
    },
    h() {
      c(e, "class", "text-xs text-Grey font-merriweather");
    },
    m(l, i) {
      B(l, e, i), o(e, t), o(e, s);
    },
    p(l, i) {
      i & 16 && r !== (r = (l[4] ? new Date(l[4].current_period_end * 1e3).toLocaleDateString() : "") + "") && re(s, r);
    },
    d(l) {
      l && n(e);
    },
  };
}
function gt(a) {
  let e,
    t,
    r = (a[4] ? new Date(a[4].canceled_at * 1e3).toLocaleDateString() : "") + "",
    s;
  return {
    c() {
      (e = h("p")), (t = S("Subscription canceled on ")), (s = S(r)), this.h();
    },
    l(l) {
      e = _(l, "P", { class: !0 });
      var i = y(e);
      (t = R(i, "Subscription canceled on ")), (s = R(i, r)), i.forEach(n), this.h();
    },
    h() {
      c(e, "class", "text-xs text-Grey font-merriweather");
    },
    m(l, i) {
      B(l, e, i), o(e, t), o(e, s);
    },
    p(l, i) {
      i & 16 && r !== (r = (l[4] ? new Date(l[4].canceled_at * 1e3).toLocaleDateString() : "") + "") && re(s, r);
    },
    d(l) {
      l && n(e);
    },
  };
}
function vt(a) {
  let e, t, r, s;
  return {
    c() {
      (e = h("form")), (t = h("button")), (r = h("p")), (s = S("Upgrade to Pro")), this.h();
    },
    l(l) {
      e = _(l, "FORM", { action: !0, method: !0 });
      var i = y(e);
      t = _(i, "BUTTON", { type: !0, class: !0 });
      var g = y(t);
      r = _(g, "P", {});
      var u = y(r);
      (s = R(u, "Upgrade to Pro")), u.forEach(n), g.forEach(n), i.forEach(n), this.h();
    },
    h() {
      c(t, "type", "submit"),
        c(
          t,
          "class",
          "shadow-[0px_4px_0px_rgba(167,26,1,1)] w-full sm:w-fit disabled:cursor-not-allowed hover:bg-[#EC5B41] active:shadow-[0px_0px_0px_rgba(167,26,1,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-10 py-3 bg-Orange rounded-md",
        ),
        c(e, "action", "/api/stripe/payment"),
        c(e, "method", "POST");
    },
    m(l, i) {
      B(l, e, i), o(e, t), o(t, r), o(r, s);
    },
    p: z,
    d(l) {
      l && n(e);
    },
  };
}
function bt(a) {
  let e, t;
  function r(i, g) {
    if (i[4] && !i[4].canceled_at && i[4].status === "active") return xt;
    if (i[4] && i[4].cancel_at_period_end) return yt;
  }
  let s = r(a),
    l = s && s(a);
  return {
    c() {
      (e = h("form")), (t = h("button")), l && l.c(), this.h();
    },
    l(i) {
      e = _(i, "FORM", { action: !0, method: !0 });
      var g = y(e);
      t = _(g, "BUTTON", { type: !0, class: !0 });
      var u = y(t);
      l && l.l(u), u.forEach(n), g.forEach(n), this.h();
    },
    h() {
      c(t, "type", "submit"),
        c(
          t,
          "class",
          "shadow-[0px_4px_0px_rgba(47,30,92,1)] w-full sm:w-fit relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-10 py-3 bg-Light-Blue rounded-md",
        ),
        c(e, "action", "/api/stripe/manage"),
        c(e, "method", "POST");
    },
    m(i, g) {
      B(i, e, g), o(e, t), l && l.m(t, null);
    },
    p(i, g) {
      s !== (s = r(i)) && (l && l.d(1), (l = s && s(i)), l && (l.c(), l.m(t, null)));
    },
    d(i) {
      i && n(e), l && l.d();
    },
  };
}
function yt(a) {
  let e, t;
  return {
    c() {
      (e = h("p")), (t = S("Resume subscription"));
    },
    l(r) {
      e = _(r, "P", {});
      var s = y(e);
      (t = R(s, "Resume subscription")), s.forEach(n);
    },
    m(r, s) {
      B(r, e, s), o(e, t);
    },
    d(r) {
      r && n(e);
    },
  };
}
function xt(a) {
  let e, t;
  return {
    c() {
      (e = h("p")), (t = S("Manage subscription"));
    },
    l(r) {
      e = _(r, "P", {});
      var s = y(e);
      (t = R(s, "Manage subscription")), s.forEach(n);
    },
    m(r, s) {
      B(r, e, s), o(e, t);
    },
    d(r) {
      r && n(e);
    },
  };
}
function wt(a) {
  let e,
    t,
    r,
    s,
    l,
    i,
    g,
    u,
    p,
    E,
    w,
    d,
    v,
    G,
    b,
    D,
    k,
    x = a[2] ? "Pro" : "Free",
    f,
    m,
    P,
    L,
    W,
    N;
  function T(I, C) {
    if (I[4] && I[4].canceled_at) return mt;
    if (I[4] && I[4].status === "active") return dt;
  }
  let X = T(a),
    O = X && X(a);
  function se(I, C) {
    return I[2] ? ht : pt;
  }
  let U = se(a),
    A = U(a);
  function le(I, C) {
    return I[2] ? bt : vt;
  }
  let H = le(a),
    j = H(a);
  return {
    c() {
      (e = h("div")),
        (t = h("div")),
        (r = h("div")),
        (s = h("p")),
        (l = S("Current plan")),
        (i = V()),
        (g = h("p")),
        (u = S("Change your billing plan, feel free to ")),
        (p = h("span")),
        (E = S("contact us")),
        (w = S(" for any question!")),
        (d = V()),
        (v = h("div")),
        (G = h("div")),
        (b = h("p")),
        (D = S("Your current plan: ")),
        (k = h("span")),
        (f = S(x)),
        (m = V()),
        O && O.c(),
        (P = V()),
        A.c(),
        (L = V()),
        j.c(),
        this.h();
    },
    l(I) {
      e = _(I, "DIV", { class: !0 });
      var C = y(e);
      t = _(C, "DIV", { class: !0 });
      var Y = y(t);
      r = _(Y, "DIV", { class: !0 });
      var F = y(r);
      s = _(F, "P", { class: !0 });
      var Z = y(s);
      (l = R(Z, "Current plan")), Z.forEach(n), (i = M(F)), (g = _(F, "P", { class: !0 }));
      var $ = y(g);
      (u = R($, "Change your billing plan, feel free to ")), (p = _($, "SPAN", { class: !0 }));
      var ne = y(p);
      (E = R(ne, "contact us")),
        ne.forEach(n),
        (w = R($, " for any question!")),
        $.forEach(n),
        F.forEach(n),
        (d = M(Y)),
        (v = _(Y, "DIV", { class: !0 }));
      var Q = y(v);
      G = _(Q, "DIV", { class: !0 });
      var ee = y(G);
      b = _(ee, "P", { class: !0 });
      var ae = y(b);
      (D = R(ae, "Your current plan: ")), (k = _(ae, "SPAN", { class: !0 }));
      var te = y(k);
      (f = R(te, x)),
        te.forEach(n),
        ae.forEach(n),
        (m = M(ee)),
        O && O.l(ee),
        ee.forEach(n),
        (P = M(Q)),
        A.l(Q),
        Q.forEach(n),
        Y.forEach(n),
        (L = M(C)),
        j.l(C),
        C.forEach(n),
        this.h();
    },
    h() {
      c(s, "class", "text-xl"),
        c(p, "class", "cursor-pointer underline"),
        c(g, "class", "font-merriweather text-Grey text-sm"),
        c(r, "class", "flex flex-col space-y-1"),
        c(k, "class", "text-Grey-White text-base font-calistoga"),
        c(b, "class", "font-merriweather text-Grey text-sm"),
        c(G, "class", "flex flex-row justify-start items-center space-x-2"),
        c(v, "class", "flex flex-col space-y-10"),
        c(t, "class", "flex flex-col w-full space-y-6"),
        c(
          e,
          "class",
          "w-full flex flex-col p-6 space-y-10 justify-center items-end rounded-md border border-Light-Blue bg-Medium-Blue",
        );
    },
    m(I, C) {
      B(I, e, C),
        o(e, t),
        o(t, r),
        o(r, s),
        o(s, l),
        o(r, i),
        o(r, g),
        o(g, u),
        o(g, p),
        o(p, E),
        o(g, w),
        o(t, d),
        o(t, v),
        o(v, G),
        o(G, b),
        o(b, D),
        o(b, k),
        o(k, f),
        o(G, m),
        O && O.m(G, null),
        o(v, P),
        A.m(v, null),
        o(e, L),
        j.m(e, null),
        W || ((N = [we(p, "keypress", kt), we(p, "click", a[5])]), (W = !0));
    },
    p(I, [C]) {
      C & 4 && x !== (x = I[2] ? "Pro" : "Free") && re(f, x),
        X === (X = T(I)) && O ? O.p(I, C) : (O && O.d(1), (O = X && X(I)), O && (O.c(), O.m(G, null))),
        U === (U = se(I)) && A ? A.p(I, C) : (A.d(1), (A = U(I)), A && (A.c(), A.m(v, null))),
        H === (H = le(I)) && j ? j.p(I, C) : (j.d(1), (j = H(I)), j && (j.c(), j.m(e, null)));
    },
    i: z,
    o: z,
    d(I) {
      I && n(e), O && O.d(), A.d(), j.d(), (W = !1), Je(N);
    },
  };
}
const kt = () => {};
function Et(a, e, t) {
  let { bgRemovals: r } = e,
    { freeRemovalRemaining: s } = e,
    { isPremium: l } = e,
    { monthlyBgRemovalLimit: i } = e,
    { subscription: g } = e;
  const u = () => {
    navigator.clipboard.writeText("duprez.hugo@gmail.com"),
      rt.success("Email copied!", {
        style:
          "border: 1px solid #483E66; padding: 16px; color: #F9F9FB; background-color: #1F143D; border-radius: 6px; font-size: 14px; font-family: 'calistoga', sans-serif;",
      });
  };
  return (
    (a.$$set = (p) => {
      "bgRemovals" in p && t(0, (r = p.bgRemovals)),
        "freeRemovalRemaining" in p && t(1, (s = p.freeRemovalRemaining)),
        "isPremium" in p && t(2, (l = p.isPremium)),
        "monthlyBgRemovalLimit" in p && t(3, (i = p.monthlyBgRemovalLimit)),
        "subscription" in p && t(4, (g = p.subscription));
    }),
    [r, s, l, i, g, u]
  );
}
class Pt extends he {
  constructor(e) {
    super(),
      _e(this, e, Et, wt, fe, {
        bgRemovals: 0,
        freeRemovalRemaining: 1,
        isPremium: 2,
        monthlyBgRemovalLimit: 3,
        subscription: 4,
      });
  }
}
function Dt(a) {
  let e, t, r, s, l, i, g, u, p, E, w, d, v, G, b, D, k, x, f, m, P, L, W, N, T, X, O, se, U, A, le, H, j, I, C;
  return {
    c() {
      (e = h("div")),
        (t = h("div")),
        (r = h("p")),
        (s = S("Pro")),
        (l = V()),
        (i = h("p")),
        (g = S("Get all your asset ready to use with pixel-perfect background removal!")),
        (u = V()),
        (p = h("p")),
        (E = h("span")),
        (w = S("$12")),
        (d = S("$8")),
        (v = h("span")),
        (G = S("/month")),
        (b = V()),
        (D = h("div")),
        (k = h("div")),
        (x = h("img")),
        (m = V()),
        (P = h("img")),
        (W = V()),
        (N = h("div")),
        (T = h("div")),
        (X = h("img")),
        (se = V()),
        (U = h("p")),
        (A = S("200 background removal/month")),
        (le = V()),
        (H = h("form")),
        (j = h("button")),
        (I = h("p")),
        (C = S("Get Pro")),
        this.h();
    },
    l(Y) {
      e = _(Y, "DIV", { class: !0 });
      var F = y(e);
      t = _(F, "DIV", { class: !0 });
      var Z = y(t);
      r = _(Z, "P", { class: !0 });
      var $ = y(r);
      (s = R($, "Pro")), $.forEach(n), (l = M(Z)), (i = _(Z, "P", { class: !0 }));
      var ne = y(i);
      (g = R(ne, "Get all your asset ready to use with pixel-perfect background removal!")),
        ne.forEach(n),
        Z.forEach(n),
        (u = M(F)),
        (p = _(F, "P", { class: !0 }));
      var Q = y(p);
      E = _(Q, "SPAN", { class: !0 });
      var ee = y(E);
      (w = R(ee, "$12")), ee.forEach(n), (d = R(Q, "$8")), (v = _(Q, "SPAN", { class: !0 }));
      var ae = y(v);
      (G = R(ae, "/month")), ae.forEach(n), Q.forEach(n), (b = M(F)), (D = _(F, "DIV", { class: !0 }));
      var te = y(D);
      k = _(te, "DIV", { class: !0 });
      var de = y(k);
      (x = _(de, "IMG", { src: !0, alt: !0, height: !0, width: !0, class: !0 })),
        (m = M(de)),
        (P = _(de, "IMG", { src: !0, alt: !0, height: !0, width: !0, class: !0 })),
        de.forEach(n),
        (W = M(te)),
        (N = _(te, "DIV", { class: !0 }));
      var Re = y(N);
      T = _(Re, "DIV", { class: !0 });
      var me = y(T);
      (X = _(me, "IMG", { src: !0, alt: !0 })), (se = M(me)), (U = _(me, "P", { class: !0 }));
      var Ie = y(U);
      (A = R(Ie, "200 background removal/month")),
        Ie.forEach(n),
        me.forEach(n),
        Re.forEach(n),
        te.forEach(n),
        (le = M(F)),
        (H = _(F, "FORM", { action: !0, method: !0 }));
      var Be = y(H);
      j = _(Be, "BUTTON", { type: !0, class: !0 });
      var Le = y(j);
      I = _(Le, "P", {});
      var Ve = y(I);
      (C = R(Ve, "Get Pro")), Ve.forEach(n), Le.forEach(n), Be.forEach(n), F.forEach(n), this.h();
    },
    h() {
      c(r, "class", "px-4 py-2 rounded-md border border-Orange"),
        c(i, "class", "text-Grey"),
        c(t, "class", "flex flex-col justify-center items-center space-y-4 max-w-xs text-center"),
        c(E, "class", "line-through mr-2 text-Grey text-xl"),
        c(v, "class", "text-sm"),
        c(p, "class", "text-4xl"),
        ue(x.src, (f = lt)) || c(x, "src", f),
        c(x, "alt", "Example of background removal"),
        c(x, "height", "24"),
        c(x, "width", "24"),
        c(x, "class", "w-full"),
        ue(P.src, (L = st)) || c(P, "src", L),
        c(P, "alt", "Example of background removal"),
        c(P, "height", "24"),
        c(P, "width", "24"),
        c(P, "class", "w-full"),
        c(k, "class", "flex flex-col space-y-4 items-center justify-center"),
        ue(X.src, (O = tt)) || c(X, "src", O),
        c(X, "alt", "Chekc icon"),
        c(U, "class", "text-Grey text-sm"),
        c(T, "class", "flex flex-row justify-start items-center space-x-2"),
        c(N, "class", "flex flex-col space-y-2 font-merriweather w-full"),
        c(D, "class", "flex flex-col space-y-6 items-center justify-center max-w-lg w-full"),
        c(j, "type", "submit"),
        c(
          j,
          "class",
          "shadow-[0px_4px_0px_rgba(167,26,1,1)] w-full sm:w-fit disabled:cursor-not-allowed hover:bg-[#EC5B41] active:shadow-[0px_0px_0px_rgba(167,26,1,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-10 py-3 z-10 bg-Orange rounded-md",
        ),
        c(H, "action", "/api/stripe/payment"),
        c(H, "method", "POST"),
        c(
          e,
          "class",
          "w-full flex font-calistoga text-Grey-White flex-col p-6 space-y-10 justify-center items-center rounded-md border border-Light-Blue bg-Medium-Blue",
        );
    },
    m(Y, F) {
      B(Y, e, F),
        o(e, t),
        o(t, r),
        o(r, s),
        o(t, l),
        o(t, i),
        o(i, g),
        o(e, u),
        o(e, p),
        o(p, E),
        o(E, w),
        o(p, d),
        o(p, v),
        o(v, G),
        o(e, b),
        o(e, D),
        o(D, k),
        o(k, x),
        o(k, m),
        o(k, P),
        o(D, W),
        o(D, N),
        o(N, T),
        o(T, X),
        o(T, se),
        o(T, U),
        o(U, A),
        o(e, le),
        o(e, H),
        o(H, j),
        o(j, I),
        o(I, C);
    },
    p: z,
    i: z,
    o: z,
    d(Y) {
      Y && n(e);
    },
  };
}
class Gt extends he {
  constructor(e) {
    super(), _e(this, e, null, Dt, fe, {});
  }
}
function Xe(a) {
  let e, t, r, s;
  return {
    c() {
      (e = h("div")), (t = h("div")), this.h();
    },
    l(l) {
      e = _(l, "DIV", { class: !0 });
      var i = y(e);
      (t = _(i, "DIV", {})), y(t).forEach(n), i.forEach(n), this.h();
    },
    h() {
      c(e, "class", "fixed left-1/2 top-10 z-50");
    },
    m(l, i) {
      B(l, e, i), o(e, t), r || ((s = Ze(at.call(null, t, { stageHeight: window.innerHeight }))), (r = !0));
    },
    p: z,
    d(l) {
      l && n(e), (r = !1), s();
    },
  };
}
function St(a) {
  let e, t, r, s, l, i, g;
  e = new Pt({
    props: {
      bgRemovals: a[2],
      freeRemovalRemaining: a[1],
      isPremium: a[0],
      monthlyBgRemovalLimit: Vt,
      subscription: a[3],
    },
  });
  let u = !a[0] && He();
  function p(d, v) {
    return d[5] ? Bt : It;
  }
  let E = p(a),
    w = E(a);
  return {
    c() {
      ge(e.$$.fragment), (t = V()), u && u.c(), (r = V()), (s = h("button")), w.c(), this.h();
    },
    l(d) {
      ve(e.$$.fragment, d), (t = M(d)), u && u.l(d), (r = M(d)), (s = _(d, "BUTTON", { class: !0 }));
      var v = y(s);
      w.l(v), v.forEach(n), this.h();
    },
    h() {
      c(
        s,
        "class",
        "shadow-[0px_4px_0px_rgba(47,30,92,1)] mt-8 sm:w-fit w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-10 py-3 z-10 bg-Light-Blue rounded-md",
      );
    },
    m(d, v) {
      be(e, d, v),
        B(d, t, v),
        u && u.m(d, v),
        B(d, r, v),
        B(d, s, v),
        w.m(s, null),
        (l = !0),
        i || ((g = we(s, "click", a[7])), (i = !0));
    },
    p(d, v) {
      const G = {};
      v & 4 && (G.bgRemovals = d[2]),
        v & 2 && (G.freeRemovalRemaining = d[1]),
        v & 1 && (G.isPremium = d[0]),
        v & 8 && (G.subscription = d[3]),
        e.$set(G),
        d[0]
          ? u &&
            (Ge(),
            K(u, 1, 1, () => {
              u = null;
            }),
            Se())
          : u
            ? v & 1 && q(u, 1)
            : ((u = He()), u.c(), q(u, 1), u.m(r.parentNode, r)),
        E === (E = p(d)) && w ? w.p(d, v) : (w.d(1), (w = E(d)), w && (w.c(), w.m(s, null)));
    },
    i(d) {
      l || (q(e.$$.fragment, d), q(u), (l = !0));
    },
    o(d) {
      K(e.$$.fragment, d), K(u), (l = !1);
    },
    d(d) {
      ye(e, d), d && n(t), u && u.d(d), d && n(r), d && n(s), w.d(), (i = !1), g();
    },
  };
}
function Rt(a) {
  let e, t, r;
  return {
    c() {
      (e = h("div")), (t = h("img")), this.h();
    },
    l(s) {
      e = _(s, "DIV", { class: !0 });
      var l = y(e);
      (t = _(l, "IMG", { src: !0, height: !0, width: !0, class: !0, alt: !0 })), l.forEach(n), this.h();
    },
    h() {
      ue(t.src, (r = qe)) || c(t, "src", r),
        c(t, "height", "20"),
        c(t, "width", "20"),
        c(t, "class", "animate-spin"),
        c(t, "alt", "Loading icon"),
        c(e, "class", "flex flex-col justify-center items-center h-[302px] rounded-md bg-Medium-Blue w-full");
    },
    m(s, l) {
      B(s, e, l), o(e, t);
    },
    p: z,
    i: z,
    o: z,
    d(s) {
      s && n(e);
    },
  };
}
function He(a) {
  let e, t;
  return (
    (e = new Gt({})),
    {
      c() {
        ge(e.$$.fragment);
      },
      l(r) {
        ve(e.$$.fragment, r);
      },
      m(r, s) {
        be(e, r, s), (t = !0);
      },
      i(r) {
        t || (q(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        K(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        ye(e, r);
      },
    }
  );
}
function It(a) {
  let e, t;
  return {
    c() {
      (e = h("p")), (t = S("Signout"));
    },
    l(r) {
      e = _(r, "P", {});
      var s = y(e);
      (t = R(s, "Signout")), s.forEach(n);
    },
    m(r, s) {
      B(r, e, s), o(e, t);
    },
    p: z,
    d(r) {
      r && n(e);
    },
  };
}
function Bt(a) {
  let e, t;
  return {
    c() {
      (e = h("img")), this.h();
    },
    l(r) {
      (e = _(r, "IMG", { src: !0, height: !0, width: !0, class: !0, alt: !0 })), this.h();
    },
    h() {
      ue(e.src, (t = qe)) || c(e, "src", t),
        c(e, "height", "16"),
        c(e, "width", "16"),
        c(e, "class", "animate-spin pt-1 pb-1"),
        c(e, "alt", "Loading icon");
    },
    m(r, s) {
      B(r, e, s);
    },
    p: z,
    d(r) {
      r && n(e);
    },
  };
}
function Lt(a) {
  let e,
    t,
    r,
    s,
    l,
    i,
    g,
    u,
    p,
    E,
    w,
    d,
    v,
    G,
    b = a[6] && Xe();
  const D = [Rt, St],
    k = [];
  function x(f, m) {
    return f[4] ? 0 : 1;
  }
  return (
    (d = x(a)),
    (v = k[d] = D[d](a)),
    {
      c() {
        b && b.c(),
          (e = V()),
          (t = h("div")),
          (r = h("div")),
          (s = h("p")),
          (l = S("My account")),
          (i = V()),
          (g = h("div")),
          (u = h("button")),
          (p = h("p")),
          (E = S("Billing")),
          (w = V()),
          v.c(),
          this.h();
      },
      l(f) {
        b && b.l(f), (e = M(f)), (t = _(f, "DIV", { class: !0 }));
        var m = y(t);
        r = _(m, "DIV", { class: !0 });
        var P = y(r);
        s = _(P, "P", { class: !0 });
        var L = y(s);
        (l = R(L, "My account")), L.forEach(n), (i = M(P)), (g = _(P, "DIV", { class: !0 }));
        var W = y(g);
        u = _(W, "BUTTON", { class: !0 });
        var N = y(u);
        p = _(N, "P", {});
        var T = y(p);
        (E = R(T, "Billing")),
          T.forEach(n),
          N.forEach(n),
          W.forEach(n),
          P.forEach(n),
          (w = M(m)),
          v.l(m),
          m.forEach(n),
          this.h();
      },
      h() {
        c(s, "class", "text-4xl"),
          c(u, "class", "px-5 py-2 bg-Light-Blue rounded-md"),
          c(g, "class", "flex flex-row space-x-3"),
          c(r, "class", "flex flex-col space-y-4 w-full justify-center items-start"),
          c(
            t,
            "class",
            "text-Grey-White flex mt-16 flex-col items-center justify-center max-w-2xl w-full font-calistoga space-y-8",
          );
      },
      m(f, m) {
        b && b.m(f, m),
          B(f, e, m),
          B(f, t, m),
          o(t, r),
          o(r, s),
          o(s, l),
          o(r, i),
          o(r, g),
          o(g, u),
          o(u, p),
          o(p, E),
          o(t, w),
          k[d].m(t, null),
          (G = !0);
      },
      p(f, [m]) {
        f[6] ? (b ? b.p(f, m) : ((b = Xe()), b.c(), b.m(e.parentNode, e))) : b && (b.d(1), (b = null));
        let P = d;
        (d = x(f)),
          d === P
            ? k[d].p(f, m)
            : (Ge(),
              K(k[P], 1, 1, () => {
                k[P] = null;
              }),
              Se(),
              (v = k[d]),
              v ? v.p(f, m) : ((v = k[d] = D[d](f)), v.c()),
              q(v, 1),
              v.m(t, null));
      },
      i(f) {
        G || (q(v), (G = !0));
      },
      o(f) {
        K(v), (G = !1);
      },
      d(f) {
        b && b.d(f), f && n(e), f && n(t), k[d].d();
      },
    }
  );
}
let Vt = 200;
function Mt(a, e, t) {
  let r, s;
  ke(a, Oe, (m) => t(11, (r = m))), ke(a, Ue, (m) => t(12, (s = m)));
  let { session: l } = e,
    i,
    g,
    u,
    p,
    E,
    w,
    d = !1,
    v = !1,
    G = s.url.searchParams.has("success"),
    b = !1;
  Ke(async () => {
    await x(), G && (t(6, (b = !1)), await Qe(), t(6, (b = !0)));
  });
  const D = async () => {
    try {
      const { user: m } = l,
        {
          data: P,
          error: L,
          status: W,
        } = await We.from("profiles")
          .select("username, is_premium, free_bg_removals, bg_removals, stripe_customer_id")
          .eq("id", m.id)
          .single();
      if (
        (P &&
          ((i = P.username),
          t(0, (g = P.is_premium)),
          t(1, (u = P.free_bg_removals)),
          t(2, (p = P.bg_removals)),
          (E = P.stripe_customer_id)),
        $e(Oe, (r = { freeBgRemovals: u, isPremium: g }), r),
        L && W !== 406)
      )
        throw L;
    } catch (m) {
      m instanceof Error && alert(m.message);
    }
  };
  async function k() {
    if (E)
      try {
        const W = await (await fetch("/api/stripe/subscription", { method: "GET" })).json();
        t(3, (w = W.subscription));
      } catch (m) {
        m instanceof Error && console.log(m.message);
      }
  }
  async function x() {
    try {
      t(4, (d = !0)), await D(), await k();
    } catch (m) {
      console.log(m);
    } finally {
      t(4, (d = !1));
    }
  }
  async function f() {
    try {
      t(5, (v = !0));
      let { error: m } = await We.auth.signOut();
      if (m) throw m;
    } catch (m) {
      m instanceof Error && alert(m.message);
    } finally {
      t(5, (v = !1));
    }
  }
  return (
    (a.$$set = (m) => {
      "session" in m && t(8, (l = m.session));
    }),
    [g, u, p, w, d, v, b, f, l]
  );
}
class Wt extends he {
  constructor(e) {
    super(), _e(this, e, Mt, Lt, fe, { session: 8 });
  }
}
function Ot(a) {
  let e, t;
  return (
    (e = new Wt({ props: { session: a[0].data.session } })),
    {
      c() {
        ge(e.$$.fragment);
      },
      l(r) {
        ve(e.$$.fragment, r);
      },
      m(r, s) {
        be(e, r, s), (t = !0);
      },
      p(r, s) {
        const l = {};
        s & 1 && (l.session = r[0].data.session), e.$set(l);
      },
      i(r) {
        t || (q(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        K(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        ye(e, r);
      },
    }
  );
}
function jt(a) {
  let e, t;
  return (
    (e = new et({})),
    {
      c() {
        ge(e.$$.fragment);
      },
      l(r) {
        ve(e.$$.fragment, r);
      },
      m(r, s) {
        be(e, r, s), (t = !0);
      },
      p: z,
      i(r) {
        t || (q(e.$$.fragment, r), (t = !0));
      },
      o(r) {
        K(e.$$.fragment, r), (t = !1);
      },
      d(r) {
        ye(e, r);
      },
    }
  );
}
function Tt(a) {
  let e, t, r, s;
  const l = [jt, Ot],
    i = [];
  function g(u, p) {
    return u[0].data.session ? 1 : 0;
  }
  return (
    (t = g(a)),
    (r = i[t] = l[t](a)),
    {
      c() {
        (e = h("div")), r.c(), this.h();
      },
      l(u) {
        e = _(u, "DIV", { class: !0 });
        var p = y(e);
        r.l(p), p.forEach(n), this.h();
      },
      h() {
        c(e, "class", "flex flex-col w-full px-4 justify-center items-center");
      },
      m(u, p) {
        B(u, e, p), i[t].m(e, null), (s = !0);
      },
      p(u, [p]) {
        let E = t;
        (t = g(u)),
          t === E
            ? i[t].p(u, p)
            : (Ge(),
              K(i[E], 1, 1, () => {
                i[E] = null;
              }),
              Se(),
              (r = i[t]),
              r ? r.p(u, p) : ((r = i[t] = l[t](u)), r.c()),
              q(r, 1),
              r.m(e, null));
      },
      i(u) {
        s || (q(r), (s = !0));
      },
      o(u) {
        K(r), (s = !1);
      },
      d(u) {
        u && n(e), i[t].d();
      },
    }
  );
}
function Ct(a, e, t) {
  let r;
  return ke(a, Ue, (s) => t(0, (r = s))), [r];
}
class Jt extends he {
  constructor(e) {
    super(), _e(this, e, Ct, Tt, fe, {});
  }
}
export { Jt as default };
