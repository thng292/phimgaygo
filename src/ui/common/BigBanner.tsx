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
    style?: React.CSSProperties;
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
            className={"tshadow"}
            style={{
                backgroundImage: `url(${config.backDropUrl + currFilm.backdrop_path})`,
                position: 'relative',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '60vh',
                minHeight: '560px',
                borderRadius: '20px',
                ...props.style,
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
                // className='tbutton'
                style={{
                    position: 'absolute',
                    background: "transparent",
                    border: '0',
                    right: '0',
                    top: '50%',
                    left: '100%',
                    transform: 'translate(100,-50%)',
                    width: '48px',
                    height: '48px',
                    cursor: "pointer",
                }}
                onClick={() => {
                    setIndex((prevState: number) =>
                        ((prevState + 1) % (props.films?.length ?? 1))
                    )
                }}
            >
                <SVG_NavForward />
            </button>
            <button
                // className='tbutton'
                style={{
                    background: "transparent",
                    border: '0',
                    position: 'absolute',
                    left: '0',
                    top: '50%',
                    right: '100%',
                    transform: 'translate(-100%  ,-50%)',
                    width: '48px',
                    height: '48px',
                    cursor: "pointer",
                }}
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
                style={{
                    background: 'linear-gradient(to right, #222, #43434300)',
                    height: '100%',
                    borderRadius: '20px',
                    padding: '0 60px',
                }}
                onClick={() => props.onClick(currFilm.id)}
                onCart={() => props.onCart(currFilm)}
                onShare={() => props.onShare(currFilm.id)}
            />

        </div>
    } else return <LoadingSpinner />
}
export default BigBanner;