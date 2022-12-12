import React from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import SharedLayout from './ui/Layout/SharedLayout';
import {QueryClient, QueryClientProvider} from 'react-query';
import config from './data/datasource/config';

// Lazy import
// #Region
const HomeScreen = React.lazy(() => import('./ui/Home/HomeScreen'))
const Discover = React.lazy(() => import('./ui/Discover/Discover'))
const Search = React.lazy(() => import("./ui/Search/Search"))
const About = React.lazy(() => import('./ui/About/About'))
const Auth = React.lazy(() => import('./ui/Auth/Auth'))
const CheckOut = React.lazy(() => import('./ui/CheckOut/CheckOut'))
const Contact = React.lazy(() => import('./ui/Contact/Contact'))
const FAQ = React.lazy(() => import('./ui/FAQ/FAQ'))
const Forum = React.lazy(() => import('./ui/Community/Forum'))
const Detail = React.lazy(() => import('./ui/Details/Detail'))
const BillView = React.lazy(() => import('./ui/CheckOut/BillView'))
const NotFound = React.lazy(() => import('./ui/Layout/NotFound'))
// #endRegion

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
                        <HomeScreen/>
                    }/>

                    <Route path='discover' element={
                        <Discover/>
                    }/>
                    <Route path='detail/:movieId' element={
                        <Detail/>
                    }/>
                    <Route path='search' element={
                        <Search/>
                    }/>
                    <Route path='auth' element={
                        <Auth/>
                    }/>
                    <Route path='about' element={
                        <About/>
                    }/>
                    <Route path='checkout' element={
                        <CheckOut/>
                    }/>
                    <Route path='bill/:billId' element={
                        <BillView/>
                    }/>
                    <Route path='contact' element={
                        <Contact/>
                    }/>
                    <Route path='FAQ' element={
                        <FAQ/>
                    }/>
                    <Route path='forum' element={
                        <Forum/>
                    }/>
                    <Route path='*' element={
                        <NotFound/>
                    }></Route>
                </Route>
            </Routes>
        </QueryClientProvider>
    )
}

export default App
