import React, { useState, FC, useEffect, useMemo } from 'react'
import FilmRepo from '../../data/useCase/FilmRepo'
import FilmDiscover from '../../data/model/FilmDiscover'
import FilmOverview from '../../data/model/FilmOverview'
import TitlesGrid from '../common/TitlesGrid'
import TitlesRow from '../common/TitlesRow'
import BigBanner from '../common/BigBanner'
import WindowSize from '../../Utils/windowSize'
import Genre from '../../data/model/Genre'


const HomeScreen: FC<{}> = (props) => {
    let [dataTrending, setDataTrending] = useState<FilmOverview[]>([])
    let [dataNowplaying, setDataNowplaying] = useState<FilmOverview[]>([])
    let [dataUpComing, setDataUpComing] = useState<FilmOverview[]>([])
    let [dataDiscover, setDataDisover] = useState<FilmOverview[]>([])
    //let [genres, setGenres] = useState<Genre[]>([])
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
            Repo.getGenres().then((value) => {
                setDataTrending(dataTrending)
                localStorage.setItem("cacheGenres", JSON.stringify(value.data.genres as Genre[]))
            })
        } else {
            console.log("Loading Cached Data")
            setDataDisover(JSON.parse(localStorage.getItem("cacheDiscover") ?? "[]") as FilmOverview[])
            setDataTrending(JSON.parse(localStorage.getItem("cacheTrending") ?? "[]") as FilmOverview[])
            setDataNowplaying(JSON.parse(localStorage.getItem("cacheNowplaying") ?? "[]") as FilmOverview[])
            setDataUpComing(JSON.parse(localStorage.getItem("cacheUpComing") ?? "[]") as FilmOverview[])
            //setGenres(JSON.parse(localStorage.getItem("cacheGenres") ?? "") as Genre[])
        }
        //console.log(dataTrending)
    }, [])
    return <div style={{
        display: 'flex',
        justifyContent: 'center',
    }}>
        <div style={{
            maxWidth: '1400px'
        }}>
            <BigBanner films={dataTrending} />
            <TitlesRow
                films={dataNowplaying}
                title={"Now Playing"}
                onFavorite={() => { }}
                onInfo={id => { }}
                onPlay={id => { }}
            />
            <TitlesRow
                title='Up Coming' films={dataUpComing}
                onFavorite={() => { }}
                onInfo={id => { }}
                onPlay={id => { }}
            />
            <TitlesGrid
                films={dataDiscover}
                title={"Discover"}
                onFavorite={id => { }}
                onInfo={id => { }}
                onPlay={id => { }}
            />
        </div>
    </div>
}

export default HomeScreen;