import React, { useState, FC } from 'react'
import Film, { FilmOverview } from '../../data/model/FilmModel'
import Title from './Title'
import './css/hideScrollber.css'
const TitlesRow: FC<{
    title: string,
    films: FilmOverview[],
    onPlay: (id: number) => void,
    onFavorite: (id: number) => void,
    onInfo: (id: number)=>void,
    windowWidth: number,
}> = (props) => {
    return (<>
        <p style={{
            color: 'white',
            fontFamily: 'sans-serif',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            padding: '10px 20px'
        }}>{props.title}</p>
    <div className={"disable-scrollbars"}
            style={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'scroll',
        }}>
        {props.films.map((film: FilmOverview) => <Title key={film.id} width={"" + ((props.windowWidth-60)/5)} film={film} onFavorite={props.onFavorite} onInfo={props.onInfo} onPlay={props.onPlay}></Title>)}
        </div>
    </>)
}

export default TitlesRow