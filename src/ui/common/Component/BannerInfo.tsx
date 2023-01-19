import React, {FC} from "react"

const BannerInfo: FC<{
    id: number,
    tag: string,
    title: string,
    subtitle: string,
    date: string,
    genres: string,
    overview: string,
    vote_avg: number,
    poster_path: string,
    btn1Icon: JSX.Element,
    btn1Action: () => void,
    btn2Icon: JSX.Element,
    btn2Action: () => void,
}> = (props) => {
    return <div
        className="pl-4 sm:pl-16 flex"
    >
        <img
            className="mx-4 rounded-xl hidden xl:block"
            src={props.poster_path} alt={props.title}
            style={{
                maxWidth: '25vw',
                height: '35vh',
                aspectRatio: '2/3',
            }}/>
        <div
            className={'relative xl:w-1/3 max-h-[35vh] min-h-fit'}
        >
            <p className="p-3 pt-0 text-3xl font-bold text-white">{props.title}</p>
            <p className="px-3 font-bold text-white">{props.subtitle} - {props.tag.toUpperCase()}</p>
            <p className="px-3 text-white"><span className={'text-gray-300'}>Genres: </span>{props.genres}</p>
            <div className="flex flex-row">
                <p className="px-3 pb-20 text-white sm:pb-0"><span
                    className="text-gray-300">Release: </span>{props.date}</p>
                <p className="px-3 text-white"><span
                    className={'text-gray-300'}>Rating: </span>{props.vote_avg.toPrecision(2)} on <a
                    className={'underline underline-offset-2'}
                    href={`https://www.themoviedb.org/${props.id}`}>TMDB</a></p>
            </div>
            <p
                className="w-full overflow-hidden p-3 text-white max-h-[15vh] hidden xl:block"
            >{props.overview}</p>
            <div
                className="absolute bottom-0 z-20 m-2 mb-0 w-screen hidden xl:flex"
            >
                <button
                    className="min-w-24 p-2 mx-1 rounded bg-main-1000"
                    onClick={props.btn1Action}>
                    {props.btn1Icon}
                </button>
                <button
                    className="w-fit p-2 mx-1 rounded secondary"
                    onClick={props.btn2Action}
                >
                    {props.btn2Icon}
                </button>
            </div>
        </div>
    </div>
}

export default BannerInfo