import {useQuery} from "react-query";
import config, {oneTimeGet} from "../../datasource/config";
import DatasourceInstance from "../../datasource/DatasourceInstance";
import TVShowDiscover from "../../model/TV/TVShowDiscover";

export default function getTVOnAir(
    page: number = 1,
    language: string = config.language
) {
    return useQuery([page, language], ()=>
        DatasourceInstance.get(`/tv/on_the_air?api_key=${config.key}&language=${language}&page=${page}`)
            .then(value => (value.data as TVShowDiscover)),
        oneTimeGet
    )
}