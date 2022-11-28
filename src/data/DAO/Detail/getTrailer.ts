import {useQuery} from "react-query";
import DatasourceInstance from "../../datasource/DatasourceInstance";
import config from "../../datasource/config";
import Film from "../../model/Film/Film";
import Video from "../../model/Film/Video";

export default function getTrailer(
    id: number,
    enable: boolean,
    language: string = 'en',
) {
    return useQuery([id, 'video'],
        () => DatasourceInstance.get(
            `/movie/${id}/videos?api_key=${config.key}&language=${language}`
        ).then((val)=>(val.data as Video)),
        {
            cacheTime: config.timeLong,
            refetchOnMount: true,
            staleTime: config.timeLong,
            enabled: enable,
        }
    )
}