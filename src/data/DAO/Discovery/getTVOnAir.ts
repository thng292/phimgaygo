import {useQuery} from "react-query";
import config, {oneTimeGet} from "../../Datasource/Config";
import DatasourceInstance from "../../Datasource/DatasourceInstance";
import TVShowDiscover from "../../model/TVShow/TVShowDiscover";
import TVShowOverview from "../../model/TVShow/TVShowOverview";

export default function getTVOnAir(
    page: number = 1,
    language: string = config.language
) {
    return useQuery(["TVOnAir", page, language], ()=>
        DatasourceInstance.get(`/tv/on_the_air?api_key=${config.key}&language=${language}&page=${page}`)
            .then(val => {
                return {
                    ...val.data,
                    results: val.data.results.map((value: TVShowOverview) => {
                        return {
                            ...value,
                            media_type: 'tv'
                        }
                    })
                } as TVShowDiscover
            }),
        oneTimeGet
    )
}