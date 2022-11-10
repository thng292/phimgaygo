import React from 'react'
import './App.css'
import FilmDatasource from './data/datasource/FilmDatasource'
import { Route, Routes } from "react-router-dom";
import FilmRepo from './data/repo/FilmRepo';
import getAllFilms from './useCases/getAllFilms';
import HomeController from './ui/Home/HomeController';
import SharedLayout from './ui/Layout/SharedLayout';

const HomeScreen = React.lazy(() => import('./ui/Home/HomeScreen'))
const About = React.lazy(() => import('./ui/About/About'))
const Auth = React.lazy(() => import('./ui/Auth/Auth'))
const CheckOut = React.lazy(() => import('./ui/CheckOut/CheckOut'))
const Contact = React.lazy(() => import('./ui/Contact/Contact'))
const FAQ = React.lazy(() => import('./ui/FAQ/FAQ'))

let filmDatasource = new FilmDatasource()
let filmRepo = new FilmRepo(filmDatasource)

function App() {
  return (
    <Routes>
      <Route path='/' element={ <SharedLayout /> }>
        <Route index element={
          <React.Suspense fallback={<>loading</>}>
            <HomeScreen homeController={new HomeController(new getAllFilms(filmRepo))} />
          </React.Suspense>
        }></Route>
        <Route path='About' element={
          <React.Suspense fallback={<>Loading</>}>
            <About />
          </React.Suspense>
        }></Route>
        <Route path='Auth' element={
          <React.Suspense fallback={<>Loading</>}>
            <Auth />
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
  )
}

export default App
