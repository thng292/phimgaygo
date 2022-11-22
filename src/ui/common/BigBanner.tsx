import React, { FC, useEffect, useState } from 'react'
import config from '../../data/datasource/config'
import FilmOverview from '../../data/model/FilmOverview'
import FilmInfo from './FilmInfo'

import getGenres from '../../data/useCase/getGenres'

const BigBanner: FC<{
    films: FilmOverview[] | undefined,
    onClick: (id: number) => void;
    onCart: (id: number) => void;
    onFavorite: (id: number) => void;
}> = (props) => {
    if (props.films !== undefined) {
        let [currentIndex, setIndex] = useState(0)
        let [willChangeBg, setWillChangeBg] = useState(true)
        let genres = getGenres()
        //console.log(props.films)
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
            className={"shadow"}
            style={{
                backgroundImage: `url(${config.backDropUrl + currFilm.backdrop_path})`,
                position: 'relative',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '60vh',
                minHeight: '555px',
                borderRadius: '20px',
                margin: '40px 0',
            }}
            onPointerEnter={() => {
                setWillChangeBg(false)
                console.log("Pointer enter")
            }}
            onPointerLeave={() => {
                setWillChangeBg(true)
                console.log("Pointer leave")
            }}
        >
            {
                // TODO
                // Film Info
                // Arrow Button
            }
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
                onCart={() => props.onCart(currFilm.id)}
                onFavorite={() => props.onFavorite(currFilm.id)}
            />

        </div>
    } else return <>Loading</>
}
export default BigBanner;