import {UseQueryOptions} from "react-query";

const config = {
    key: '728e0b4bf88803b54b1b501869064c0e',
    baseUrl: 'https://api.themoviedb.org/3',
    posterUrl: 'https://image.tmdb.org/t/p/w500',
    backDropUrl: 'https://image.tmdb.org/t/p/w1280',
    backDropUrlSmall: 'https://image.tmdb.org/t/p/w780',
    backDropUrlOriginal: 'https://image.tmdb.org/t/p/original',
    language: "en",
    region: "VI",
    timeWindow: 'week' as TimeWindow,
    timeLong: 1000 * 60 * 30,
    timeShort: 1000 * 60 * 4,
    defaultAvatar: 'defaultAvatar.png',
    StorageURL: (path: string) => `https://firebasestorage.googleapis.com/v0/b/phimgaygo.appspot.com/o/${path}?alt=media&token=c26e8d1a-3795-4314-9e30-fa5a3c368527`
}

export type TimeWindow = "day" | "week"

export const SortOptions = ["release_date", "popularity", "revenue", "vote_average"] as const
export type SortOption = typeof SortOptions[number]

export const Orders = ['asc', 'desc'] as const
export type Order = typeof Orders[number]

export type SortedBy = {
    option: SortOption,
    order: Order
}

export const oneTimeGet = {
    // One time get
    cacheTime: config.timeLong,
    refetchOnMount: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
}

export type media_type = 'movie'|'tv'

export default config