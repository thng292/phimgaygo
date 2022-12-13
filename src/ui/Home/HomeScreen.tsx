import {FC} from 'react'
import TitlesGrid from '../common/TitlesGrid'
import BigBanner from '../common/BigBanner'
import getTrending from '../../data/DAO/Discovery/getTrending'
import getNowPlaying from '../../data/DAO/Discovery/getNowPlaying'
import getUpcoming from '../../data/DAO/Discovery/getUpcoming'
import getDiscover from '../../data/DAO/Discovery/getDiscover'
import SeeMoreBtn from '../common/SeeMoreBtn'
import {useOutletContext} from 'react-router-dom'
import ContextProps from '../Layout/ContextProps'
import ShareLinkToClipboard from "../../Utils/ShareLinkToClipboard";
import LoadingSpinner from "../common/LoadingSpinner";


const HomeScreen: FC<{}> = () => {
    let {addItemToCart, displayToast} = useOutletContext<ContextProps>()
    let dataTrending = getTrending()
    let dataNowplaying = getNowPlaying()
    let dataUpComing = getUpcoming()
    let dataDiscover = getDiscover()
    const navigate = useOutletContext<ContextProps>().navController
    let isLoading = dataTrending.isLoading && dataDiscover.isLoading && dataUpComing.isLoading && dataNowplaying.isLoading
    return <>
        <h1
            style={{
                position: 'fixed',
                left: '50%',
                transform: 'translateX(-50%)',
                display: isLoading ? 'block' : 'none'
            }}
        ><LoadingSpinner /></h1>
        <div
            // className={'flex flex-col items-center'}
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
            />
            <TitlesGrid
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
            <TitlesGrid
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
            <div className="flex w-full justify-center p-4">
                <SeeMoreBtn onClick={() => navigate('/discover')} isLoading={false}/>
            </div>
        </div>
    </>
}

export default HomeScreen;
