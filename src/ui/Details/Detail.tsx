import React, {FC, useEffect, useState} from "react";
import getDetail from "../../data/DAO/Detail/getDetail";
import {Link, useOutletContext, useParams} from "react-router-dom";
import getTrailer from "../../data/DAO/Detail/getTrailer";
import getAdditionalMovieInfo, {addComments} from "../../data/DAO/FireStore/AdditionalMovieInfoDAO";
import '../tailwindTemplate.css'
import config from "../../data/datasource/config";
import YoutubeEmbed from "../common/YoutubeEmbed";
import ToHrsAndMin from "../../Utils/ToHrsAndMin";
import SVG_AddToCart from "../common/svg/SVG_AddToCart";
import SVG_Share from "../common/svg/SVG_Share";
import ContextProps from "../Layout/ContextProps";
import FilmOverview from "../../data/model/Film/FilmOverview";
import SVG_Play from "../common/svg/SVG_Play";
import ShareLinkToClipboard from "../../Utils/ShareLinkToClipboard";
import AddSpaceToNumber from "../../Utils/AddSpaceToNumber";
import TitlesRow from "../common/TitlesRow";
import AdditionalMovieInfo from "../../data/model/firestore/AdditionalMovieInfo";
import SVG_Send from "../common/svg/SVG_Send";
import createComment, {getComments} from "../../data/DAO/FireStore/CommentDAO";
import Comment from "../../data/model/firestore/Comment";
import LoadingSpinner from "../common/LoadingSpinner";

