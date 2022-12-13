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
            className="absolute bottom-5 flex flex-row"
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
                <p className="p-3 text-3xl font-bold text-white">{props.title}</p>
                <p className="hidden px-3 font-bold text-white sm:block">{props.original_title}</p>
                <p className="px-3 text-white"><span className={'text-gray-300'}>Genres: </span>{props.genres}</p>
                <div className="flex flex-row">
                    <p className="px-3 pb-20 text-white sm:pb-0"><span className="text-gray-300">Release: </span>{props.release_date}</p>
                    <p className="hidden px-3 text-white sm:block"><span className={'text-gray-300'}>Rating: </span>{props.vote_avg.toPrecision(2)} on <a
                        href={`https://www.themoviedb.org/${props.id}`}>TMDB</a></p>
                </div>
                <p
                    className="hidden w-full overflow-hidden p-3 text-white sm:block md:w-1/2"
                    style={{
                        height: '30%',
                        minHeight: '90px',
                        maxHeight: '400px'
                    }}
                >{props.overview}</p>
                <div
                    className="absolute bottom-0 z-20 m-2 flex w-full flex-row justify-center sm:justify-start"
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