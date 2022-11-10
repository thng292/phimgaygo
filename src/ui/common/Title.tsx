import Film from '../../data/model/FilmModel'
import React, { FC, useState } from 'react'

const Title: FC<{
    film: Film,
    onPlay: (id: number) => void,
    onFavorite: (id: number) => void,
    onInfo: (id: number) => void
}> = (props) => {
    let [hover, setHover] = useState(false)
    return (<div>
        <div style={{
            margin: '10px',
            backgroundImage: "url('" + props.film.thumb + "')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            height: '40vh',
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
                <button onClick={() => { props.onPlay(props.film.id) }} style={{
                    padding: '10px 15px',
                    margin: '6px 0px',
                    border: '0',
                    borderRadius: '3px',
                    width: '114px',
                    background: 'linear-gradient(to right, #da22ff, #9733ee)'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" /></g><g><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M9.5,16.5l7-4.5l-7-4.5V16.5z" /></g></svg>
                </button>
                <div>
                    <button style={{
                        float: "left",
                        padding: '10px 15px',
                        margin: '0 3px 0 0',
                        borderRadius: '3px',
                        border: '0',

                    }} onClick={() => props.onPlay(props.film.id)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" /></svg>
                    </button>
                    <button style={{
                        float: 'right',
                        margin: '0 0 0 3px',
                        padding: '10px 15px',
                        borderRadius: '3px',
                        border: '0'

                    }}
                        onClick={() => props.onFavorite(props.film.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                    </button>
                </div>
            </div>) : ""}
        </div>
        <p style={{
            color: 'white',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            width: '100%',
            fontSize: '1.2rem'
        }}>{props.film.name}</p>
    </div>)
}

export default Title