import React, { FC } from 'react'
import FilmOverview from '../../data/model/FilmOverview'
import Title from './Title'
import './css/hideScrollber.css'
const TitlesRow: FC<{
    title: string,
    films: FilmOverview[],
    onPlay: (id: number) => void,
    onFavorite: (id: number) => void,
    onInfo: (id: number) => void,
}> = (props) => {
    return (<div>
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
            {props.films.map((val: FilmOverview) => <Title
                key={val.id}
                style={{
                    flexBasis: '20%',
                    flexShrink: '0',
                }}
                title={val.title}
                posterPath={val.poster_path}
                onFavorite={()=>props.onFavorite(val.id)}
                onInfo={()=>props.onInfo(val.id)}
                onPlay={() => props.onPlay(val.id)}
            />)}
        </div>
    </div>)
}

export default TitlesRow