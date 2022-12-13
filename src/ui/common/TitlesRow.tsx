import { FC } from 'react'
import FilmOverview from '../../data/model/Film/FilmOverview'
import Title from './Title'
import LoadingSpinner from "./LoadingSpinner";

const TitlesRow: FC<{
    title: string,
    films: FilmOverview[] | undefined,
    onShare: (id: number) => void,
    onCart: (id: FilmOverview) => void,
    onInfo: (id: number) => void,
    visibleCol?: number,
}> = (props) => {
    if (props.films !== undefined) {
        return (<div>
            <p
                className='font-bold text-3xl p-2'
            >{props.title}</p>
            <div className={"disable-scrollbars flex flex-row"}
            >
                {props.films.map((val: FilmOverview) => <Title
                    key={val.id}
                    style={{
                        minWidth: '180px',
                        maxWidth: '25vw'
                    }}
                    title={val.title}
                    posterPath={val.poster_path}
                    onFavorite={() => props.onCart(val)}
                    onInfo={() => props.onInfo(val.id)}
                    onShare={() => props.onShare(val.id)}
                />)}
            </div>
        </div>)
    } else return <LoadingSpinner />
}

export default TitlesRow