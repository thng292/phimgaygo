import FilmOverview from "./FilmOverview";

export default interface FilmDiscover {
    page: number,
    results: FilmOverview[],
    total_pages: number,
    total_results: number,
}