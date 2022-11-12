import React, { useState, FC, useEffect, useMemo } from 'react'
import FilmRepo from '../../data/repo/FilmRepo'
import { FilmDiscover, FilmOverview } from '../../data/model/FilmModel'
import TitlesGrid from '../common/TitlesGrid'
import TitlesRow from '../common/TitlesRow'
import BigBanner from '../common/BigBanner'


const HomeScreen: FC<{ windowSize: {width: number, height: number}}> = (props) => {
    let [dataTrending, setDataTrending] = useState<FilmOverview[]>([])
    let [dataNowplaying, setDataNowplaying] = useState<FilmOverview[]>([])
    let [dataUpComing, setDataUpComing] = useState<FilmOverview[]>([])
    let [dataDiscover, setDataDisover] = useState<FilmOverview[]>([])
    useEffect(() => {
        if (localStorage.getItem("cacheTrending") == null) {
            console.log("Fetching Data")
            const Repo = new FilmRepo()
            Repo.getTrending().then((value) => {
                setDataTrending((value.data as FilmDiscover).results)
                localStorage.setItem("cacheTrending", JSON.stringify(dataTrending))
            })
            Repo.getNowPlaying().then((value) => {
                setDataNowplaying((value.data as FilmDiscover).results)
                localStorage.setItem("cacheNowplaying", JSON.stringify(dataNowplaying))
            })
            Repo.getDiscover().then((value) => {
                setDataDisover((value.data as FilmDiscover).results)
                localStorage.setItem("cacheDiscover", JSON.stringify(dataDiscover))

            })
            Repo.getUpcoming().then((value) => {
                setDataUpComing((value.data as FilmDiscover).results)
                localStorage.setItem("cacheUpComing", JSON.stringify(dataUpComing))
            })
        } else {
            console.log("Loading Cached Data")
            setDataDisover(JSON.parse(localStorage.getItem("cacheDiscover") ?? "") as FilmOverview[])
            setDataTrending(JSON.parse(localStorage.getItem("cacheTrending") ?? "") as FilmOverview[])
            setDataNowplaying(JSON.parse(localStorage.getItem("cacheNowplaying") ?? "") as FilmOverview[])
            setDataUpComing(JSON.parse(localStorage.getItem("cacheUpComing") ?? "") as FilmOverview[])
        }
        //console.log(dataTrending)
    }, [])
    return <div>
        <TitlesRow windowWidth={props.windowSize.width} title='Upcoming' films={dataUpComing} onFavorite={(id) => { }} onInfo={id => { }} onPlay={id => { }}/>
        <TitlesGrid films={dataDiscover} title={"Discover"} onFavorite={(id) => { }} onInfo={id => { }} onPlay={id => { }}/>
    </div>
}

export default HomeScreen;