import DatasourceInstance from "../datasource/DatasourceInstance"
import config from "../datasource/config"
import FilmDiscover from "../model/FilmDiscover"
import { useQuery } from "react-query"
import Genre from "../model/Genre"

export default function getGenres(
    language: string = config.language
) {
    return useQuery(["genres", { language }], () => 
        DatasourceInstance
            .get(
                `/genre/movie/list?api_key=${config.key}&language=${language}`
        ).then((val) => (val.data as { "genres": Genre[] }))
    , {
        cacheTime: config.timeLong * 48,
        refetchOnMount: true,
        staleTime: config.timeLong * 48,
    })
}