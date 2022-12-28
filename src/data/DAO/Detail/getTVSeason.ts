import {useQuery} from "react-query";
import config, {oneTimeGet} from "../../Datasource/Config";
import DatasourceInstance from "../../Datasource/DatasourceInstance";
import TVShowSeason from "../../model/TVShow/TVShowSeason";

//https://api.themoviedb.org/3/tv/1399?api_key=728e0b4bf88803b54b1b501869064c0e&language=en-US&append_to_response=content_ratings,credits,recommendations,similar,videos,keywords

export default function getTVSeason(
    id: number,
    season: number,
    enable: boolean = true,
    language: string = config.language
) {
    return useQuery(["TVSeason", id, season, language], () =>
            DatasourceInstance.get(`/tv/${id}/season/${season}?api_key=${config.key}&language=${language}`)
                .then(value => (value.data as TVShowSeason)),
        {
            ...oneTimeGet,
            enabled: enable
        }
    )
}