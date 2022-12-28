import DatasourceInstance from "../../Datasource/DatasourceInstance"
import config, {oneTimeGet} from "../../Datasource/Config"
import {useQuery} from "react-query"
import MovieOverview from "../../model/Movie/MovieOverview";
import MovieDiscover from "../../model/Movie/MovieDiscover";

export default function getMoviePopular(
    page: number = 1,
    language: string = config.language,
    region: string = config.region
) {
    return useQuery(["MoviePopular", page, language, region], () =>
            DatasourceInstance
                .get(
                    `/movie/popular?api_key=${config.key}&language=${language}&page=${page}&region=${region}`
                ).then(val => {
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