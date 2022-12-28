import {useQuery} from "react-query";
import DatasourceInstance from "../../Datasource/DatasourceInstance";
import config, {oneTimeGet} from "../../Datasource/Config";
import Movie from "../../model/Movie/Movie";
import Videos from "../../model/Movie/Video";

export default function getTrailer(
    id: number,
    enable: boolean,
    language: string = 'en',
) {
    return useQuery(["MovieTrailer", id, language],
        () => DatasourceInstance.get(
            `/movie/${id}/videos?api_key=${config.key}&language=${language}`
        ).then((val)=>(val.data as Videos)),
        oneTimeGet
    )
}