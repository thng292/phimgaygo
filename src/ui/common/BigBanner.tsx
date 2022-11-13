import React, { FC, useEffect, useState } from 'react'
import config from '../../data/datasource/config'
import FilmOverview from '../../data/model/FilmOverview'
import FilmInfo from './FilmInfo'
import './css/theme.css'
import Genre from '../../data/model/Genre'

const BigBanner: FC<{ films: FilmOverview[] }> = (props) => {
    if (props.films.length == 0) return <></>
    let [currentIndex, setIndex] = useState(0)
    let [willChangeBg, setWillChangeBg] = useState(true)
    //console.log(props.films)
    let genres: Genre[] = []
    useEffect(() => {
        genres = JSON.parse(localStorage.getItem("cacheGenres") ?? "[]") as Genre[]
    },[])
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
    //linear-gradient(0deg,#181818 0,hsla(0,0%,9%,.987) 1.62%,hsla(0,0%,9%,.951) 3.1%,hsla(0,0%,9%,.896) 4.5%,hsla(0,0%,9%,.825) 5.8%,hsla(0,0%,9%,.741) 7.06%,hsla(0,0%,9%,.648) 8.24%,hsla(0,0%,9%,.55) 9.42%,hsla(0,0%,9%,.45) 10.58%,hsla(0,0%,9%,.352) 11.76%,hsla(0,0%,9%,.259) 12.94%,hsla(0,0%,9%,.175) 14.2%,hsla(0,0%,9%,.104) 15.5%,hsla(0,0%,9%,.049) 16.9%,hsla(0,0%,9%,.013) 18.38%,hsla(0,0%,9%,0) 20%), 
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
            title={props.films[currentIndex].title}
            overview={props.films[currentIndex].overview}
            original_title={props.films[currentIndex].original_title}
            release_date={props.films[currentIndex].release_date}
            vote_avg={props.films[currentIndex].vote_average}
            genres={props.films[currentIndex].genre_ids.map((id: number) => {
                for (let i of genres) {
                    if (i.id === id) {
                        return i.name
                    }
                }
                return ""
            })}
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