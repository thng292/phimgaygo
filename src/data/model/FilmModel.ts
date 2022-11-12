export interface FilmOverview {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    media_type: string,
    original_language: string,
    original_title: string,
    overview: string
    popularity: number
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface FilmDiscover {
    page: number,
    results: FilmOverview[],
    total_pages: number,
    total_results: number,
}

export default interface Film {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: object,
    budget: number,
    genres: {
        id: number,
        name: string
    },
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: {
        id: number,
        logo_path: string,
        name: string,
        origin_country: string
    }[],
    production_countries: {
        iso_3166_1: string,
        name: string,
    }[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: {
        english_name: string,
        iso_639_w1: string,
        name: string,
    },
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    keywords: {
        keywords: {
            id: number,
            name: string,
        }[]
    },
    recommendations: FilmDiscover,
    release_dates: object,
    similar: FilmDiscover,
    credits: object
};


// <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/album/2050-original-motion-picture-soundtrack/1491108077"></iframe>


// <iframe width="846" height="476" src="https://www.youtube.com/embed/SKV-USFlfmc" title="2050 Teaser Trailer #1 (2019) | Movieclips Indie" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>