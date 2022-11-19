import React, { FC, useState } from 'react'
import config from '../../data/datasource/config'
import './css/theme.css'
import SVG_Favorite from './svg/SVG_Favorite'
import SVG_Info from './svg/SVG_Info'
import SVG_Play from './svg/SVG_Play'

const Title: FC<{
    title: string,
    posterPath: string,
    onPlay: () => void,
    onFavorite: () => void,
    onInfo: () => void,
    style?: React.CSSProperties,
}> = (props) => {
    let [hover, setHover] = useState(false)
    //console.log(props.width)
    return (<div style={props.style}>
        <div
            className={"shadow"}
            style={{
                margin: '10px',
                backgroundImage: `url(${config.posterUrl + props.posterPath})`,
                //backgroundImage: "url('https://image.tmdb.org/t/p/w300" + props.film.backdrop_path + "')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                aspectRatio: '2/3',
                borderRadius: '15px',
            }}
            onMouseEnter={() => {
                setHover(true)
            }}
            onMouseLeave={() => {
                setHover(false)
            }}>
            {hover ? (<div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                borderRadius: '15px',
                backgroundColor: '#00000077',
            }}>
                <button onClick={() => props.onPlay()}>
                    <SVG_Play />
                </button>
                <button onClick={() => props.onFavorite()} className="secondary">
                    <SVG_Favorite />
                </button>
                <button onClick={() => props.onInfo()} className="secondary">
                    <SVG_Info />
                </button>

            </div>) : ""}
        </div>
        <p style={{
            fontFamily: 'sans-serif',
            textAlign: 'center',
            width: '100%',
            fontSize: '1.2rem',
            textOverflow: 'ellipsis'
        }}>{props.title}</p>
    </div>)
}

export default Title