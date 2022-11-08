import React from 'react'
import './App.css'
import HomeScreen from './ui/Home/HomeScreen'
import FilmProvider from './data/provider/FilmProvider'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeController from './ui/Home/HomeController';

let filmProvider = new FilmProvider()
let homeController = new HomeController(filmProvider)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <HomeScreen homeController={homeController} />
        }>
          <Route path=''></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
