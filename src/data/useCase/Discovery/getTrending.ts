import DatasourceInstance from "../../datasource/DatasourceInstance"
import config from "../../datasource/config"
import FilmDiscover from "../../model/FilmDiscover"
import { useQuery } from "react-query"

export default function getTrending(
    timeWindow: 'day' | 'week' = config.timeWindow,
    language: string = config.language,
    page: number = 1,
) {
    return useQuery(["trending", { page, timeWindow, language }], () => 
        DatasourceInstance
            .get(
                `/trending/movie/${timeWindow}?api_key=${config.key}&language=${language}`
            ).then((val) => (val.data as FilmDiscover))
    , {
        cacheTime: config.timeLong,
        refetchOnMount: true,
        staleTime: config.timeLong,
    })
}