import {FC, useState} from "react";
import {useOutletContext} from "react-router-dom";
import PageIndicator from "../common/PageIndicator";
import SeeMoreBtn from "../common/SeeMoreBtn";
import ContextProps from "../Layout/ContextProps";
import getSearch from "../../data/DAO/Search/Search";
import TitlesGrid from "../common/TitlesGrid";

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
                    maxWidth: "1400px",
                    transition: '.2 ease-in-out',
                    opacity: data.isLoading ? '0%' : '100%',
                    visibility: data.isLoading ? 'hidden' : 'initial'
                }}
            >

                <div className="column p10" style={{
                    width: '100%'
                }}>
                    <div
                        className='row p10'
                        style={{
                            alignItems: "center",
                            height: "64px",
                        }}
                    >
                        <div
                            className='row p10'
                            onClick={() => {
                                //updateFilms([])
                                setAdult((old) => !old);
                            }}
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <p style={{padding: "10px"}}>Contain Adult</p>
                            <input
                                className='p10'
                                type='checkbox'
                                name='adult'
                                id='0'
                                checked={adult}
                            />
                        </div>
                        <p>Year</p>
                        <select
                            name='year'
                            id='3'
                            value={year}
                            onChange={(e) => setYear(e.currentTarget.value)}
                        >
                            {yearOptions()}
                        </select>
                    </div>
                    <div className="row">
                        <input
                            type="text" name="query" id="0"
                            placeholder={'Search for a movie'}
                            value={query}
                            onChange={(e) => {
                                setQuery(e.currentTarget.value)
                            }}
                            className='search-input'
                        />
                        <button
                            className='tbutton'
                            onClick={() => {
                                updateFetchArgs({
                                    page: 1,
                                    enable: true,
                                    adult: adult,
                                    year: year,
                                    query: query,
                                });
                            }}
                        >
                            Search
                        </button>
                    </div>
                </div>
                {fetchArgs.enable ? <TitlesGrid
                    films={data.data?.results} title={'Results'}
                    onInfo={id => {
                        navController(`/detail/${id}`)
                    }}
                    onCart={(id) => addItemToCart(id)}
                    onPlay={id => {
                        navController(`/detail/${id}`)
                    }}
                /> : ''}
                <div
                    className='center-child'
                    style={{
                        display: (fetchArgs.page === data?.data?.total_pages) ? 'none' : 'block'
                    }}
                >
                    {data.isSuccess ? <SeeMoreBtn
                        onClick={() =>
                            updateFetchArgs((old) => {
                                return {
                                    ...old,
                                    page: old.page + 1,
                                };
                            })
                        }
                        isLoading={data.isLoading}
                    /> : ''}
                </div>
                <PageIndicator page={fetchArgs.page}/>
            </div>
        </>
    );
};

export default Search