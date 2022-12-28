import React, {FC, useEffect, useState} from 'react'
import BannerInfo from '../Component/BannerInfo'
import SVG_NavForward from '../SVG/SVG_NavForward'
import SVG_NavBack from '../SVG/SVG_NavBack'
import {media_type} from "../../../data/Datasource/Config";
import TitlesRow from "./TitlesRow";

interface BigBannerProps {
    ids: number[];
    media_type: media_type[];//Length = 1 => same type
    titles: string[];
    subTitles: string[];
    descriptions: string[];
    date: string[];
    vote_avgs: number[];
    genres: string[];
    postersFullURL: string[];
    backDropsFullURL: string[];
    bannerFullURL: string[];
    btn1Icon: JSX.Element,
    btn1Action: (id: number, type: media_type) => void;
    btn2Icon: JSX.Element,
    btn2Action: (id: number, type: media_type) => void;
    onClickAction: (id: number, type: media_type) => void;
    itemWidth?: number,
}

const BigBanner: FC<BigBannerProps> = (props) => {
    if (props.ids.length === 0) return <div
        id={'bigbanner'}
        className={"aspect-video bg-gradient-to-t from-black via-gray-800 to-gray-800 animate-pulse"}
    ></div>
    const [currentIndex, setIndex] = useState(0)
    const [willChangeBg, setWillChangeBg] = useState(true)
    let currentTag = props.media_type[(currentIndex <= props.media_type.length) ? currentIndex : 0]
    useEffect(() => {
        const autoChangeBannerTimer = setInterval(() => {
            if (willChangeBg) {
                setIndex(prevState =>
                    ((prevState + 1) % props.backDropsFullURL.length)
                )
            }
        }, 5000)
        return () => {
            clearInterval(autoChangeBannerTimer)
        }
    }, [willChangeBg])
    return <div
        id={'bigbanner'}
        className={"flex items-end sm:items-center shadow-2xl relative aspect-video"}
        style={{
            backgroundImage: `linear-gradient(to top right, #222222dd, #42424200), url(${window.innerWidth > 640 ? props.bannerFullURL[currentIndex] : props.postersFullURL[currentIndex]})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }}
        onPointerEnter={() => {
            setWillChangeBg(false)
        }}
        onPointerLeave={() => {
            setWillChangeBg(true)
        }}
        onClick={() => props.onClickAction(props.ids[currentIndex], props.media_type[currentIndex])}
    >
        <button
            className='absolute z-20 top-1/2 right-0 hidden h-16 w-16 -translate-y-1/2 cursor-pointer bg-transparent md:flex justify-center items-center'
            onClick={() => {
                setIndex((prevState: number) =>
                    ((prevState + 1) % props.backDropsFullURL.length)
                )
            }}
        >
            {SVG_NavForward('#ffffff')}
        </button>
        <button
            className='absolute z-20 top-1/2 left-0 hidden h-16 w-16 -translate-y-1/2 cursor-pointer bg-transparent md:flex justify-center items-center'
            onClick={() => {
                setIndex((prevState: number) =>
                    ((prevState - 1 + props.backDropsFullURL.length) % props.backDropsFullURL.length)
                )
            }}
        >
            {SVG_NavBack('#ffffff')}
        </button>
        <BannerInfo
            id={props.ids[currentIndex]}
            tag={currentTag}
            title={props.titles[currentIndex]}
            overview={props.descriptions[currentIndex]}
            subtitle={props.subTitles[currentIndex]}
            date={props.date[currentIndex]}
            vote_avg={props.vote_avgs[currentIndex]}
            genres={props.genres[currentIndex]}
            poster_path={props.postersFullURL[currentIndex]}
            btn1Icon={props.btn1Icon}
            btn1Action={() => props.btn1Action(props.ids[currentIndex], currentTag)}
            btn2Icon={props.btn2Icon}
            btn2Action={() => props.btn2Action(props.ids[currentIndex], currentTag)}
        />
        <div className={'absolute bottom-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent'}>
            <TitlesRow
                titles={props.titles}
                media_type={props.media_type}
                ids={props.ids}
                name={'Trending'}
                subtitles={props.subTitles}
                tags={props.vote_avgs.map(value => value.toPrecision(2))}
                genres={props.genres}
                dates={props.date}
                vote_avgs={props.vote_avgs.map(value => value.toPrecision(2))}
                imagesFullURL={props.backDropsFullURL}
                btn1Icon={props.btn1Icon}
                btn1Action={props.btn1Action}
                btn2Icon={props.btn2Icon}
                btn2Action={props.btn2Action}
                onClickAction={(id, type) => setIndex(props.ids.findIndex(value => value === id))}
                itemWidth={props.itemWidth}
            />
        </div>
    </div>
}
export default BigBanner;