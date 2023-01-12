import { FC, useState } from "react";
import useUrlParams from "../../utils/useUrlParams";
import MovieSearch from "../../data/DAO/Search/MovieSearch";
import TVSearch from "../../data/DAO/Search/TVSearch";
import { useOutletContext } from "react-router-dom";
import ContextProps from "../SharedLayout/ContextProps";
import SVG_Search from "../common/SVG/SVG_Search";
import TitlesGrid from "../common/Layout/TitlesGrid";
import getGenres from "../../data/DAO/Detail/getGenres";
import MapGenreToID from "../../utils/MapGenreToID";
import config from "../../data/Datasource/Config";
import SVG_Favorite from "../common/SVG/SVG_Favorite";
import IconAndLabelWrap from "../common/Component/IconAndLabelWrap";
import SVG_Play from "../common/SVG/SVG_Play";
import CalculateWidth from "../../utils/CalculateWidth";

interface SearchParams {
    query?: string;
    adult?: boolean;
    year?: number | "all";
    page?: number;
}

const Search: FC = () => {
    // const params = useUrlParams();
    const { navController } = useOutletContext<ContextProps>();
    const { query, page, adult, year } = useUrlParams() as SearchParams;
    const [_query, _setQuery] = useState(query ?? "");
    const [_page, _setPage] = useState(page ?? 1);
    const [_adult, _setAdult] = useState(adult ?? false);
    const [_year, _setYear] = useState<number | "all">(year ?? "all");

    const movieGenres = getGenres();
    const tvShowGenres = getGenres("tv");

    const MovieData = MovieSearch(
        query ?? "",
        Boolean(query),
        year === "all" ? undefined : year,
        adult,
        page
    );
    const ResultMovie = MovieData.data?.results;
    const TVShowData = TVSearch(
        query ?? "",
        page,
        Boolean(query),
        adult,
        year === "all" ? undefined : year
    );
    const ResultTVShow = TVShowData.data?.results;
    const searchHandle = () => {
        navController(
            `search?query=${encodeURIComponent(
                `{_query ?? ""}&page=${_page}&adult=${_adult}&year=${_year}`
            )}`
        );
    };

    const itemWidth = CalculateWidth()
    //TODO: Add filter and pagination
    return (
        <div className='mt-48 max-w-7xl w-[80%]'>
            <div className='p-4 flex items-center w-full h-16 rounded-lg border-2 border-main-1000'>
                <input
                    className='flex-grow bg-transparent placeholder placeholder-white underline-offset-1 text-xl text-white focus:outline-none focus:underline'
                    type={"text"}
                    placeholder='Looking for something'
                    value={_query}
                    onChange={(e) => _setQuery(e.currentTarget.value)}
                    onKeyDown={(e) => e.key === "Enter" && searchHandle()}
                />
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        Boolean(_query) && searchHandle();
                    }}
                    className='cursor-pointer'
                >
                    <SVG_Search />
                </div>
            </div>
            <div className='h-8' />
            {ResultMovie && (ResultMovie.length ?? 0) > 0 && (
                <TitlesGrid
                    name={`Movies related to \"${query}\"`}
                    ids={ResultMovie.map((value) => value.id)}
                    titles={ResultMovie.map((value) => value.title)}
                    subtitles={ResultMovie.map((value) => value.original_title)}
                    genres={ResultMovie.map((value) =>
                        MapGenreToID(
                            movieGenres.data?.genres ?? [],
                            value.genre_ids
                        )
                    )}
                    media_type={["movie"]}
                    dates={ResultMovie.map((value) => value.release_date)}
                    vote_avgs={ResultMovie.map((value) =>
                        value.vote_average.toFixed(1)
                    )}
                    tags={ResultMovie.map((value) =>
                        value.vote_average.toFixed(1)
                    )}
                    imagesFullURL={ResultMovie.map(
                        (value) => config.backDropUrlSmall + value.backdrop_path
                    )}
                    btn1Icon={
                        <IconAndLabelWrap
                            icon={<SVG_Play />}
                            label={"Watch"}
                        />
                    }
                    btn1Action={(id, type) => {
                        navController(`${type}/detail/${id}`);
                    }} // Watch
                    btn2Icon={<SVG_Favorite />}
                    btn2Action={(id, type) => {
                        throw new Error("Function not implemented.");
                    }} // Add to favorite
                    onClickAction={(id, type) => {
                        navController(`${type}/detail/${id}`);
                    }}
                    itemWidth={itemWidth}
                />
            )}
            {ResultTVShow && (ResultTVShow.length ?? 0) > 0 && (
                <TitlesGrid
                    name={`TV shows related to \"${query}\"`}
                    ids={ResultTVShow.map((value) => value.id)}
                    titles={ResultTVShow.map((value) => value.name)}
                    subtitles={ResultTVShow.map((value) => value.original_name)}
                    genres={ResultTVShow.map((value) =>
                        MapGenreToID(
                            movieGenres.data?.genres ?? [],
                            value.genre_ids
                        )
                    )}
                    media_type={["tv"]}
                    dates={ResultTVShow.map((value) => value.first_air_date)}
                    vote_avgs={ResultTVShow.map((value) =>
                        value.vote_average.toFixed(1)
                    )}
                    tags={ResultTVShow.map((value) =>
                        value.vote_average.toFixed(1)
                    )}
                    imagesFullURL={ResultTVShow.map(
                        (value) => config.backDropUrlSmall + value.backdrop_path
                    )}
                    btn1Icon={
                        <IconAndLabelWrap
                            icon={<SVG_Play />}
                            label={"Watch"}
                        />
                    }
                    btn1Action={(id, type) => {
                        navController(`${type}/detail/${id}`);
                    }} // Watch
                    btn2Icon={<SVG_Favorite />}
                    btn2Action={(id, type) => {
                        throw new Error("Function not implemented.");
                    }} // Add to favorite
                    onClickAction={(id, type) => {
                        navController(`${type}/detail/${id}`);
                    }}
                    itemWidth={itemWidth}
                />
            )}
        </div>
    );
};

export default Search;
