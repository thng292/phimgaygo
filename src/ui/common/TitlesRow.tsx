import React, { FC, useMemo, useRef, useState } from 'react'
import FilmOverview from '../../data/model/FilmOverview'
import Title from './Title'
import './css/hideScrollber.css'
const TitlesRow: FC<{
    title: string,
    films: FilmOverview[] | undefined,
    onPlay: (id: number) => void,
    onFavorite: (id: number) => void,
    onInfo: (id: number) => void,
    onShowAll: () => void,
}> = (props) => {
    if (props.films !== undefined) {
        return (<div>
            <p
                style={{
                    fontFamily: 'sans-serif',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    padding: '10px 20px'
                }}
                onClick={props.onShowAll}
            >{props.title}</p>
            <div className={"disable-scrollbars row"}
                style={{
                    overflowX: 'scroll',
                }}
            >
                {props.films.map((val: FilmOverview, index: number) => <Title
                    key={val.id}
                    style={{
                        flexBasis: '20%',
                        flexShrink: '0',
                    }}
                    title={val.title}
                    posterPath={val.poster_path}
                    onFavorite={() => props.onFavorite(val.id)}
                    onInfo={() => props.onInfo(val.id)}
                    onPlay={() => props.onPlay(val.id)}
                />)}
            </div>
        </div>)
    } else return <>Loading</>
}

export default TitlesRow