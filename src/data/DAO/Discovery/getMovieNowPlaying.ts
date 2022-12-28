import DatasourceInstance from "../../Datasource/DatasourceInstance"
import config, {oneTimeGet} from "../../Datasource/Config"
import {useQuery} from "react-query"
import MovieDiscover from "../../model/Movie/MovieDiscover";
import MovieOverview from "../../model/Movie/MovieOverview";

export default function getMovieNowPlaying(
    page: number = 1,
    language: string = config.language,
    region: string = config.region) {
    return useQuery(["MovieNowPlaying", language, region], () =>
            DatasourceInstance
                .get(
                    `/movie/now_playing?api_key=${config.key}&language=${language}&page=${page}&region=${region}`
                ).then((val) => {
                return {
                    ...val.data,
                    results: val.data.results.map((value: MovieOverview) => {
                        return {
                            ...value,
                            media_type: 'movie'
                        }
                    })
                } as MovieDiscover
            })
        , oneTimeGet)
}