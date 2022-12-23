import {useQuery} from "react-query";
import config, {oneTimeGet} from "../../datasource/config";
import DatasourceInstance from "../../datasource/DatasourceInstance";
import TVShowDiscover from "../../model/TV/TVShowDiscover";

export default function SearchTV(
    query: string,
    page: number = 1,
    adult: boolean = false,
    year?: number,
    language: string = config.language
) {
    return useQuery([query, page, adult, year, language], () =>
            DatasourceInstance.get(
                `/search/tv?api_key=${config.key}&query=${query}&page=${page}&adult=${adult}${year ? "&first_air_date_year=" + year : ""}&language=${language}`
            ).then(value => value.data as TVShowDiscover),
        oneTimeGet
    )
}