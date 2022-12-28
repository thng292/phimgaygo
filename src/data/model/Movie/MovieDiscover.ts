import MovieOverview from "./MovieOverview";

export default interface MovieDiscover {
    page: number,
    results: MovieOverview[],
    total_pages: number,
    total_results: number,
}