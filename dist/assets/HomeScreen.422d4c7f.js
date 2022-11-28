import {
  T as C,
  S as k,
  a as _,
  g as b,
  u as v,
  D as y,
  b as w,
  p as u,
  c as N,
  d as T,
} from "./price.fd99817b.js";
import {
  j as s,
  a as t,
  F as x,
  r as f,
  c as n,
  u as I,
  b as P,
} from "./index.8cc21891.js";
const p = (e) =>
    e.films !== void 0
      ? s("div", {
          children: [
            t("p", { className: "category", children: e.title }),
            t("div", {
              className: "disable-scrollbars row",
              style: { overflowX: "scroll", overflowY: "hidden" },
              children: e.films.map((a) =>
                t(
                  C,
                  {
                    style: { flexBasis: "20%", flexShrink: "0" },
                    title: a.title,
                    posterPath: a.poster_path,
                    onFavorite: () => e.onCart(a),
                    onInfo: () => e.onInfo(a.id),
                    onPlay: () => e.onPlay(a.id),
                  },
                  a.id
                )
              ),
            }),
          ],
        })
      : t(x, { children: "Loading" }),
  $ = (e) =>
    t("div", {
      style: e.style ? e.style : {},
      children: s("div", {
        className: "row",
        style: { position: "absolute", bottom: "20px" },
        children: [
          t("img", {
            className: "p10",
            src: e.poster_path,
            alt: e.title,
            style: { maxWidth: "20vw", minHeight: "280px", height: "30vh" },
          }),
          s("div", {
            style: { position: "relative" },
            children: [
              t("p", { className: "title p10", children: e.title }),
              t("p", {
                className: "ogtitle title p10",
                children: e.original_title,
              }),
              s("p", {
                className: "desc p10 fade",
                children: [t("span", { children: "Genres: " }), e.genres],
              }),
              s("div", {
                className: "row",
                children: [
                  s("p", {
                    className: "desc fade p10",
                    children: [
                      t("span", { className: "fade", children: "Release: " }),
                      e.release_date,
                    ],
                  }),
                  s("p", {
                    className: "desc fade p10",
                    children: [
                      t("span", { children: "Rating: " }),
                      e.vote_avg.toPrecision(2),
                      " on ",
                      t("a", {
                        href: `https://www.themoviedb.org/${e.id}`,
                        children: "TMDB",
                      }),
                    ],
                  }),
                ],
              }),
              t("p", {
                className: "p10 desc",
                style: { maxHeight: "45px", overflow: "hidden" },
                children: e.overview,
              }),
              s("div", {
                style: { position: "absolute", margin: "10px", bottom: "0" },
                children: [
                  t("button", {
                    onClick: () => e.onCart(),
                    children: t(k, {}),
                  }),
                  t("button", {
                    className: "secondary",
                    onClick: e.onClick,
                    children: t(_, {}),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    }),
  D = (e) => {
    if (e.films !== void 0) {
      let [a, o] = f.exports.useState(0),
        [r, h] = f.exports.useState(!0),
        m = b();
      f.exports.useEffect(() => {
        const g = setInterval(() => {
          r &&
            o((c) => {
              var d, i;
              return (
                (c + 1) %
                ((i = (d = e.films) == null ? void 0 : d.length) != null
                  ? i
                  : 1)
              );
            });
        }, 5e3);
        return () => {
          clearInterval(g);
        };
      }, [r]);
      let l = e.films[a];
      return t("div", {
        className: "tshadow",
        style: {
          backgroundImage: `url(${n.backDropUrl + l.backdrop_path})`,
          position: "relative",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "60vh",
          minHeight: "555px",
          borderRadius: "20px",
          margin: "40px 0",
        },
        onPointerEnter: () => {
          h(!1), console.log("Pointer enter");
        },
        onPointerLeave: () => {
          h(!0), console.log("Pointer leave");
        },
        children: t($, {
          id: l.id,
          title: l.title,
          overview: l.overview,
          original_title: l.original_title,
          release_date: l.release_date,
          vote_avg: l.vote_average,
          genres: m.isSuccess
            ? l.genre_ids
                .map((g) => {
                  var c, d;
                  for (let i of (d =
                    (c = m.data) == null ? void 0 : c.genres) != null
                    ? d
                    : [])
                    if (i.id === g) return i.name.replace("Phim ", "");
                  return "";
                })
                .join(", ")
            : "Loading",
          poster_path: n.posterUrl + l.poster_path,
          style: {
            background: "linear-gradient(to right, #222, #43434300)",
            height: "100%",
            borderRadius: "20px",
            padding: "0 60px",
          },
          onClick: () => e.onClick(l.id),
          onCart: () => e.onCart(l),
        }),
      });
    } else return t(x, { children: "Loading" });
  };
function L(e = n.timeWindow, a = n.language, o = 1) {
  return v(
    ["trending", { page: o, timeWindow: e, language: a }],
    () =>
      y
        .get(`/trending/movie/${e}?api_key=${n.key}&language=${a}`)
        .then((r) => r.data),
    { cacheTime: n.timeLong, refetchOnMount: !0, staleTime: n.timeLong }
  );
}
function S(e = 1, a = n.language, o = n.region) {
  return v(
    ["trending", { language: a, region: o }],
    () =>
      y
        .get(
          `/movie/now_playing?api_key=${n.key}&language=${a}&page=${e}&region=${o}`
        )
        .then((r) => r.data),
    { cacheTime: n.timeLong, refetchOnMount: !0, staleTime: n.timeLong }
  );
}
function F(e = 1, a = n.language, o = n.region) {
  return v(
    ["upcoming", { page: e, language: a, region: o }],
    () =>
      y
        .get(
          `/movie/popular?api_key=${n.key}&language=${a}&page=${e}&region=${o}`
        )
        .then((r) => r.data),
    { cacheTime: n.timeLong, refetchOnMount: !0, staleTime: n.timeLong }
  );
}
const R = () => {
  var l, g, c, d;
  let { addItemToCart: e } = I(),
    a = L(),
    o = S(),
    r = F(),
    h = w();
  const m = P();
  return s("div", {
    style: { maxWidth: "1400px" },
    children: [
      t(D, {
        films: (l = a.data) == null ? void 0 : l.results,
        onCart: (i) => {
          e(i, u.FullHD, 1), console.log("Added to cart: ", i.title);
        },
        onClick: (i) => {},
      }),
      t(p, {
        films: (g = o.data) == null ? void 0 : g.results,
        title: "In Theather",
        onCart: (i) => {
          e(i, u.FullHD, 1), console.log("Added to cart: ", i.title);
        },
        onInfo: (i) => {},
        onPlay: (i) => {},
      }),
      t(p, {
        title: "Up Coming",
        films: (c = r.data) == null ? void 0 : c.results,
        onCart: (i) => {
          e(i, u.FullHD, 1), console.log("Added to cart: ", i.title);
        },
        onInfo: (i) => {},
        onPlay: (i) => {},
      }),
      t(N, {
        films: (d = h.data) == null ? void 0 : d.results,
        title: "Discover",
        onCart: (i) => {
          e(i, u.FullHD, 1), console.log("Added to cart: ", i.title);
        },
        onInfo: (i) => {},
        onPlay: (i) => {},
      }),
      t("div", {
        className: "center-child",
        children: t(T, { onClick: () => m("/discover"), isLoading: !1 }),
      }),
    ],
  });
};
export { R as default };
