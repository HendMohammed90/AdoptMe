import React from 'react';
import SearchParams from './pages/SearchParams';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Details from './pages/Details';
import  NotFound from './pages/NotFound';
import './App.css'


// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // 1 minute
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      cacheTime: Infinity,
      },
      },
})


const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
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
    <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default App;