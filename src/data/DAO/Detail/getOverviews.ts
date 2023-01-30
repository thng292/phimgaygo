import { useQuery } from "react-query";
import DatasourceInstance from "../../Datasource/DatasourceInstance";
import config, { oneTimeGet } from "../../Datasource/Config";
import MovieDetailLess from "../../model/Movie/MovieDetailLess";

//https://api.themoviedb.org/3/movie/550?api_key=728e0b4bf88803b54b1b501869064c0e&language=vi&append_to_response=keywords,credits,recommendations,similar,release_dates

export default function getOverviews(
    id: number,
    language: string = config.language
) {
    return useQuery(
        ["MovieOverview", id, language],
        () =>
            DatasourceInstance.get(
                `/tv/${id}?api_key=${config.key}&language=${language}`
            ).then((value) => value.data as MovieDetailLess),
        oneTimeGet
    );
}
