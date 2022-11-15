import React, { FC } from 'react'
import FilmOverview from '../../data/model/FilmOverview'
import Title from './Title'
import './css/hideScrollber.css'
const TitlesGrid: FC<{
    title: string,
    films: FilmOverview[] | undefined,
    onPlay: (id: number) => void,
    onFavorite: (id: number) => void,
    onInfo: (id: number) => void,
    onShowAll: () => void,
}> = (props) => {
    //console.log("From TitlesGrid",props.films)
    if (props.films !== undefined) {
        return (<div>
            <p
                style={{
                    color: 'white',
                    fontFamily: 'sans-serif',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    padding: '10px 20px'
                }}
                onClick={props.onShowAll}
            >{props.title}</p>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                //flexWrap: 'wrap',
            }}>
                {props.films.map((val) => {
                    //console.log(val)
                    return <Title key={val.id} title={val.title} posterPath={val.poster_path} onPlay={() => { }} onFavorite={() => { }} onInfo={() => { }}></Title>
                })}
            </div>
        </div>)
    } else return <>Loading</>
}

export default TitlesGrid