import React, { useMemo } from "react";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { useOutletContext } from "react-router-dom";
import getGenres from "../../data/DAO/Detail/getGenres";
import getTrending from "../../data/DAO/Discovery/getTrending";
import MovieOverview from "../../data/model/Movie/MovieOverview";
import TVShowOverview from "../../data/model/TVShow/TVShowOverview";
import ContextProps from "./ContextProps";
import TitlesGrid from "../common/Layout/TitlesGrid";
import MapGenreToID from "../../utils/MapGenreToID";
import IconAndLabelWrap from "../common/Component/IconAndLabelWrap";
import config, { media_type } from "../../data/Datasource/Config";
import SVG_Favorite from "../common/SVG/SVG_Favorite";
import SVG_Play from "../common/SVG/SVG_Play";

function NotFound() {
    const { navController } = useOutletContext<ContextProps>();
    // get Genres
    const movieGenres = getGenres();
    const tvShowGenres = getGenres("tv");
    // get Trending
    const movieTrending = getTrending();
    const tvShowTrending = getTrending("tv");
    const trendingData: (MovieOverview | TVShowOverview)[] = useMemo(
        () =>
            [
                ...(movieTrending.data?.results ?? []),
                ...(tvShowTrending.data?.results ?? []),
            ]
                .filter((value) => value.backdrop_path && value.poster_path)
                .sort((a, b) => b.vote_average - a.vote_average),
        [movieTrending.isSuccess]
    );
    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='h-[30vh]' />
                <p className={"text-6xl"}>404</p>
                <p className={"text-2xl p-2"}>Not Found :(</p>
                <p className='p-2'>Looking for a movie to watch?</p>
                <ArrowDownwardRoundedIcon className='animate-bounce' />
                <div className='h-[30vh]' />
            </div>
            <TitlesGrid
                ids={trendingData.map((value) => value.id)}
                name={"People are watching"}
                media_type={trendingData.map((value) => value.media_type)}
                titles={trendingData.map((value) =>
                    "title" in value ? value.title : value.name
                )}
                subtitles={trendingData.map((value) =>
                    "original_title" in value
                        ? value.original_title
                        : value.original_name
                )}
                genres={trendingData.map((value, index) => {
                    return value.media_type === "movie"
                        ? MapGenreToID(
                              movieGenres.data?.genres ?? [],
                              value.genre_ids
                          )
                        : MapGenreToID(
                              tvShowGenres.data?.genres ?? [],
                              value.genre_ids
                          );
                })}
                dates={trendingData.map((value) =>
                    new Date(
                        "release_date" in value
                            ? value.release_date
                            : value.first_air_date
                    )
                        .getFullYear()
                        .toString()
                )}
                vote_avgs={trendingData.map((value) =>
                    value.vote_average.toPrecision(2)
                )}
                tags={trendingData.map((value) =>
                    value.vote_average.toPrecision(2)
                )}
                imagesFullURL={trendingData.map(
                    (value) => config.backDropUrlSmall + value.backdrop_path
                )}
                className={"px-4"}
                btn1Icon={
                    <IconAndLabelWrap
                        icon={<SVG_Play />}
                        label={"Watch"}
                    />
                }
                btn1Action={function (
                    id: number,
                    type?: media_type | undefined
                ): void {
                    navController(`${type}/detail/${id}`);
                }} // Watch
                btn2Icon={<SVG_Favorite />}
                btn2Action={function (
                    id: number,
                    type?: media_type | undefined
                ): void {
                    throw new Error("Function not implemented.");
                }} // Share
                onClickAction={(id, type) => {
                    navController(`${type}/detail/${id}`);
                }} // Add to favorite
                onSeeMore={() => {}}
            />
        </>
    );
}

export default NotFound;
