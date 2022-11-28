import DatasourceInstance from "../../datasource/DatasourceInstance"
import config from "../../datasource/config"
import FilmDiscover from "../../model/Film/FilmDiscover"
import {useQuery} from "react-query"

export default function getSearch(
    query: string,
    enable: boolean,
    year?: number,
    adult: boolean = false,
    page: number = 1,
    language: string = config.language,
    region: string = config.region) {
    return useQuery(["search", {query, year, adult, page, language, region}], () =>
            DatasourceInstance
                .get(
                    `/search/movie?api_key=${config.key}&query=${query}&&include_adult=${adult}&language=${language}&page=${page}&region=${region}${year ? '&year=' + String(year) : ''}`
                ).then((val) => (val.data as FilmDiscover))
        , {
            cacheTime: config.timeLong,
            refetchOnMount: true,
            staleTime: config.timeLong,
            enabled: enable,
        })
}