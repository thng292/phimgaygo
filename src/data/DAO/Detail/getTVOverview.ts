import {useQuery} from "react-query";
import config, {oneTimeGet} from "../../Datasource/Config";
import DatasourceInstance from "../../Datasource/DatasourceInstance";
import TVShowDetailLess from "../../model/TVShow/TVShowDetailLess";

export default function getTVOverview(
    id: number,
    language: string = config.language
) {
    return useQuery(["TVOverview" ,id, language],()=>
        DatasourceInstance.get(`/tv/${id}?api_key=${config.key}&language=${language}`)
            .then(value => value.data as TVShowDetailLess),
        oneTimeGet
    )
}