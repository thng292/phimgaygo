import { Typography, TablePagination } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import config, { oneTimeGet } from "../../data/Datasource/Config";
import UserAdditionData, {
    FavoriteItem,
} from "../../data/model/Firebase/UserAdditionData";
import Screens from "../../utils/Screen";
import CalcWindowSize from "../../utils/windowSize";
import ContextProps from "../SharedLayout/ContextProps";
import IconAndLabelWrap from "../common/Component/IconAndLabelWrap";
import TitlesGrid from "../common/Layout/TitlesGrid";
import SVG_Play from "../common/SVG/SVG_Play";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DatasourceInstance from "../../data/Datasource/DatasourceInstance";
import MovieDetailLess from "../../data/model/Movie/MovieDetailLess";
import TVShowDetailLess from "../../data/model/TVShow/TVShowDetailLess";
import getAdditionalUserInfo, {
    addToFavorite,
    removeFromFavorite,
} from "../../data/DAO/FireStore/AdditionalUserInfoDAO";
import { useQuery } from "react-query";

const ItemPerPageOpt = [20, 40, 60];

const Library: FC = () => {
    const { navController, user, setSnackbarState, handleFavorite } =
        useOutletContext<ContextProps>();
    const [userAdditionData, setUserAdditionalData] =
        useState<UserAdditionData>({
            favorites: [],
            histories: [],
        });
    const [page, setPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(20);
    const displayData = getFilm(
        userAdditionData.favorites.slice((page - 1) * 20, page * 20)
    );
    useEffect(() => {
        const tmp = setTimeout(
            () => !user && navController(Screens.SignIn),
            1000
        );
        user &&
            getAdditionalUserInfo(user.uid).then((data) => {
                setUserAdditionalData(data);
            });
        return () => clearTimeout(tmp);
    }, [user]);
    return (
        <div className='mt-16'>
            <div className='flex items-baseline'>
                <div
                    className='cursor-pointer group'
                    onClick={() => navController(Screens.Library)}
                >
                    <Typography
                        className='p-4 group-hover:text-white'
                        fontSize={32}
                        fontWeight={600}
                    >
                        Library
                    </Typography>
                </div>
                <div
                    className='cursor-pointer group'
                    onClick={() => navController(Screens.History)}
                >
                    <Typography
                        className='p-4 text-gray-400 group-hover:text-white'
                        fontSize={32}
                        fontWeight={600}
                    >
                        History
                    </Typography>
                </div>
            </div>
            <TitlesGrid
                ids={(displayData.data ?? []).map((value) => value.id)}
                name={"Your History"}
                media_type={(displayData.data ?? []).map(
                    (value, index) =>
                        userAdditionData.favorites[
                            (page - 1) * itemPerPage + index
                        ].media_type
                )}
                titles={(displayData.data ?? []).map((value) =>
                    "title" in value ? value.title : value.name
                )}
                subtitles={(displayData.data ?? []).map((value) =>
                    "original_title" in value
                        ? value.original_title
                        : value.original_name
                )}
                genres={(displayData.data ?? []).map((value) =>
                    value.genres.map((item) => item.name).join(", ")
                )}
                dates={(displayData.data ?? []).map((value) =>
                    new Date(
                        "release_date" in value
                            ? value.release_date
                            : value.first_air_date
                    )
                        .getFullYear()
                        .toString()
                )}
                vote_avgs={(displayData.data ?? []).map((value) =>
                    value.vote_average.toPrecision(2)
                )}
                tags={(displayData.data ?? []).map((value) =>
                    value.vote_average.toPrecision(2)
                )}
                imagesFullURL={(displayData.data ?? []).map((value) =>
                    CalcWindowSize() !== "Small"
                        ? config.backDropUrlSmall + value.backdrop_path
                        : config.posterUrl + value.poster_path
                )}
                className={"p-4"}
                btn1Icon={
                    <IconAndLabelWrap
                        icon={<SVG_Play fill='black' />}
                        label={"Watch"}
                    />
                }
                btn1Action={(id, type) => {
                    navController(`${type}/detail/${id}`);
                }}
                btn2Icon={<FavoriteIcon htmlColor='rgba(240, 46, 170, .8)' />}
                btn2Action={(id, media_type) => {
                    setSnackbarState({
                        text: "Removing",
                        open: true,
                    });
                    //@ts-ignore
                    removeFromFavorite(user?.uid, { id, media_type }).then(
                        () => {
                            setUserAdditionalData((old) => {
                                const tmp = [...old.favorites];
                                tmp.splice(
                                    tmp.findIndex((value) => value.id === id),
                                    1
                                );
                                return {
                                    histories: old.histories,
                                    favorites: tmp,
                                };
                            });
                            setSnackbarState({
                                text: "Removed",
                                open: true,
                                undoAction: () => {
                                    //@ts-ignore
                                    addToFavorite(user.uid, {
                                        id,
                                        media_type,
                                    }).then(() => {
                                        setSnackbarState({
                                            text: 'Undo Success',
                                            open: true
                                        })
                                        setUserAdditionalData((old) => {
                                            const tmp = [...old.favorites, {id, media_type}];
                                            return {
                                                histories: old.histories,
                                                favorites: tmp,
                                            };
                                        });
                                    });
                                },
                            });
                        }
                    );
                }}
                onClickAction={(id, type) => {
                    navController(`${type}/detail/${id}`);
                }}
            />
            <div className='flex justify-end p-4'>
                <TablePagination
                    count={userAdditionData.favorites.length}
                    onPageChange={(_, page) => setPage(page)}
                    page={page - 1}
                    rowsPerPage={itemPerPage}
                    rowsPerPageOptions={ItemPerPageOpt as unknown as number[]}
                    onRowsPerPageChange={(e) => {
                        setItemPerPage(Number(e.target.value));
                        setPage(1);
                    }}
                />
            </div>
        </div>
    );
};

export default Library;

function getFilm(items: FavoriteItem[]) {
    return useQuery(
        ["Favorite", items],
        () =>
            Promise.all(
                items.map((value) =>
                    DatasourceInstance.get(
                        `/${value.media_type}/${value.id}?api_key=${config.key}&language=${config.language}`
                    ).then((data) => {
                        if (value.media_type === "movie") {
                            return data.data as MovieDetailLess;
                        } else {
                            return data.data as TVShowDetailLess;
                        }
                    })
                )
            ),
        oneTimeGet
    );
}
