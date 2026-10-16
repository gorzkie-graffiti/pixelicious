function b() {}
const Z = (t) => t;
function $t(t, e) {
  for (const n in e) t[n] = e[n];
  return t;
}
function tt(t) {
  return t();
}
function X() {
  return Object.create(null);
}
function E(t) {
  t.forEach(tt);
}
function M(t) {
  return typeof t == "function";
}
function Ft(t, e) {
  return t != t ? e == e : t !== e || (t && typeof t == "object") || typeof t == "function";
}
let O;
function Wt(t, e) {
  return O || (O = document.createElement("a")), (O.href = e), t === O.href;
}
function wt(t) {
  return Object.keys(t).length === 0;
}
function et(t, ...e) {
  if (t == null) return b;
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function Gt(t) {
  let e;
  return et(t, (n) => (e = n))(), e;
}
function It(t, e, n) {
  t.$$.on_destroy.push(et(e, n));
}
function Jt(t, e, n, i) {
  if (t) {
    const s = nt(t, e, n, i);
    return t[0](s);
  }
}
function nt(t, e, n, i) {
  return t[1] && i ? $t(n.ctx.slice(), t[1](i(e))) : n.ctx;
}
function Kt(t, e, n, i) {
  if (t[2] && i) {
    const s = t[2](i(n));
    if (e.dirty === void 0) return s;
    if (typeof s == "object") {
      const o = [],
        r = Math.max(e.dirty.length, s.length);
      for (let l = 0; l < r; l += 1) o[l] = e.dirty[l] | s[l];
      return o;
    }
    return e.dirty | s;
  }
  return e.dirty;
}
function Qt(t, e, n, i, s, o) {
  if (s) {
    const r = nt(e, n, i, o);
    t.p(r, s);
  }
}
function Ut(t) {
  if (t.ctx.length > 32) {
    const e = [],
      n = t.ctx.length / 32;
    for (let i = 0; i < n; i++) e[i] = -1;
    return e;
  }
  return -1;
}
function Vt(t, e, n) {
  return t.set(n), e;
}
function Xt(t) {
  return t && M(t.destroy) ? t.destroy : b;
}
const it = typeof window < "u";
let st = it ? () => window.performance.now() : () => Date.now(),
  U = it ? (t) => requestAnimationFrame(t) : b;
const k = new Set();
function rt(t) {
  k.forEach((e) => {
    e.c(t) || (k.delete(e), e.f());
  }),
    k.size !== 0 && U(rt);
}
function ot(t) {
  let e;
  return (
    k.size === 0 && U(rt),
    {
      promise: new Promise((n) => {
        k.add((e = { c: t, f: n }));
      }),
      abort() {
        k.delete(e);
      },
    }
  );
}
let F = !1;
function xt() {
  F = !0;
}
function bt() {
  F = !1;
}
function vt(t, e, n, i) {
  for (; t < e; ) {
    const s = t + ((e - t) >> 1);
    n(s) <= i ? (t = s + 1) : (e = s);
  }
  return t;
}
function kt(t) {
  if (t.hydrate_init) return;
  t.hydrate_init = !0;
  let e = t.childNodes;
  if (t.nodeName === "HEAD") {
    const c = [];
    for (let a = 0; a < e.length; a++) {
      const f = e[a];
      f.claim_order !== void 0 && c.push(f);
    }
    e = c;
  }
  const n = new Int32Array(e.length + 1),
    i = new Int32Array(e.length);
  n[0] = -1;
  let s = 0;
  for (let c = 0; c < e.length; c++) {
    const a = e[c].claim_order,
      f = (s > 0 && e[n[s]].claim_order <= a ? s + 1 : vt(1, s, (_) => e[n[_]].claim_order, a)) - 1;
    i[c] = n[f] + 1;
    const u = f + 1;
    (n[u] = c), (s = Math.max(u, s));
  }
  const o = [],
    r = [];
  let l = e.length - 1;
  for (let c = n[s] + 1; c != 0; c = i[c - 1]) {
    for (o.push(e[c - 1]); l >= c; l--) r.push(e[l]);
    l--;
  }
  for (; l >= 0; l--) r.push(e[l]);
  o.reverse(), r.sort((c, a) => c.claim_order - a.claim_order);
  for (let c = 0, a = 0; c < r.length; c++) {
    for (; a < o.length && r[c].claim_order >= o[a].claim_order; ) a++;
    const f = a < o.length ? o[a] : null;
    t.insertBefore(r[c], f);
  }
}
function Et(t, e) {
  t.appendChild(e);
}
function ct(t) {
  if (!t) return document;
  const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
  return e && e.host ? e : t.ownerDocument;
}
function Nt(t) {
  const e = at("style");
  return At(ct(t), e), e.sheet;
}
function At(t, e) {
  return Et(t.head || t, e), e.sheet;
}
function St(t, e) {
  if (F) {
    for (
      kt(t),
        (t.actual_end_child === void 0 || (t.actual_end_child !== null && t.actual_end_child.parentNode !== t)) &&
          (t.actual_end_child = t.firstChild);
      t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;

    )
      t.actual_end_child = t.actual_end_child.nextSibling;
    e !== t.actual_end_child
      ? (e.claim_order !== void 0 || e.parentNode !== t) && t.insertBefore(e, t.actual_end_child)
      : (t.actual_end_child = e.nextSibling);
  } else (e.parentNode !== t || e.nextSibling !== null) && t.appendChild(e);
}
function Yt(t, e, n) {
  F && !n ? St(t, e) : (e.parentNode !== t || e.nextSibling != n) && t.insertBefore(e, n || null);
}
function lt(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function Zt(t, e) {
  for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
}
function at(t) {
  return document.createElement(t);
}
function V(t) {
  return document.createTextNode(t);
}
function te() {
  return V(" ");
}
function ee() {
  return V("");
}
function ne(t, e, n, i) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i);
}
function ie(t) {
  return function (e) {
    return e.preventDefault(), t.call(this, e);
  };
}
function se(t) {
  return function (e) {
    return e.stopPropagation(), t.call(this, e);
  };
}
function jt(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function re(t, e) {
  const n = Object.getOwnPropertyDescriptors(t.__proto__);
  for (const i in e)
    e[i] == null
      ? t.removeAttribute(i)
      : i === "style"
        ? (t.style.cssText = e[i])
        : i === "__value"
          ? (t.value = t[i] = e[i])
          : n[i] && n[i].set
            ? (t[i] = e[i])
            : jt(t, i, e[i]);
}
function Dt(t) {
  return Array.from(t.childNodes);
}
function Ct(t) {
  t.claim_info === void 0 && (t.claim_info = { last_index: 0, total_claimed: 0 });
}
function ut(t, e, n, i, s = !1) {
  Ct(t);
  const o = (() => {
    for (let r = t.claim_info.last_index; r < t.length; r++) {
      const l = t[r];
      if (e(l)) {
        const c = n(l);
        return c === void 0 ? t.splice(r, 1) : (t[r] = c), s || (t.claim_info.last_index = r), l;
      }
    }
    for (let r = t.claim_info.last_index - 1; r >= 0; r--) {
      const l = t[r];
      if (e(l)) {
        const c = n(l);
        return (
          c === void 0 ? t.splice(r, 1) : (t[r] = c),
          s ? c === void 0 && t.claim_info.last_index-- : (t.claim_info.last_index = r),
          l
        );
      }
    }
    return i();
  })();
  return (o.claim_order = t.claim_info.total_claimed), (t.claim_info.total_claimed += 1), o;
}
function Tt(t, e, n, i) {
  return ut(
    t,
    (s) => s.nodeName === e,
    (s) => {
      const o = [];
      for (let r = 0; r < s.attributes.length; r++) {
        const l = s.attributes[r];
        n[l.name] || o.push(l.name);
      }
      o.forEach((r) => s.removeAttribute(r));
    },
    () => i(e),
  );
}
function oe(t, e, n) {
  return Tt(t, e, n, at);
}
function Mt(t, e) {
  return ut(
    t,
    (n) => n.nodeType === 3,
    (n) => {
      const i = "" + e;
      if (n.data.startsWith(i)) {
        if (n.data.length !== i.length) return n.splitText(i.length);
      } else n.data = i;
    },
    () => V(e),
    !0,
  );
}
function ce(t) {
  return Mt(t, " ");
}
function le(t, e) {
  (e = "" + e), t.wholeText !== e && (t.data = e);
}
function ae(t, e) {
  t.value = e ?? "";
}
function ue(t, e, n, i) {
  n === null ? t.style.removeProperty(e) : t.style.setProperty(e, n, i ? "important" : "");
}
function fe(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
function ft(t, e, { bubbles: n = !1, cancelable: i = !1 } = {}) {
  const s = document.createEvent("CustomEvent");
  return s.initCustomEvent(t, n, i, e), s;
}
function _e(t, e) {
  const n = [];
  let i = 0;
  for (const s of e.childNodes)
    if (s.nodeType === 8) {
      const o = s.textContent.trim();
      o === `HEAD_${t}_END` ? ((i -= 1), n.push(s)) : o === `HEAD_${t}_START` && ((i += 1), n.push(s));
    } else i > 0 && n.push(s);
  return n;
}
function de(t, e) {
  return new t(e);
}
const z = new Map();
let B = 0;
function Pt(t) {
  let e = 5381,
    n = t.length;
  for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n);
  return e >>> 0;
}
function Ot(t, e) {
  const n = { stylesheet: Nt(e), rules: {} };
  return z.set(t, n), n;
}
function _t(t, e, n, i, s, o, r, l = 0) {
  const c = 16.666 / i;
  let a = `{
`;
  for (let p = 0; p <= 1; p += c) {
    const y = e + (n - e) * o(p);
    a +=
      p * 100 +
      `%{${r(y, 1 - y)}}
`;
  }
  const f =
      a +
      `100% {${r(n, 1 - n)}}
}`,
    u = `__svelte_${Pt(f)}_${l}`,
    _ = ct(t),
    { stylesheet: h, rules: d } = z.get(_) || Ot(_, t);
  d[u] || ((d[u] = !0), h.insertRule(`@keyframes ${u} ${f}`, h.cssRules.length));
  const g = t.style.animation || "";
  return (t.style.animation = `${g ? `${g}, ` : ""}${u} ${i}ms linear ${s}ms 1 both`), (B += 1), u;
}
function J(t, e) {
  const n = (t.style.animation || "").split(", "),
    i = n.filter(e ? (o) => o.indexOf(e) < 0 : (o) => o.indexOf("__svelte") === -1),
    s = n.length - i.length;
  s && ((t.style.animation = i.join(", ")), (B -= s), B || Rt());
}
function Rt() {
  U(() => {
    B ||
      (z.forEach((t) => {
        const { ownerNode: e } = t.stylesheet;
        e && lt(e);
      }),
      z.clear());
  });
}
let C;
function D(t) {
  C = t;
}
function W() {
  if (!C) throw new Error("Function called outside component initialization");
  return C;
}
function he(t) {
  W().$$.on_mount.push(t);
}
function me(t) {
  W().$$.after_update.push(t);
}
function pe(t) {
  W().$$.on_destroy.push(t);
}
function ye() {
  const t = W();
  return (e, n, { cancelable: i = !1 } = {}) => {
    const s = t.$$.callbacks[e];
    if (s) {
      const o = ft(e, n, { cancelable: i });
      return (
        s.slice().forEach((r) => {
          r.call(t, o);
        }),
        !o.defaultPrevented
      );
    }
    return !0;
  };
}
const j = [],
  Y = [],
  q = [],
  K = [],
  dt = Promise.resolve();
let Q = !1;
function ht() {
  Q || ((Q = !0), dt.then(mt));
}
function ge() {
  return ht(), dt;
}
function T(t) {
  q.push(t);
}
function $e(t) {
  K.push(t);
}
const I = new Set();
let R = 0;
function mt() {
  const t = C;
  do {
    for (; R < j.length; ) {
      const e = j[R];
      R++, D(e), qt(e.$$);
    }
    for (D(null), j.length = 0, R = 0; Y.length; ) Y.pop()();
    for (let e = 0; e < q.length; e += 1) {
      const n = q[e];
      I.has(n) || (I.add(n), n());
    }
    q.length = 0;
  } while (j.length);
  for (; K.length; ) K.pop()();
  (Q = !1), I.clear(), D(t);
}
function qt(t) {
  if (t.fragment !== null) {
    t.update(), E(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(T);
  }
}
let S;
function pt() {
  return (
    S ||
      ((S = Promise.resolve()),
      S.then(() => {
        S = null;
      })),
    S
  );
}
function H(t, e, n) {
  t.dispatchEvent(ft(`${e ? "intro" : "outro"}${n}`));
}
const L = new Set();
let x;
function we() {
  x = { r: 0, c: [], p: x };
}
function xe() {
  x.r || E(x.c), (x = x.p);
}
function yt(t, e) {
  t && t.i && (L.delete(t), t.i(e));
}
function Lt(t, e, n, i) {
  if (t && t.o) {
    if (L.has(t)) return;
    L.add(t),
      x.c.push(() => {
        L.delete(t), i && (n && t.d(1), i());
      }),
      t.o(e);
  } else i && i();
}
const gt = { duration: 0 };
function be(t, e, n) {
  const i = { direction: "in" };
  let s = e(t, n, i),
    o = !1,
    r,
    l,
    c = 0;
  function a() {
    r && J(t, r);
  }
  function f() {
    const { delay: _ = 0, duration: h = 300, easing: d = Z, tick: g = b, css: p } = s || gt;
    p && (r = _t(t, 0, 1, h, _, d, p, c++)), g(0, 1);
    const y = st() + _,
      N = y + h;
    l && l.abort(),
      (o = !0),
      T(() => H(t, !0, "start")),
      (l = ot((v) => {
        if (o) {
          if (v >= N) return g(1, 0), H(t, !0, "end"), a(), (o = !1);
          if (v >= y) {
            const A = d((v - y) / h);
            g(A, 1 - A);
          }
        }
        return o;
      }));
  }
  let u = !1;
  return {
    start() {
      u || ((u = !0), J(t), M(s) ? ((s = s(i)), pt().then(f)) : f());
    },
    invalidate() {
      u = !1;
    },
    end() {
      o && (a(), (o = !1));
    },
  };
}
function ve(t, e, n) {
  const i = { direction: "out" };
  let s = e(t, n, i),
    o = !0,
    r;
  const l = x;
  l.r += 1;
  function c() {
    const { delay: a = 0, duration: f = 300, easing: u = Z, tick: _ = b, css: h } = s || gt;
    h && (r = _t(t, 1, 0, f, a, u, h));
    const d = st() + a,
      g = d + f;
    T(() => H(t, !1, "start")),
      ot((p) => {
        if (o) {
          if (p >= g) return _(0, 1), H(t, !1, "end"), --l.r || E(l.c), !1;
          if (p >= d) {
            const y = u((p - d) / f);
            _(1 - y, y);
          }
        }
        return o;
      });
  }
  return (
    M(s)
      ? pt().then(() => {
          (s = s(i)), c();
        })
      : c(),
    {
      end(a) {
        a && s.tick && s.tick(1, 0), o && (r && J(t, r), (o = !1));
      },
    }
  );
}
const ke = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : global;
function Ee(t, e) {
  Lt(t, 1, 1, () => {
    e.delete(t.key);
  });
}
function Ne(t, e, n, i, s, o, r, l, c, a, f, u) {
  let _ = t.length,
    h = o.length,
    d = _;
  const g = {};
  for (; d--; ) g[t[d].key] = d;
  const p = [],
    y = new Map(),
    N = new Map();
  for (d = h; d--; ) {
    const m = u(s, o, d),
      $ = n(m);
    let w = r.get($);
    w ? i && w.p(m, e) : ((w = a($, m)), w.c()), y.set($, (p[d] = w)), $ in g && N.set($, Math.abs(d - g[$]));
  }
  const v = new Set(),
    A = new Set();
  function G(m) {
    yt(m, 1), m.m(l, f), r.set(m.key, m), (f = m.first), h--;
  }
  for (; _ && h; ) {
    const m = p[h - 1],
      $ = t[_ - 1],
      w = m.key,
      P = $.key;
    m === $
      ? ((f = m.first), _--, h--)
      : y.has(P)
        ? !r.has(w) || v.has(w)
          ? G(m)
          : A.has(P)
            ? _--
            : N.get(w) > N.get(P)
              ? (A.add(w), G(m))
              : (v.add(P), _--)
        : (c($, r), _--);
  }
  for (; _--; ) {
    const m = t[_];
    y.has(m.key) || c(m, r);
  }
  for (; h; ) G(p[h - 1]);
  return p;
}
function Ae(t, e) {
  const n = {},
    i = {},
    s = { $$scope: 1 };
  let o = t.length;
  for (; o--; ) {
    const r = t[o],
      l = e[o];
    if (l) {
      for (const c in r) c in l || (i[c] = 1);
      for (const c in l) s[c] || ((n[c] = l[c]), (s[c] = 1));
      t[o] = l;
    } else for (const c in r) s[c] = 1;
  }
  for (const r in i) r in n || (n[r] = void 0);
  return n;
}
function Se(t) {
  return typeof t == "object" && t !== null ? t : {};
}
function je(t, e, n, i) {
  const s = t.$$.props[e];
  s !== void 0 && ((t.$$.bound[s] = n), i === void 0 && n(t.$$.ctx[s]));
}
function De(t) {
  t && t.c();
}
function Ce(t, e) {
  t && t.l(e);
}
function zt(t, e, n, i) {
  const { fragment: s, after_update: o } = t.$$;
  s && s.m(e, n),
    i ||
      T(() => {
        const r = t.$$.on_mount.map(tt).filter(M);
        t.$$.on_destroy ? t.$$.on_destroy.push(...r) : E(r), (t.$$.on_mount = []);
      }),
    o.forEach(T);
}
function Bt(t, e) {
  const n = t.$$;
  n.fragment !== null &&
    (E(n.on_destroy), n.fragment && n.fragment.d(e), (n.on_destroy = n.fragment = null), (n.ctx = []));
}
function Ht(t, e) {
  t.$$.dirty[0] === -1 && (j.push(t), ht(), t.$$.dirty.fill(0)), (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function Te(t, e, n, i, s, o, r, l = [-1]) {
  const c = C;
  D(t);
  const a = (t.$$ = {
    fragment: null,
    ctx: [],
    props: o,
    update: b,
    not_equal: s,
    bound: X(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (c ? c.$$.context : [])),
    callbacks: X(),
    dirty: l,
    skip_bound: !1,
    root: e.target || c.$$.root,
  });
  r && r(a.root);
  let f = !1;
  if (
    ((a.ctx = n
      ? n(t, e.props || {}, (u, _, ...h) => {
          const d = h.length ? h[0] : _;
          return (
            a.ctx && s(a.ctx[u], (a.ctx[u] = d)) && (!a.skip_bound && a.bound[u] && a.bound[u](d), f && Ht(t, u)), _
          );
        })
      : []),
    a.update(),
    (f = !0),
    E(a.before_update),
    (a.fragment = i ? i(a.ctx) : !1),
    e.target)
  ) {
    if (e.hydrate) {
      xt();
      const u = Dt(e.target);
      a.fragment && a.fragment.l(u), u.forEach(lt);
    } else a.fragment && a.fragment.c();
    e.intro && yt(t.$$.fragment), zt(t, e.target, e.anchor, e.customElement), bt(), mt();
  }
  D(c);
}
class Me {
  $destroy() {
    Bt(this, 1), (this.$destroy = b);
  }
  $on(e, n) {
    if (!M(n)) return b;
    const i = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return (
      i.push(n),
      () => {
        const s = i.indexOf(n);
        s !== -1 && i.splice(s, 1);
      }
    );
  }
  $set(e) {
    this.$$set && !wt(e) && ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
  }
}
export {
  ie as $,
  ge as A,
  b as B,
  et as C,
  E as D,
  M as E,
  pe as F,
  $t as G,
  St as H,
  Ae as I,
  Se as J,
  re as K,
  fe as L,
  Jt as M,
  Qt as N,
  Ut as O,
  Kt as P,
  Y as Q,
  ne as R,
  Me as S,
  Ne as T,
  It as U,
  Ee as V,
  Wt as W,
  Gt as X,
  Z as Y,
  ke as Z,
  se as _,
  te as a,
  Vt as a0,
  Zt as a1,
  je as a2,
  $e as a3,
  ye as a4,
  T as a5,
  be as a6,
  ve as a7,
  Xt as a8,
  ae as a9,
  _e as aa,
  Yt as b,
  ce as c,
  xe as d,
  ee as e,
  yt as f,
  we as g,
  lt as h,
  Te as i,
  me as j,
  at as k,
  oe as l,
  Dt as m,
  jt as n,
  he as o,
  ue as p,
  V as q,
  Mt as r,
  Ft as s,
  Lt as t,
  le as u,
  de as v,
  De as w,
  Ce as x,
  zt as y,
  Bt as z,
};
