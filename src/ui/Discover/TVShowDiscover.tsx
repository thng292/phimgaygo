import { FC, useState } from "react"
import { useLocation, useOutletContext } from "react-router-dom"
import ContextProps from "../SharedLayout/ContextProps"
import getTVDiscover from "../../data/DAO/Discovery/getTVDiscover"
import { Order, Orders, SortOption, SortOptions, SortedBy } from "../../data/Datasource/Config"
import KeyWord from "../../data/model/Movie/KeyWord"
import Genre from "../../data/model/Movie/Genre"
import getGenres from "../../data/DAO/Detail/getGenres"

type yearOptions = number | 'All'

const TVShowDiscover: FC = () => {
    const { navController } = useOutletContext<ContextProps>()
    const URLparams = useUrlParams()
    const [page, setPage] = useState(URLparams.page)
    const [adult, setAdult] = useState(URLparams.adult)
    const [sort, setSort] = useState({
        option: URLparams.sortby,
        order: URLparams.order
    } as SortedBy)
    const [genres, setGenres] = useState<Genre[]>([])
    const [keywords, setKeywords] = useState<KeyWord[]>([])
    const [year, setYear] = useState<yearOptions>(URLparams.year)
    const TVShowData = getTVDiscover({
        page: page,
        sortedBy: sort,
        first_air_date_year: year === 'All' ? undefined : year,
        genres: genres.map(val => val.id),
        keywords: keywords.map(val => val.id),
    })
    const genreData = getGenres('tv')
    
    return <></>    
}

export default TVShowDiscover

interface DiscoverParams {
    page: number,
    adult: boolean,
    sortby: SortOption,
    order: Order,
    genres: number[],
    keywords: number[],
    year: yearOptions
}

function useUrlParams() {
    const {search} = useLocation()
    const tmp = new URLSearchParams(search)
    const result: DiscoverParams = {
        page: Number(tmp.get('page')) > 0 ? Number(tmp.get('page')) : 1,
        adult: tmp.get('adult') === 'true',
        //@ts-ignore
        sortby: SortOptions.includes(tmp.get('sortby')) ? tmp.get('sortby') : 'popularity',
        //@ts-ignore
        order: Orders.includes(tmp.get('order')) ? tmp.get('order') as Order : 'desc',
        genres: (tmp.get('genres')?.split(',') ?? []).map(value => Number(value)).filter(value => !isNaN(value)),
        keywords: (tmp.get('keywords')?.split(',') ?? []).map(value => Number(value)).filter(value => !isNaN(value)),
        year: isNaN(Number(tmp.get('year'))) ? 'All' : Number(tmp.get('year'))
    } 
    return result
}