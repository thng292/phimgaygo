import { FC } from 'react'
import FilmOverview from '../../data/model/Film/FilmOverview'
import Title from './Title'
import config from "../../data/datasource/config";

const TitleList: FC<{
    title: string,
    films: FilmOverview[] | undefined,
    onInfo: (id: number) => void,
}> = (props) => {
    if (props.films !== undefined) {
        return (<div>
            <p
                className='category'
            >{props.title}</p>
            <div className={"disable-scrollbars column"}
                 style={{
                     overflowX: 'scroll',
                     overflowY: 'hidden'
                 }}
            >
                {props.films.map((val: FilmOverview) => <div
                    key={val.id}
                    className={'row'}
                    style={{
                        cursor: "pointer"
                    }}
                >
                    <img src={config.posterUrl + val.poster_path} alt={val.title}
                         style={{
                             height: '100px',
                             aspectRatio: '3/4',
                         }}
                    />
                    <div>
                        <p className={'bold'}>{val.title}</p>
                        <p>Rating: {val.vote_average.toFixed(1)}</p>
                        <p>Adult: {val.adult ? 'Yes' : 'No'}</p>
                        <p>{val.release_date}</p>
                    </div>
                </div>)}
            </div>
        </div>)
    } else return <>Loading</>
}

export default TitleList