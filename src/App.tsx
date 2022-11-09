import React from 'react'
import './App.css'
import FilmDatasource from './data/datasource/FilmDatasource'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FilmRepo from './data/repo/FilmRepo';
import getAllFilms from './useCases/getAllFIlms';
import HomeController from './ui/Home/HomeController';

const HomeScreen = React.lazy(() => import('./ui/Home/HomeScreen'))

let filmDatasource = new FilmDatasource()
let filmRepo = new FilmRepo(filmDatasource)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <React.Suspense fallback={<>loading</>}>
            <HomeScreen homeController={new HomeController(new getAllFilms(filmRepo))} />
          </React.Suspense> 
        }>
          <Route path=''></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
