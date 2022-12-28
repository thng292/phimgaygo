import React, {FC, useEffect, useRef, useState} from "react";
import getDetail from "../../data/DAO/Detail/getDetail";
import {Link, Navigate, useOutletContext, useParams} from "react-router-dom";
import getTrailer from "../../data/DAO/Detail/getTrailer";
import getAdditionalMovieInfo, {addComments} from "../../data/DAO/FireStore/AdditionalMovieInfoDAO";
import config, {media_type} from "../../data/Datasource/Config";
import YoutubeEmbed from "../common/Component/YoutubeEmbed";
import ToHrsAndMin from "../../utils/ToHrsAndMin";
import ContextProps from "../SharedLayout/ContextProps";
import SVG_Play from "../common/SVG/SVG_Play";
import AddSpaceToNumber from "../../utils/AddSpaceToNumber";
import SVG_Send from "../common/SVG/SVG_Send";
import createComment, {getComments} from "../../data/DAO/FireStore/CommentDAO";
import Comment from "../../data/model/Firebase/Comment";
import LoadingSpinner from "../common/Component/LoadingSpinner";
import SVG_Favorite from "../common/SVG/SVG_Favorite";
import TitlesRow from "../common/Layout/TitlesRow";
import CalculateWidth from "../../utils/CalculateWidth";
import getGenres from "../../data/DAO/Detail/getGenres";
import MapGenreToID from "../../utils/MapGenreToID";
import IconAndLabelWrap from "../common/Component/IconAndLabelWrap";

