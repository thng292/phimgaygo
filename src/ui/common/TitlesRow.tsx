import { FC } from 'react'
import FilmOverview from '../../data/model/FilmOverview'
import Title from './Title'

const TitlesRow: FC<{
    title: string,
    films: FilmOverview[] | undefined,
    onPlay: (id: number) => void,
    onCart: (id: FilmOverview) => void,
    onInfo: (id: number) => void,
}> = (props) => {
    if (props.films !== undefined) {
        return (<div>
            <p
                className='category'
            >{props.title}</p>
            <div className={"disable-scrollbars row"}
                style={{
                    overflowX: 'scroll',
                    overflowY: 'hidden'
                }}
            >
                {props.films.map((val: FilmOverview) => <Title
                    key={val.id}
                    style={{
                        flexBasis: '20%',
                        flexShrink: '0',
                    }}
                    title={val.title}
                    posterPath={val.poster_path}
                    onFavorite={() => props.onCart(val)}
                    onInfo={() => props.onInfo(val.id)}
                    onPlay={() => props.onPlay(val.id)}
                />)}
            </div>
        </div>)
    } else return <>Loading</>
}

export default TitlesRow