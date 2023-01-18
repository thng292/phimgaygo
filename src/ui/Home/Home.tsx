import { FC, useEffect, useMemo, useRef } from "react";
import getTrending from "../../data/DAO/Discovery/getTrending";
import getMovieDiscover from "../../data/DAO/Discovery/getMovieDiscover";
import { NavigateFunction, useOutletContext } from "react-router-dom";
import ContextProps from "../SharedLayout/ContextProps";
import BigBanner from "../common/Layout/BigBanner";
import MovieOverview from "../../data/model/Movie/MovieOverview";
import TVShowOverview from "../../data/model/TVShow/TVShowOverview";
import config, { media_type } from "../../data/Datasource/Config";
import getGenres from "../../data/DAO/Detail/getGenres";
import MapGenreToID from "../../utils/MapGenreToID";
import SVG_Play from "../common/SVG/SVG_Play";
import SVG_Favorite from "../common/SVG/SVG_Favorite";
import IconAndLabelWrap from "../common/Component/IconAndLabelWrap";
import CalculateWidth from "../../utils/CalculateWidth";
import TitlesRow from "../common/Layout/TitlesRow";
import { UseQueryResult } from "react-query";
import TVShowDiscover from "../../data/model/TVShow/TVShowDiscover";
import MovieDiscover from "../../data/model/Movie/MovieDiscover";
import useIntersection from "../../utils/ElementInViewObseve";
import Genre from "../../data/model/Movie/Genre";
import getTVDiscover from "../../data/DAO/Discovery/getTVDiscover";

const Home: FC = () => {
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

    const itemWidth = CalculateWidth(window.innerWidth > 640 ? {} : {maxWidth: 180, minWidth: 120});

    const displayData = useMemo<[media_type, Genre][]>(() => {
        return merge<[media_type, Genre]>(
            (movieGenres.data?.genres ?? []).map((value) => ["movie", value]),
            (tvShowGenres.data?.genres ?? []).map((value) => ["tv", value])
        );
    }, [movieGenres.isSuccess, tvShowGenres.isSuccess]);

    return (
        <>
            <BigBanner
                ids={trendingData.map((value) => value.id)}
                media_type={trendingData.map((value) => value.media_type)}
                titles={trendingData.map((value) =>
                    "name" in value ? value.name : value.title
                )}
                subTitles={trendingData.map((value) =>
                    "original_name" in value
                        ? value.original_name
                        : value.original_title
                )}
                descriptions={trendingData.map((value) => value.overview)}
                date={trendingData.map((value) =>
                    "release_date" in value
                        ? value.release_date
                        : value.first_air_date
                )}
                vote_avgs={trendingData.map((value) => value.vote_average)}
                genres={trendingData.map((value) => {
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
                postersFullURL={trendingData.map(
                    (value) => config.posterUrl + value.poster_path
                )}
                backDropsFullURL={trendingData.map(
                    (value) => config.backDropUrlSmall + value.backdrop_path
                )}
                bannerFullURL={trendingData.map(
                    (value) => config.backDropUrlOriginal + value.backdrop_path
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
            <div className="mx-2 overflow-x-hidden">
                {displayData.map(([type, { name, id }]) => {
                    return (
                        <TitleRowLazyLoadWrapper
                            navController={navController}
                            key={type + id}
                            name={
                                name + (type === "movie" ? " Movies" : " Shows")
                            }
                            genreID={id}
                            loaderFn={(enable) => {
                                if (type === "movie") {
                                    return getMovieDiscover({
                                        genres: [id],
                                        enable: enable,
                                    });
                                } else {
                                    return getTVDiscover({
                                        genres: [id],
                                        enable: enable,
                                    });
                                }
                            }}
                            movieGenres={movieGenres.data?.genres ?? []}
                            tvShowGenres={tvShowGenres.data?.genres ?? []}
                            itemWidth={itemWidth}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Home;

const TitleRowLazyLoadWrapper: FC<{
    name: string;
    genreID: number;
    loaderFn: (
        enable: boolean
    ) =>
        | UseQueryResult<TVShowDiscover, unknown>
        | UseQueryResult<MovieDiscover, unknown>;
    movieGenres: Genre[];
    tvShowGenres: Genre[];
    itemWidth?: number;
    navController: NavigateFunction;
}> = ({
    name,
    loaderFn,
    itemWidth,
    movieGenres,
    tvShowGenres,
    navController,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const visible = useIntersection(ref, -0);
    const displayData = loaderFn(visible);
    const data = [...(displayData.data?.results ?? [])].filter(
        (value) => value.backdrop_path && value.poster_path
    );
    if (data.length === 0) {
        return (
            <div ref={ref}>
                <TitlesRow
                    placeholder
                    name={name}
                    className={"p-4"}
                    onSeeMore={() => {}}
                    itemWidth={itemWidth}
                />
            </div>
        );
    } else {
        return (
            <div ref={ref}>
                <TitlesRow
                    ids={data.map((value) => value.id)}
                    name={name}
                    media_type={data.map((value) => value.media_type)}
                    titles={data.map((value) =>
                        "title" in value ? value.title : value.name
                    )}
                    subtitles={data.map((value) =>
                        "original_title" in value
                            ? value.original_title
                            : value.original_name
                    )}
                    genres={data.map((value, index) => {
                        return value.media_type === "movie"
                            ? MapGenreToID(movieGenres, value.genre_ids)
                            : MapGenreToID(tvShowGenres, value.genre_ids);
                    })}
                    dates={data.map((value) =>
                        new Date(
                            "release_date" in value
                                ? value.release_date
                                : value.first_air_date
                        )
                            .getFullYear()
                            .toString()
                    )}
                    vote_avgs={data.map((value) =>
                        value.vote_average.toPrecision(2)
                    )}
                    tags={data.map((value) =>
                        value.vote_average.toPrecision(2)
                    )}
                    imagesFullURL={data.map(
                        (value) => config.backDropUrlSmall + (window.innerWidth > 640 ? value.backdrop_path : value.poster_path)
                    )}
                    className={"py-4"}
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
                    itemWidth={itemWidth}
                    onSeeMore={() => {}}
                />
            </div>
        );
    }
};

function merge<T>(arr1: T[], arr2: T[]): T[] {
    let res: T[] = [];
    let last = 0;
    while (last < arr2.length || last < arr1.length) {
        //@ts-ignore
        arr1.at(last) !== undefined && res.push(arr1.at(last));
        //@ts-ignore
        arr2.at(last) !== undefined && res.push(arr2.at(last));
        last++;
    }
    return res;
}
