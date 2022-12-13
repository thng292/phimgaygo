import React, {FC} from "react"

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
}> = (props) => {
    return <div
        className={'relative h-full sm:rounded-3xl p-8'}
        style={{
            background: 'linear-gradient(to right, #222222dd, #42424200)',
        }}
    >
        <div
            className="absolute flex flex-row bottom-5"
        >
            <img

                className="m-4 hidden rounded-xl sm:block"
                src={props.poster_path} alt={props.title}
                style={{
                maxWidth: '20vw',
                minHeight: '16rem',
                height: '30vh',
                aspectRatio: '3/4',
            }}/>
            <div className={'relative'}>
                <p className="font-bold text-3xl p-3 text-white">{props.title}</p>
                <p className="hidden sm:block font-bold px-3 text-white">{props.original_title}</p>
                <p className="px-3 text-white"><span className={'text-gray-300'}>Genres: </span>{props.genres}</p>
                <div className="flex flex-row">
                    <p className="px-3 text-white pb-20 sm:pb-0"><span className="text-gray-300">Release: </span>{props.release_date}</p>
                    <p className="hidden sm:block px-3 text-white"><span className={'text-gray-300'}>Rating: </span>{props.vote_avg.toPrecision(2)} on <a
                        href={`https://www.themoviedb.org/${props.id}`}>TMDB</a></p>
                </div>
                <p
                    className="hidden sm:block w-full p-3 text-white overflow-hidden md:w-1/2"
                    style={{
                        height: '30%',
                        minHeight: '90px',
                        maxHeight: '400px'
                    }}
                >{props.overview}</p>
                <div
                    className="flex flex-row absolute z-20 w-full justify-center sm:justify-start m-2 bottom-0"
                >
                    <button className="tbutton" onClick={() => props.onCart()}>
                        <SVG_AddToCart/>
                    </button>
                    <button
                        className="tbutton secondary"
                        onClick={props.onClick}
                    >
                        <SVG_Info/>
                    </button>
                    <button
                        className="tbutton secondary"
                        onClick={props.onShare}
                    >
                        <SVG_Share/>
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default FilmInfo