import React, { useState, FC } from 'react'
import { FilmOverview } from '../../data/model/FilmModel'
import Title from './Title'
import './css/hideScrollber.css'
const TitlesGrid: FC<{
    title: string,
    films: FilmOverview[],
    onPlay: (id: number) => void,
    onFavorite: (id: number) => void,
    onInfo: (id: number) => void
}> = (props) => {
    //console.log("From TitlesGrid",props.films)
    return (<div>
        <p style={{
            color: 'white',
            fontFamily: 'sans-serif',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            padding: '10px 20px'
        }}>{props.title}</p>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)'
        }}>
            {props.films.map((val) => {
                //console.log(val)
                return <Title key={val.id} width={'auto'} film={val} onPlay={() => { }} onFavorite={() => { }} onInfo={() => { }}></Title>
            })}
        </div>
    </div>)
}

export default TitlesGrid