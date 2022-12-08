const config = {
    key: '728e0b4bf88803b54b1b501869064c0e',
    baseUrl: 'https://api.themoviedb.org/3',
    posterUrl: 'https://image.tmdb.org/t/p/w342',
    backDropUrl: 'https://image.tmdb.org/t/p/w1280',
    language: "en",
    region: "US     ",
    timeWindow: 'week' as TimeWindow,
    timeLong: 1000 * 60 * 30,
    timeShort: 1000 * 60 * 4,
    defaultAvatar: 'defaultAvatar.png',
    StorageURL: (path: string) => `https://firebasestorage.googleapis.com/v0/b/phimgaygo.appspot.com/o/${path}?alt=media&token=c26e8d1a-3795-4314-9e30-fa5a3c368527`
}

export type TimeWindow = "day" | "week"

export type SortedBy = "release_date" | "popularity" | "revenue" | "vote_average"

export type Order = "asc" | "desc"

export default config