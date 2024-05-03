import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchParams from './pages/SearchParams';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
      <h1>Adopt Me!</h1>
      <Routes>
        <Route path='/' element={<SearchParams />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;