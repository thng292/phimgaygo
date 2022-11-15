import DatasourceInstance from "../../datasource/DatasourceInstance"
import config from "../../datasource/config"
import FilmDiscover from "../../model/FilmDiscover"
import { useQuery } from "react-query"

export default function getDiscover(
    page: number = 1,
    sortedBy: string = 'popularity.desc',
    includeAdult: boolean = false,
    //year: number,
    //genres: string,
    //keywords: string,
    language: string = config.language,
) {
    return useQuery(["trending", { page, sortedBy, includeAdult, language }], () => 
        DatasourceInstance
            .get(
                `/discover/movie?api_key=${config.key}&language=vi&sort_by=${sortedBy}&include_adult=${includeAdult}&page=${page}&language=${language}`, 
            ).then((val) => (val.data as FilmDiscover))
    , {
        cacheTime: config.timeLong,
        refetchOnMount: true,
        staleTime: config.timeLong,
    })
}