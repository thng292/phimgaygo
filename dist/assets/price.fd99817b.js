import {
  _ as Ft,
  d as Be,
  n as Lt,
  i as xe,
  e as Pe,
  t as Mt,
  f as Ut,
  g as Ne,
  h as Fe,
  s as $t,
  k as kt,
  l as z,
  S as jt,
  R as N,
  m as Ht,
  p as zt,
  j as U,
  a as E,
  r as Vt,
  c as I,
  F as Qt,
} from "./index.8cc21891.js";
var Wt = (function (e) {
  Ft(t, e);
  function t(n, s) {
    var i;
    return (
      (i = e.call(this) || this),
      (i.client = n),
      (i.options = s),
      (i.trackedProps = []),
      (i.selectError = null),
      i.bindMethods(),
      i.setOptions(s),
      i
    );
  }
  var r = t.prototype;
  return (
    (r.bindMethods = function () {
      (this.remove = this.remove.bind(this)),
        (this.refetch = this.refetch.bind(this));
    }),
    (r.onSubscribe = function () {
      this.listeners.length === 1 &&
        (this.currentQuery.addObserver(this),
        Le(this.currentQuery, this.options) && this.executeFetch(),
        this.updateTimers());
    }),
    (r.onUnsubscribe = function () {
      this.listeners.length || this.destroy();
    }),
    (r.shouldFetchOnReconnect = function () {
      return le(
        this.currentQuery,
        this.options,
        this.options.refetchOnReconnect
      );
    }),
    (r.shouldFetchOnWindowFocus = function () {
      return le(
        this.currentQuery,
        this.options,
        this.options.refetchOnWindowFocus
      );
    }),
    (r.destroy = function () {
      (this.listeners = []),
        this.clearTimers(),
        this.currentQuery.removeObserver(this);
    }),
    (r.setOptions = function (s, i) {
      var o = this.options,
        a = this.currentQuery;
      if (
        ((this.options = this.client.defaultQueryObserverOptions(s)),
        typeof this.options.enabled < "u" &&
          typeof this.options.enabled != "boolean")
      )
        throw new Error("Expected enabled to be a boolean");
      this.options.queryKey || (this.options.queryKey = o.queryKey),
        this.updateQuery();
      var l = this.hasListeners();
      l && Me(this.currentQuery, a, this.options, o) && this.executeFetch(),
        this.updateResult(i),
        l &&
          (this.currentQuery !== a ||
            this.options.enabled !== o.enabled ||
            this.options.staleTime !== o.staleTime) &&
          this.updateStaleTimeout();
      var c = this.computeRefetchInterval();
      l &&
        (this.currentQuery !== a ||
          this.options.enabled !== o.enabled ||
          c !== this.currentRefetchInterval) &&
        this.updateRefetchInterval(c);
    }),
    (r.getOptimisticResult = function (s) {
      var i = this.client.defaultQueryObserverOptions(s),
        o = this.client.getQueryCache().build(this.client, i);
      return this.createResult(o, i);
    }),
    (r.getCurrentResult = function () {
      return this.currentResult;
    }),
    (r.trackResult = function (s, i) {
      var o = this,
        a = {},
        l = function (f) {
          o.trackedProps.includes(f) || o.trackedProps.push(f);
        };
      return (
        Object.keys(s).forEach(function (c) {
          Object.defineProperty(a, c, {
            configurable: !1,
            enumerable: !0,
            get: function () {
              return l(c), s[c];
            },
          });
        }),
        (i.useErrorBoundary || i.suspense) && l("error"),
        a
      );
    }),
    (r.getNextResult = function (s) {
      var i = this;
      return new Promise(function (o, a) {
        var l = i.subscribe(function (c) {
          c.isFetching ||
            (l(),
            c.isError && (s == null ? void 0 : s.throwOnError)
              ? a(c.error)
              : o(c));
        });
      });
    }),
    (r.getCurrentQuery = function () {
      return this.currentQuery;
    }),
    (r.remove = function () {
      this.client.getQueryCache().remove(this.currentQuery);
    }),
    (r.refetch = function (s) {
      return this.fetch(
        Be({}, s, { meta: { refetchPage: s == null ? void 0 : s.refetchPage } })
      );
    }),
    (r.fetchOptimistic = function (s) {
      var i = this,
        o = this.client.defaultQueryObserverOptions(s),
        a = this.client.getQueryCache().build(this.client, o);
      return a.fetch().then(function () {
        return i.createResult(a, o);
      });
    }),
    (r.fetch = function (s) {
      var i = this;
      return this.executeFetch(s).then(function () {
        return i.updateResult(), i.currentResult;
      });
    }),
    (r.executeFetch = function (s) {
      this.updateQuery();
      var i = this.currentQuery.fetch(this.options, s);
      return (s != null && s.throwOnError) || (i = i.catch(Lt)), i;
    }),
    (r.updateStaleTimeout = function () {
      var s = this;
      if (
        (this.clearStaleTimeout(),
        !(xe || this.currentResult.isStale || !Pe(this.options.staleTime)))
      ) {
        var i = Mt(this.currentResult.dataUpdatedAt, this.options.staleTime),
          o = i + 1;
        this.staleTimeoutId = setTimeout(function () {
          s.currentResult.isStale || s.updateResult();
        }, o);
      }
    }),
    (r.computeRefetchInterval = function () {
      var s;
      return typeof this.options.refetchInterval == "function"
        ? this.options.refetchInterval(
            this.currentResult.data,
            this.currentQuery
          )
        : (s = this.options.refetchInterval) != null
        ? s
        : !1;
    }),
    (r.updateRefetchInterval = function (s) {
      var i = this;
      this.clearRefetchInterval(),
        (this.currentRefetchInterval = s),
        !(
          xe ||
          this.options.enabled === !1 ||
          !Pe(this.currentRefetchInterval) ||
          this.currentRefetchInterval === 0
        ) &&
          (this.refetchIntervalId = setInterval(function () {
            (i.options.refetchIntervalInBackground || Ut.isFocused()) &&
              i.executeFetch();
          }, this.currentRefetchInterval));
    }),
    (r.updateTimers = function () {
      this.updateStaleTimeout(),
        this.updateRefetchInterval(this.computeRefetchInterval());
    }),
    (r.clearTimers = function () {
      this.clearStaleTimeout(), this.clearRefetchInterval();
    }),
    (r.clearStaleTimeout = function () {
      this.staleTimeoutId &&
        (clearTimeout(this.staleTimeoutId), (this.staleTimeoutId = void 0));
    }),
    (r.clearRefetchInterval = function () {
      this.refetchIntervalId &&
        (clearInterval(this.refetchIntervalId),
        (this.refetchIntervalId = void 0));
    }),
    (r.createResult = function (s, i) {
      var o = this.currentQuery,
        a = this.options,
        l = this.currentResult,
        c = this.currentResultState,
        f = this.currentResultOptions,
        p = s !== o,
        b = p ? s.state : this.currentQueryInitialState,
        d = p ? this.currentResult : this.previousQueryResult,
        h = s.state,
        m = h.dataUpdatedAt,
        O = h.error,
        S = h.errorUpdatedAt,
        C = h.isFetching,
        w = h.status,
        G = !1,
        Ae = !1,
        _;
      if (i.optimisticResults) {
        var Te = this.hasListeners(),
          xt = !Te && Le(s, i),
          Pt = Te && Me(s, o, i, a);
        (xt || Pt) && ((C = !0), m || (w = "loading"));
      }
      if (
        i.keepPreviousData &&
        !h.dataUpdateCount &&
        (d == null ? void 0 : d.isSuccess) &&
        w !== "error"
      )
        (_ = d.data), (m = d.dataUpdatedAt), (w = d.status), (G = !0);
      else if (i.select && typeof h.data < "u")
        if (
          l &&
          h.data === (c == null ? void 0 : c.data) &&
          i.select === this.selectFn
        )
          _ = this.selectResult;
        else
          try {
            (this.selectFn = i.select),
              (_ = i.select(h.data)),
              i.structuralSharing !== !1 &&
                (_ = Ne(l == null ? void 0 : l.data, _)),
              (this.selectResult = _),
              (this.selectError = null);
          } catch (j) {
            Fe().error(j), (this.selectError = j);
          }
      else _ = h.data;
      if (
        typeof i.placeholderData < "u" &&
        typeof _ > "u" &&
        (w === "loading" || w === "idle")
      ) {
        var D;
        if (
          (l == null ? void 0 : l.isPlaceholderData) &&
          i.placeholderData === (f == null ? void 0 : f.placeholderData)
        )
          D = l.data;
        else if (
          ((D =
            typeof i.placeholderData == "function"
              ? i.placeholderData()
              : i.placeholderData),
          i.select && typeof D < "u")
        )
          try {
            (D = i.select(D)),
              i.structuralSharing !== !1 &&
                (D = Ne(l == null ? void 0 : l.data, D)),
              (this.selectError = null);
          } catch (j) {
            Fe().error(j), (this.selectError = j);
          }
        typeof D < "u" && ((w = "success"), (_ = D), (Ae = !0));
      }
      this.selectError &&
        ((O = this.selectError),
        (_ = this.selectResult),
        (S = Date.now()),
        (w = "error"));
      var Nt = {
        status: w,
        isLoading: w === "loading",
        isSuccess: w === "success",
        isError: w === "error",
        isIdle: w === "idle",
        data: _,
        dataUpdatedAt: m,
        error: O,
        errorUpdatedAt: S,
        failureCount: h.fetchFailureCount,
        errorUpdateCount: h.errorUpdateCount,
        isFetched: h.dataUpdateCount > 0 || h.errorUpdateCount > 0,
        isFetchedAfterMount:
          h.dataUpdateCount > b.dataUpdateCount ||
          h.errorUpdateCount > b.errorUpdateCount,
        isFetching: C,
        isRefetching: C && w !== "loading",
        isLoadingError: w === "error" && h.dataUpdatedAt === 0,
        isPlaceholderData: Ae,
        isPreviousData: G,
        isRefetchError: w === "error" && h.dataUpdatedAt !== 0,
        isStale: ve(s, i),
        refetch: this.refetch,
        remove: this.remove,
      };
      return Nt;
    }),
    (r.shouldNotifyListeners = function (s, i) {
      if (!i) return !0;
      var o = this.options,
        a = o.notifyOnChangeProps,
        l = o.notifyOnChangePropsExclusions;
      if ((!a && !l) || (a === "tracked" && !this.trackedProps.length))
        return !0;
      var c = a === "tracked" ? this.trackedProps : a;
      return Object.keys(s).some(function (f) {
        var p = f,
          b = s[p] !== i[p],
          d =
            c == null
              ? void 0
              : c.some(function (m) {
                  return m === f;
                }),
          h =
            l == null
              ? void 0
              : l.some(function (m) {
                  return m === f;
                });
        return b && !h && (!c || d);
      });
    }),
    (r.updateResult = function (s) {
      var i = this.currentResult;
      if (
        ((this.currentResult = this.createResult(
          this.currentQuery,
          this.options
        )),
        (this.currentResultState = this.currentQuery.state),
        (this.currentResultOptions = this.options),
        !$t(this.currentResult, i))
      ) {
        var o = { cache: !0 };
        (s == null ? void 0 : s.listeners) !== !1 &&
          this.shouldNotifyListeners(this.currentResult, i) &&
          (o.listeners = !0),
          this.notify(Be({}, o, s));
      }
    }),
    (r.updateQuery = function () {
      var s = this.client.getQueryCache().build(this.client, this.options);
      if (s !== this.currentQuery) {
        var i = this.currentQuery;
        (this.currentQuery = s),
          (this.currentQueryInitialState = s.state),
          (this.previousQueryResult = this.currentResult),
          this.hasListeners() &&
            (i == null || i.removeObserver(this), s.addObserver(this));
      }
    }),
    (r.onQueryUpdate = function (s) {
      var i = {};
      s.type === "success"
        ? (i.onSuccess = !0)
        : s.type === "error" && !kt(s.error) && (i.onError = !0),
        this.updateResult(i),
        this.hasListeners() && this.updateTimers();
    }),
    (r.notify = function (s) {
      var i = this;
      z.batch(function () {
        s.onSuccess
          ? (i.options.onSuccess == null ||
              i.options.onSuccess(i.currentResult.data),
            i.options.onSettled == null ||
              i.options.onSettled(i.currentResult.data, null))
          : s.onError &&
            (i.options.onError == null ||
              i.options.onError(i.currentResult.error),
            i.options.onSettled == null ||
              i.options.onSettled(void 0, i.currentResult.error)),
          s.listeners &&
            i.listeners.forEach(function (o) {
              o(i.currentResult);
            }),
          s.cache &&
            i.client
              .getQueryCache()
              .notify({
                query: i.currentQuery,
                type: "observerResultsUpdated",
              });
      });
    }),
    t
  );
})(jt);
function Jt(e, t) {
  return (
    t.enabled !== !1 &&
    !e.state.dataUpdatedAt &&
    !(e.state.status === "error" && t.retryOnMount === !1)
  );
}
function Le(e, t) {
  return Jt(e, t) || (e.state.dataUpdatedAt > 0 && le(e, t, t.refetchOnMount));
}
function le(e, t, r) {
  if (t.enabled !== !1) {
    var n = typeof r == "function" ? r(e) : r;
    return n === "always" || (n !== !1 && ve(e, t));
  }
  return !1;
}
function Me(e, t, r, n) {
  return (
    r.enabled !== !1 &&
    (e !== t || n.enabled === !1) &&
    (!r.suspense || e.state.status !== "error") &&
    ve(e, r)
  );
}
function ve(e, t) {
  return e.isStaleByTime(t.staleTime);
}
function qt() {
  var e = !1;
  return {
    clearReset: function () {
      e = !1;
    },
    reset: function () {
      e = !0;
    },
    isReset: function () {
      return e;
    },
  };
}
var Kt = N.createContext(qt()),
  Gt = function () {
    return N.useContext(Kt);
  };
