import config, {oneTimeGet} from "../../datasource/config";
import {useQuery} from "react-query";
import DatasourceInstance from "../../datasource/DatasourceInstance";
import Videos from "../../model/Film/Video";

export default function getTVTrailer(
    id: number,
    language: string = config.language
) {
    return useQuery([id, language], ()=>
        DatasourceInstance.get(`/tv/${id}/videos?api_key=${config.key}&language=${language}`)
            .then(value => value.data as Videos),
        oneTimeGet
    )
}