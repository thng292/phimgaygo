import {useQuery} from "react-query";
import config, {oneTimeGet} from "../../datasource/config";
import DatasourceInstance from "../../datasource/DatasourceInstance";
import TVShow from "../../model/TV/TVShow";

//https://api.themoviedb.org/3/tv/1399?api_key=728e0b4bf88803b54b1b501869064c0e&language=en-US&append_to_response=content_ratings,credits,recommendations,similar,videos,keywords

export default function getTVDetail(
    id: number,
    language: string = config.language
) {
    return useQuery([id], () =>
        DatasourceInstance.get(`/tv/${id}?api_key=${config.key}&language=${language}&append_to_response=content_ratings,credits,recommendations,similar,videos,keywords`)
            .then(value => (value.data as TVShow)),
        oneTimeGet
    )
}