function Xt(e, t, r) {
  return typeof t == "function"
    ? t.apply(void 0, r)
    : typeof t == "boolean"
    ? t
    : !!e;
}
function Yt(e, t) {
  var r = N.useRef(!1),
    n = N.useState(0),
    s = n[1],
    i = Ht(),
    o = Gt(),
    a = i.defaultQueryObserverOptions(e);
  (a.optimisticResults = !0),
    a.onError && (a.onError = z.batchCalls(a.onError)),
    a.onSuccess && (a.onSuccess = z.batchCalls(a.onSuccess)),
    a.onSettled && (a.onSettled = z.batchCalls(a.onSettled)),
    a.suspense &&
      (typeof a.staleTime != "number" && (a.staleTime = 1e3),
      a.cacheTime === 0 && (a.cacheTime = 1)),
    (a.suspense || a.useErrorBoundary) &&
      (o.isReset() || (a.retryOnMount = !1));
  var l = N.useState(function () {
      return new t(i, a);
    }),
    c = l[0],
    f = c.getOptimisticResult(a);
  if (
    (N.useEffect(
      function () {
        (r.current = !0), o.clearReset();
        var p = c.subscribe(
          z.batchCalls(function () {
            r.current &&
              s(function (b) {
                return b + 1;
              });
          })
        );
        return (
          c.updateResult(),
          function () {
            (r.current = !1), p();
          }
        );
      },
      [o, c]
    ),
    N.useEffect(
      function () {
        c.setOptions(a, { listeners: !1 });
      },
      [a, c]
    ),
    a.suspense && f.isLoading)
  )
    throw c
      .fetchOptimistic(a)
      .then(function (p) {
        var b = p.data;
        a.onSuccess == null || a.onSuccess(b),
          a.onSettled == null || a.onSettled(b, null);
      })
      .catch(function (p) {
        o.clearReset(),
          a.onError == null || a.onError(p),
          a.onSettled == null || a.onSettled(void 0, p);
      });
  if (
    f.isError &&
    !o.isReset() &&
    !f.isFetching &&
    Xt(a.suspense, a.useErrorBoundary, [f.error, c.getCurrentQuery()])
  )
    throw f.error;
  return a.notifyOnChangeProps === "tracked" && (f = c.trackResult(f, a)), f;
}
function st(e, t, r) {
  var n = zt(e, t, r);
  return Yt(n, Wt);
}
function Zt() {
  return U("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
    fill: "#000000",
    children: [
      E("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
      E("path", {
        d: "M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z",
      }),
    ],
  });
}
function er() {
  return U("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
    fill: "#000000",
    children: [
      E("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
      E("path", {
        d: "M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
      }),
    ],
  });
}
function tr() {
  return U("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "enable-background": "new 0 0 24 24",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
    fill: "#000000",
    children: [
      E("g", {
        children: E("rect", { fill: "none", height: "24", width: "24" }),
      }),
      E("g", {
        children: E("path", {
          d: "M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M9.5,16.5l7-4.5l-7-4.5V16.5z",
        }),
      }),
    ],
  });
}
const rr = (e) => {
    let [t, r] = Vt.exports.useState(!1);
    return U("div", {
      style: e.style,
      children: [
        E("div", {
          className: "tshadow",
          style: {
            margin: "10px",
            backgroundImage: `url(${I.posterUrl + e.posterPath})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            aspectRatio: "2/3",
            borderRadius: "15px",
          },
          onMouseEnter: () => {
            r(!0);
          },
          onMouseLeave: () => {
            r(!1);
          },
          children: U("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#00000077",
              width: "100%",
              height: "100%",
              borderRadius: "15px",
              justifyContent: "center",
              alignItems: "center",
              transition: ".2s ease-in-out",
              opacity: t ? "100%" : "0%",
            },
            children: [
              E("button", { onClick: () => e.onPlay(), children: E(tr, {}) }),
              E("button", {
                onClick: () => e.onFavorite(),
                className: "secondary",
                children: E(Zt, {}),
              }),
              E("button", {
                onClick: () => e.onInfo(),
                className: "secondary",
                children: E(er, {}),
              }),
            ],
          }),
        }),
        E("p", {
          style: {
            fontFamily: "sans-serif",
            textAlign: "center",
            width: "100%",
            height: "2.6rem",
            fontSize: "1.2rem",
            textOverflow: "ellipsis",
            paddingTop: "10px",
          },
          children: e.title,
        }),
      ],
    });
  },
  Ns = (e) =>
    e.films !== void 0
      ? U("div", {
          children: [
            E("p", { className: "category", children: e.title }),
            E("div", {
              style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)" },
              children: e.films.map((t) =>
                E(
                  rr,
                  {
                    title: t.title,
                    posterPath: t.poster_path,
                    onPlay: () => e.onPlay(t.id),
                    onFavorite: () => e.onCart(t),
                    onInfo: () => e.onInfo(t.id),
                  },
                  t.id
                )
              ),
            }),
          ],
        })
      : E(Qt, { children: "Loading" });
function it(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: ot } = Object.prototype,
  { getPrototypeOf: Re } = Object,
  _e = ((e) => (t) => {
    const r = ot.call(t);
    return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  T = (e) => ((e = e.toLowerCase()), (t) => _e(t) === e),
  te = (e) => (t) => typeof t === e,
  { isArray: J } = Array,
  he = te("undefined");
function nr(e) {
  return (
    e !== null &&
    !he(e) &&
    e.constructor !== null &&
    !he(e.constructor) &&
    $(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const at = T("ArrayBuffer");
function sr(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && at(e.buffer)),
    t
  );
}
const ir = te("string"),
  $ = te("function"),
  ct = te("number"),
  ut = (e) => e !== null && typeof e == "object",
  or = (e) => e === !0 || e === !1,
  X = (e) => {
    if (_e(e) !== "object") return !1;
    const t = Re(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  ar = T("Date"),
  cr = T("File"),
  ur = T("Blob"),
  lr = T("FileList"),
  hr = (e) => ut(e) && $(e.pipe),
  fr = (e) => {
    const t = "[object FormData]";
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        ot.call(e) === t ||
        ($(e.toString) && e.toString() === t))
    );
  },
  dr = T("URLSearchParams"),
  pr = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function re(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let n, s;
  if ((typeof e != "object" && (e = [e]), J(e)))
    for (n = 0, s = e.length; n < s; n++) t.call(null, e[n], n, e);
  else {
    const i = r ? Object.getOwnPropertyNames(e) : Object.keys(e),
      o = i.length;
    let a;
    for (n = 0; n < o; n++) (a = i[n]), t.call(null, e[a], a, e);
  }
}
function fe() {
  const e = {},
    t = (r, n) => {
      X(e[n]) && X(r)
        ? (e[n] = fe(e[n], r))
        : X(r)
        ? (e[n] = fe({}, r))
        : J(r)
        ? (e[n] = r.slice())
        : (e[n] = r);
    };
  for (let r = 0, n = arguments.length; r < n; r++)
    arguments[r] && re(arguments[r], t);
  return e;
}
const mr = (e, t, r, { allOwnKeys: n } = {}) => (
    re(
      t,
      (s, i) => {
        r && $(s) ? (e[i] = it(s, r)) : (e[i] = s);
      },
      { allOwnKeys: n }
    ),
    e
  ),
  br = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  yr = (e, t, r, n) => {
    (e.prototype = Object.create(t.prototype, n)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      r && Object.assign(e.prototype, r);
  },
  gr = (e, t, r, n) => {
    let s, i, o;
    const a = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (s = Object.getOwnPropertyNames(e), i = s.length; i-- > 0; )
        (o = s[i]), (!n || n(o, e, t)) && !a[o] && ((t[o] = e[o]), (a[o] = !0));
      e = r !== !1 && Re(e);
    } while (e && (!r || r(e, t)) && e !== Object.prototype);
    return t;
  },
  Er = (e, t, r) => {
    (e = String(e)),
      (r === void 0 || r > e.length) && (r = e.length),
      (r -= t.length);
    const n = e.indexOf(t, r);
    return n !== -1 && n === r;
  },
  wr = (e) => {
    if (!e) return null;
    if (J(e)) return e;
    let t = e.length;
    if (!ct(t)) return null;
    const r = new Array(t);
    for (; t-- > 0; ) r[t] = e[t];
    return r;
  },
  Sr = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && Re(Uint8Array)),
  vr = (e, t) => {
    const n = (e && e[Symbol.iterator]).call(e);
    let s;
    for (; (s = n.next()) && !s.done; ) {
      const i = s.value;
      t.call(e, i[0], i[1]);
    }
  },
  Rr = (e, t) => {
    let r;
    const n = [];
    for (; (r = e.exec(t)) !== null; ) n.push(r);
    return n;
  },
  _r = T("HTMLFormElement"),
  Or = (e) =>
    e.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g, function (r, n, s) {
      return n.toUpperCase() + s;
    }),
  Ue = (
    ({ hasOwnProperty: e }) =>
    (t, r) =>
      e.call(t, r)
  )(Object.prototype),
  Cr = T("RegExp"),
  lt = (e, t) => {
    const r = Object.getOwnPropertyDescriptors(e),
      n = {};
    re(r, (s, i) => {
      t(s, i, e) !== !1 && (n[i] = s);
    }),
      Object.defineProperties(e, n);
  },
  Ir = (e) => {
    lt(e, (t, r) => {
      const n = e[r];
      if (!!$(n)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not read-only method '" + r + "'");
          });
      }
    });
  },
  Dr = (e, t) => {
    const r = {},
      n = (s) => {
        s.forEach((i) => {
          r[i] = !0;
        });
      };
    return J(e) ? n(e) : n(String(e).split(t)), r;
  },
  Ar = () => {},
  Tr = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
  u = {
    isArray: J,
    isArrayBuffer: at,
    isBuffer: nr,
    isFormData: fr,
    isArrayBufferView: sr,
    isString: ir,
    isNumber: ct,
    isBoolean: or,
    isObject: ut,
    isPlainObject: X,
    isUndefined: he,
    isDate: ar,
    isFile: cr,
    isBlob: ur,
    isRegExp: Cr,
    isFunction: $,
    isStream: hr,
    isURLSearchParams: dr,
    isTypedArray: Sr,
    isFileList: lr,
    forEach: re,
    merge: fe,
    extend: mr,
    trim: pr,
    stripBOM: br,
    inherits: yr,
    toFlatObject: gr,
    kindOf: _e,
    kindOfTest: T,
    endsWith: Er,
    toArray: wr,
    forEachEntry: vr,
    matchAll: Rr,
    isHTMLForm: _r,
    hasOwnProperty: Ue,
    hasOwnProp: Ue,
    reduceDescriptors: lt,
    freezeMethods: Ir,
    toObjectSet: Dr,
    toCamelCase: Or,
    noop: Ar,
    toFiniteNumber: Tr,
  };
function y(e, t, r, n, s) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    r && (this.config = r),
    n && (this.request = n),
    s && (this.response = s);
}
u.inherits(y, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    };
  },
});
const ht = y.prototype,
  ft = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  ft[e] = { value: e };
});
Object.defineProperties(y, ft);
Object.defineProperty(ht, "isAxiosError", { value: !0 });
y.from = (e, t, r, n, s, i) => {
  const o = Object.create(ht);
  return (
    u.toFlatObject(
      e,
      o,
      function (l) {
        return l !== Error.prototype;
      },
      (a) => a !== "isAxiosError"
    ),
    y.call(o, e.message, t, r, n, s),
    (o.cause = e),
    (o.name = e.name),
    i && Object.assign(o, i),
    o
  );
};
var Br = typeof self == "object" ? self.FormData : window.FormData;
function de(e) {
  return u.isPlainObject(e) || u.isArray(e);
}
function dt(e) {
  return u.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function $e(e, t, r) {
  return e
    ? e
        .concat(t)
        .map(function (s, i) {
          return (s = dt(s)), !r && i ? "[" + s + "]" : s;
        })
        .join(r ? "." : "")
    : t;
}
function xr(e) {
  return u.isArray(e) && !e.some(de);
}
const Pr = u.toFlatObject(u, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function Nr(e) {
  return (
    e &&
    u.isFunction(e.append) &&
    e[Symbol.toStringTag] === "FormData" &&
    e[Symbol.iterator]
  );
}
function ne(e, t, r) {
  if (!u.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new (Br || FormData)()),
    (r = u.toFlatObject(
      r,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (m, O) {
        return !u.isUndefined(O[m]);
      }
    ));
  const n = r.metaTokens,
    s = r.visitor || f,
    i = r.dots,
    o = r.indexes,
    l = (r.Blob || (typeof Blob < "u" && Blob)) && Nr(t);
  if (!u.isFunction(s)) throw new TypeError("visitor must be a function");
  function c(h) {
    if (h === null) return "";
    if (u.isDate(h)) return h.toISOString();
    if (!l && u.isBlob(h))
      throw new y("Blob is not supported. Use a Buffer instead.");
    return u.isArrayBuffer(h) || u.isTypedArray(h)
      ? l && typeof Blob == "function"
        ? new Blob([h])
        : Buffer.from(h)
      : h;
  }
  function f(h, m, O) {
    let S = h;
    if (h && !O && typeof h == "object") {
      if (u.endsWith(m, "{}"))
        (m = n ? m : m.slice(0, -2)), (h = JSON.stringify(h));
      else if (
        (u.isArray(h) && xr(h)) ||
        u.isFileList(h) ||
        (u.endsWith(m, "[]") && (S = u.toArray(h)))
      )
        return (
          (m = dt(m)),
          S.forEach(function (w, G) {
            !(u.isUndefined(w) || w === null) &&
              t.append(
                o === !0 ? $e([m], G, i) : o === null ? m : m + "[]",
                c(w)
              );
          }),
          !1
        );
    }
    return de(h) ? !0 : (t.append($e(O, m, i), c(h)), !1);
  }
  const p = [],
    b = Object.assign(Pr, {
      defaultVisitor: f,
      convertValue: c,
      isVisitable: de,
    });
  function d(h, m) {
    if (!u.isUndefined(h)) {
      if (p.indexOf(h) !== -1)
        throw Error("Circular reference detected in " + m.join("."));
      p.push(h),
        u.forEach(h, function (S, C) {
          (!(u.isUndefined(S) || S === null) &&
            s.call(t, S, u.isString(C) ? C.trim() : C, m, b)) === !0 &&
            d(S, m ? m.concat(C) : [C]);
        }),
        p.pop();
    }
  }
  if (!u.isObject(e)) throw new TypeError("data must be an object");
  return d(e), t;
}
function ke(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (n) {
    return t[n];
  });
}
function Oe(e, t) {
  (this._pairs = []), e && ne(e, this, t);
}
const pt = Oe.prototype;
pt.append = function (t, r) {
  this._pairs.push([t, r]);
};
pt.toString = function (t) {
  const r = t
    ? function (n) {
        return t.call(this, n, ke);
      }
    : ke;
  return this._pairs
    .map(function (s) {
      return r(s[0]) + "=" + r(s[1]);
    }, "")
    .join("&");
};
function Fr(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function mt(e, t, r) {
  if (!t) return e;
  const n = (r && r.encode) || Fr,
    s = r && r.serialize;
  let i;
  if (
    (s
      ? (i = s(t, r))
      : (i = u.isURLSearchParams(t) ? t.toString() : new Oe(t, r).toString(n)),
    i)
  ) {
    const o = e.indexOf("#");
    o !== -1 && (e = e.slice(0, o)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + i);
  }
  return e;
}
class je {
  constructor() {
    this.handlers = [];
  }
  use(t, r, n) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: r,
        synchronous: n ? n.synchronous : !1,
        runWhen: n ? n.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    u.forEach(this.handlers, function (n) {
      n !== null && t(n);
    });
  }
}
const bt = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  Lr = typeof URLSearchParams < "u" ? URLSearchParams : Oe,
  Mr = FormData,
  Ur = (() => {
    let e;
    return typeof navigator < "u" &&
      ((e = navigator.product) === "ReactNative" ||
        e === "NativeScript" ||
        e === "NS")
      ? !1
      : typeof window < "u" && typeof document < "u";
  })(),
  A = {
    isBrowser: !0,
    classes: { URLSearchParams: Lr, FormData: Mr, Blob },
    isStandardBrowserEnv: Ur,
    protocols: ["http", "https", "file", "blob", "url", "data"],
  };
function $r(e, t) {
  return ne(
    e,
    new A.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (r, n, s, i) {
          return A.isNode && u.isBuffer(r)
            ? (this.append(n, r.toString("base64")), !1)
            : i.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function kr(e) {
  return u
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function jr(e) {
  const t = {},
    r = Object.keys(e);
  let n;
  const s = r.length;
  let i;
  for (n = 0; n < s; n++) (i = r[n]), (t[i] = e[i]);
  return t;
}
function yt(e) {
  function t(r, n, s, i) {
    let o = r[i++];
    const a = Number.isFinite(+o),
      l = i >= r.length;
    return (
      (o = !o && u.isArray(s) ? s.length : o),
      l
        ? (u.hasOwnProp(s, o) ? (s[o] = [s[o], n]) : (s[o] = n), !a)
        : ((!s[o] || !u.isObject(s[o])) && (s[o] = []),
          t(r, n, s[o], i) && u.isArray(s[o]) && (s[o] = jr(s[o])),
          !a)
    );
  }
  if (u.isFormData(e) && u.isFunction(e.entries)) {
    const r = {};
    return (
      u.forEachEntry(e, (n, s) => {
        t(kr(n), s, r, 0);
      }),
      r
    );
  }
  return null;
}
function Hr(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status)
    ? e(r)
    : t(
        new y(
          "Request failed with status code " + r.status,
          [y.ERR_BAD_REQUEST, y.ERR_BAD_RESPONSE][
            Math.floor(r.status / 100) - 4
          ],
          r.config,
          r.request,
          r
        )
      );
}
const zr = A.isStandardBrowserEnv
  ? (function () {
      return {
        write: function (r, n, s, i, o, a) {
          const l = [];
          l.push(r + "=" + encodeURIComponent(n)),
            u.isNumber(s) && l.push("expires=" + new Date(s).toGMTString()),
            u.isString(i) && l.push("path=" + i),
            u.isString(o) && l.push("domain=" + o),
            a === !0 && l.push("secure"),
            (document.cookie = l.join("; "));
        },
        read: function (r) {
          const n = document.cookie.match(
            new RegExp("(^|;\\s*)(" + r + ")=([^;]*)")
          );
          return n ? decodeURIComponent(n[3]) : null;
        },
        remove: function (r) {
          this.write(r, "", Date.now() - 864e5);
        },
      };
    })()
  : (function () {
      return {
        write: function () {},
        read: function () {
          return null;
        },
        remove: function () {},
      };
    })();
function Vr(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Qr(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function gt(e, t) {
  return e && !Vr(t) ? Qr(e, t) : t;
}
const Wr = A.isStandardBrowserEnv
  ? (function () {
      const t = /(msie|trident)/i.test(navigator.userAgent),
        r = document.createElement("a");
      let n;
      function s(i) {
        let o = i;
        return (
          t && (r.setAttribute("href", o), (o = r.href)),
          r.setAttribute("href", o),
          {
            href: r.href,
            protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
            host: r.host,
            search: r.search ? r.search.replace(/^\?/, "") : "",
            hash: r.hash ? r.hash.replace(/^#/, "") : "",
            hostname: r.hostname,
            port: r.port,
            pathname:
              r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname,
          }
        );
      }
      return (
        (n = s(window.location.href)),
        function (o) {
          const a = u.isString(o) ? s(o) : o;
          return a.protocol === n.protocol && a.host === n.host;
        }
      );
    })()
  : (function () {
      return function () {
        return !0;
      };
    })();
function q(e, t, r) {
  y.call(this, e == null ? "canceled" : e, y.ERR_CANCELED, t, r),
    (this.name = "CanceledError");
}
u.inherits(q, y, { __CANCEL__: !0 });
function Jr(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
const qr = u.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  Kr = (e) => {
    const t = {};
    let r, n, s;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (o) {
            (s = o.indexOf(":")),
              (r = o.substring(0, s).trim().toLowerCase()),
              (n = o.substring(s + 1).trim()),
              !(!r || (t[r] && qr[r])) &&
                (r === "set-cookie"
                  ? t[r]
                    ? t[r].push(n)
                    : (t[r] = [n])
                  : (t[r] = t[r] ? t[r] + ", " + n : n));
          }),
      t
    );
  },
  He = Symbol("internals"),
  Et = Symbol("defaults");
function V(e) {
  return e && String(e).trim().toLowerCase();
}
function Y(e) {
  return e === !1 || e == null ? e : u.isArray(e) ? e.map(Y) : String(e);
}
function Gr(e) {
  const t = Object.create(null),
    r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; (n = r.exec(e)); ) t[n[1]] = n[2];
  return t;
}
function ze(e, t, r, n) {
  if (u.isFunction(n)) return n.call(this, t, r);
  if (!!u.isString(t)) {
    if (u.isString(n)) return t.indexOf(n) !== -1;
    if (u.isRegExp(n)) return n.test(t);
  }
}
function Xr(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function Yr(e, t) {
  const r = u.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function (s, i, o) {
        return this[n].call(this, t, s, i, o);
      },
      configurable: !0,
    });
  });
}
function H(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length,
    s;
  for (; n-- > 0; ) if (((s = r[n]), t === s.toLowerCase())) return s;
  return null;
}
function R(e, t) {
  e && this.set(e), (this[Et] = t || null);
}
Object.assign(R.prototype, {
  set: function (e, t, r) {
    const n = this;
    function s(i, o, a) {
      const l = V(o);
      if (!l) throw new Error("header name must be a non-empty string");
      const c = H(n, l);
      (c && a !== !0 && (n[c] === !1 || a === !1)) || (n[c || o] = Y(i));
    }
    return (
      u.isPlainObject(e)
        ? u.forEach(e, (i, o) => {
            s(i, o, t);
          })
        : s(t, e, r),
      this
    );
  },
  get: function (e, t) {
    if (((e = V(e)), !e)) return;
    const r = H(this, e);
    if (r) {
      const n = this[r];
      if (!t) return n;
      if (t === !0) return Gr(n);
      if (u.isFunction(t)) return t.call(this, n, r);
      if (u.isRegExp(t)) return t.exec(n);
      throw new TypeError("parser must be boolean|regexp|function");
    }
  },
  has: function (e, t) {
    if (((e = V(e)), e)) {
      const r = H(this, e);
      return !!(r && (!t || ze(this, this[r], r, t)));
    }
    return !1;
  },
  delete: function (e, t) {
    const r = this;
    let n = !1;
    function s(i) {
      if (((i = V(i)), i)) {
        const o = H(r, i);
        o && (!t || ze(r, r[o], o, t)) && (delete r[o], (n = !0));
      }
    }
    return u.isArray(e) ? e.forEach(s) : s(e), n;
  },
  clear: function () {
    return Object.keys(this).forEach(this.delete.bind(this));
  },
  normalize: function (e) {
    const t = this,
      r = {};
    return (
      u.forEach(this, (n, s) => {
        const i = H(r, s);
        if (i) {
          (t[i] = Y(n)), delete t[s];
          return;
        }
        const o = e ? Xr(s) : String(s).trim();
        o !== s && delete t[s], (t[o] = Y(n)), (r[o] = !0);
      }),
      this
    );
  },
  toJSON: function (e) {
    const t = Object.create(null);
    return (
      u.forEach(Object.assign({}, this[Et] || null, this), (r, n) => {
        r == null || r === !1 || (t[n] = e && u.isArray(r) ? r.join(", ") : r);
      }),
      t
    );
  },
});
Object.assign(R, {
  from: function (e) {
    return u.isString(e)
      ? new this(Kr(e))
      : e instanceof this
      ? e
      : new this(e);
  },
  accessor: function (e) {
    const r = (this[He] = this[He] = { accessors: {} }).accessors,
      n = this.prototype;
    function s(i) {
      const o = V(i);
      r[o] || (Yr(n, i), (r[o] = !0));
    }
    return u.isArray(e) ? e.forEach(s) : s(e), this;
  },
});
R.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
]);
u.freezeMethods(R.prototype);
u.freezeMethods(R);
function Zr(e, t) {
  e = e || 10;
  const r = new Array(e),
    n = new Array(e);
  let s = 0,
    i = 0,
    o;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (l) {
      const c = Date.now(),
        f = n[i];
      o || (o = c), (r[s] = l), (n[s] = c);
      let p = i,
        b = 0;
      for (; p !== s; ) (b += r[p++]), (p = p % e);
      if (((s = (s + 1) % e), s === i && (i = (i + 1) % e), c - o < t)) return;
      const d = f && c - f;
      return d ? Math.round((b * 1e3) / d) : void 0;
    }
  );
}
function Ve(e, t) {
  let r = 0;
  const n = Zr(50, 250);
  return (s) => {
    const i = s.loaded,
      o = s.lengthComputable ? s.total : void 0,
      a = i - r,
      l = n(a),
      c = i <= o;
    r = i;
    const f = {
      loaded: i,
      total: o,
      progress: o ? i / o : void 0,
      bytes: a,
      rate: l || void 0,
      estimated: l && o && c ? (o - i) / l : void 0,
    };
    (f[t ? "download" : "upload"] = !0), e(f);
  };
}
function Qe(e) {
  return new Promise(function (r, n) {
    let s = e.data;
    const i = R.from(e.headers).normalize(),
      o = e.responseType;
    let a;
    function l() {
      e.cancelToken && e.cancelToken.unsubscribe(a),
        e.signal && e.signal.removeEventListener("abort", a);
    }
    u.isFormData(s) && A.isStandardBrowserEnv && i.setContentType(!1);
    let c = new XMLHttpRequest();
    if (e.auth) {
      const d = e.auth.username || "",
        h = e.auth.password
          ? unescape(encodeURIComponent(e.auth.password))
          : "";
      i.set("Authorization", "Basic " + btoa(d + ":" + h));
    }
    const f = gt(e.baseURL, e.url);
    c.open(e.method.toUpperCase(), mt(f, e.params, e.paramsSerializer), !0),
      (c.timeout = e.timeout);
    function p() {
      if (!c) return;
      const d = R.from(
          "getAllResponseHeaders" in c && c.getAllResponseHeaders()
        ),
        m = {
          data:
            !o || o === "text" || o === "json" ? c.responseText : c.response,
          status: c.status,
          statusText: c.statusText,
          headers: d,
          config: e,
          request: c,
        };
      Hr(
        function (S) {
          r(S), l();
        },
        function (S) {
          n(S), l();
        },
        m
      ),
        (c = null);
    }
    if (
      ("onloadend" in c
        ? (c.onloadend = p)
        : (c.onreadystatechange = function () {
            !c ||
              c.readyState !== 4 ||
              (c.status === 0 &&
                !(c.responseURL && c.responseURL.indexOf("file:") === 0)) ||
              setTimeout(p);
          }),
      (c.onabort = function () {
        !c || (n(new y("Request aborted", y.ECONNABORTED, e, c)), (c = null));
      }),
      (c.onerror = function () {
        n(new y("Network Error", y.ERR_NETWORK, e, c)), (c = null);
      }),
      (c.ontimeout = function () {
        let h = e.timeout
          ? "timeout of " + e.timeout + "ms exceeded"
          : "timeout exceeded";
        const m = e.transitional || bt;
        e.timeoutErrorMessage && (h = e.timeoutErrorMessage),
          n(
            new y(h, m.clarifyTimeoutError ? y.ETIMEDOUT : y.ECONNABORTED, e, c)
          ),
          (c = null);
      }),
      A.isStandardBrowserEnv)
    ) {
      const d =
        (e.withCredentials || Wr(f)) &&
        e.xsrfCookieName &&
        zr.read(e.xsrfCookieName);
      d && i.set(e.xsrfHeaderName, d);
    }
    s === void 0 && i.setContentType(null),
      "setRequestHeader" in c &&
        u.forEach(i.toJSON(), function (h, m) {
          c.setRequestHeader(m, h);
        }),
      u.isUndefined(e.withCredentials) ||
        (c.withCredentials = !!e.withCredentials),
      o && o !== "json" && (c.responseType = e.responseType),
      typeof e.onDownloadProgress == "function" &&
        c.addEventListener("progress", Ve(e.onDownloadProgress, !0)),
      typeof e.onUploadProgress == "function" &&
        c.upload &&
        c.upload.addEventListener("progress", Ve(e.onUploadProgress)),
      (e.cancelToken || e.signal) &&
        ((a = (d) => {
          !c ||
            (n(!d || d.type ? new q(null, e, c) : d), c.abort(), (c = null));
        }),
        e.cancelToken && e.cancelToken.subscribe(a),
        e.signal &&
          (e.signal.aborted ? a() : e.signal.addEventListener("abort", a)));
    const b = Jr(f);
    if (b && A.protocols.indexOf(b) === -1) {
      n(new y("Unsupported protocol " + b + ":", y.ERR_BAD_REQUEST, e));
      return;
    }
    c.send(s || null);
  });
}
const We = { http: Qe, xhr: Qe },
  Je = {
    getAdapter: (e) => {
      if (u.isString(e)) {
        const t = We[e];
        if (!e)
          throw Error(
            u.hasOwnProp(e)
              ? `Adapter '${e}' is not available in the build`
              : `Can not resolve adapter '${e}'`
          );
        return t;
      }
      if (!u.isFunction(e)) throw new TypeError("adapter is not a function");
      return e;
    },
    adapters: We,
  },
  en = { "Content-Type": "application/x-www-form-urlencoded" };
function tn() {
  let e;
  return (
    typeof XMLHttpRequest < "u"
      ? (e = Je.getAdapter("xhr"))
      : typeof process < "u" &&
        u.kindOf(process) === "process" &&
        (e = Je.getAdapter("http")),
    e
  );
}
function rn(e, t, r) {
  if (u.isString(e))
    try {
      return (t || JSON.parse)(e), u.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError") throw n;
    }
  return (r || JSON.stringify)(e);
}
const k = {
  transitional: bt,
  adapter: tn(),
  transformRequest: [
    function (t, r) {
      const n = r.getContentType() || "",
        s = n.indexOf("application/json") > -1,
        i = u.isObject(t);
      if ((i && u.isHTMLForm(t) && (t = new FormData(t)), u.isFormData(t)))
        return s && s ? JSON.stringify(yt(t)) : t;
      if (
        u.isArrayBuffer(t) ||
        u.isBuffer(t) ||
        u.isStream(t) ||
        u.isFile(t) ||
        u.isBlob(t)
      )
        return t;
      if (u.isArrayBufferView(t)) return t.buffer;
      if (u.isURLSearchParams(t))
        return (
          r.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let a;
      if (i) {
        if (n.indexOf("application/x-www-form-urlencoded") > -1)
          return $r(t, this.formSerializer).toString();
        if ((a = u.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
          const l = this.env && this.env.FormData;
          return ne(
            a ? { "files[]": t } : t,
            l && new l(),
            this.formSerializer
          );
        }
      }
      return i || s ? (r.setContentType("application/json", !1), rn(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const r = this.transitional || k.transitional,
        n = r && r.forcedJSONParsing,
        s = this.responseType === "json";
      if (t && u.isString(t) && ((n && !this.responseType) || s)) {
        const o = !(r && r.silentJSONParsing) && s;
        try {
          return JSON.parse(t);
        } catch (a) {
          if (o)
            throw a.name === "SyntaxError"
              ? y.from(a, y.ERR_BAD_RESPONSE, this, null, this.response)
              : a;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: A.classes.FormData, Blob: A.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: { common: { Accept: "application/json, text/plain, */*" } },
};
u.forEach(["delete", "get", "head"], function (t) {
  k.headers[t] = {};
});
u.forEach(["post", "put", "patch"], function (t) {
  k.headers[t] = u.merge(en);
});
function se(e, t) {
  const r = this || k,
    n = t || r,
    s = R.from(n.headers);
  let i = n.data;
  return (
    u.forEach(e, function (a) {
      i = a.call(r, i, s.normalize(), t ? t.status : void 0);
    }),
    s.normalize(),
    i
  );
}
function wt(e) {
  return !!(e && e.__CANCEL__);
}
function ie(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new q();
}
function qe(e) {
  return (
    ie(e),
    (e.headers = R.from(e.headers)),
    (e.data = se.call(e, e.transformRequest)),
    (e.adapter || k.adapter)(e).then(
      function (n) {
        return (
          ie(e),
          (n.data = se.call(e, e.transformResponse, n)),
          (n.headers = R.from(n.headers)),
          n
        );
      },
      function (n) {
        return (
          wt(n) ||
            (ie(e),
            n &&
              n.response &&
              ((n.response.data = se.call(e, e.transformResponse, n.response)),
              (n.response.headers = R.from(n.response.headers)))),
          Promise.reject(n)
        );
      }
    )
  );
}
function Q(e, t) {
  t = t || {};
  const r = {};
  function n(c, f) {
    return u.isPlainObject(c) && u.isPlainObject(f)
      ? u.merge(c, f)
      : u.isPlainObject(f)
      ? u.merge({}, f)
      : u.isArray(f)
      ? f.slice()
      : f;
  }
  function s(c) {
    if (u.isUndefined(t[c])) {
      if (!u.isUndefined(e[c])) return n(void 0, e[c]);
    } else return n(e[c], t[c]);
  }
  function i(c) {
    if (!u.isUndefined(t[c])) return n(void 0, t[c]);
  }
  function o(c) {
    if (u.isUndefined(t[c])) {
      if (!u.isUndefined(e[c])) return n(void 0, e[c]);
    } else return n(void 0, t[c]);
  }
  function a(c) {
    if (c in t) return n(e[c], t[c]);
    if (c in e) return n(void 0, e[c]);
  }
  const l = {
    url: i,
    method: i,
    data: i,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: a,
  };
  return (
    u.forEach(Object.keys(e).concat(Object.keys(t)), function (f) {
      const p = l[f] || s,
        b = p(f);
      (u.isUndefined(b) && p !== a) || (r[f] = b);
    }),
    r
  );
}
const St = "1.1.3",
  Ce = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    Ce[e] = function (n) {
      return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const Ke = {};
Ce.transitional = function (t, r, n) {
  function s(i, o) {
    return (
      "[Axios v" +
      St +
      "] Transitional option '" +
      i +
      "'" +
      o +
      (n ? ". " + n : "")
    );
  }
  return (i, o, a) => {
    if (t === !1)
      throw new y(
        s(o, " has been removed" + (r ? " in " + r : "")),
        y.ERR_DEPRECATED
      );
    return (
      r &&
        !Ke[o] &&
        ((Ke[o] = !0),
        console.warn(
          s(
            o,
            " has been deprecated since v" +
              r +
              " and will be removed in the near future"
          )
        )),
      t ? t(i, o, a) : !0
    );
  };
};
function nn(e, t, r) {
  if (typeof e != "object")
    throw new y("options must be an object", y.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let s = n.length;
  for (; s-- > 0; ) {
    const i = n[s],
      o = t[i];
    if (o) {
      const a = e[i],
        l = a === void 0 || o(a, i, e);
      if (l !== !0)
        throw new y("option " + i + " must be " + l, y.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0) throw new y("Unknown option " + i, y.ERR_BAD_OPTION);
  }
}
const pe = { assertOptions: nn, validators: Ce },
  B = pe.validators;
class F {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = { request: new je(), response: new je() });
  }
  request(t, r) {
    typeof t == "string" ? ((r = r || {}), (r.url = t)) : (r = t || {}),
      (r = Q(this.defaults, r));
    const { transitional: n, paramsSerializer: s } = r;
    n !== void 0 &&
      pe.assertOptions(
        n,
        {
          silentJSONParsing: B.transitional(B.boolean),
          forcedJSONParsing: B.transitional(B.boolean),
          clarifyTimeoutError: B.transitional(B.boolean),
        },
        !1
      ),
      s !== void 0 &&
        pe.assertOptions(s, { encode: B.function, serialize: B.function }, !0),
      (r.method = (r.method || this.defaults.method || "get").toLowerCase());
    const i = r.headers && u.merge(r.headers.common, r.headers[r.method]);
    i &&
      u.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function (h) {
          delete r.headers[h];
        }
      ),
      (r.headers = new R(r.headers, i));
    const o = [];
    let a = !0;
    this.interceptors.request.forEach(function (h) {
      (typeof h.runWhen == "function" && h.runWhen(r) === !1) ||
        ((a = a && h.synchronous), o.unshift(h.fulfilled, h.rejected));
    });
    const l = [];
    this.interceptors.response.forEach(function (h) {
      l.push(h.fulfilled, h.rejected);
    });
    let c,
      f = 0,
      p;
    if (!a) {
      const d = [qe.bind(this), void 0];
      for (
        d.unshift.apply(d, o),
          d.push.apply(d, l),
          p = d.length,
          c = Promise.resolve(r);
        f < p;

      )
        c = c.then(d[f++], d[f++]);
      return c;
    }
    p = o.length;
    let b = r;
    for (f = 0; f < p; ) {
      const d = o[f++],
        h = o[f++];
      try {
        b = d(b);
      } catch (m) {
        h.call(this, m);
        break;
      }
    }
    try {
      c = qe.call(this, b);
    } catch (d) {
      return Promise.reject(d);
    }
    for (f = 0, p = l.length; f < p; ) c = c.then(l[f++], l[f++]);
    return c;
  }
  getUri(t) {
    t = Q(this.defaults, t);
    const r = gt(t.baseURL, t.url);
    return mt(r, t.params, t.paramsSerializer);
  }
}
u.forEach(["delete", "get", "head", "options"], function (t) {
  F.prototype[t] = function (r, n) {
    return this.request(
      Q(n || {}, { method: t, url: r, data: (n || {}).data })
    );
  };
});
u.forEach(["post", "put", "patch"], function (t) {
  function r(n) {
    return function (i, o, a) {
      return this.request(
        Q(a || {}, {
          method: t,
          headers: n ? { "Content-Type": "multipart/form-data" } : {},
          url: i,
          data: o,
        })
      );
    };
  }
  (F.prototype[t] = r()), (F.prototype[t + "Form"] = r(!0));
});
class Ie {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function (i) {
      r = i;
    });
    const n = this;
    this.promise.then((s) => {
      if (!n._listeners) return;
      let i = n._listeners.length;
      for (; i-- > 0; ) n._listeners[i](s);
      n._listeners = null;
    }),
      (this.promise.then = (s) => {
        let i;
        const o = new Promise((a) => {
          n.subscribe(a), (i = a);
        }).then(s);
        return (
          (o.cancel = function () {
            n.unsubscribe(i);
          }),
          o
        );
      }),
      t(function (i, o, a) {
        n.reason || ((n.reason = new q(i, o, a)), r(n.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  static source() {
    let t;
    return {
      token: new Ie(function (s) {
        t = s;
      }),
      cancel: t,
    };
  }
}
function sn(e) {
  return function (r) {
    return e.apply(null, r);
  };
}
function on(e) {
  return u.isObject(e) && e.isAxiosError === !0;
}
function vt(e) {
  const t = new F(e),
    r = it(F.prototype.request, t);
  return (
    u.extend(r, F.prototype, t, { allOwnKeys: !0 }),
    u.extend(r, t, null, { allOwnKeys: !0 }),
    (r.create = function (s) {
      return vt(Q(e, s));
    }),
    r
  );
}
const v = vt(k);
v.Axios = F;
v.CanceledError = q;
v.CancelToken = Ie;
v.isCancel = wt;
v.VERSION = St;
v.toFormData = ne;
v.AxiosError = y;
v.Cancel = v.CanceledError;
v.all = function (t) {
  return Promise.all(t);
};
v.spread = sn;
v.isAxiosError = on;
v.formToJSON = (e) => yt(u.isHTMLForm(e) ? new FormData(e) : e);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Rt = function (e) {
    const t = [];
    let r = 0;
    for (let n = 0; n < e.length; n++) {
      let s = e.charCodeAt(n);
      s < 128
        ? (t[r++] = s)
        : s < 2048
        ? ((t[r++] = (s >> 6) | 192), (t[r++] = (s & 63) | 128))
        : (s & 64512) === 55296 &&
          n + 1 < e.length &&
          (e.charCodeAt(n + 1) & 64512) === 56320
        ? ((s = 65536 + ((s & 1023) << 10) + (e.charCodeAt(++n) & 1023)),
          (t[r++] = (s >> 18) | 240),
          (t[r++] = ((s >> 12) & 63) | 128),
          (t[r++] = ((s >> 6) & 63) | 128),
          (t[r++] = (s & 63) | 128))
        : ((t[r++] = (s >> 12) | 224),
          (t[r++] = ((s >> 6) & 63) | 128),
          (t[r++] = (s & 63) | 128));
    }
    return t;
  },
  an = function (e) {
    const t = [];
    let r = 0,
      n = 0;
    for (; r < e.length; ) {
      const s = e[r++];
      if (s < 128) t[n++] = String.fromCharCode(s);
      else if (s > 191 && s < 224) {
        const i = e[r++];
        t[n++] = String.fromCharCode(((s & 31) << 6) | (i & 63));
      } else if (s > 239 && s < 365) {
        const i = e[r++],
          o = e[r++],
          a = e[r++],
          l =
            (((s & 7) << 18) | ((i & 63) << 12) | ((o & 63) << 6) | (a & 63)) -
            65536;
        (t[n++] = String.fromCharCode(55296 + (l >> 10))),
          (t[n++] = String.fromCharCode(56320 + (l & 1023)));
      } else {
        const i = e[r++],
          o = e[r++];
        t[n++] = String.fromCharCode(
          ((s & 15) << 12) | ((i & 63) << 6) | (o & 63)
        );
      }
    }
    return t.join("");
  },
  _t = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + "+/=";
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + "-_.";
    },
    HAS_NATIVE_SUPPORT: typeof atob == "function",
    encodeByteArray(e, t) {
      if (!Array.isArray(e))
        throw Error("encodeByteArray takes an array as a parameter");
      this.init_();
      const r = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        n = [];
      for (let s = 0; s < e.length; s += 3) {
        const i = e[s],
          o = s + 1 < e.length,
          a = o ? e[s + 1] : 0,
          l = s + 2 < e.length,
          c = l ? e[s + 2] : 0,
          f = i >> 2,
          p = ((i & 3) << 4) | (a >> 4);
        let b = ((a & 15) << 2) | (c >> 6),
          d = c & 63;
        l || ((d = 64), o || (b = 64)), n.push(r[f], r[p], r[b], r[d]);
      }
      return n.join("");
    },
    encodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? btoa(e)
        : this.encodeByteArray(Rt(e), t);
    },
    decodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? atob(e)
        : an(this.decodeStringToByteArray(e, t));
    },
    decodeStringToByteArray(e, t) {
      this.init_();
      const r = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        n = [];
      for (let s = 0; s < e.length; ) {
        const i = r[e.charAt(s++)],
          a = s < e.length ? r[e.charAt(s)] : 0;
        ++s;
        const c = s < e.length ? r[e.charAt(s)] : 64;
        ++s;
        const p = s < e.length ? r[e.charAt(s)] : 64;
        if ((++s, i == null || a == null || c == null || p == null))
          throw Error();
        const b = (i << 2) | (a >> 4);
        if ((n.push(b), c !== 64)) {
          const d = ((a << 4) & 240) | (c >> 2);
          if ((n.push(d), p !== 64)) {
            const h = ((c << 6) & 192) | p;
            n.push(h);
          }
        }
      }
      return n;
    },
    init_() {
      if (!this.byteToCharMap_) {
        (this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {});
        for (let e = 0; e < this.ENCODED_VALS.length; e++)
          (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
            (this.charToByteMap_[this.byteToCharMap_[e]] = e),
            (this.byteToCharMapWebSafe_[e] =
              this.ENCODED_VALS_WEBSAFE.charAt(e)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
            e >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
      }
    },
  },
  cn = function (e) {
    const t = Rt(e);
    return _t.encodeByteArray(t, !0);
  },
  Ot = function (e) {
    return cn(e).replace(/\./g, "");
  },
  un = function (e) {
    try {
      return _t.decodeString(e, !0);
    } catch (t) {
      console.error("base64Decode failed: ", t);
    }
    return null;
  };
function ln() {
  return typeof indexedDB == "object";
}
function hn() {
  return new Promise((e, t) => {
    try {
      let r = !0;
      const n = "validate-browser-context-for-indexeddb-analytics-module",
        s = self.indexedDB.open(n);
      (s.onsuccess = () => {
        s.result.close(), r || self.indexedDB.deleteDatabase(n), e(!0);
      }),
        (s.onupgradeneeded = () => {
          r = !1;
        }),
        (s.onerror = () => {
          var i;
          t(
            ((i = s.error) === null || i === void 0 ? void 0 : i.message) || ""
          );
        });
    } catch (r) {
      t(r);
    }
  });
}
function fn() {
  if (typeof self < "u") return self;
  if (typeof window < "u") return window;
  if (typeof global < "u") return global;
  throw new Error("Unable to locate global object.");
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const dn = () => fn().__FIREBASE_DEFAULTS__,
  pn = () => {
    if (typeof process > "u" || typeof process.env > "u") return;
    const e = process.env.__FIREBASE_DEFAULTS__;
    if (e) return JSON.parse(e);
  },
  mn = () => {
    if (typeof document > "u") return;
    let e;
    try {
      e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
    } catch {
      return;
    }
    const t = e && un(e[1]);
    return t && JSON.parse(t);
  },
  bn = () => {
    try {
      return dn() || pn() || mn();
    } catch (e) {
      console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);

    }
  },
  yn = () => {
    var e;
    return (e = bn()) === null || e === void 0 ? void 0 : e.config;
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class gn {
  constructor() {
    (this.reject = () => {}),
      (this.resolve = () => {}),
      (this.promise = new Promise((t, r) => {
        (this.resolve = t), (this.reject = r);
      }));
  }
  wrapCallback(t) {
    return (r, n) => {
      r ? this.reject(r) : this.resolve(n),
        typeof t == "function" &&
          (this.promise.catch(() => {}), t.length === 1 ? t(r) : t(r, n));
    };
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const En = "FirebaseError";
class K extends Error {
  constructor(t, r, n) {
    super(r),
      (this.code = t),
      (this.customData = n),
      (this.name = En),
      Object.setPrototypeOf(this, K.prototype),
      Error.captureStackTrace &&
        Error.captureStackTrace(this, Ct.prototype.create);
  }
}
class Ct {
  constructor(t, r, n) {
    (this.service = t), (this.serviceName = r), (this.errors = n);
  }
  create(t, ...r) {
    const n = r[0] || {},
      s = `${this.service}/${t}`,
      i = this.errors[t],
      o = i ? wn(i, n) : "Error",
      a = `${this.serviceName}: ${o} (${s}).`;
    return new K(s, a, n);
  }
}
function wn(e, t) {
  return e.replace(Sn, (r, n) => {
    const s = t[n];
    return s != null ? String(s) : `<${n}?>`;
  });
}
const Sn = /\{\$([^}]+)}/g;
function me(e, t) {
  if (e === t) return !0;
  const r = Object.keys(e),
    n = Object.keys(t);
  for (const s of r) {
    if (!n.includes(s)) return !1;
    const i = e[s],
      o = t[s];
    if (Ge(i) && Ge(o)) {
      if (!me(i, o)) return !1;
    } else if (i !== o) return !1;
  }
  for (const s of n) if (!r.includes(s)) return !1;
  return !0;
}
function Ge(e) {
  return e !== null && typeof e == "object";
}
class ee {
  constructor(t, r, n) {
    (this.name = t),
      (this.instanceFactory = r),
      (this.type = n),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = "LAZY"),
      (this.onInstanceCreated = null);
  }
  setInstantiationMode(t) {
    return (this.instantiationMode = t), this;
  }
  setMultipleInstances(t) {
    return (this.multipleInstances = t), this;
  }
  setServiceProps(t) {
    return (this.serviceProps = t), this;
  }
  setInstanceCreatedCallback(t) {
    return (this.onInstanceCreated = t), this;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const P = "[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class vn {
  constructor(t, r) {
    (this.name = t),
      (this.container = r),
      (this.component = null),
      (this.instances = new Map()),
      (this.instancesDeferred = new Map()),
      (this.instancesOptions = new Map()),
      (this.onInitCallbacks = new Map());
  }
  get(t) {
    const r = this.normalizeInstanceIdentifier(t);
    if (!this.instancesDeferred.has(r)) {
      const n = new gn();
      if (
        (this.instancesDeferred.set(r, n),
        this.isInitialized(r) || this.shouldAutoInitialize())
      )
        try {
          const s = this.getOrInitializeService({ instanceIdentifier: r });
          s && n.resolve(s);
        } catch {}
    }
    return this.instancesDeferred.get(r).promise;
  }
  getImmediate(t) {
    var r;
    const n = this.normalizeInstanceIdentifier(
        t == null ? void 0 : t.identifier
      ),
      s =
        (r = t == null ? void 0 : t.optional) !== null && r !== void 0 ? r : !1;
    if (this.isInitialized(n) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({ instanceIdentifier: n });
      } catch (i) {
        if (s) return null;
        throw i;
      }
    else {
      if (s) return null;
      throw Error(`Service ${this.name} is not available`);
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(t) {
    if (t.name !== this.name)
      throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);
    if (this.component)
      throw Error(`Component for ${this.name} has already been provided`);
    if (((this.component = t), !!this.shouldAutoInitialize())) {
      if (_n(t))
        try {
          this.getOrInitializeService({ instanceIdentifier: P });
        } catch {}
      for (const [r, n] of this.instancesDeferred.entries()) {
        const s = this.normalizeInstanceIdentifier(r);
        try {
          const i = this.getOrInitializeService({ instanceIdentifier: s });
          n.resolve(i);
        } catch {}
      }
    }
  }
  clearInstance(t = P) {
    this.instancesDeferred.delete(t),
      this.instancesOptions.delete(t),
      this.instances.delete(t);
  }
  async delete() {
    const t = Array.from(this.instances.values());
    await Promise.all([
      ...t.filter((r) => "INTERNAL" in r).map((r) => r.INTERNAL.delete()),
      ...t.filter((r) => "_delete" in r).map((r) => r._delete()),
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(t = P) {
    return this.instances.has(t);
  }
  getOptions(t = P) {
    return this.instancesOptions.get(t) || {};
  }
  initialize(t = {}) {
    const { options: r = {} } = t,
      n = this.normalizeInstanceIdentifier(t.instanceIdentifier);
    if (this.isInitialized(n))
      throw Error(`${this.name}(${n}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const s = this.getOrInitializeService({
      instanceIdentifier: n,
      options: r,
    });
    for (const [i, o] of this.instancesDeferred.entries()) {
      const a = this.normalizeInstanceIdentifier(i);
      n === a && o.resolve(s);
    }
    return s;
  }
  onInit(t, r) {
    var n;
    const s = this.normalizeInstanceIdentifier(r),
      i =
        (n = this.onInitCallbacks.get(s)) !== null && n !== void 0
          ? n
          : new Set();
    i.add(t), this.onInitCallbacks.set(s, i);
    const o = this.instances.get(s);
    return (
      o && t(o, s),
      () => {
        i.delete(t);
      }
    );
  }
  invokeOnInitCallbacks(t, r) {
    const n = this.onInitCallbacks.get(r);
    if (!!n)
      for (const s of n)
        try {
          s(t, r);
        } catch {}
  }
  getOrInitializeService({ instanceIdentifier: t, options: r = {} }) {
    let n = this.instances.get(t);
    if (
      !n &&
      this.component &&
      ((n = this.component.instanceFactory(this.container, {
        instanceIdentifier: Rn(t),
        options: r,
      })),
      this.instances.set(t, n),
      this.instancesOptions.set(t, r),
      this.invokeOnInitCallbacks(n, t),
      this.component.onInstanceCreated)
    )
      try {
        this.component.onInstanceCreated(this.container, t, n);
      } catch {}
    return n || null;
  }
  normalizeInstanceIdentifier(t = P) {
    return this.component ? (this.component.multipleInstances ? t : P) : t;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
}
function Rn(e) {
  return e === P ? void 0 : e;
}
function _n(e) {
  return e.instantiationMode === "EAGER";
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class On {
  constructor(t) {
    (this.name = t), (this.providers = new Map());
  }
  addComponent(t) {
    const r = this.getProvider(t.name);
    if (r.isComponentSet())
      throw new Error(
        `Component ${t.name} has already been registered with ${this.name}`
      );
    r.setComponent(t);
  }
  addOrOverwriteComponent(t) {
    this.getProvider(t.name).isComponentSet() && this.providers.delete(t.name),
      this.addComponent(t);
  }
  getProvider(t) {
    if (this.providers.has(t)) return this.providers.get(t);
    const r = new vn(t, this);
    return this.providers.set(t, r), r;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var g;
(function (e) {
  (e[(e.DEBUG = 0)] = "DEBUG"),
    (e[(e.VERBOSE = 1)] = "VERBOSE"),
    (e[(e.INFO = 2)] = "INFO"),
    (e[(e.WARN = 3)] = "WARN"),
    (e[(e.ERROR = 4)] = "ERROR"),
    (e[(e.SILENT = 5)] = "SILENT");
})(g || (g = {}));
const Cn = {
    debug: g.DEBUG,
    verbose: g.VERBOSE,
    info: g.INFO,
    warn: g.WARN,
    error: g.ERROR,
    silent: g.SILENT,
  },
  In = g.INFO,
  Dn = {
    [g.DEBUG]: "log",
    [g.VERBOSE]: "log",
    [g.INFO]: "info",
    [g.WARN]: "warn",
    [g.ERROR]: "error",
  },
  An = (e, t, ...r) => {
    if (t < e.logLevel) return;
    const n = new Date().toISOString(),
      s = Dn[t];
    if (s) console[s](`[${n}]  ${e.name}:`, ...r);
    else
      throw new Error(
        `Attempted to log a message with an invalid logType (value: ${t})`
      );
  };
class Tn {
  constructor(t) {
    (this.name = t),
      (this._logLevel = In),
      (this._logHandler = An),
      (this._userLogHandler = null);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(t) {
    if (!(t in g))
      throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);
    this._logLevel = t;
  }
  setLogLevel(t) {
    this._logLevel = typeof t == "string" ? Cn[t] : t;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(t) {
    if (typeof t != "function")
      throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = t;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(t) {
    this._userLogHandler = t;
  }
  debug(...t) {
    this._userLogHandler && this._userLogHandler(this, g.DEBUG, ...t),
      this._logHandler(this, g.DEBUG, ...t);
  }
  log(...t) {
    this._userLogHandler && this._userLogHandler(this, g.VERBOSE, ...t),
      this._logHandler(this, g.VERBOSE, ...t);
  }
  info(...t) {
    this._userLogHandler && this._userLogHandler(this, g.INFO, ...t),
      this._logHandler(this, g.INFO, ...t);
  }
  warn(...t) {
    this._userLogHandler && this._userLogHandler(this, g.WARN, ...t),
      this._logHandler(this, g.WARN, ...t);
  }
  error(...t) {
    this._userLogHandler && this._userLogHandler(this, g.ERROR, ...t),
      this._logHandler(this, g.ERROR, ...t);
  }
}
const Bn = (e, t) => t.some((r) => e instanceof r);
let Xe, Ye;
function xn() {
  return (
    Xe ||
    (Xe = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function Pn() {
  return (
    Ye ||
    (Ye = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const It = new WeakMap(),
  be = new WeakMap(),
  Dt = new WeakMap(),
  oe = new WeakMap(),
  De = new WeakMap();
function Nn(e) {
  const t = new Promise((r, n) => {
    const s = () => {
        e.removeEventListener("success", i), e.removeEventListener("error", o);
      },
      i = () => {
        r(x(e.result)), s();
      },
      o = () => {
        n(e.error), s();
      };
    e.addEventListener("success", i), e.addEventListener("error", o);
  });
  return (
    t
      .then((r) => {
        r instanceof IDBCursor && It.set(r, e);
      })
      .catch(() => {}),
    De.set(t, e),
    t
  );
}
function Fn(e) {
  if (be.has(e)) return;
  const t = new Promise((r, n) => {
    const s = () => {
        e.removeEventListener("complete", i),
          e.removeEventListener("error", o),
          e.removeEventListener("abort", o);
      },
      i = () => {
        r(), s();
      },
      o = () => {
        n(e.error || new DOMException("AbortError", "AbortError")), s();
      };
    e.addEventListener("complete", i),
      e.addEventListener("error", o),
      e.addEventListener("abort", o);
  });
  be.set(e, t);
}
let ye = {
  get(e, t, r) {
    if (e instanceof IDBTransaction) {
      if (t === "done") return be.get(e);
      if (t === "objectStoreNames") return e.objectStoreNames || Dt.get(e);
      if (t === "store")
        return r.objectStoreNames[1]
          ? void 0
          : r.objectStore(r.objectStoreNames[0]);
    }
    return x(e[t]);
  },
  set(e, t, r) {
    return (e[t] = r), !0;
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === "done" || t === "store")
      ? !0
      : t in e;
  },
};
function Ln(e) {
  ye = e(ye);
}
function Mn(e) {
  return e === IDBDatabase.prototype.transaction &&
    !("objectStoreNames" in IDBTransaction.prototype)
    ? function (t, ...r) {
        const n = e.call(ae(this), t, ...r);
        return Dt.set(n, t.sort ? t.sort() : [t]), x(n);
      }
    : Pn().includes(e)
    ? function (...t) {
        return e.apply(ae(this), t), x(It.get(this));
      }
    : function (...t) {
        return x(e.apply(ae(this), t));
      };
}
function Un(e) {
  return typeof e == "function"
    ? Mn(e)
    : (e instanceof IDBTransaction && Fn(e),
      Bn(e, xn()) ? new Proxy(e, ye) : e);
}
function x(e) {
  if (e instanceof IDBRequest) return Nn(e);
  if (oe.has(e)) return oe.get(e);
  const t = Un(e);
  return t !== e && (oe.set(e, t), De.set(t, e)), t;
}
const ae = (e) => De.get(e);
function $n(e, t, { blocked: r, upgrade: n, blocking: s, terminated: i } = {}) {
  const o = indexedDB.open(e, t),
    a = x(o);
  return (
    n &&
      o.addEventListener("upgradeneeded", (l) => {
        n(x(o.result), l.oldVersion, l.newVersion, x(o.transaction));
      }),
    r && o.addEventListener("blocked", () => r()),
    a
      .then((l) => {
        i && l.addEventListener("close", () => i()),
          s && l.addEventListener("versionchange", () => s());
      })
      .catch(() => {}),
    a
  );
}
const kn = ["get", "getKey", "getAll", "getAllKeys", "count"],
  jn = ["put", "add", "delete", "clear"],
  ce = new Map();
function Ze(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
  if (ce.get(t)) return ce.get(t);
  const r = t.replace(/FromIndex$/, ""),
    n = t !== r,
    s = jn.includes(r);
  if (
    !(r in (n ? IDBIndex : IDBObjectStore).prototype) ||
    !(s || kn.includes(r))
  )
    return;
  const i = async function (o, ...a) {
    const l = this.transaction(o, s ? "readwrite" : "readonly");
    let c = l.store;
    return (
      n && (c = c.index(a.shift())),
      (await Promise.all([c[r](...a), s && l.done]))[0]
    );
  };
  return ce.set(t, i), i;
}
Ln((e) => ({
  ...e,
  get: (t, r, n) => Ze(t, r) || e.get(t, r, n),
  has: (t, r) => !!Ze(t, r) || e.has(t, r),
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Hn {
  constructor(t) {
    this.container = t;
  }
  getPlatformInfoString() {
    return this.container
      .getProviders()
      .map((r) => {
        if (zn(r)) {
          const n = r.getImmediate();
          return `${n.library}/${n.version}`;
        } else return null;
      })
      .filter((r) => r)
      .join(" ");
  }
}
function zn(e) {
  const t = e.getComponent();
  return (t == null ? void 0 : t.type) === "VERSION";
}
const ge = "@firebase/app",
  et = "0.8.4";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const M = new Tn("@firebase/app"),
  Vn = "@firebase/app-compat",
  Qn = "@firebase/analytics-compat",
  Wn = "@firebase/analytics",
  Jn = "@firebase/app-check-compat",
  qn = "@firebase/app-check",
  Kn = "@firebase/auth",
  Gn = "@firebase/auth-compat",
  Xn = "@firebase/database",
  Yn = "@firebase/database-compat",
  Zn = "@firebase/functions",
  es = "@firebase/functions-compat",
  ts = "@firebase/installations",
  rs = "@firebase/installations-compat",
  ns = "@firebase/messaging",
  ss = "@firebase/messaging-compat",
  is = "@firebase/performance",
  os = "@firebase/performance-compat",
  as = "@firebase/remote-config",
  cs = "@firebase/remote-config-compat",
  us = "@firebase/storage",
  ls = "@firebase/storage-compat",
  hs = "@firebase/firestore",
  fs = "@firebase/firestore-compat",
  ds = "firebase";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ps = "[DEFAULT]",
  ms = {
    [ge]: "fire-core",
    [Vn]: "fire-core-compat",
    [Wn]: "fire-analytics",
    [Qn]: "fire-analytics-compat",
    [qn]: "fire-app-check",
    [Jn]: "fire-app-check-compat",
    [Kn]: "fire-auth",
    [Gn]: "fire-auth-compat",
    [Xn]: "fire-rtdb",
    [Yn]: "fire-rtdb-compat",
    [Zn]: "fire-fn",
    [es]: "fire-fn-compat",
    [ts]: "fire-iid",
    [rs]: "fire-iid-compat",
    [ns]: "fire-fcm",
    [ss]: "fire-fcm-compat",
    [is]: "fire-perf",
    [os]: "fire-perf-compat",
    [as]: "fire-rc",
    [cs]: "fire-rc-compat",
    [us]: "fire-gcs",
    [ls]: "fire-gcs-compat",
    [hs]: "fire-fst",
    [fs]: "fire-fst-compat",
    "fire-js": "fire-js",
    [ds]: "fire-js-all",
  };
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ee = new Map(),
  we = new Map();
function bs(e, t) {
  try {
    e.container.addComponent(t);
  } catch (r) {
    M.debug(
      `Component ${t.name} failed to register with FirebaseApp ${e.name}`,
      r
    );
  }
}
function Se(e) {
  const t = e.name;
  if (we.has(t))
    return (
      M.debug(`There were multiple attempts to register component ${t}.`), !1
    );
  we.set(t, e);
  for (const r of Ee.values()) bs(r, e);
  return !0;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ys = {
    ["no-app"]:
      "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
    ["bad-app-name"]: "Illegal App name: '{$appName}",
    ["duplicate-app"]:
      "Firebase App named '{$appName}' already exists with different options or config",
    ["app-deleted"]: "Firebase App named '{$appName}' already deleted",
    ["no-options"]:
      "Need to provide options, when not being deployed to hosting via source.",
    ["invalid-app-argument"]:
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    ["invalid-log-argument"]:
      "First argument to `onLog` must be null or a function.",
    ["idb-open"]:
      "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    ["idb-get"]:
      "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    ["idb-set"]:
      "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    ["idb-delete"]:
      "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
  },
  L = new Ct("app", "Firebase", ys);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class gs {
  constructor(t, r, n) {
    (this._isDeleted = !1),
      (this._options = Object.assign({}, t)),
      (this._config = Object.assign({}, r)),
      (this._name = r.name),
      (this._automaticDataCollectionEnabled = r.automaticDataCollectionEnabled),
      (this._container = n),
      this.container.addComponent(new ee("app", () => this, "PUBLIC"));
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(), this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(t) {
    this.checkDestroyed(), (this._automaticDataCollectionEnabled = t);
  }
  get name() {
    return this.checkDestroyed(), this._name;
  }
  get options() {
    return this.checkDestroyed(), this._options;
  }
  get config() {
    return this.checkDestroyed(), this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(t) {
    this._isDeleted = t;
  }
  checkDestroyed() {
    if (this.isDeleted) throw L.create("app-deleted", { appName: this._name });
  }
}
function Es(e, t = {}) {
  let r = e;
  typeof t != "object" && (t = { name: t });
  const n = Object.assign({ name: ps, automaticDataCollectionEnabled: !1 }, t),
    s = n.name;
  if (typeof s != "string" || !s)
    throw L.create("bad-app-name", { appName: String(s) });
  if ((r || (r = yn()), !r)) throw L.create("no-options");
  const i = Ee.get(s);
  if (i) {
    if (me(r, i.options) && me(n, i.config)) return i;
    throw L.create("duplicate-app", { appName: s });
  }
  const o = new On(s);
  for (const l of we.values()) o.addComponent(l);
  const a = new gs(r, n, o);
  return Ee.set(s, a), a;
}
function Z(e, t, r) {
  var n;
  let s = (n = ms[e]) !== null && n !== void 0 ? n : e;
  r && (s += `-${r}`);
  const i = s.match(/\s|\//),
    o = t.match(/\s|\//);
  if (i || o) {
    const a = [`Unable to register library "${s}" with version "${t}":`];
    i &&
      a.push(
        `library name "${s}" contains illegal characters (whitespace or "/")`
      ),
      i && o && a.push("and"),
      o &&
        a.push(
          `version name "${t}" contains illegal characters (whitespace or "/")`
        ),
      M.warn(a.join(" "));
    return;
  }
  Se(new ee(`${s}-version`, () => ({ library: s, version: t }), "VERSION"));
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ws = "firebase-heartbeat-database",
  Ss = 1,
  W = "firebase-heartbeat-store";
let ue = null;
function At() {
  return (
    ue ||
      (ue = $n(ws, Ss, {
        upgrade: (e, t) => {
          switch (t) {
            case 0:
              e.createObjectStore(W);
          }
        },
      }).catch((e) => {
        throw L.create("idb-open", { originalErrorMessage: e.message });
      })),
    ue
  );
}
async function vs(e) {
  var t;
  try {
    return (await At()).transaction(W).objectStore(W).get(Tt(e));
  } catch (r) {
    if (r instanceof K) M.warn(r.message);
    else {
      const n = L.create("idb-get", {
        originalErrorMessage:
          (t = r) === null || t === void 0 ? void 0 : t.message,
      });
      M.warn(n.message);
    }
  }
}
async function tt(e, t) {
  var r;
  try {
    const s = (await At()).transaction(W, "readwrite");
    return await s.objectStore(W).put(t, Tt(e)), s.done;
  } catch (n) {
    if (n instanceof K) M.warn(n.message);
    else {
      const s = L.create("idb-set", {
        originalErrorMessage:
          (r = n) === null || r === void 0 ? void 0 : r.message,
      });
      M.warn(s.message);
    }
  }
}
function Tt(e) {
  return `${e.name}!${e.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Rs = 1024,
  _s = 30 * 24 * 60 * 60 * 1e3;
class Os {
  constructor(t) {
    (this.container = t), (this._heartbeatsCache = null);
    const r = this.container.getProvider("app").getImmediate();
    (this._storage = new Is(r)),
      (this._heartbeatsCachePromise = this._storage
        .read()
        .then((n) => ((this._heartbeatsCache = n), n)));
  }
  async triggerHeartbeat() {
    const r = this.container
        .getProvider("platform-logger")
        .getImmediate()
        .getPlatformInfoString(),
      n = rt();
    if (
      (this._heartbeatsCache === null &&
        (this._heartbeatsCache = await this._heartbeatsCachePromise),
      !(
        this._heartbeatsCache.lastSentHeartbeatDate === n ||
        this._heartbeatsCache.heartbeats.some((s) => s.date === n)
      ))
    )
      return (
        this._heartbeatsCache.heartbeats.push({ date: n, agent: r }),
        (this._heartbeatsCache.heartbeats =
          this._heartbeatsCache.heartbeats.filter((s) => {
            const i = new Date(s.date).valueOf();
            return Date.now() - i <= _s;
          })),
        this._storage.overwrite(this._heartbeatsCache)
      );
  }
  async getHeartbeatsHeader() {
    if (
      (this._heartbeatsCache === null && (await this._heartbeatsCachePromise),
      this._heartbeatsCache === null ||
        this._heartbeatsCache.heartbeats.length === 0)
    )
      return "";
    const t = rt(),
      { heartbeatsToSend: r, unsentEntries: n } = Cs(
        this._heartbeatsCache.heartbeats
      ),
      s = Ot(JSON.stringify({ version: 2, heartbeats: r }));
    return (
      (this._heartbeatsCache.lastSentHeartbeatDate = t),
      n.length > 0
        ? ((this._heartbeatsCache.heartbeats = n),
          await this._storage.overwrite(this._heartbeatsCache))
        : ((this._heartbeatsCache.heartbeats = []),
          this._storage.overwrite(this._heartbeatsCache)),
      s
    );
  }
}
function rt() {
  return new Date().toISOString().substring(0, 10);
}
function Cs(e, t = Rs) {
  const r = [];
  let n = e.slice();
  for (const s of e) {
    const i = r.find((o) => o.agent === s.agent);
    if (i) {
      if ((i.dates.push(s.date), nt(r) > t)) {
        i.dates.pop();
        break;
      }
    } else if ((r.push({ agent: s.agent, dates: [s.date] }), nt(r) > t)) {
      r.pop();
      break;
    }
    n = n.slice(1);
  }
  return { heartbeatsToSend: r, unsentEntries: n };
}
class Is {
  constructor(t) {
    (this.app = t),
      (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
  }
  async runIndexedDBEnvironmentCheck() {
    return ln()
      ? hn()
          .then(() => !0)
          .catch(() => !1)
      : !1;
  }
  async read() {
    return (await this._canUseIndexedDBPromise)
      ? (await vs(this.app)) || { heartbeats: [] }
      : { heartbeats: [] };
  }
  async overwrite(t) {
    var r;
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read();
      return tt(this.app, {
        lastSentHeartbeatDate:
          (r = t.lastSentHeartbeatDate) !== null && r !== void 0
            ? r
            : s.lastSentHeartbeatDate,
        heartbeats: t.heartbeats,
      });
    } else
  }
  async add(t) {
    var r;
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read();
      return tt(this.app, {
        lastSentHeartbeatDate:
          (r = t.lastSentHeartbeatDate) !== null && r !== void 0
            ? r
            : s.lastSentHeartbeatDate,
        heartbeats: [...s.heartbeats, ...t.heartbeats],
      });
    } else
  }
}
function nt(e) {
  return Ot(JSON.stringify({ version: 2, heartbeats: e })).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ds(e) {
  Se(new ee("platform-logger", (t) => new Hn(t), "PRIVATE")),
    Se(new ee("heartbeat", (t) => new Os(t), "PRIVATE")),
    Z(ge, et, e),
    Z(ge, et, "esm2017"),
    Z("fire-js", "");
}
Ds("");
var As = "firebase",
  Ts = "9.14.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Z(As, Ts, "app");
const Bt = v.create({ baseURL: I.baseUrl, timeout: 2e3 }),
  Bs = {
    apiKey: "AIzaSyBwOFixwcdJK225S_EE9JzimOq2aqCTeP8",
    authDomain: "phimgaygo.firebaseapp.com",
    projectId: "phimgaygo",
    storageBucket: "phimgaygo.appspot.com",
    messagingSenderId: "293234268314",
    appId: "1:293234268314:web:864f694cc20daf99a3a723",
    measurementId: "G-EZ1D641QEM",
  },
  xs = Es(Bs);
console.log(xs);
function Fs(e = I.language) {
  return st(
    ["genres", { language: e }],
    () =>
      Bt.get(`/genre/movie/list?api_key=${I.key}&language=${e}`).then(
        (t) => t.data
      ),
    {
      cacheTime: I.timeLong * 96,
      refetchOnMount: !0,
      staleTime: I.timeLong * 96,
    }
  );
}
function Ls(e = 1, t = "popularity.desc", r = !1, n, s, i, o, a = I.language) {
  let l = n !== void 0 ? `&year=${n}` : "",
    c = s !== void 0 ? `&with_genres=${s}` : "",
    f = o !== void 0 ? `&with_people=${o}` : "",
    p = i !== void 0 ? `&with_keywords=${i}` : "";
  return st(
    [
      "trending",
      {
        page: e,
        sortedBy: t,
        includeAdult: r,
        language: a,
        year: n,
        genres: s,
        keywords: i,
        people: o,
      },
    ],
    () =>
      Bt.get(
        `/discover/movie?api_key=${I.key}&language=vi&sort_by=${t}&include_adult=${r}&page=${e}&language=${a}${l}${f}${c}${p}`
      ).then((b) => b.data),
    { cacheTime: I.timeLong, refetchOnMount: !0, staleTime: I.timeLong }
  );
}
const Ms = ({ isLoading: e, onClick: t }) =>
    E("button", {
      onClick: t,
      children: E("h2", { children: e ? "Loading..." : "More..." }),
    }),
  Us = { FullHD: 5e5 };
export {
  Bt as D,
  Zt as S,
  rr as T,
  er as a,
  Ls as b,
  Ns as c,
  Ms as d,
  Fs as g,
  Us as p,
  st as u,
};
