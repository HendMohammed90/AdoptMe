import React from 'react';
import SearchParams from './pages/SearchParams';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Details from './pages/Details';
import  NotFound from './pages/NotFound';
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
    <header>
      <Link to="/" className='logo react'>Adopt Me!</Link>
    </header>
      <Routes>
        <Route path="/details/:id" element={<Details/>}/>
        <Route path='/' element={<SearchParams />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;