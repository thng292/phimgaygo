import { TablePagination, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ContextProps from "../SharedLayout/ContextProps";
import Screens from "../../utils/Screen";
import UserAdditionData, {
    HistoryItem,
} from "../../data/model/Firebase/UserAdditionData";
import getAdditionalUserInfo from "../../data/DAO/FireStore/AdditionalUserInfoDAO";
import { useQuery } from "react-query";
import DatasourceInstance from "../../data/Datasource/DatasourceInstance";
import config, { oneTimeGet } from "../../data/Datasource/Config";
import MovieDetailLess from "../../data/model/Movie/MovieDetailLess";
import TVShowDetailLess from "../../data/model/TVShow/TVShowDetailLess";
import TitlesGrid from "../common/Layout/TitlesGrid";
import CalcWindowSize from "../../utils/windowSize";
import IconAndLabelWrap from "../common/Component/IconAndLabelWrap";
import SVG_Play from "../common/SVG/SVG_Play";
import SVG_Favorite from "../common/SVG/SVG_Favorite";

const ItemPerPageOpt = [20, 40, 60];

const History: FC = () => {
    const { navController, user } = useOutletContext<ContextProps>();
    const [userAdditionData, setUserAdditionalData] =
        useState<UserAdditionData>({
            favorites: [],
            histories: [],
        });
    const [page, setPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(20);
    const displayData = getFilm(
        userAdditionData.histories.slice((page - 1) * 20, page * 20)
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
                    onClick={() => navController(Screens.History)}
                >
                    <Typography
                        className='p-4 group-hover:text-white'
                        fontSize={32}
                        fontWeight={600}
                    >
                        History
                    </Typography>
                </div>
                <div
                    className='cursor-pointer group'
                    onClick={() => navController(Screens.Library)}
                >
                    <Typography
                        className='p-4 text-gray-400 group-hover:text-white'
                        fontSize={32}
                        fontWeight={600}
                    >
                        Library
                    </Typography>
                </div>
            </div>
            <TitlesGrid
                ids={(displayData.data ?? []).map((value) => value.id)}
                name={"Your History"}
                media_type={(displayData.data ?? []).map(
                    (value, index) =>
                        userAdditionData.histories[
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
                btn2Icon={<SVG_Favorite fill='black' />}
                //@ts-ignore
                btn2Action={(id, media_type) => {}}
                onClickAction={(id, type) => {
                    navController(`${type}/detail/${id}`);
                }}
            />
            <div className='flex justify-end p-4'>
                <TablePagination
                    count={userAdditionData.histories.length}
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
export default History;

function getFilm(items: HistoryItem[]) {
    return useQuery(
        ["History", items],
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
