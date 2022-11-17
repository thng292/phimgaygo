import React, { FC } from 'react'
import TitlesGrid from '../common/TitlesGrid'
import TitlesRow from '../common/TitlesRow'
import BigBanner from '../common/BigBanner'
import getTrending from '../../data/useCase/Discovery/getTrending'
import getNowPlaying from '../../data/useCase/Discovery/getNowPlaying'
import getUpcoming from '../../data/useCase/Discovery/getUpcoming'
import getDiscover from '../../data/useCase/Discovery/getDiscover'


const HomeScreen: FC<{}> = (props) => {
    let dataTrending = getTrending()
    let dataNowplaying = getNowPlaying()
    let dataUpComing = getUpcoming()
    let dataDiscover = getDiscover()
    return <div style={{
        maxWidth: '1400px'
    }}>
        <BigBanner films={dataTrending.data?.results} />
        <TitlesRow
            films={dataNowplaying.data?.results}
            title={"Now Playing"}
            onFavorite={() => { }}
            onInfo={id => { }}
            onPlay={id => { }}
            onShowAll={() => { }}
        />
        <TitlesRow
            title='Up Coming'
            films={dataUpComing.data?.results}
            onFavorite={() => { }}
            onInfo={id => { }}
            onPlay={id => { }}
            onShowAll={() => { }}
        />
        <TitlesGrid
            films={dataDiscover.data?.results}
            title={"Discover"}
            onFavorite={id => { }}
            onInfo={id => { }}
            onPlay={id => { }}
            onShowAll={() => { }}
        />
    </div>
}

export default HomeScreen;