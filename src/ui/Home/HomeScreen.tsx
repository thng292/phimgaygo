import React, { useState, FC, useEffect, useMemo } from 'react'
import FilmRepo from '../../data/useCase/FilmRepo'
import FilmDiscover from '../../data/model/FilmDiscover'
import FilmOverview from '../../data/model/FilmOverview'
import TitlesGrid from '../common/TitlesGrid'
import TitlesRow from '../common/TitlesRow'
import BigBanner from '../common/BigBanner'
import WindowSize from '../../Utils/windowSize'
import Genre from '../../data/model/Genre'
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
        display: 'flex',
        justifyContent: 'center',
    }}>
        <div style={{
            maxWidth: '1400px'
        }}>
            <BigBanner isLoading={dataTrending.isLoading} films={dataTrending.data?.results} />
            <TitlesRow
                films={dataNowplaying.data?.results}
                isLoading={dataNowplaying.isLoading}
                title={"Now Playing"}
                onFavorite={() => { }}
                onInfo={id => { }}
                onPlay={id => { }}
            />
            <TitlesRow
                title='Up Coming'
                films={dataUpComing.data?.results}
                isLoading={dataUpComing.isLoading}
                onFavorite={() => { }}
                onInfo={id => { }}
                onPlay={id => { }}
            />
            <TitlesGrid
                films={dataDiscover.data?.results}
                isLoading={dataDiscover.isLoading}
                title={"Discover"}
                onFavorite={id => { }}
                onInfo={id => { }}
                onPlay={id => { }}
            />
        </div>
    </div>
}

export default HomeScreen;