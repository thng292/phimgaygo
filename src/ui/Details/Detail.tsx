import React, { FC } from "react";
import getDetail from "../../data/DAO/Detail/getDetail";
import {useParams} from "react-router-dom";
import getTrailer from "../../data/DAO/Detail/getTrailer";
import getAdditionalMovieInfo from "../../data/DAO/FireStore/AdditionalMovieInfoDAO";

//TODO: Movie detail and watch
const Detail: FC<{}> = () => {
    const { movieId } = useParams()
    const data = getDetail(Number(movieId))
    const videos = getTrailer(Number(movieId),data.isSuccess)
    getAdditionalMovieInfo(Number(movieId)).then(console.log)

    return <>

    </>
}

export default Detail