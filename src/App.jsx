import React, { useState } from 'react';
import SearchParams from './pages/SearchParams';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Details from './pages/Details';
import NotFound from './pages/NotFound';
import './App.css'
import AdoptedPetContext from './contexts/AdoptedPetContext'


// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: (1000 * 60 * 60),
      cacheTime: (1000 * 60 * 60),
    },
  },
});


const App = () => {

  const adoptedPet = useState([]);
  console.log(`adoptedPet is ${JSON.stringify(adoptedPet)}`)

  return (
    <BrowserRouter>
      <div id="modal"></div>
      <AdoptedPetContext.Provider value={adoptedPet}>
        <QueryClientProvider client={queryClient}>
          <header>
            <Link to="/" className='logo react'>Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path='/' element={<SearchParams />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </QueryClientProvider>
      </AdoptedPetContext.Provider>
    </BrowserRouter>
  );
};

export default App;