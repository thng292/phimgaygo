import React, { useEffect } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import SharedLayout from './ui/Layout/SharedLayout';
import convertToWinSize from "./Utils/ConvertToWinSize";
import FilmDiscover from './data/model/FilmDiscover';
import { QueryClient, QueryClientProvider } from 'react-query';
import config from './data/datasource/config';

const HomeScreen = React.lazy(() => import('./ui/Home/HomeScreen'))
const About = React.lazy(() => import('./ui/About/About'))
const Auth = React.lazy(() => import('./ui/Auth/Auth'))
const CheckOut = React.lazy(() => import('./ui/CheckOut/CheckOut'))
const Contact = React.lazy(() => import('./ui/Contact/Contact'))
const FAQ = React.lazy(() => import('./ui/FAQ/FAQ'))

//let filmRepo = new FilmRepo()
// function DDdebug() {
//     let data = getTrending()
//     console.log(data)
//     if (data.isSuccess) {
//         console.log("Success", data.data)
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
                <Route path='/' element={<SharedLayout />}>
                    <Route index element={
                        <React.Suspense fallback={<>loading</>}>
                            <HomeScreen />
                        </React.Suspense>
                    }></Route>
                    <Route path='Auth' element={
                        <React.Suspense fallback={<>Loading</>}>
                            <Auth />
                        </React.Suspense>
                    }></Route>
                    <Route path='About' element={
                        <React.Suspense fallback={<>Loading</>}>
                            <About />
                        </React.Suspense>
                    }></Route>
                    <Route path='CheckOut' element={
                        <React.Suspense fallback={<>Loading</>}>
                            <CheckOut />
                        </React.Suspense>
                    }></Route>
                    <Route path='Contact' element={
                        <React.Suspense fallback={<>Loading</>}>
                            <Contact />
                        </React.Suspense>
                    }></Route>
                    <Route path='FAQ' element={
                        <React.Suspense fallback={<>Loading</>}>
                            <FAQ />
                        </React.Suspense>
                    }></Route>
                </Route>
            </Routes>
        </QueryClientProvider>
    )
}

export default App
