interface Film {
    id: number,
    name: string,
    length: string,
    country: string,
    year: number,
    directors: string,
    casts: string[],
    category: string,
    soundTracks: string[] | null,
    description: string,
    comments: {
        name: string,
        content: string,
    }
    availableIn: {
        variant: string,
        price: number,
    }[],
    imdbRating: number,
    trailerUrl: string,
    thumb: string,
    banner: string,
};

export enum FilmCategory {
    All,
} 

export default Film;
// <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/album/2050-original-motion-picture-soundtrack/1491108077"></iframe>


// <iframe width="846" height="476" src="https://www.youtube.com/embed/SKV-USFlfmc" title="2050 Teaser Trailer #1 (2019) | Movieclips Indie" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>