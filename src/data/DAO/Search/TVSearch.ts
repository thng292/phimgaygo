import {useQuery} from "react-query";
import config, {oneTimeGet} from "../../Datasource/Config";
import DatasourceInstance from "../../Datasource/DatasourceInstance";
import TVShowDiscover from "../../model/TVShow/TVShowDiscover";

export default function TVSearch(
    query: string,
    page: number = 1,
    enable: boolean = false,
    adult: boolean = false,
    year?: number,
    language: string = config.language
) {
    return useQuery(["TVSearch", query, page, adult, year, language], () =>
            DatasourceInstance.get(
                `/search/tv?api_key=${config.key}&query=${query}&page=${page}&adult=${adult}${year ? "&first_air_date_year=" + year : ""}&language=${language}`
            ).then(value => value.data as TVShowDiscover),
        {
            ...oneTimeGet,
            enabled: enable
        }
    )
}