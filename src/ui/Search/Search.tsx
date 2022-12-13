import {FC, useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import PageIndicator from "../common/PageIndicator";
import SeeMoreBtn from "../common/SeeMoreBtn";
import ContextProps from "../Layout/ContextProps";
import getSearch from "../../data/DAO/Search/Search";
import TitlesGrid from "../common/TitlesGrid";
import FilmOverview from "../../data/model/Film/FilmOverview";

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

const Search: FC<{}> = () => {
    const [adult, setAdult] = useState(false);
    const [year, setYear] = useState("");
    const [query, setQuery] = useState("")
    const [fetchArgs, updateFetchArgs] = useState({
        query,
        enable: false,
        page: 1,
        adult: false,
        year,
    });
    const data = getSearch(
        fetchArgs.query,
        fetchArgs.enable,
        fetchArgs.year !== "" ? Number(fetchArgs.year) : undefined,
        fetchArgs.adult,
        fetchArgs.page,
    );
    const {navController, addItemToCart} = useOutletContext<ContextProps>();
    const [films, updateFilms] = useState<FilmOverview[]>([])
    console.log(films)
    useEffect(() => {
        if (data.data === undefined) return
        if (films.length && data.data.results[data.data.results.length - 1].id === films[films.length - 1].id) return;
        updateFilms(old => {
            return [...old, ...(data.data?.results ?? [])]
        })
    }, [data.data])
    const handleArgsChange = () =>{
        updateFetchArgs({
            page: 1,
            enable: true,
            adult: adult,
            year: year,
            query: query,
        });
        updateFilms([])
    }
    return (
        <>
            <h1
                style={{
                    position: 'fixed',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    transition: '.2 ease-in-out',
                    opacity: (data.isLoading && fetchArgs.enable) ? '100%' : '0%',
                    display: (data.isLoading && fetchArgs.enable) ? 'block' : 'none'
                }}
            >Loading...</h1>
            <div
                style={{
                    width: '80vw',
                    maxWidth: "1400px",
                    transition: '.2 ease-in-out',
                    opacity: data.isLoading ? '0%' : '100%',
                    visibility: data.isLoading ? 'hidden' : 'initial'
                }}
            >

                <div className="flex flex-col p-3 w-full">
                    <div
                        className='flex flex-row p-3 items-center h-16'
                    >
                        <div
                            className='flex flex-row p-3 cursor-pointer'
                            onClick={() => {
                                setAdult((old) => !old);
                            }}
                        >
                            <p className={'p-3'}>Contain Adult</p>
                            <input
                                className='p-3'
                                type='checkbox'
                                name='adult'
                                id='0'
                                checked={adult}
                            />
                        </div>
                        <p className={'p-3'}>Year</p>
                        <select
                            className={'p-1 rounded-3xl border-2 border-main-400'}
                            name='year'
                            id='3'
                            value={year}
                            onChange={(e) => setYear(e.currentTarget.value)}
                        >
                            {yearOptions()}
                        </select>
                    </div>
                    <div className="flex flex-row">
                        <input
                            type="text" name="query" id="0"
                            placeholder={'Search for a movie'}
                            value={query}
                            onChange={(e) => {
                                setQuery(e.currentTarget.value)
                            }}
                            className='w-full rounded-3xl px-5 border-2 border-main-400 focus:border-main-1000 outline-0'
                            onKeyDown={key => {
                                if (key.key === 'Enter') {
                                    handleArgsChange()
                                }
                            }}
                        />
                        <button
                            className='tbutton'
                            onClick={handleArgsChange}
                        >
                            Search
                        </button>
                    </div>
                </div>
                {films.length ? <TitlesGrid
                    films={films} title={'Results'}
                    onInfo={id => {
                        navController(`/detail/${id}`)
                    }}
                    onCart={(id) => addItemToCart(id, 0, 1)}
                    onShare={id => {
                        navController(`/detail/${id}`)
                    }}
                /> : ''}
                <div
                    className='flex justify-center items-center'
                    style={{
                        display: (fetchArgs.page === data?.data?.total_pages) ? 'none' : 'block'
                    }}
                >
                    {data.isSuccess && <SeeMoreBtn
                        onClick={() =>
                            updateFetchArgs((old) => {
                                return {
                                    ...old,
                                    page: old.page + 1,
                                };
                            })
                        }
                        isLoading={data.isLoading}
                    />}
                </div>
                <PageIndicator page={fetchArgs.page}/>
            </div>
        </>
    );
};

export default Search