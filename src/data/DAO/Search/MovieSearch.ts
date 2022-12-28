import DatasourceInstance from "../../Datasource/DatasourceInstance"
import config, {oneTimeGet} from "../../Datasource/Config"
import Movie from "../../model/Movie/MovieDiscover"
import {useQuery} from "react-query"

export default function MovieSearch(
    query: string,
    enable: boolean,
    year?: number,
    adult: boolean = false,
    page: number = 1,
    language: string = config.language,
    region: string = config.region) {
    return useQuery(["MovieSearch", query, year, adult, page, language, region], () =>
            DatasourceInstance
                .get(
                    `/search/movie?api_key=${config.key}&query=${query}&include_adult=${adult}&language=${language}&page=${page}&region=${region}${year ? '&year=' + String(year) : ''}`
                ).then((val) => (val.data as Movie)),
        {
            ...oneTimeGet,
            enabled: enable
        }
    )
}