//TODO: Movie detail and watch
const Detail: FC<{}> = () => {
    const {movieId} = useParams()
    const data = getDetail(Number(movieId))
    const videos = getTrailer(Number(movieId), data.isSuccess)
    const [additionMovieInfo, setAdditionMovieInfo] = useState<AdditionalMovieInfo>()
    const [quantity, changeQuantity] = useState(1)
    const [currentOption, changeOption] = useState(0)
    useEffect(() => {
        getAdditionalMovieInfo(Number(movieId)).then(data => {
            setAdditionMovieInfo(data)
            getComments(data.comments, 10)
                .then(comments => {
                    setComments(comments)
                    //console.log("Comments are: ", comments)
                })
                .catch(console.log)
        }).catch(console.log)
    }, [])
    const {addItemToCart, displayToast, navController, user, additionalUserInfo} = useOutletContext<ContextProps>()
    const [userComment, changeUserComment] = useState("")
    const [comments, setComments] = useState<Comment[]>([])
    if (data.error) {
        return <div className={'w-screen h-screen flex justify-center flex-col'}>
            <p className={'text-9xl w-full text-center'}>404</p>
            <p className={'text-4xl w-full text-center'}>Not Found</p>
        </div>
    }
    return data.data ? <div
        className={'relative'}
    >
        <section className={'Big display'}
                 style={{
                     paddingTop: '64px',
                     height: '90vh',
                     width: '100vw',
                     background: `linear-gradient(90deg, rgba(249,249,249,1) 20%, rgba(249,249,249,0.6) 50%,rgba(0,0,0,0) 60% , rgba(0,0,0,0) 100%), url(${config.backDropUrl + data.data.backdrop_path})`,
                     backgroundSize: 'contain',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition: 'right top',
                 }}
        >
            <div className={'p-20 max-w-3xl'}>
                <img
                    className={'w-1/3 rounded-2xl m-4'}
                    src={config.posterUrl + data.data.poster_path}
                    alt={data.data.original_title}
                />
                <p className={'font-extrabold text-3xl m-4'}>{data.data.title}</p>
                <p className={'m-4'}>{data.data.tagline}</p>
                <div className={'m-4 flex flex-row text-gray-400 tracking-wider'}>
                    <p className={''}>{data.data.release_date.slice(0, 4)}</p>
                    <p className={'mx-2'}>|</p>
                    <p className={''}>{data.data.release_dates.results.find(value => {
                        return value.iso_3166_1 === 'US'
                    })?.release_dates[0].certification ?? data.data.release_dates.results[0].release_dates[0].certification}
                    </p>
                    <p className={'mx-2'}>|</p>
                    <p>{ToHrsAndMin(Number(data.data.runtime))}</p>
                    <p className={'mx-2'}>|</p>
                    <p>Rating: {data.data.vote_average.toFixed(1)}</p>
                </div>
                <p className={'text-justify m-4'}>{data.data.overview}</p>
                <div className={'flex flex-row mx-2'}>
                    <button
                        className="tbutton"
                        onClick={() => addItemToCart(data.data as unknown as FilmOverview, currentOption, quantity, additionMovieInfo?.options)}
                    >
                        <SVG_AddToCart/>
                    </button>
                    <button
                        className="tbutton secondary"
                        onClick={() => {
                            if ((additionalUserInfo.library ?? []).find(val => val.id === Number(movieId))) {
                                //TODO: Play the movie
                                window.scrollTo({
                                    top: window.innerHeight,
                                    behavior: "smooth",
                                })
                            } else {
                                window.scrollTo({
                                    top: window.innerHeight,
                                    behavior: "smooth",
                                })
                                //TODO: Buy the movie
                            }
                            //TODO: Check bought and play may act as a buy now button
                        }}
                    >
                        <SVG_Play/>
                    </button>
                    <button
                        className="tbutton secondary"
                        onClick={() => ShareLinkToClipboard(data.data.id)
                            .then(() => displayToast('Copied to clipboard'))
                        }>
                        <SVG_Share/>
                    </button>
                </div>
                <div className={'flex flex-row items-center p-4'}>
                    <p className={'pr-4 font-bold h-fit text-xl'}>Options:</p>
                    <select
                        name="optionSelector"
                        id={'0'} value={currentOption}
                        className={'p-1 cursor-pointer'}
                        onChange={(e) => {
                            changeOption(Number(e.currentTarget.value))
                        }}
                    >
                        {(additionMovieInfo?.options ?? []).map((value, index) => {
                            return <option value={index}>{value.title}</option>
                        })}
                    </select>
                    <p className={'px-4 font-bold h-fit text-xl'}>Quantity:</p>
                    <div className="quantity">
                        <div
                            className={'cursor-pointer'}
                            onClick={(e) => {
                                e.stopPropagation()
                                changeQuantity(curr => curr - 1)
                            }}
                        >
                            -
                        </div>
                        <div className='mid select-none'>
                            {quantity}
                        </div>
                        <div
                            className={'cursor-pointer'}
                            onClick={(e) => {
                                e.stopPropagation()
                                changeQuantity(curr => curr + 1)
                            }}
                        >
                            +
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className={'bg-containerBG-1000 z-40 w-screen flex justify-center items-center px-8'}>
            <div className={'max-w-8xl w-full'}>
                {((additionalUserInfo?.library ?? []).find(value => value.id === Number(movieId))) && <section className={'p-4'}>
                    <h2 className={'font-bold subpixel-antialiased text-3xl py-4'}>Watch:</h2>
                    <div className={'w-full flex justify-center'}>
                        <iframe
                            src={`https://www.2embed.to/embed/tmdb/movie?id=${movieId}`}
                            allowFullScreen
                            className={'max-w-6xl aspect-video w-full'}
                        />
                    </div>
                </section>}
                {(videos.data !== undefined && videos.data.results.length !== 0) ?
                    <section className={'p-4'}>
                        <h2 className={'font-bold subpixel-antialiased text-3xl py-4'}>Trailer:</h2>
                        <YoutubeEmbed
                            classname={'w-full aspect-video max-w-6xl'}
                            url={videos.data.results.find((val) => {
                                return val.site === "YouTube"
                            })?.key}/>
                    </section> : ''}
                <section className={'p-4'}>
                    <h2 className={'font-bold subpixel-antialiased text-3xl py-4'}>More Details:</h2>
                    <section className={'grid grid-cols-4 gap-4'}>
                        <div>
                            <p className={'text-gray-500 pb-1'}>Genres:</p>
                            <p>{data.data.genres.map(value => {
                                return value.name.replace("Phim ", "")
                            }).join(', ')}</p>
                        </div>
                        <div>
                            <p className={'text-gray-500 pb-1'}>Spoken Language:</p>
                            <p>{data.data.spoken_languages.map(value => {
                                return value.english_name
                            }).join(', ')}</p>
                        </div>
                        <div>
                            <p className={'text-gray-500 pb-1'}>Budget:</p>
                            <p>{AddSpaceToNumber(data.data.budget)}$</p>
                        </div>
                        <div>
                            <p className={'text-gray-500 pb-1'}>Revenue:</p>
                            <p>{AddSpaceToNumber(data.data.revenue)}$</p>
                        </div>
                        <div>
                            <p className={'text-gray-500 pb-1'}>Country:</p>
                            <p>{data.data.production_countries.map(value => {
                                return value.name
                            }).join(', ')}</p>
                        </div>
                        <div>
                            <p className={'text-gray-500 pb-1'}>Company:</p>
                            <p>{data.data.production_companies.map(value => {
                                return value.name
                            }).join(', ')}</p>
                        </div>
                        <div>
                            <p className={'text-gray-500 pb-1'}>Keywords:</p>
                            <p>{data.data.keywords.keywords.map(value => {
                                return value.name[0].toUpperCase() + value.name.slice(1)
                            }).join(', ')}</p>
                        </div>
                        <div className={'col-span-full'}>
                            <p className={'text-gray-500 pb-1'}>Cast:</p>
                            <div className={'grid grid-cols-4'}>
                                {data.data.credits.cast
                                    // .sort((a, b)=>{
                                    //     return a.popularity - b.popularity
                                    // })
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
                    title={'Similar'}
                    films={data.data.similar.results}
                    onShare={() => ShareLinkToClipboard(data.data.id)
                        .then(() => displayToast('Copied to clipboard'))
                    }
                    onCart={id => addItemToCart(id, 0, 1, additionMovieInfo?.options)}
                    onInfo={(id) => navController(`/detail/${id}`)}
                    visibleCol={8}
                />
                <TitlesRow
                    title={'Recommendations'}
                    films={data.data.recommendations.results}
                    onShare={() => ShareLinkToClipboard(data.data.id)
                        .then(() => displayToast('Copied to clipboard'))
                    }
                    onCart={id => addItemToCart(id, 0, 1, additionMovieInfo?.options)}
                    onInfo={(id) => navController(`/detail/${id}`)}
                    visibleCol={8}
                />
                <section className={'w-full'}>
                    {user && (additionalUserInfo.library.findIndex(val => val.id === Number(movieId)) !== -1) ?
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
                                    createComment(user?.uid, userComment).then((data) => {
                                        setComments(old => [data, ...old])
                                        changeUserComment("")
                                        addComments(Number(movieId), data.id).catch(console.log)
                                    })
                                        .catch(console.log)
                                }}
                            >

                                <SVG_Send/>
                            </button>
                        </div> : <div className={'text-xl p-4'}
                        >
                            <Link
                                className={'text-main-1000 hover:text-main-400'}
                                to={'/auth'}>{`Sign in `}
                            </Link>
                            and buy to comment
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
    </div> : (data.error ? <>Error</> : <LoadingSpinner />)
}

export default Detail