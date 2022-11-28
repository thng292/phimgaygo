import {useQuery} from "react-query";
import DatasourceInstance from "../../datasource/DatasourceInstance";
import config from "../../datasource/config";
import Film from "../../model/Film/Film";

//https://api.themoviedb.org/3/movie/550?api_key=728e0b4bf88803b54b1b501869064c0e&language=vi&append_to_response=keywords,credits,recommendations,similar,release_dates

export default function getDetail(
    id: number,
    language: string = config.language,
                                  ) {
    return useQuery([id],
        () => DatasourceInstance.get(
            `/movie/${id}?api_key=${config.key}&language=${language}&append_to_response=keywords,credits,recommendations,similar,release_dates`
        ).then((val)=>(val.data as Film)),
        {
            // One time get
            cacheTime: config.timeLong,
            refetchOnMount: true,
            retryOnMount: false,
            staleTime: Infinity,
        }
    )
}
