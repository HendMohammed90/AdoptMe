import { useState, useEffect } from 'react';
import useBreedList from '../hooks/useBreedList';
import Results from '../components/Results';
const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];
// const LOCATIONS = ['Seattle', 'Minneapolis', 'Denver' , 'Carol Stream', 'Bridgeport', 'Charlotte' ,'Springfield', 'Tucson']

import Loader from '../components/Loader';

const SearchParams = () => {
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([]);

  const breedsQuery = useBreedList(animal);

  // Access pet data only once after data is loaded
  const breeds = breedsQuery?.data?.breeds ?? []

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleAnimalChange = (e) => {
    setAnimal(e.target.value);
    setBreed('');
  };

  const handleBreedChange = (e) => {
    setBreed(e.target.value);
  };

  const fetchPets = async () => {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  };

  useEffect(() => {
    fetchPets();
  }, []); 

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={handleLocationChange}
          />
        </label>
        {/* <label htmlFor="location">
          Location
          <select id="location" value={location} onChange={handleLocationChange}>
            <option />
            {LOCATIONS.map((location) => (
              <option value={location} key={location}>
                {location}
              </option>
            ))}
          </select>
        </label> */}
        <label htmlFor="animal">
          Animal
          <select id="animal" value={animal} onChange={handleAnimalChange}>
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
            id="breed"
            value={breed}
            onChange={handleBreedChange}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets}/>
    </div>
  );
};

export default SearchParams;