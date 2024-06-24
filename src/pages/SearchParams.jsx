import { useState, useContext } from 'react';
import useBreedList from '../hooks/useBreedList';
import Results from '../components/Results';
const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];
// const LOCATIONS = ['Seattle', 'Minneapolis', 'Denver' , 'Carol Stream', 'Bridgeport', 'Charlotte' ,'Springfield', 'Tucson']
import usePetSearch from "../hooks/usePetSearch"
import { ErrorBoundary } from "react-error-boundary";
import AdoptedPetContext from '../contexts/AdoptedPetContext';


const SearchParams = () => {

  const [searchParams, setSearchParams] = useState({
    location: '',
    animal: '',
    breed: ''
  })


  const breedsQuery = useBreedList(searchParams.animal);

  const breeds = breedsQuery?.data?.breeds ?? []


  const PetsQuery = usePetSearch(searchParams);
  // Access pets data only once after data is loaded
  // const pets = PetsQuery.isLoading || PetsQuery.isError ? [] : PetsQuery?.data?.pets;
  const pets = PetsQuery?.data?.pets ?? []

  const [adoptedPet,]   = useContext(AdoptedPetContext)

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formDate = new FormData(e.target);
          const animal = formDate.get('animal');
          const location = formDate.get('location');
          const breed = formDate.get('breed');
          setSearchParams({ animal, location, breed });
        }}
      >
        {adoptedPet.length > 0 && (
          adoptedPet.map(adoptedPet => {
            return ( <div className="image-container" style={{margin: "0 10px"}} key={adoptedPet.id}>
              <img style={{width:"100px", minHeight: "100px"}} src={adoptedPet.images[0]} alt={adoptedPet.name} />
            </div>)
          })
        )}
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
            onChange={(e) => {
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
            onChange={(e) => {
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
      <ErrorBoundary fallback={<div>Something went wrong 😵‍💫🤷🏻‍♀️</div>}>
        <Results pets={pets} />
      </ErrorBoundary>
    </div>
  );
};

export default SearchParams;