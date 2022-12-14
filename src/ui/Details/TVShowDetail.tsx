import React, {FC, useEffect, useRef, useState} from "react";
import {Link, Navigate, useOutletContext, useParams} from "react-router-dom";
import ContextProps from "../SharedLayout/ContextProps";
import CalculateWidth from "../../utils/CalculateWidth";
import getGenres from "../../data/DAO/Detail/getGenres";
import getAdditionalMovieInfo, {addComments} from "../../data/DAO/FireStore/AdditionalMovieInfoDAO";
import createComment, {getComments} from "../../data/DAO/FireStore/CommentDAO";
import Comment from "../../data/model/Firebase/Comment";
import config, {media_type} from "../../data/Datasource/Config";
import ToHrsAndMin from "../../utils/ToHrsAndMin";
import SVG_Play from "../common/SVG/SVG_Play";
import SVG_Favorite from "../common/SVG/SVG_Favorite";
import YoutubeEmbed from "../common/Component/YoutubeEmbed";
import TitlesRow from "../common/Layout/TitlesRow";
import MapGenreToID from "../../utils/MapGenreToID";
import IconAndLabelWrap from "../common/Component/IconAndLabelWrap";
import SVG_Send from "../common/SVG/SVG_Send";
import LoadingSpinner from "../common/Component/LoadingSpinner";
import getTVDetail from "../../data/DAO/Detail/getTVDetail";
import getTVTrailer from "../../data/DAO/Detail/getTVTrailer";
import getTVSeason from "../../data/DAO/Detail/getTVSeason";
import {Season} from "../../data/model/TVShow/TVShow";
import {Episode} from "../../data/model/TVShow/TVShowSeason";

