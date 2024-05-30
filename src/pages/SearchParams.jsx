import { useState, useEffect } from 'react';
import useBreedList from '../hooks/useBreedList';
import Results from '../components/Results';
const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];
// const LOCATIONS = ['Seattle', 'Minneapolis', 'Denver' , 'Carol Stream', 'Bridgeport', 'Charlotte' ,'Springfield', 'Tucson']
import usePetSearch from "../hooks/usePetSearch"

const SearchParams = () => {

  const [searchParams , setSearchParams] = useState({
    location : '',
    animal : '',
    breed  :''
  })

  const breedsQuery = useBreedList(searchParams.animal);

  const breeds = breedsQuery?.data?.breeds ?? []

  const PetsQuery = usePetSearch(searchParams);

  // Access pets data only once after data is loaded
  const pets = PetsQuery.isLoading || PetsQuery.isError ? [] : PetsQuery?.data?.pets;
  const Pets = PetsQuery?.data?.pets ?? []

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const animal = formData.get('animal');
          const location = formData.get('location');
          const breed = formData.get('breed');
          setSearchParams({ animal, location, breed });
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            placeholder="Location"
            name='location'
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select id="animal" 
          onChange={(e)=>{
            setSearchParams(
              {
                ...searchParams,
                animal: e.target.value,
                breed: ''
              }
            )
          }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            name='breed'
            id="breed"
            // onChange={handleBreedChange}
            onChange={(e)=>{
              setSearchParams(
                {
                  ...searchParams,
                  breed: e.target.value
                }
              )
            }}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button type='submit'>submit</button>
      </form>
      <Results pets={pets}/>
    </div>
  );
};

export default SearchParams;