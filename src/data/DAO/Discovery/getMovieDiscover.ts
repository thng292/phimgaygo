import DatasourceInstance from "../../Datasource/DatasourceInstance"
import config, {oneTimeGet} from "../../Datasource/Config"
import MovieDiscover from "../../model/Movie/MovieDiscover"
import {useQuery} from "react-query"
import MovieOverview from "../../model/Movie/MovieOverview";

interface getMovieDiscoverProps {
    genres?: number;
    enable?: boolean;
    page?: number;
    sortedBy?: string;
    includeAdult?: boolean;
    year?: number;
    keywords?: string;
    people?: string;
    language?: string;
}

export default function getMovieDiscover(
    {genres, enable=true, page=1, sortedBy='popularity.desc', includeAdult=false, year, keywords, people, language=config.language}: getMovieDiscoverProps,
) {
    let withYear = (year !== undefined) ? `&year=${year}` : ''
    let withGenre = (genres !== undefined) ? `&with_genres=${genres}` : ''
    let withPeople = (people !== undefined) ? `&with_people=${people}` : ''
    let withKeyword = (keywords !== undefined) ? `&with_keywords=${keywords}` : ''
    return useQuery(["MovieDiscover", page, sortedBy, includeAdult, language, year, genres, keywords, people], () =>
            DatasourceInstance
                .get(
                    `/discover/movie?api_key=${config.key}&sort_by=${sortedBy}&include_adult=${includeAdult}&page=${page}&language=${language}${withYear}${withPeople}${withGenre}${withKeyword}`,
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
        , {
            ...oneTimeGet,
            enabled: enable
        })
}