import { FC, useEffect, useMemo, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import ContextProps from "../SharedLayout/ContextProps";
import getTVDiscover from "../../data/DAO/Discovery/getTVDiscover";
import config, {
    Order,
    Orders,
    SortOption,
    SortOptions,
    SortedBy,
    media_type,
} from "../../data/Datasource/Config";
import KeyWord from "../../data/model/Movie/KeyWord";
import Genre from "../../data/model/Movie/Genre";
import getGenres from "../../data/DAO/Detail/getGenres";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Button,
    Chip,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    Switch,
    TextField,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import getKeywordSearch from "../../data/DAO/Search/KeywordSearch";
import DatasourceInstance from "../../data/Datasource/DatasourceInstance";
import TitlesGrid from "../common/Layout/TitlesGrid";
import MapGenreToID from "../../utils/MapGenreToID";
import Screens from "../../utils/Screen";
import SVG_Play from "../common/SVG/SVG_Play";
import SVG_Favorite from "../common/SVG/SVG_Favorite";
import IconAndLabelWrap from "../common/Component/IconAndLabelWrap";

type yearOptions = number | "All";
const currYear = new Date().getFullYear();

const yearOpts = [
    "All",
    ...[...Array(currYear - 1990 + 1).keys()].map((value) =>
        String(currYear - value)
    ),
];

let keywordLoadingFlag = true;
const currentMediaType: media_type = "tv";

const TVShowDiscover: FC = () => {
    const { navController } = useOutletContext<ContextProps>();
    const { search, pathname } = useLocation();
    const URLparams = useUrlParams(search);
    const [sort, setSort] = useState({
        option: URLparams.sortby,
        order: URLparams.order,
    } as SortedBy);
    const [genres, setGenres] = useState<Genre[]>([]);
    const genreData = getGenres("tv");
    useEffect(() => {
        if (genreData.data) {
            setGenres(
                URLparams.genres
                    .map((value) =>
                        genreData.data.genres.find(
                            (genre) => genre.id === value
                        )
                    )
                    .filter((value): value is Genre => !!value)
            );
        }
    }, [genreData.data]);

    const [year, setYear] = useState<yearOptions>(URLparams.year);

    const [keywords, setKeywords] = useState<KeyWord[]>([]);
    useEffect(() => {
        Promise.all(
            URLparams.keywords.map((value) =>
                DatasourceInstance.get(
                    `/keyword/${value}?api_key=${config.key}`
                )
            )
        ).then((values) => {
            setKeywords(values.map((value) => value.data as KeyWord));
            keywordLoadingFlag = false;
        });
    }, []);
    const [keywordField, setKeywordField] = useState("");
    const [keywordSearchInput, setKeywordSearchInput] = useState("");
    const keywordSearch = getKeywordSearch(keywordSearchInput);
    useEffect(() => {
        const tmp = setTimeout(() => {
            setKeywordSearchInput(keywordField);
        }, 500);
        return () => clearTimeout(tmp);
    }, [keywordField]);

    const TVShowData = getTVDiscover({
        page: URLparams.page,
        sortedBy: {
            option: URLparams.sortby,
            order: URLparams.order,
        } as SortedBy,
        first_air_date_year:
            URLparams.year === "All" ? undefined : URLparams.year,
        genres: URLparams.genres,
        keywords: URLparams.keywords,
    });
    return (
        <div className='mt-24'>
            <div className='mx-4 sm:mx-auto sm:max-w-3xl'>
                <Accordion disableGutters>
                    <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                        Sorting & Filter
                    </AccordionSummary>
                    <AccordionDetails
                        className='grid gap-4 mb-4'
                        sx={{
                            gridTemplateColumns: "max-content 1fr",
                            placeItems: "center start",
                        }}
                    >
                        <p>Sort by:</p>
                        <div>
                            <FormControl
                                sx={{
                                    mr: ".5rem",
                                }}
                            >
                                <InputLabel>Option</InputLabel>
                                <Select
                                    label='Sortby'
                                    autoWidth
                                    onChange={(e) =>
                                        setSort((old) => {
                                            return {
                                                ...old,
                                                option: e.target
                                                    .value as SortOption,
                                            };
                                        })
                                    }
                                    size='small'
                                    value={sort.option}
                                >
                                    {SortOptions.map((val) => (
                                        <MenuItem value={val}>{val}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel>Order</InputLabel>
                                <Select
                                    autoWidth
                                    label='Order'
                                    value={sort.order}
                                    size='small'
                                    onChange={(e) =>
                                        setSort((old) => {
                                            return {
                                                ...old,
                                                order: e.target.value as Order,
                                            };
                                        })
                                    }
                                >
                                    {Orders.map((val) => (
                                        <MenuItem value={val}>{val}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <p>Year:</p>
                        <Autocomplete
                            autoHighlight
                            autoComplete
                            size='small'
                            options={yearOpts}
                            inputValue={String(year)}
                            defaultValue={String(year)}
                            onInputChange={(e) =>
                                setYear(
                                    (e?.currentTarget?.textContent ?? "All") as
                                        | number
                                        | "All"
                                )
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Year'
                                    inputMode='numeric'
                                />
                            )}
                            sx={{
                                width: 120,
                            }}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters>
                    <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                        <div className='flex flex-wrap gap-2 items-center'>
                            <p>Genres:</p>
                            {genres.map((value) => (
                                <Chip
                                    variant='outlined'
                                    label={value.name}
                                    onDelete={() => {
                                        setGenres((old) => {
                                            const tmp = [...old];
                                            tmp.splice(
                                                tmp.findIndex(
                                                    (item) =>
                                                        item.id === value.id
                                                ),
                                                1
                                            );
                                            return tmp;
                                        });
                                    }}
                                />
                            ))}
                            {genreData.isLoading && (
                                <CircularProgress
                                    color='inherit'
                                    size={20}
                                />
                            )}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: ".5rem",
                        }}
                    >
                        {genreData.data
                            ? genreData.data.genres.map((value) => {
                                  let choosed = genres.find(
                                      (val) => val.id === value.id
                                  );
                                  return (
                                      <Chip
                                          label={value.name}
                                          onClick={() => {
                                              if (choosed)
                                                  setGenres((old) => {
                                                      const tmp = [...old];
                                                      tmp.splice(
                                                          tmp.findIndex(
                                                              (item) =>
                                                                  item.id ===
                                                                  value.id
                                                          ),
                                                          1
                                                      );
                                                      return tmp;
                                                  });
                                              else
                                                  setGenres((old) => [
                                                      ...old,
                                                      value,
                                                  ]);
                                          }}
                                          variant={
                                              choosed ? "filled" : "outlined"
                                          }
                                          icon={
                                              choosed ? (
                                                  <CheckRoundedIcon />
                                              ) : undefined
                                          }
                                      />
                                  );
                              })
                            : "Loading..."}
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    disableGutters
                    TransitionProps={{ unmountOnExit: true }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                        <div className='flex flex-wrap gap-2 items-center'>
                            <p>Keywords:</p>
                            {keywords.map((value) => (
                                <Chip
                                    label={value.name}
                                    onDelete={() => {
                                        setKeywords((old) => {
                                            const tmp = [...old];
                                            tmp.splice(
                                                tmp.findIndex(
                                                    (item) =>
                                                        value.id === item.id
                                                ),
                                                1
                                            );
                                            return tmp;
                                        });
                                    }}
                                    variant='outlined'
                                />
                            ))}
                            {keywordLoadingFlag && (
                                <CircularProgress
                                    color='inherit'
                                    size={20}
                                />
                            )}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Autocomplete
                            multiple
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Keywords'
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {keywordSearch.isLoading ? (
                                                    <CircularProgress
                                                        color='inherit'
                                                        size={20}
                                                    />
                                                ) : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                            ChipProps={{
                                variant: "outlined",
                            }}
                            getOptionLabel={(value) => value.name}
                            options={keywordSearch.data?.results ?? []}
                            loading={keywordSearch.isLoading}
                            defaultValue={keywords}
                            onChange={(_, value) => setKeywords(value)}
                            onInputChange={(_, value) => setKeywordField(value)}
                            filterOptions={(x) => x}
                        />
                    </AccordionDetails>
                </Accordion>
                <div className='flex m-2 justify-center'>
                    <Button
                        variant='contained'
                        onClick={() =>
                            navController(
                                URLSearchconstruct(
                                    {
                                        page: URLparams.page,
                                        sortby: sort.option,
                                        order: sort.order,
                                        genres: genres.map((value) => value.id),
                                        keywords: keywords.map(
                                            (value) => value.id
                                        ),
                                        year: year,
                                    },
                                    pathname
                                )
                            )
                        }
                    >
                        Apply
                    </Button>
                </div>
            </div>
            {TVShowData.data ? (
                <TitlesGrid
                    className='px-4'
                    titles={TVShowData.data.results.map((value) => value.name)}
                    media_type={[currentMediaType]}
                    ids={TVShowData.data.results.map((value) => value.id)}
                    name={"Popular TV show"}
                    subtitles={TVShowData.data.results.map(
                        (value) => value.original_name
                    )}
                    genres={TVShowData.data.results.map((value) =>
                        MapGenreToID(
                            genreData.data?.genres ?? [],
                            value.genre_ids
                        )
                    )}
                    dates={TVShowData.data.results.map(
                        (value) => value.first_air_date
                    )}
                    vote_avgs={TVShowData.data.results.map((value) =>
                        value.vote_average.toFixed(1)
                    )}
                    imagesFullURL={
                        window.innerWidth > 640
                            ? TVShowData.data.results.map(
                                  (value) =>
                                      config.backDropUrlSmall +
                                      value.backdrop_path
                              )
                            : TVShowData.data.results.map(
                                  (value) =>
                                      config.posterUrl + value.poster_path
                              )
                    }
                    tags={TVShowData.data.results.map((value) =>
                        value.vote_average.toFixed(1)
                    )}
                    btn1Action={(id) =>
                        navController(
                            `${currentMediaType}${Screens.DetailStatic}/${id}`
                        )
                    }
                    btn1Icon={
                        <IconAndLabelWrap
                            icon={<SVG_Play fill='black' />}
                            label='Watch'
                        />
                    }
                    btn2Action={() => {
                        //TODO Favorite
                        throw "Function not implemented";
                    }}
                    btn2Icon={<SVG_Favorite fill='black' />}
                    onClickAction={(id) =>
                        //TODO History
                        navController(
                            `${currentMediaType}${Screens.DetailStatic}/${id}`
                        )
                    }
                />
            ) : (
                <TitlesGrid
                    placeholder
                    name='Popular TV Show'
                />
            )}
            <div className='flex justify-center my-4'>
                <Pagination
                    count={TVShowData.data?.total_pages}
                    page={URLparams.page}
                    onChange={(_, page) =>
                        navController(
                            URLSearchconstruct(
                                { ...URLparams, page: page },
                                pathname
                            ),
                            { replace: true }
                        )
                    }
                />
            </div>
        </div>
    );
};

export default TVShowDiscover;

interface DiscoverParams {
    page: number;
    sortby: SortOption;
    order: Order;
    genres: number[];
    keywords: number[];
    year: yearOptions;
}

function URLSearchconstruct(args: DiscoverParams, pathname: string) {
    return (
        `${pathname}?page=${args.page}&sortby=${args.sortby}&order=${
            args.order
        }&year=${Number(args.year) >= 1990 ? args.year : "All"}` +
        (args.genres.length ? `&genres=${args.genres.join(",")}` : "") +
        (args.keywords.length ? `&keywords=${args.keywords.join(",")}` : "")
    );
}

function useUrlParams(search: string) {
    const tmp = new URLSearchParams(search);
    return useMemo(() => {
        return {
            page: Number(tmp.get("page")) > 0 ? Number(tmp.get("page")) : 1,
            //@ts-ignore
            sortby: SortOptions.includes(tmp.get("sortby"))
                ? tmp.get("sortby")
                : "popularity",
            //@ts-ignore
            order: Orders.includes(tmp.get("order"))
                ? (tmp.get("order") as Order)
                : "desc",
            genres: (tmp.get("genres")?.split(",") ?? [])
                .map((value) => Number(value))
                .filter((value) => !isNaN(value)),
            keywords: (tmp.get("keywords")?.split(",") ?? [])
                .map((value) => Number(value))
                .filter((value) => !isNaN(value)),
            year:
                Number(tmp.get("year")) < 1990
                    ? "All"
                    : Number(tmp.get("year")),
        } as DiscoverParams;
    }, [search]);
}
