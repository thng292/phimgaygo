import React, { FC } from "react"

import SVG_AddToCart from "./svg/SVG_AddToCart"
import SVG_Info from "./svg/SVG_Info"
import SVG_Share from "./svg/SVG_Share";

const FilmInfo: FC<{
    id: number,
    title: string,
    original_title: string,
    release_date: string,
    genres: string,
    overview: string,
    vote_avg: number,
    poster_path: string,
    onClick: () => void,
    onCart: () => void,
    onShare: () => void,
    style?: React.CSSProperties
}> = (props) => {
    return <div style={props.style} >
        <div
            className="row"
            style={{
                position: "absolute",
                bottom: '20px',
            }}
            >
            <img className="p10" src={props.poster_path} alt={props.title} style={{
                maxWidth: '20vw',
                minHeight: '16rem',
                height: '30vh',
            }} />
            <div style={{
                position: 'relative',
            }}>
                <p className="title p10">{props.title}</p>
                <p className="ogtitle title p10">{props.original_title}</p>
                <p className="desc p10 fade"><span>Genres: </span>{props.genres}</p>
                <div className="row">
                    <p className="desc fade p10"><span className="fade">Release: </span>{props.release_date}</p>
                    <p className="desc fade p10"><span>Rating: </span>{props.vote_avg.toPrecision(2)} on <a href={`https://www.themoviedb.org/${props.id}`}>TMDB</a></p>
                </div>
                <p className="p10 desc" style={{
                    maxHeight: '5.2rem',
                    overflow: 'hidden'
                }}>{props.overview}</p>
                <div
                    className="row center-child"
                    style={{
                        position: 'absolute',
                        margin: '10px',
                        bottom: '0'
                    }}>
                    <button className="tbutton" onClick={() => props.onCart()} >
                        <SVG_AddToCart />
                    </button>
                    <button
                        className="tbutton secondary"
                        onClick={props.onClick}
                    >
                        <SVG_Info />
                    </button>
                    <button
                        className="tbutton secondary"
                        onClick={props.onShare}
                    >
                        <SVG_Share />
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default FilmInfo