const TVShowDetail: FC = () => {
    const {id} = useParams()
    const {
        displayToast,
        navController,
        user,
    } = useOutletContext<ContextProps>()

    const itemWidth = CalculateWidth()
    const data = getTVDetail(Number(id))
    const videos = getTVTrailer(Number(id), data.isSuccess)

    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);

    const [seasonShowAll, changeSeasonShowAll] = useState(false)
    const WatchSectionRef = useRef<HTMLDivElement>(null)
    const Recommendations = data.data?.recommendations.results ?? []
    const Similar = data.data?.similar.results ?? []
    const tvGenres = getGenres('tv')

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
                    alt={data.data.original_name}
                />
                <p className={'font-extrabold text-3xl m-4'}>{data.data.name}</p>
                <p className={'m-4'}>{data.data.tagline}</p>
                <div className={'m-4 flex flex-row text-gray-400 tracking-wider'}>
                    <p>{data.data.first_air_date.slice(0, 4)}</p>
                    <p className={'mx-2'}>???</p>
                    <p>{(data.data?.content_ratings.results ?? []).find(value => {
                        return value.iso_3166_1 === 'US'
                    })?.rating ?? data.data?.content_ratings.results[0].rating}
                    </p>
                    <p className={'mx-2'}>???</p>
                    <p>{ToHrsAndMin(Number(data.data.episode_run_time))}</p>
                    <p className={'mx-2'}>???</p>
                    <p>Rating: {data.data.vote_average.toFixed(1)}</p>
                </div>
                <p className={'m-4 text-gray-400 tracking-wider'}>{data.data.number_of_seasons} Seasons
                    ??? {data.data.number_of_episodes} Episodes</p>
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
                <section className={'p-4 relative'}>
                    <h2
                        onClick={() => changeSeasonShowAll(old => !old)}
                        className={'group font-bold subpixel-antialiased text-3xl py-4 cursor-pointer'}>Seasons & Episode:
                        <span
                            className={'font-normal text-lg opacity-0 transition-all duration-500 px-2 float-right group-hover:opacity-100'}
                        >
                            {seasonShowAll ? 'Show less' : 'Show All'}
                        </span>
                    </h2>
                    <div
                        className={'absolute top-0 left-0 bottom-0 right-0 z-30 pointer-events-none'}
                        style={{
                            // backgroundImage: (!seasonShowAll && data.data.number_of_seasons > 2) ? 'linear-gradient(to top, #000, transparent 15%)' : '',
                            backgroundImage: window.innerWidth >= 640  ? 'linear-gradient(to top, #000, transparent 10%)' : ''
                        }}
                    >
                    </div>
                    <div
                        style={{
                            height: seasonShowAll ? 'fit-content' : 'calc(max(400px, 20vh) + 2rem)',
                        }}
                        className={'overflow-y-auto w-full' + (window.innerWidth >= 640 ? ' max-h-screen' : '')}
                    >
                        {(data.data?.seasons ?? []).map(value => <SeasonSectionLazy
                            season={value.season_number}
                            id={Number(id)}
                            value={value}
                            onEpClicked={ep => {
                                setSeason(value.season_number)
                                setEpisode(ep)
                                WatchSectionRef.current?.scrollIntoView({behavior: "smooth", inline: 'center'})
                            }}
                        />)}
                        <div className={'h-8'}>
                        </div>
                    </div>
                </section>
                <section ref={WatchSectionRef} className={'p-4'}>
                    <h2 className={'font-bold subpixel-antialiased text-3xl py-4'}>Watch:</h2>
                    <div className={'w-full flex justify-center'}>
                        <iframe
                            src={`https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`}
                            allowFullScreen
                            className={'max-w-6xl aspect-video w-full'}
                        />
                    </div>
                </section>
                <section>
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
                        </div>}
                </section>

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
                                //TODO: change to url param using useLocation
                                //https://codesandbox.io/s/react-router-query-parameters-kp309y?from-embed=&file=/example.js:727-738
                                return <><a className={'cursor-pointer hover:text-main-1000'} onClick={() => {
                                    navController(`tv/discover/${value.id}`)
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
                            <p className={'text-gray-400 pb-1'}>Network:</p>
                            <p>{data.data.networks.map(value => value.name).join(', ')}$</p>
                        </div>
                        <div className={'max-w-2xl'}>
                            <p className={'text-gray-400 pb-1'}>Company:</p>
                            <div>{data.data.production_companies.map(value => {
                                return value.name
                            }).join(', ')}</div>
                        </div>
                        <div className={'max-w-2xl'}>
                            <p className={'text-gray-400 pb-1'}>Keywords:</p>
                            <p>{data.data.keywords.results.map((value) => {
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
                    titles={Recommendations.map(value => value.name)}
                    genres={Recommendations.map(value => MapGenreToID(tvGenres.data?.genres ?? [], value.genre_ids))}
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
                    dates={Recommendations.map(value => value.first_air_date)}
                    vote_avgs={Recommendations.map(value => value.vote_average.toPrecision(2))}
                    media_type={['tv']}
                    subtitles={Recommendations.map(value => value.original_name)}
                />
                <TitlesRow
                    name={'Similar'}
                    ids={Similar.map(value => value.id)}
                    titles={Similar.map(value => value.name)}
                    genres={Similar.map(value => MapGenreToID(tvGenres.data?.genres ?? [], value.genre_ids))}
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
                    dates={Similar.map(value => value.first_air_date)}
                    vote_avgs={Similar.map(value => value.vote_average.toPrecision(2))}
                    media_type={['tv']}
                    subtitles={Similar.map(value => value.original_name)}
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

export default TVShowDetail

const SeasonSectionLazy: FC<{
    value: Season,
    id: number,
    season: number,
    onEpClicked: (ep: number) => void
}> = ({
          value,
          id,
          season,
          onEpClicked
      }) => {
    const [clicked, setClicked] = useState(false);
    const data = getTVSeason(id, season, clicked)

    const EPView = () => {
        if (value.episode_count > 50 || window.innerWidth <= 640) {
            return <EpisodeViewGrid
                number_of_episode={value.episode_count}
                onEpClicked={onEpClicked}
            />
        } else {
            if (data.data) {
                return <div>
                    {data.data.episodes.map(val => <EpisodeViewList
                        data={val}
                        key={val.season_number * value.episode_count + val.episode_number}
                        onEPClicked={() => onEpClicked(val.episode_number)}
                    />)}
                </div>
            } else {
                return <div>
                    {Array(value.episode_count).map((_, index) => <EpisodeViewList
                        onEPClicked={() => onEpClicked(index + 1)}
                    />)}
                </div>
            }
        }
    }
    return <div>
        <div
            onClick={() => setClicked(old => !old)}
            className={'relative h-[10vh] min-h-[180px] mt-4 flex flex-row rounded-sm transition-all duration-500 cursor-pointer hover:bg-gray-800'}>
            <img className={'rounded-l'} src={config.posterUrl + value.poster_path} alt={value.name}/>
            <div className={'m-2 flex-shrink overflow-auto'}>
                <div className={'flex font-bold justify-between'}><p
                    className={'text-xl overflow-hidden'}
                >{value.season_number}. {value.name}</p>
                    <p className={'absolute right-2 text-gray-300 p-2'}>{value.episode_count} Episodes</p>
                </div>
                <p className={'px-2'}>Air date: {value.air_date}</p>
                <p className={'m-2 w-[90%]'}>{value.overview}</p>
            </div>
        </div>
        {clicked && EPView()}
    </div>
}

const EpisodeViewList: FC<{ data?: Episode, onEPClicked: () => void }> = ({data, onEPClicked}) => {
    if (data)
        return <div
            onClick={onEPClicked}
            className={'flex m-2 rounded h-[10vh] min-h-[120px] hover:bg-gray-800'}>
            <img className={'aspect-video rounded h-full'} src={config.backDropUrlSmall + data.still_path}
                 alt={data.episode_number.toString()}/>
            <div className={'w-full'}>
                <p className={'mx-2 font-bold text-xl'}>
                    {data.episode_number}. {data.name}
                </p>
                <p className={'mx-2'}>
                    Air date: {data.air_date}
                </p>
                <p className={'m-2 my-1'}>
                    {data.overview}
                </p>
            </div>
        </div>
    else
        return <div className={'flex m-2 h-[120px] rounded hover:bg-gray-800'}>
            <div className={'aspect-video animate-pulse bg-gray-800 rounded h-full cursor-pointer'}/>
            <div className={'w-full'}>
                <div className={'my-2 bg-gray-800 rounded animate-pulse h-4 w-1/3'}/>
                <div className={'my-2 bg-gray-800 rounded animate-pulse h-20 w-5/6'}/>
            </div>
        </div>
}

const EpisodeViewGrid: FC<{ number_of_episode: number, onEpClicked: (ep: number) => void }> = ({
                                                                                                   number_of_episode,
                                                                                                   onEpClicked
                                                                                               }) => {
    return <div
        className={'grid gap-1 m-2'}
        style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))'
        }}
    >
        {[...Array(number_of_episode).keys()].map(index => <div
            className={'border-main-400 border-2 hover:border-main-1000 transition-all duration-500 cursor-pointer'}
            onClick={() => onEpClicked(index)}>
            <p className={'py-2 text-center'}>Ep.{index}</p>
        </div>)}
    </div>
}