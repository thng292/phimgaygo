import React, {FC} from 'react'
import Title from '../Component/Title'
import {media_type} from "../../../data/Datasource/Config";
import TitlePlaceholder from "../Component/TitlePlaceholder";
import DuplicateStuff from "../../../utils/DuplicateStuff";

const TitlesRow: FC<{
    titles: string[],
    media_type: media_type[], //Length = 1 => same type
    ids: number[],
    name: string,
    subtitles: string[],
    genres: string[],
    dates: string[],
    vote_avgs: string[],
    imagesFullURL: string[],
    tags?: string[],
    btn1Icon: JSX.Element,
    btn1Action: (id: number, type: media_type) => void,
    btn2Icon: JSX.Element,
    btn2Action: (id: number, type: media_type) => void,
    onClickAction: (id: number, type: media_type) => void,
    onSeeMore?: () => void,
    itemWidth?: number,
    className?: string,
} | {placeholder: true,
    name: string,
    itemWidth?: number,
    className?: string,
    onSeeMore?: () => void,
}> = (props) => {
    if ("placeholder" in props) {
        return <div className={props.className}>
            <p
                className='font-bold text-3xl p-2 group'
            >
                {props.name}
                {props.onSeeMore && <span
                    className={'text-sm font-normal px-4 h-full tracking-normal text-right inline-block opacity-0 transition-all group-hover:opacity-100 cursor-pointer'}
                    onClick={props.onSeeMore}
                >See More...</span>}
            </p>
            <div className={'scroll-wrapper'}>
                <div
                    className={"flex gap-2 py-3"}
                >
                    <TitlePlaceholder itemWidth={props.itemWidth} />
                    <TitlePlaceholder itemWidth={props.itemWidth} />
                    <TitlePlaceholder itemWidth={props.itemWidth} />
                    <TitlePlaceholder itemWidth={props.itemWidth} />
                    <TitlePlaceholder itemWidth={props.itemWidth} />
                    {props.onSeeMore && <div
                        style={{width: props.itemWidth}}
                        className={'flex items-center justify-center hover:scale-105 transition-all duration-500 transform-gpu rounded-sm bg-transparent hover:bg-gray-600 group'}>
                        <p className={'group-hover:tracking-widest text-xl font-bold transition-all duration-500'}>See More</p>
                    </div>}
                </div>
            </div>
        </div>
    }
    return (<div className={props.className}>
        <p
            className='font-bold text-3xl p-2 group'
        >
            {props.name}
            {props.onSeeMore && <span
                className={'text-sm font-normal px-4 h-full tracking-normal text-right inline-block opacity-0 transition-all group-hover:opacity-100 cursor-pointer'}
                onClick={props.onSeeMore}
            >See More...</span>}
        </p>
        <div className={'scroll-wrapper'}>
            <div
                className={"flex gap-2 py-3"}
            >
                {(props.ids.at(0)) ? props.ids.map((id, index) => {
                    let currTag = (props.media_type.at(index) ?? props.media_type.at(0)) ?? 'movie'
                    return <Title
                        key={id}
                        type={props.media_type[(index <= props.media_type.length) ? index : 0]}
                        tag={props.tags?.at(index)}
                        title={props.titles[index]}
                        imageFullURL={props.imagesFullURL[index]}
                        subtitle={props.subtitles[index]}
                        genre={props.genres[index]}
                        date={props.dates[index]}
                        vote_avg={props.dates[index]}
                        btn1Icon={props.btn1Icon}
                        btn1Action={() => props.btn1Action(id, currTag)}
                        btn2Icon={props.btn2Icon}
                        btn2Action={() => props.btn2Action(id, currTag)}
                        onClickAction={() => props.onClickAction(id, currTag)}
                        style={{
                            width: props.itemWidth
                        }}
                    />
                }) : <>
                    {DuplicateStuff(<TitlePlaceholder itemWidth={props.itemWidth}/>, 5)}
                </>}
                {props.onSeeMore && <div
                    style={{width: props.itemWidth}}
                    className={'flex items-center justify-center hover:scale-105 transition-all duration-500 transform-gpu rounded-sm bg-transparent hover:bg-gray-600 group'}>
                    <p className={'group-hover:tracking-widest text-xl font-bold transition-all duration-500'}>See More</p>
                </div>}
            </div>
        </div>
    </div>)
}

export default TitlesRow