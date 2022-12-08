import React from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import SharedLayout from './ui/Layout/SharedLayout';
import {QueryClient, QueryClientProvider} from 'react-query';
import config from './data/datasource/config';
import NotFound from './ui/Layout/NotFound';
import BillView from "./ui/CheckOut/BillView";
import LoadingSpinner from "./ui/common/LoadingSpinner";

// Lazy import
const HomeScreen = React.lazy(() => import('./ui/Home/HomeScreen'))
const Discover = React.lazy(() => import('./ui/Discover/Discover'))
const Search = React.lazy(() => import("./ui/Search/Search"))
const About = React.lazy(() => import('./ui/About/About'))
const Auth = React.lazy(() => import('./ui/Auth/Auth'))
const CheckOut = React.lazy(() => import('./ui/CheckOut/CheckOut'))
const Contact = React.lazy(() => import('./ui/Contact/Contact'))
const FAQ = React.lazy(() => import('./ui/FAQ/FAQ'))
const Forum = React.lazy(() => import('./ui/Community/Forum'))
const Detail = React.lazy(()=>import('./ui/Details/Detail'))
// Lazy import

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

function App() {

    return (

        <QueryClientProvider client={queryClient}>
            <Routes>
                {/* <Route path='/debug' element={<DDdebug />} /> */}
                <Route path='/' element={<SharedLayout/>}>

                    <Route index element={
                        <React.Suspense fallback={<LoadingSpinner />}>
                            <HomeScreen/>
                        </React.Suspense>
                    }/>

                    <Route path='discover' element={
                        <React.Suspense fallback={<LoadingSpinner />}>
                            <Discover/>
                        </React.Suspense>
                    }/>

                    <Route path='detail/:movieId' element={
                        <React.Suspense>
                            <Detail />
                        </React.Suspense>
                    }/>

                    <Route path='search' element={
                        <React.Suspense fallback={<LoadingSpinner />}>
                            <Search />
                        </React.Suspense>
                    }/>

                    <Route path='auth' element={
                        <React.Suspense fallback={<LoadingSpinner />}>
                            <Auth/>
                        </React.Suspense>
                    }/>

                    <Route path='about' element={
                        <React.Suspense fallback={<LoadingSpinner />}>
                            <About/>
                        </React.Suspense>
                    }/>

                    <Route path='checkout' element={
                        <React.Suspense fallback={<LoadingSpinner />}>
                            <CheckOut/>
                        </React.Suspense>
                    }/>

                    <Route path='bill/:billId' element={
                        <React.Suspense>
                            <BillView />
                        </React.Suspense>
                    } />

                    <Route path='contact' element={
                        <React.Suspense fallback={<LoadingSpinner />}>
                            <Contact/>
                        </React.Suspense>
                    }/>

                    <Route path='FAQ' element={
                        <React.Suspense fallback={<LoadingSpinner />}>
                            <FAQ/>
                        </React.Suspense>
                    }/>

                    <Route path='forum' element={
                        <React.Suspense fallback={<LoadingSpinner />}>
                            <Forum/>
                        </React.Suspense>
                    }/>

                    <Route path='*' element={<NotFound/>}></Route>
                </Route>
            </Routes>
        </QueryClientProvider>
    )
}

export default App
