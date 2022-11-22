import React, { FC } from 'react'
import TitlesGrid from '../common/TitlesGrid'
import TitlesRow from '../common/TitlesRow'
import BigBanner from '../common/BigBanner'
import getTrending from '../../data/useCase/Discovery/getTrending'
import getNowPlaying from '../../data/useCase/Discovery/getNowPlaying'
import getUpcoming from '../../data/useCase/Discovery/getUpcoming'
import getDiscover from '../../data/useCase/Discovery/getDiscover'
import SeeMoreBtn from '../common/SeeMoreBtn'
import { useNavigate } from 'react-router-dom'
import FilmOverview from '../../data/model/FilmOverview'


const HomeScreen: FC<{}> = (props) => {
    let dataTrending = getTrending()
    let dataNowplaying = getNowPlaying()
    let dataUpComing = getUpcoming()
    let dataDiscover = getDiscover()
    const navigate = useNavigate()
    return <div style={{
        maxWidth: '1400px',
    }}>
        <BigBanner
            films={dataTrending.data?.results}
            onCart={id => { }}
            onClick={id => { }}
            onFavorite={id => { }}
        />
        <TitlesRow
            films={dataNowplaying.data?.results}
            title={"In Theather"}
            onFavorite={() => { }}
            onInfo={id => { }}
            onPlay={id => { }}
        />
        <TitlesRow
            title='Up Coming'
            films={dataUpComing.data?.results}
            onFavorite={() => { }}
            onInfo={id => { }}
            onPlay={id => { }}
        />
        <TitlesGrid
            films={dataDiscover.data?.results}
            title={"Discover"}
            onFavorite={id => { }}
            onInfo={id => { }}
            onPlay={id => { }}
        />
        <div className="center-child">
            <SeeMoreBtn onClick={()=>navigate('/discover')} isLoading={false} />
        </div>
    </div>
}

export default HomeScreen;