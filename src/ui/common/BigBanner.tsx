import React, { FC, useEffect, useState } from 'react'
import config from '../../data/datasource/config'
import FilmOverview from '../../data/model/FilmOverview'
import FilmInfo from './FilmInfo'
import './css/theme.css'
import Genre from '../../data/model/Genre'
import getGenres from '../../data/useCase/getGenres'

const BigBanner: FC<{
    films: FilmOverview[] | undefined,
    isLoading: boolean,
}> = (props) => {
    if (props.isLoading || props.films === undefined) return <>Loading</>
    let [currentIndex, setIndex] = useState(0)
    let [willChangeBg, setWillChangeBg] = useState(true)
    //console.log(props.films)
    let genres = getGenres()
    useEffect(() => {
        const autoChangeBannerTimer = setInterval(() => {
            if (willChangeBg) {
                setIndex((prevState: number) =>
                    (prevState + 1) % props.films.length
                )
            }
        }, 5000)
        return () => {
            clearInterval(autoChangeBannerTimer)
        }
    }, [willChangeBg])
    return <div
        className={"shadow"}
        style={{
            backgroundImage: `url(${config.backDropUrl + props.films[currentIndex].backdrop_path})`,
            position: 'relative',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '60vh',
            minHeight: '555px',
            cursor: 'pointer',
            borderRadius: '20px',
            margin: '20px 0',
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
            isLoadingGenres={genres.isLoading}
            title={props.films[currentIndex].title}
            overview={props.films[currentIndex].overview}
            original_title={props.films[currentIndex].original_title}
            release_date={props.films[currentIndex].release_date}
            vote_avg={props.films[currentIndex].vote_average}
            genres={genres.isSuccess ? props.films[currentIndex].genre_ids.map((id: number) => {
                for (let i of genres.data?.genres) {
                    if (i.id === id) {
                        return i.name
                    }
                }
                return ""
            }).join(", ") : "Loading"}
            poster_path={config.posterUrl + props.films[currentIndex].poster_path}
            style={{
                background: 'linear-gradient(to right, #222, #43434300)',
                height: '100%',
                width: '100%',
                borderRadius: '20px',
                padding: '0 60px',
            }}
            onClick={() => { }}
            onCart={() => { }}
        ></FilmInfo>

    </div>
}
export default BigBanner;