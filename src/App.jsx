import React, { useState , lazy, Suspense } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './App.css'
import AdoptedPetContext from './contexts/AdoptedPetContext'
import Loader from './components/Loader';


// import SearchParams from './pages/SearchParams';
// import Details from './pages/Details';
// import NotFound from './pages/NotFound';

// make use of lazy loading to enhance performance 
const Details = lazy(() => import('./pages/Details'));
const SearchParams = lazy(()=> import('./pages/SearchParams'));
const NotFound = lazy(()=> import('./pages/NotFound'));



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

  return (
    <BrowserRouter>
      <div id="modal"></div>
      <AdoptedPetContext.Provider value={adoptedPet}>
        <QueryClientProvider client={queryClient}>
          {/* Show a spinner while app code is read more -> loading https://stackoverflow.com/a/63655226/6483379 */}
          <Suspense fallback={<div className="loader-container">
                <Loader />
              </div>}>
          <header>
            <Link to="/" className='logo react'>Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path='/' element={<SearchParams />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          </Suspense>
        </QueryClientProvider>
      </AdoptedPetContext.Provider>
    </BrowserRouter>
  );
};

export default App;