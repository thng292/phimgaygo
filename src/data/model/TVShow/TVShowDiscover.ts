import TVShowOverview from "./TVShowOverview";
export default interface TVShowDiscover {
    page: number;
    results: TVShowOverview[];
    total_pages: number;
    total_results: number;
}