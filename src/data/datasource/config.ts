const config = {
    key: '728e0b4bf88803b54b1b501869064c0e',
    baseUrl: 'https://api.themoviedb.org/3',
    posterUrl: 'https://image.tmdb.org/t/p/w342',
    backDropUrl: 'https://image.tmdb.org/t/p/w1280',
    language: "vi",
    region: "US     ",
    timeWindow: 'week' as TimeWindow,
    timeLong: 1000 * 60 * 30,
    timeShort: 1000 * 60 * 4,
}

export type TimeWindow = "day" | "week"

export type SortedBy = "release_date" | "popularity" | "revenue" | "vote_average"

export type Order = "asc" | "desc"

export default config