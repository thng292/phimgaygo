// import {FC, useEffect, useState} from "react";
// import {useOutletContext} from "react-router-dom";
// import {Order, SortedBy} from "../../data/Datasource/Config";
// import getMovieDiscover from "../../data/DAO/Discovery/getMovieDiscover";
// import TitlesGrid from "../common/Movie/TitlesGrid";
// import getGenres from "../../data/DAO/Detail/getGenres";
// import MovieOverview from "../../data/model/Movie/MovieOverview";
// import SeeMoreBtn from "../common/Component/SeeMoreBtn";
// import PageIndicator from "../common/Component/PageIndicator";
// import ContextProps from "../SharedLayout/ContextProps";
// import ShareLinkToClipboard from "../../utils/ShareLinkToClipboard";
// import LoadingSpinner from "../common/Component/LoadingSpinner";
// import {MediaType} from "../../utils/Screen";
//
// const dayTime = new Date()
//
// function yearOptions() {
//     let ans: JSX.Element[] = []
//     ans.push(<option value="">All</option>)
//     for (let i = dayTime.getFullYear(); i >= 1990; --i) {
//         let tmp = String(i)
//         ans.push(<option value={tmp}>{tmp}</option>)
//     }
//     return ans
// }
//
// const MovieDiscover: FC<{}> = () => {
//     const currentPrefix = MediaType.Movie
//     let {addItemToCart, displayToast} = useOutletContext<ContextProps>()
//     const [adult, setAdult] = useState(false)
//     const [sortedBy, setSortedBy] = useState<SortedBy>('popularity')
//     const [order, setOrder] = useState<Order>("desc")
//     const [year, setYear] = useState("")
//     const [genre, setGenre] = useState<number[]>([])
//     const genres = getGenres()
//     const [films, updateFilms] = useState<MovieOverview[]>([])
//     const [fetchArgs, updateFetchArgs] = useState({
//         page: 1,
//         adult: false,
//         sortedBy,
//         order,
//         year,
//         genre,
//     })
//     const data = getMovieDiscover(
//         {genres : fetchArgs.page, enable : `${fetchArgs.sortedBy}.${fetchArgs.order}`, page : fetchArgs.adult, sortedBy : (fetchArgs.year !== "") ? Number(fetchArgs.year) : undefined, includeAdult : (fetchArgs.genre.length > 0) ? fetchArgs.genre.join(',') : undefined},
//     )
//     const navigate = useOutletContext<ContextProps>().navController
//     useEffect(() => {
//         if (data.data === undefined) return
//         if (films.length && data.data.results[data.data.results.length - 1].id === films[films.length - 1].id) return;
//         updateFilms(old => {
//             return [...old, ...(data.data?.results ?? [])]
//         })
//     }, [data.data])
//
//     const handleGenre = (id: number) => {
//         if (genre.find(curr => curr === id) === undefined) {
//             setGenre(old => [...old, id])
//         } else {
//             setGenre(old => {
//                 let tmp = old.map(val => val)
//                 tmp.splice(tmp.findIndex(curr => curr === id), 1)
//                 return tmp
//             })
//         }
//     }
//
//     return <>
//         <div
//             style={{
//                 position: 'fixed',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 transition: '.2 ease-in-out',
//                 opacity: data.isLoading ? '100%' : '0%',
//                 display: data.isLoading ? 'block' : 'none'
//             }}
//         ><LoadingSpinner/></div>
//         <div
//             style={{
//                 maxWidth: "1400px",
//                 width: '80vw',
//                 transition: '.2 ease-in-out',
//                 opacity: data.isLoading ? '0%' : '100%',
//                 visibility: data.isLoading ? 'hidden' : 'initial'
//             }}
//         >
//
//             <div className="w-full flex flex-col p-2">
//                 <div
//                     className="flex flex-row p-2 items-center h-16"
//                 >
//                     <div
//                         className="flex flex-row p-2 cursor-pointer"
//                         onClick={() => {
//                             //updateFilms([])
//                             setAdult(old => !old)
//                         }}
//                     >
//                         <p className={'p-2'}>Contain Adult</p>
//                         <input
//                             className="p-2"
//                             type="checkbox"
//                             name="adult"
//                             id="0"
//                             checked={adult}
//                         />
//                     </div>
//                     <p className={'p-3'}>Sort by:</p>
//                     <select
//                         className={'p-1.5 rounded-3xl border-2 border-main-400'}
//                         name="sortedBy" id="1"
//                         onChange={(e) => {
//                             //updateFilms([])
//                             //console.log(e.currentTarget.value as SortedBy)
//                             setSortedBy(e.currentTarget.value as SortedBy)
//                         }}
//                         defaultValue='release_date'
//                     >
//                         <option value="release_date">Release Date</option>
//                         <option value="revenue">Revenue</option>
//                         <option value="popularity">Popularity</option>
//                         <option value="vote_average">Rating</option>
//                     </select>
//                     <p className={'p-3'}>Order by</p>
//                     <select
//                         className={'p-1.5 rounded-3xl border-2 border-main-400'}
//                         name="order" id="2"
//                         onChange={(e) => setOrder(e.currentTarget.value as Order)}
//                     >
//                         <option value="asc">ASC</option>
//                         <option value="desc">DESC</option>
//                     </select>
//
//                     <p className={'p-3'}>In Year:</p>
//                     <select
//                         className={'p-1.5 rounded-3xl border-2 border-main-400'}
//                         name="year" id="3"
//                         value={year}
//                         onChange={e => setYear(e.currentTarget.value)}
//                     >
//                         {yearOptions()}
//                     </select>
//                 </div>
//                 <p className="font-bold text-3xl p-4">Genres</p>
//                 <div
//                     style={{
//                         display: "grid",
//                         gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
//                     }}
//                 >
//                     {(genres.data !== undefined) && genres.data?.genres.map((value) => <div
//                         className="cursor-pointer"
//                         onClick={() => {
//                             handleGenre(value.id)
//                         }}
//                     >
//                         <input
//                             className="p-3"
//                             type="checkbox"
//                             name={value.name}
//                             id="0"
//                             checked={(genre.find(curr => (curr === value.id)) !== undefined)}
//                         />
//                         <p className={'p-3 inline-block'}>{value.name}</p>
//                     </div>)}
//                 </div>
//                 <button
//                     className="tbutton"
//                     onClick={() => {
//                         updateFilms([])
//                         updateFetchArgs({
//                             page: 1,
//                             adult: adult,
//                             sortedBy: sortedBy,
//                             order: order,
//                             genre: genre,
//                             year: year,
//                         })
//                     }}>
//                     Apply
//                 </button>
//             </div>
//             <TitlesGrid
//                 title="MovieDiscover"
//                 films={films}
//                 visibleCol={6}
//                 onCart={item => {
//                     addItemToCart(item, 0, 1)
//                 }}
//                 onInfo={id => {
//                     navigate(`${currentPrefix}/detail/${id}`)
//                 }}
//                 onShare={id => {
//                     ShareLinkToClipboard(id)
//                         .then(() => displayToast("Copied link to clipboard"))
//                 }}
//             />
//             <div
//                 className='flex justify-center w-full p-4'
//                 style={{
//                     display: (fetchArgs.page === data?.data?.total_pages) ? 'none' : 'flex'
//                 }}
//             >
//                 <SeeMoreBtn onClick={() => updateFetchArgs(old => {
//                     return {
//                         ...old,
//                         page: old.page + 1,
//                     }
//                 })} isLoading={data.isLoading}/>
//             </div>
//             <PageIndicator page={fetchArgs.page}/>
//         </div>
//     </>
// }
//
// export default MovieDiscover

export default {}