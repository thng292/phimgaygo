import React, { FC, useEffect, useState } from 'react'
import config from '../../data/datasource/config'
import FilmOverview from '../../data/model/Film/FilmOverview'
import FilmInfo from './FilmInfo'

import getGenres from '../../data/DAO/getGenres'
import SVG_NavForward from './svg/SVG_NavForward'
import SVG_NavBack from './svg/SVG_NavBack'
import LoadingSpinner from "./LoadingSpinner";

const BigBanner: FC<{
    films: FilmOverview[] | undefined,
    onClick: (id: number) => void;
    onCart: (id: FilmOverview) => void;
    onShare: (id: number) => void;
}> = (props) => {
    if (props.films !== undefined) {
        let [currentIndex, setIndex] = useState(0)
        let [willChangeBg, setWillChangeBg] = useState(true)
        let genres = getGenres()
        ////console.log(props.films)
        useEffect(() => {
            const autoChangeBannerTimer = setInterval(() => {
                if (willChangeBg) {
                    setIndex((prevState: number) =>
                        ((prevState + 1) % (props.films?.length ?? 1))
                    )
                }
            }, 5000)
            return () => {
                clearInterval(autoChangeBannerTimer)
            }
        }, [willChangeBg])
        let currFilm = props.films[currentIndex]
        return <div
            id={'bigbanner'}
            className={"shadow-2xl relative sm:rounded-3xl mb-12 sm:mt-16"}
            style={{
                backgroundImage: `url(${window.innerWidth > 640 ? config.backDropUrl + currFilm.backdrop_path : config.posterUrl + currFilm.poster_path})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                maxWidth: '1400px'
            }}
            onPointerEnter={() => {
                setWillChangeBg(false)
                // //console.log("Pointer enter")
            }}
            onPointerLeave={() => {
                setWillChangeBg(true)
                // //console.log("Pointer leave")
            }}
        >
            <button
                className='hidden md:block absolute bg-transparent right-0 top-1/2 left-full w-16 h-16 cursor-pointer translate-x-1/2 -translate-y-1/2'
                onClick={() => {
                    setIndex((prevState: number) =>
                        ((prevState + 1) % (props.films?.length ?? 1))
                    )
                }}
            >
                <SVG_NavForward />
            </button>
            <button
                className='hidden md:block absolute bg-transparent right-0 top-1/2 right-full w-16 h-16 cursor-pointer -translate-y-1/2'
                onClick={() => {
                    setIndex((prevState: number) =>
                        ((prevState - 1 + (props.films?.length ?? 1)) % (props.films?.length ?? 1))
                    )
                }}
            >
                <SVG_NavBack />
            </button>
            <FilmInfo
                id={currFilm.id}
                title={currFilm.title}
                overview={currFilm.overview}
                original_title={currFilm.original_title}
                release_date={currFilm.release_date}
                vote_avg={currFilm.vote_average}
                genres={genres.isSuccess ? currFilm.genre_ids.map((id: number) => {
                    for (let i of (genres.data?.genres ?? [])) {
                        if (i.id === id) {
                            return i.name.replace("Phim ", "")
                        }
                    }
                    return ""
                }).join(", ") : "Loading"}
                poster_path={config.posterUrl + currFilm.poster_path}
                onClick={() => props.onClick(currFilm.id)}
                onCart={() => props.onCart(currFilm)}
                onShare={() => props.onShare(currFilm.id)}
            />

        </div>
    } else return <LoadingSpinner />
}
export default BigBanner;