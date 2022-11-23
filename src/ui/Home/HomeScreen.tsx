import React, { FC, useContext } from 'react'
import TitlesGrid from '../common/TitlesGrid'
import TitlesRow from '../common/TitlesRow'
import BigBanner from '../common/BigBanner'
import getTrending from '../../data/useCase/Discovery/getTrending'
import getNowPlaying from '../../data/useCase/Discovery/getNowPlaying'
import getUpcoming from '../../data/useCase/Discovery/getUpcoming'
import getDiscover from '../../data/useCase/Discovery/getDiscover'
import SeeMoreBtn from '../common/SeeMoreBtn'
import { useNavigate, useOutletContext } from 'react-router-dom'
import FilmOverview from '../../data/model/FilmOverview'
import price from '../../data/datasource/price'
import ContextProps from '../Layout/ContextProps'


const HomeScreen: FC<{}> = () => {
    let { addItemToCart } = useOutletContext<ContextProps>()
    let dataTrending = getTrending()
    let dataNowplaying = getNowPlaying()
    let dataUpComing = getUpcoming()
    let dataDiscover = getDiscover()
    const navigate = useNavigate()
    //TODO: Need to change: [Price]
    return <div style={{
        maxWidth: '1400px',
    }}>
        <BigBanner
            films={dataTrending.data?.results}
            onCart={item => { addItemToCart(item, price.FullHD, 1); console.log("Added to cart: ",item.title)}}
            onClick={id => { }}
        />
        <TitlesRow
            films={dataNowplaying.data?.results}
            title={"In Theather"}
            onCart={item => { addItemToCart(item, price.FullHD, 1); console.log("Added to cart: ", item.title) }}
            onInfo={id => { }}
            onPlay={id => { }}
        />
        <TitlesRow
            title='Up Coming'
            films={dataUpComing.data?.results}
            onCart={item => { addItemToCart(item, price.FullHD, 1); console.log("Added to cart: ",item.title) }}
            onInfo={id => { }}
            onPlay={id => { }}
        />
        <TitlesGrid
            films={dataDiscover.data?.results}
            title={"Discover"}
            onCart={item => { addItemToCart(item, price.FullHD, 1); console.log("Added to cart: ",item.title) }}
            onInfo={id => { }}
            onPlay={id => { }}
        />
        <div className="center-child">
            <SeeMoreBtn onClick={()=>navigate('/discover')} isLoading={false} />
        </div>
    </div>
}

export default HomeScreen;