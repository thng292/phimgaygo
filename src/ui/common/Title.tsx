import React, { FC, useState } from 'react'
import config from '../../data/datasource/config'
import SVG_AddToCard from './svg/SVG_AddToCart'
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
    return (<div
        style={props.style}
    >

        <div
            className={"tshadow"}
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
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#00000077',
                width: '100%',
                height: '100%',
                borderRadius: '15px',
                justifyContent: 'center',
                alignItems: 'center',
                transition: '.2s ease-in-out',
                opacity: hover ? '100%' : '0%'
            }}>
                <button className='tbutton'
                    onClick={() => props.onPlay()}
                >
                    <SVG_Play />
                </button>
                <button
                    onClick={() => props.onFavorite()}
                    className="tbutton secondary"
                >
                    <SVG_AddToCard />
                </button>
                <button
                    onClick={() => props.onInfo()}
                    className="tbutton secondary"
                >
                    <SVG_Info />
                </button>
            </div>
        </div>
        <p style={{
            fontFamily: 'sans-serif',
            textAlign: 'center',
            width: '100%',
            height: '1.2rem',
            fontSize: '1.2rem',
            textOverflow: 'ellipsis',
            paddingTop: '10px',
            overflow: 'hidden'
        }}>{props.title}</p>
    </div>)
}

export default Title