//TODO: Movie detail and watch
const MovieDetail: FC<{}> = () => {
    const {id} = useParams()
    const {
        displayToast,
        navController,
        user,
    } = useOutletContext<ContextProps>()
    const data = getDetail(Number(id))
    const videos = getTrailer(Number(id), data.isSuccess)
    const WatchSectionRef = useRef<HTMLDivElement>(null)
    const itemWidth = CalculateWidth()
    const Recommendations = data.data?.recommendations.results ?? []
    const Similar = data.data?.similar.results ?? []
    const movieGenres = getGenres()
    useEffect(() => {
        getAdditionalMovieInfo(Number(id)).then(data => {
            getComments(data.comments, 10)
                .then(comments => {
                    setComments(comments)
                    //console.log("Comments are: ", comments)
                })
                .catch(console.error)
        }).catch(console.error)
    }, [])
    const [userComment, changeUserComment] = useState("")
    const [comments, setComments] = useState<Comment[]>([])
    if (data.error) {
        return <Navigate to={'*'}/>
    }
    // @ts-ignore
    return data.data ? <div
        className={'relative'}
    >
        <section
            style={{
                paddingTop: '64px',
                minHeight: '90vh',
                width: '100vw',
                backgroundImage: `${(window.innerWidth > 750) ? 'linear-gradient(to top, #000, transparent 10%), linear-gradient(to right, #000, #222222 20%, #42424200), ' : ''} url(${config.backDropUrl + data.data.backdrop_path})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right top',
            }}
        >
            <div className={'p-3 sm:p-20 max-w-3xl'}>
                <img
                    className={'w-1/3 rounded-2xl m-4'}
                    src={config.posterUrl + data.data.poster_path}
                    alt={data.data.original_title}
                />
                <p className={'font-extrabold text-3xl m-4'}>{data.data.title}</p>
                <p className={'m-4'}>{data.data.tagline}</p>
                <div className={'m-4 flex flex-row text-gray-400 tracking-wider'}>
                    <p>{data.data.release_date.slice(0, 4)}</p>
                    <p className={'mx-2'}>•</p>
                    <p>{data.data.release_dates.results.find(value => {
                        return value.iso_3166_1 === 'US'
                    })?.release_dates[0].certification ?? data.data.release_dates.results[0].release_dates[0].certification}
                    </p>
                    <p className={'mx-2'}>•</p>
                    <p>{ToHrsAndMin(Number(data.data.runtime))}</p>
                    <p className={'mx-2'}>•</p>
                    <p>Rating: {data.data.vote_average.toFixed(1)}</p>
                </div>
                <p className={'text-justify m-4'}>{data.data.overview}</p>
                <div className={'flex flex-row mx-2'}>
                    <button
                        className="p-2 m-1 rounded bg-main-1000 flex"
                        onClick={() => {
                            WatchSectionRef.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                            })
                        }}
                    >
                        {SVG_Play()} <span className={'text-black px-2'}>Watch</span>
                    </button>
                    <button
                        className="p-2 m-1 rounded secondary flex"
                        onClick={() => {
                        }}>
                        {SVG_Favorite()} <span className={'text-black px-2'}>Favorite</span>
                    </button>
                </div>
            </div>
        </section>
        <div className={'z-40 w-screen flex justify-center items-center px-8'}>
            <div className={'max-w-8xl w-full overflow-x-clip'}>
                <section ref={WatchSectionRef} className={'p-4'}>
                    <h2 className={'font-bold subpixel-antialiased text-3xl py-4'}>Watch:</h2>
                    <div className={'w-full flex justify-center'}>
                        <iframe
                            src={`https://www.2embed.to/embed/tmdb/movie?id=${id}`}
                            allowFullScreen
                            className={'max-w-6xl aspect-video w-full'}
                        />
                    </div>
                </section>
                <h2 className={'font-bold subpixel-antialiased text-3xl py-4'}>Videos:</h2>
                {(videos.data !== undefined && videos.data.results.length !== 0) &&
                    <div className={'grid gap-2'} style={{
                        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))"
                    }}>
                        {videos.data.results.filter(value => value.site === "YouTube").map(value => {
                            return <YoutubeEmbed
                                className={'w-full aspect-video transition-all duration-500 transition-gpu max-w-6xl hover:scale-105 focus:border-0 focus:outline-0'}
                                url={value.key}
                            />
                        })}
                    </div>
                }
                <section className={'p-4'}>
                    <h2 className={'font-bold subpixel-antialiased text-3xl py-4'}>More Details:</h2>
                    <section
                        className={'grid gap-4'}
                        style={{
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
                        }}
                    >
                        <div>
                            <p className={'text-gray-400 pb-1'}>Genres:</p>
                            <p>{data.data.genres.map((value, index) => {
                                return <><a className={'cursor-pointer hover:text-main-1000'} onClick={() => {
                                    navController(`movie/discover/${value.id}`)
                                }}>{value.name}</a><span>{index !== data.data.genres.length - 1 ? ', ' : ''}</span></>
                            })}</p>
                        </div>
                        <div>
                            <p className={'text-gray-400 pb-1'}>Spoken Language:</p>
                            <p>{data.data.spoken_languages.map(value => {
                                return value.english_name
                            }).join(', ')}</p>
                        </div>
                        <div>
                            <p className={'text-gray-400 pb-1'}>Country:</p>
                            <p>{data.data.production_countries.map(value => {
                                return value.name
                            }).join(', ')}</p>
                        </div>
                        <div>
                            <p className={'text-gray-400 pb-1'}>Revenue:</p>
                            <p>{AddSpaceToNumber(data.data.revenue)}$</p>
                        </div>
                        <div className={'max-w-2xl'}>
                            <p className={'text-gray-400 pb-1'}>Company:</p>
                            <div>{data.data.production_companies.map(value => {
                                return value.name
                            }).join(', ')}</div>
                        </div>
                        <div className={'max-w-2xl'}>
                            <p className={'text-gray-400 pb-1'}>Keywords:</p>
                            <p>{data.data.keywords.keywords.map((value) => {
                                return value.name[0].toUpperCase() + value.name.slice(1)
                            }).join(', ')}</p>
                        </div>
                        <div className={'col-span-full'}>
                            <p className={'text-gray-400 pb-1'}>Cast:</p>
                            <div
                                className={'grid gap-x-2'}
                                style={{
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
                                }}
                            >
                                {data.data.credits.cast
                                    .slice(0, 8)
                                    .map(val => {
                                            return <p>{val.name}</p>
                                        }
                                    )}
                            </div>
                        </div>
                    </section>
                </section>
                <TitlesRow
                    name={'Recommendation'}
                    ids={Recommendations.map(value => value.id)}
                    titles={Recommendations.map(value => value.title)}
                    genres={Recommendations.map(value => MapGenreToID(movieGenres.data?.genres ?? [], value.genre_ids))}
                    itemWidth={itemWidth}
                    imagesFullURL={Recommendations.map(value => config.backDropUrlSmall + value.backdrop_path)}
                    className={'p-4'}
                    btn1Icon={<IconAndLabelWrap icon={SVG_Play()} label={'Watch'}/>}
                    btn1Action={function (id: number, type?: media_type | undefined): void {
                        throw new Error('Function not implemented.')
                    }} // Watch
                    btn2Icon={SVG_Favorite()}
                    btn2Action={function (id: number, type?: media_type | undefined): void {
                        throw new Error('Function not implemented.')
                    }} // Share
                    onClickAction={(id, type) => {
                        navController(`${type}/detail/${id}`)
                    }} // Add to favorite
                    tags={Recommendations.map(value => value.vote_average.toPrecision(2))}
                    dates={Recommendations.map(value => value.release_date)}
                    vote_avgs={Recommendations.map(value => value.vote_average.toPrecision(2))}
                    media_type={['movie']}
                    subtitles={Recommendations.map(value => value.original_title)}
                />
                <TitlesRow
                    name={'Similar'}
                    ids={Similar.map(value => value.id)}
                    titles={Similar.map(value => value.title)}
                    genres={Similar.map(value => MapGenreToID(movieGenres.data?.genres ?? [], value.genre_ids))}
                    itemWidth={itemWidth}
                    imagesFullURL={Similar.map(value => config.backDropUrlSmall + value.backdrop_path)}
                    className={'p-4'}
                    btn1Icon={<IconAndLabelWrap icon={SVG_Play()} label={'Watch'}/>}
                    btn1Action={function (id: number, type?: media_type | undefined): void {
                        throw new Error('Function not implemented.')
                    }} // Watch
                    btn2Icon={SVG_Favorite()}
                    btn2Action={function (id: number, type?: media_type | undefined): void {
                        throw new Error('Function not implemented.')
                    }} // Share
                    onClickAction={(id, type) => {
                        navController(`${type}/detail/${id}`)
                    }} // Add to favorite
                    tags={Similar.map(value => value.vote_average.toPrecision(2))}
                    dates={Similar.map(value => value.release_date)}
                    vote_avgs={Similar.map(value => value.vote_average.toPrecision(2))}
                    media_type={['movie']}
                    subtitles={Similar.map(value => value.original_title)}
                />
                <section className={'w-full'}>
                    {user ?
                        <div className={' w-3/4 mx-4 flex flex-row items-center'}>
                            <img
                                className={'w-12 h-12 rounded-full border-2 border-main-400'}
                                src={user?.photoURL ?? (config.StorageURL(config.defaultAvatar))}
                                alt={user?.displayName ?? ''}
                            />
                            <input
                                type='text'
                                placeholder='Comment'
                                className={`w-full border-2 p-2 rounded m-4 transition ease-in-out  focus:text-gray-700 focus:bg-white focus:border-main-1000 focus:outline-0`}
                                value={userComment}
                                onChange={(e) => {
                                    changeUserComment(e.currentTarget.value);
                                }}
                            />
                            <button
                                className={'bg-main-400 rounded-full p-2'}
                                onClick={() => {
                                    user && createComment(user.uid, userComment).then((data) => {
                                        setComments(old => [data, ...old])
                                        changeUserComment("")
                                        addComments(Number(id), data.id).catch(console.error)
                                    })
                                        .catch(console.error)
                                }}
                            >

                                {SVG_Send()}
                            </button>
                        </div> : <div className={'text-xl p-4'}
                        >
                            <Link
                                className={'text-main-1000 hover:text-main-400'}
                                to={'/auth'}>{`Sign in `}
                            </Link>
                            to comment
                        </div>}
                    {comments.length ? comments.map(value => {
                        //TODO: Comment
                        return <div className={'w-full min-h-8'}>
                            <p>{value.content}</p>
                            {/*<div className={'flex flex-row'}>*/}
                            {/*    <SVG_ArrowUpward /><p onClick={()=>{*/}
                            {/*        upVoteComment(value.id)*/}
                            {/*    }*/}
                            {/*}>{value.up_vote_count}</p>*/}
                            {/*    <SVG_ArrowDownward /><p*/}
                            {/*    onClick={()=>{*/}
                            {/*        downVoteComment(value.id)*/}
                            {/*    }*/}
                            {/*    }>{value.down_vote_count}</p>*/}
                            {/*</div>*/}
                        </div>
                    }) : <p className={'w-full text-center text-2xl'}>No comments</p>}
                </section>
            </div>
        </div>
    </div> : (data.error ? <>Error</> : <LoadingSpinner/>)
}

export default MovieDetail