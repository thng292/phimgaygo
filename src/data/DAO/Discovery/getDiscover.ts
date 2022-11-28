import DatasourceInstance from "../../datasource/DatasourceInstance"
import config from "../../datasource/config"
import FilmDiscover from "../../model/Film/FilmDiscover"
import { useQuery } from "react-query"

export default function getDiscover(
    page: number = 1,
    sortedBy: string = 'popularity.desc',
    includeAdult: boolean = false,
    year?: number,
    genres?: string,
    keywords?: string,
    people?: string,
    language: string = config.language,
) {
    let withYear = (year !== undefined) ? `&year=${year}` : ''
    let withGenre = (genres !== undefined) ? `&with_genres=${genres}` : ''
    let withPeople = (people !== undefined) ? `&with_people=${people}` : ''
    let withKeyword = (keywords !== undefined) ? `&with_keywords=${keywords}` : ''
    // console.log("Query: ", `/discover/movie?api_key=${config.key}&language=vi&sort_by=${sortedBy}&include_adult=${includeAdult}&page=${page}&language=${language}${withYear}${withPeople}${withGenre}${withKeyword}`)
    return useQuery(["trending", { page, sortedBy, includeAdult, language, year, genres, keywords, people }], () =>
        DatasourceInstance
            .get(
                `/discover/movie?api_key=${config.key}&language=vi&sort_by=${sortedBy}&include_adult=${includeAdult}&page=${page}&language=${language}${withYear}${withPeople}${withGenre}${withKeyword}`,
            ).then((val) => (val.data as FilmDiscover))
        , {
            cacheTime: config.timeLong,
            refetchOnMount: true,
            staleTime: config.timeLong,
        })
}