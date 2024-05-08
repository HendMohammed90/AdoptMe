import React from 'react';
import SearchParams from './pages/SearchParams';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './pages/Details';
import  NotFound from './pages/NotFound';
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <h1 className='logo'>Adopt Me!</h1>
      <Routes>
        <Route path="/details/:id" element={<Details/>}/>
        <Route path='/' element={<SearchParams />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;