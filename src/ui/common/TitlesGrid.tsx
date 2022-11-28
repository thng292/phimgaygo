import React, { FC } from 'react'
import FilmOverview from '../../data/model/Film/FilmOverview'
import Title from './Title'

const TitlesGrid: FC<{
    title: string,
    films: FilmOverview[] | undefined,
    onPlay: (id: number) => void,
    onCart: (id: FilmOverview) => void,
    onInfo: (id: number) => void,
}> = (props) => {
    //console.log("From TitlesGrid",props.films)
    if (props.films !== undefined) {
        return (<div>
            <p
                className='category'
            >{props.title}</p>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                //flexWrap: 'wrap',
            }}>
                {props.films.map((val) => {
                    //console.log(val)
                    return <Title key={val.id} title={val.title} posterPath={val.poster_path} onPlay={() => props.onPlay(val.id)} onFavorite={() => props.onCart(val)} onInfo={() => props.onInfo(val.id)}></Title>
                })}
            </div>
        </div>)
    } else return <>Loading</>
}

export default TitlesGrid