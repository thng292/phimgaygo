import React from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SharedLayout from './ui/SharedLayout/SharedLayout';
import {QueryClient, QueryClientProvider} from 'react-query';
import config from './data/Datasource/Config';
import Screens, {MediaType} from "./utils/Screen";
import {ReactQueryDevtools} from "react-query/devtools";

// #LazyImport
const Home = React.lazy(() => import('./ui/Home/Home'))

const MovieDetail = React.lazy(() => import('./ui/Details/MovieDetail'))
const TVShowDetail = React.lazy(() => import('./ui/Details/TVShowDetail'))

const About = React.lazy(() => import('./ui/About/About'))
const Auth = React.lazy(() => import('./ui/Auth/Auth'))
const Contact = React.lazy(() => import('./ui/Contact/Contact'))
const FAQ = React.lazy(() => import('./ui/FAQ/FAQ'))
const Forum = React.lazy(() => import('./ui/Community/Forum'))
const NotFound = React.lazy(() => import('./ui/SharedLayout/NotFound'))
// #endLazyImport

//let filmRepo = new FilmRepo()
// function DDdebug() {
//     let data = getTrending()
//     //console.log(data)
//     if (data.isSuccess) {
//         //console.log("Success", data.data)
//     }
//     return <>
//         {data.isLoading && <p>Loading Data</p>}
//         <h1>Debugging</h1>
//     </>
// }

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: config.timeShort,
            refetchOnMount: true,
            staleTime: config.timeShort,
        }
    }
})

//TODO: ADD nested route to separate TVShow shows and Movies

const router = createBrowserRouter([
    {
        path: '/',
        element: <SharedLayout/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            // {
            //     path: Screens.Search,
            //     element: <TVShowSearch/>
            // },
            // {
            //     path: MediaType.Movie + '/' + TVShowDiscover,
            //     element: TVShowDiscover/>
            // },
            // {
            //     path: MediaType.TVShow + '/' + TVShowDiscover,
            //     element: <TVShowDiscover/>
            // },
            {
                path: MediaType.Movie + '/' + Screens.Detail,
                element: <MovieDetail/>
            },
            {
                path: MediaType.TVShow + '/' + Screens.Detail,
                element: <TVShowDetail/>
            },
            {
                path: Screens.Auth,
                element: <Auth/>
            },
            {
                path: Screens.About,
                element: <About/>,
            },
            {
                path: Screens.FAQ,
                element: <FAQ/>,
            },
            {
                path: Screens.Contact,
                element: <Contact/>
            },
            {
                path: Screens.Forum,
                element: <Forum/>
            }
        ]
    }
])

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}

export default App