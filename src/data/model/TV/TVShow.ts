import Cast from "../Film/Cast";
import Company from "../Film/Company";
import Country from "../Film/Country";
import Crew from "../Film/Crew";
import Genre from "../Film/Genre";
import KeyWord from "../Film/KeyWord";
import Videos from "../Film/Video";
import Language from "../Language";
import TVDiscover from "./TVShowDiscover"

export interface CreatedBy {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
}

export interface LastEpisodeToAir {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
}

export interface Network {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
}

export interface Season {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}

export interface ContentRating {
    iso_3166_1: string;
    rating: string;
}

export default interface TVShow {
    adult: boolean;
    backdrop_path: string;
    created_by: CreatedBy[];
    episode_run_time: number[];
    first_air_date: string;
    genres: Genre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: LastEpisodeToAir;
    name: string;
    next_episode_to_air?: any;
    networks: Network[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Company[];
    production_countries: Country[];
    seasons: Season[];
    spoken_languages: Language[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
    content_ratings: ContentRating[];
    similar: TVDiscover;
    recommendations: TVDiscover;
    credits: {
        cast: Cast[],
        crew: Crew[],
    };
    videos: Videos;
    keywords: {
        keywords: KeyWord[],
    }
}
