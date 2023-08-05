import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ErrorPage from './components/ErrorPage';
import FavoritesPage from './components/FavoriteRecipe';



function App() {
  return (
    <>
    <CustomNavbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/favorites" element={<FavoritesPage/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App