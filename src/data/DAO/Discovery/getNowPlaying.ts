import DatasourceInstance from "../../datasource/DatasourceInstance"
import config from "../../datasource/config"
import FilmDiscover from "../../model/Film/FilmDiscover"
import { useQuery } from "react-query"

export default function getNowPlaying(
    page: number = 1,
    language: string = config.language,
    region: string = config.region) {
    return useQuery(["trending", { language, region }], () =>
        DatasourceInstance
            .get(
                `/movie/now_playing?api_key=${config.key}&language=${language}&page=${page}&region=${region}`
            ).then((val) => (val.data as FilmDiscover))
        , {
            cacheTime: config.timeLong,
            refetchOnMount: true,
            staleTime: config.timeLong,
        })
}