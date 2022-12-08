import {FC} from 'react'
import TitlesGrid from '../common/TitlesGrid'
import TitlesRow from '../common/TitlesRow'
import BigBanner from '../common/BigBanner'
import getTrending from '../../data/DAO/Discovery/getTrending'
import getNowPlaying from '../../data/DAO/Discovery/getNowPlaying'
import getUpcoming from '../../data/DAO/Discovery/getUpcoming'
import getDiscover from '../../data/DAO/Discovery/getDiscover'
import SeeMoreBtn from '../common/SeeMoreBtn'
import {useOutletContext} from 'react-router-dom'
import ContextProps from '../Layout/ContextProps'
import ShareLinkToClipboard from "../../Utils/ShareLinkToClipboard";


const HomeScreen: FC<{}> = () => {
    let {addItemToCart, displayToast} = useOutletContext<ContextProps>()
    let dataTrending = getTrending()
    let dataNowplaying = getNowPlaying()
    let dataUpComing = getUpcoming()
    let dataDiscover = getDiscover()
    const navigate = useOutletContext<ContextProps>().navController
    let isLoading = dataTrending.isLoading && dataDiscover.isLoading && dataUpComing.isLoading && dataNowplaying.isLoading
//TODO: Need to change: [Price]
    return <>
        <h1
            style={{
                position: 'fixed',
                left: '50%',
                transform: 'translateX(-50%)',
                transition: '.2 ease-in-out',
                opacity: isLoading ? '100%' : '0%',
                display: isLoading ? 'block' : 'none'
            }}
        >Loading...</h1>
        <div
            style={{
                maxWidth: "1400px",
                transition: '.2 ease-in-out',
                opacity: isLoading ? '0%' : '100%',
                visibility: isLoading ? 'hidden' : 'initial'
            }}
        >
            <BigBanner
                films={dataTrending.data?.results}
                onCart={item => {
                    addItemToCart(item, 0 ,1);
                    //console.log("Added to cart: ", item.title)
                }}
                onClick={id => {
                    navigate(`/detail/${id}`)
                }}
                onShare={id => {
                    ShareLinkToClipboard(id)
                        .then(() => displayToast("Copied link to clipboard"))
                }}
                style={{
                    margin: '40px 0',
                }}
            />
            <TitlesRow
                films={dataNowplaying.data?.results}
                title={"In Theather"}
                visibleCol={6}
                onCart={item => {
                    addItemToCart(item,0,1);
                    //console.log("Added to cart: ", item.title)
                }}
                onInfo={id => {
                    navigate(`/detail/${id}`)
                }}
                onShare={id => {
                    ShareLinkToClipboard(id)
                        .then(() => displayToast("Copied link to clipboard"))
                }}
            />
            <TitlesRow
                title='Up Coming'
                films={dataUpComing.data?.results}
                visibleCol={6}
                onCart={item => {
                    addItemToCart(item, 0, 1);
                    //console.log("Added to cart: ", item.title)
                }}
                onInfo={id => {
                    navigate(`/detail/${id}`)
                }}
                onShare={id => {
                    ShareLinkToClipboard(id)
                        .then(() => displayToast("Copied link to clipboard"))
                }}
            />
            <TitlesGrid
                films={dataDiscover.data?.results}
                title={"Discover"}
                visibleCol={6}
                onCart={item => {
                    addItemToCart(item, 0, 1);
                    //console.log("Added to cart: ", item.title)
                }}
                onInfo={id => {
                    navigate(`/detail/${id}`)
                }}
                onShare={id => {
                    ShareLinkToClipboard(id)
                        .then(() => displayToast("Copied link to clipboard"))
                }}
            />
            <div className="center-child">
                <SeeMoreBtn onClick={() => navigate('/discover')} isLoading={false}/>
            </div>
        </div>
    </>
}

export default HomeScreen;
