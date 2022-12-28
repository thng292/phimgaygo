import Cast from "./Cast"
import Company from "./Company"
import Country from "./Country"
import Crew from "./Crew"
import MovieDiscover from "./MovieDiscover"
import Genre from "./Genre"
import KeyWord from "./KeyWord"
import Language from "../Language"
import ReleaseDate from "./ReleaseDate"

export default interface Movie {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: object | null,
    budget: number,
    credits: {
        cast: Cast[],
        crew: Crew[],
    },
    genres: Genre[],
    homepage: string,
    id: number,
    imdb_id: string,
    keywords: {
        keywords: KeyWord[]
    },
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: Company[],
    production_countries: Country[],
    recommendations: MovieDiscover,
    release_date: string,
    release_dates: {
        results: {
            iso_3166_1: string,
            release_dates: ReleaseDate[]
        }[]
    },
    revenue: number,
    runtime: number,
    similar: MovieDiscover,
    spoken_languages: Language[],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
};


// <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/album/2050-original-motion-picture-soundtrack/1491108077"></iframe>


// <iframe width="846" height="476" src="https://www.youtube.com/embed/SKV-USFlfmc" title="2050 Teaser Trailer #1 (2019) | Movieclips Indie" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>