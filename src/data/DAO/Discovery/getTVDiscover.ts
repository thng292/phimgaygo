import DatasourceInstance from "../../Datasource/DatasourceInstance"
import config, {oneTimeGet} from "../../Datasource/Config"
import {useQuery} from "react-query"
import TVShowDiscover from "../../model/TVShow/TVShowDiscover";
import TVShowOverview from "../../model/TVShow/TVShowOverview";

interface getTvDiscoverProps {
    page?: number;
    sortedBy?: string;
    enable?: boolean;
    first_air_date_year?: number;
    genres?: number;
    keywords?: string;
    language?: string;
}

export default function getTVDiscover(
    {page=1, sortedBy='popularity.desc', enable=true, first_air_date_year, genres, keywords, language=config.language}: getTvDiscoverProps,
) {
    let withYear = (first_air_date_year !== undefined) ? `&first_air_date_year=${first_air_date_year}` : ''
    let withGenre = (genres !== undefined) ? `&with_genres=${genres}` : ''
    let withKeyword = (keywords !== undefined) ? `&with_keywords=${keywords}` : ''
    return useQuery(["TVDiscover", page, sortedBy, language, first_air_date_year, genres, keywords,], () =>
            DatasourceInstance
                .get(
                    `/discover/tv?api_key=${config.key}&sort_by=${sortedBy}&page=${page}&language=${language}${withYear}${withGenre}${withKeyword}`,
                ).then((val) => {
                return {
                    ...val.data,
                    results: val.data.results.map((value: TVShowOverview) => {
                        return {
                            ...value,
                            media_type: 'tv'
                        }
                    })
                } as TVShowDiscover
            })
        , {
            ...oneTimeGet,
            enabled: enable
        })
}