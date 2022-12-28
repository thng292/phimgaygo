import Genre from "../data/model/Movie/Genre";

export default function MapGenreToID(genres: Genre[], genresID: number[]) {
    return genresID.map(id => {
        for (let i of genres) {
            if (i.id === id) {
                return i.name
            }
        }
        return undefined
    }).join(", ")
}