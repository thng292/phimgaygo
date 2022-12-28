import config, {oneTimeGet} from "../../Datasource/Config";
import {useQuery} from "react-query";
import DatasourceInstance from "../../Datasource/DatasourceInstance";
import Videos from "../../model/Movie/Video";

export default function getTVTrailer(
    id: number,
    enable: boolean = false,
    language: string = config.language
) {
    return useQuery(["TVTrailer" ,id, language], ()=>
        DatasourceInstance.get(`/tv/${id}/videos?api_key=${config.key}&language=${language}`)
            .then(value => value.data as Videos),
        {
            ...oneTimeGet,
            enabled: enable
        }
    )
}