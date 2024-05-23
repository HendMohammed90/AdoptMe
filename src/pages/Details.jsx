import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader';

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [petImage, setPetImage] = useState('http://pets-images.dev-apis.com/pets/none.jpg');

  const fetchPet = async () => {
    // Wrap the fetch in try-catch to handle potential errors
    try {
      const res = await fetch(
        `http://pets-v2.dev-apis.com/pets?id=${id}`
      ).then((res) => res.json());
      // Check if the response contains data
      if (res && res.pets && res.pets.length > 0) {
        const pet = res.pets[0];
        setPetImage(pet.images[0]);
        // Return the pet data
        return pet;
      } else {
        // Handle case where no pet data is returned
        throw new Error('No pet data found');
      }
    } catch (error) {
      // Handle fetch errors
      console.error('Error fetching pet:', error);
      throw error;
    }
  };

  const { data: petDataQuery, isLoading, isError } = useQuery({
    queryKey: ['pets', id],
    queryFn: fetchPet, // Directly pass the fetchPet function
  });

  if (isLoading) {
    return (
      <div>
        Loading... <Loader />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className='details'>
      {!isLoading && petDataQuery && (
        <div value={petDataQuery} key={petDataQuery.id}>
          <img src={petImage} alt={petDataQuery.name} className='image-container' />
          <h3>
            {petDataQuery.name} - {petDataQuery.animal} - {petDataQuery.breed} <br />
            {petDataQuery.city}, {petDataQuery.state}
          </h3>
          <p>{petDataQuery.description}</p>
          <button onClick={() => navigate('/')}>Adopt {petDataQuery.name}</button>
          <br />
        </div>
      )}

      <br />
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
}

export default Details;
