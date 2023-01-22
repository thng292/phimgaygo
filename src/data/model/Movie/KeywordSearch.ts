import KeyWord from "./KeyWord";

export default interface KeywordSearch {
    page: number,
    results: KeyWord[],
    total_pages: number,
    total_results: number
}