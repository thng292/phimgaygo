import { FC, useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Order, SortedBy } from "../../data/datasource/config";
import getDiscover from "../../data/useCase/Discovery/getDiscover";
import TitlesGrid from "../common/TitlesGrid";
import getGenres from "../../data/useCase/getGenres";
import FilmOverview from "../../data/model/FilmOverview";
import ToTopBtn from "../common/ToTopBtn";
import SeeMoreBtn from "../common/SeeMoreBtn";
import PageIndicator from "../common/PageIndicator";
import ContextProps from "../Layout/ContextProps";
import price from "../../data/datasource/price";

const dayTime = new Date()

function yearOptions() {
    let ans: JSX.Element[] = []
    ans.push(<option value="">All</option>)
    for (let i = dayTime.getFullYear(); i >= 1990; --i) {
        let tmp = String(i)
        ans.push(<option value={tmp}>{tmp}</option>)
    }
    return ans
}

const Discover: FC<{}> = () => {
    let { addItemToCart } = useOutletContext<ContextProps>()
    const [adult, setAdult] = useState(false)
    const [sortedBy, setSortedBy] = useState<SortedBy>('popularity')
    const [order, setOrder] = useState<Order>("desc")
    const [year, setYear] = useState("")
    const [genre, setGenre] = useState<number[]>([])
    const genres = getGenres()
    const [films, updateFilms] = useState<FilmOverview[]>([])
    const [fetchArgs, updateFetchArgs] = useState({
        page: 1,
        adult: false,
        sortedBy,
        order,
        year,
        genre,
    })
    const data = getDiscover(
        fetchArgs.page,
        `${fetchArgs.sortedBy}.${fetchArgs.order}`,
        fetchArgs.adult,
        (fetchArgs.year !== "") ? Number(fetchArgs.year) : undefined,
        (fetchArgs.genre.length > 0) ? fetchArgs.genre.join(',') : undefined,
    )
    const navigate = useNavigate()
    /* useEffect(() => {
        window.onscroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight-100) {
                setPage(old => ++old)
            }
        }
    }, []) */
    useEffect(() => {
        if (data.data !== undefined) {
            console.log(data)
            updateFilms(old => {
                // let shouldOverwrite = false
                // let n = films.length
                // for (let sample in data.data.results) {
                //     if (sample ===)
                // }
                return [...old, ...(data.data?.results ?? [])]
            })
        }
    }, [data.data])

    const handleGenre = (id: number) => {
        console.log(id)
        if (genre.find(curr => curr === id) === undefined) {
            setGenre(old => [...old, id])
        } else {
            setGenre(old => {
                let tmp = old.map(val => val)
                tmp.splice(tmp.findIndex(curr => curr === id), 1)
                return tmp
            })
        }
    }

    return <div style={{
        maxWidth: '1400px',
    }}>
        {data.isLoading ? <h1
            style={{
                position: 'fixed',
                left: '50%',
                transform: 'translateX(-50%)',
            }}
        >Loading...</h1> : ''}
        <div className="column p10">
            <div
                className="row p10"
                style={{
                    alignItems: 'center',
                    height: '64px'
                }}
            >
                <div
                    className="row p10"
                    onClick={() => {
                        //updateFilms([])
                        setAdult(old => !old)
                    }}
                    style={{
                        cursor: 'pointer'
                    }}>
                    <p style={{ padding: '10px' }}>Contain Adult</p>
                    <input
                        className="p10"
                        type="checkbox"
                        name="adult"
                        id="0"
                        checked={adult}
                    />
                </div>
                <p style={{ padding: '10px' }}>Sort by:</p>
                <select
                    className="p10"
                    name="sortedBy" id="1"
                    onChange={(e) => {
                        //updateFilms([])
                        console.log(e.currentTarget.value as SortedBy)
                        setSortedBy(e.currentTarget.value as SortedBy)
                    }}
                    defaultValue='release_date'
                >
                    <option value="release_date">Release Date</option>
                    <option value="revenue">Revenue</option>
                    <option value="popularity">Popularity</option>
                    <option value="vote_average">Rating</option>
                </select>
                <p className="p10">Order by</p>
                <div
                    className="row p10"                    
                    style={{ cursor: 'pointer' }}>
                    <select name="order" id="2" onChange={(e)=>setOrder(e.currentTarget.value as Order)}>
                        <option value="asc">ASC</option>
                        <option value="desc"   >DESC</option>
                    </select>

                </div>
                <p style={{ padding: '10px' }}>In Year:</p>
                <select
                    name="year" id="3"
                    value={year}
                    onChange={e => setYear(e.currentTarget.value)}
                >
                    {yearOptions()}
                </select>
            </div>
            <p className="category">Genres</p>
            <div className="row" style={{ flexWrap: 'wrap' }}>
                {(genres.data !== undefined) ? genres.data?.genres.map((value) => <div
                    className="row p10"
                    onClick={() => {
                        handleGenre(value.id)
                    }}
                    style={{
                        cursor: 'pointer'
                    }}>
                    <input
                        className="p10"
                        type="checkbox"
                        name={value.name}
                        id="0"
                        checked={(genre.find(curr => (curr === value.id)) !== undefined)}
                    />
                    <p style={{ padding: '10px' }}>{value.name}</p>
                </div>) : ''}
            </div>
            <button onClick={() => {
                updateFilms([])
                updateFetchArgs({
                    page: 1,
                    adult: adult,
                    sortedBy: sortedBy,
                    order: order,
                    genre: genre,
                    year: year,
                })
            }}>
                Apply
            </button>
        </div>
        <TitlesGrid
            title="Discover"
            films={films}
            //TODO: Need to change [price]
            onCart={item => { addItemToCart(item, price.FullHD, 1) }}
            onInfo={id => { }}
            onPlay={id => { }}
        />
        <div className="center-child">
            <SeeMoreBtn onClick={() => updateFetchArgs(old => {
                return {
                    ...old,
                    page: old.page + 1,
                }
            })} isLoading={data.isLoading} />
        </div>
        <ToTopBtn />
        <PageIndicator page={fetchArgs.page} />
    </div>
}

export default Discover