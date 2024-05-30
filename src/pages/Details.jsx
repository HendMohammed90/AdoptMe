import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usePet from '../hooks/usePet';
import Loader from '../components/Loader';
import Carousel from "../components/Carousel"


function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

// use our usePet Hook
  const petData = usePet(id);


  // Access pet data only once after data is loaded
  const pet = petData.isLoading || petData.isError ? null : petData.data;

  // Set image directly based on data availability
  const imageToUse = petData.data?.images?.[0] || 'http://pets-images.dev-apis.com/pets/none.jpg';




  if (petData.isLoading) {
    return (
      <div>
        Loading... <Loader />
      </div>
    );
  }

  if (petData.isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="details">
      <Carousel images={pet.images}/>
      {pet && (
        <div value={pet} key={pet.id}> {/* Use pet.id for unique key */}
          {/* <img src={imageToUse} alt={pet.name} className="image-container" /> */}
          <h3>
            {pet.name} - {pet.animal} - {pet.breed} <br />
            {pet.city}, {pet.state}
          </h3>
          <p>{pet.description}</p>
          <button onClick={() => navigate('/')}>Adopt {pet.name} </button>
          <br />
        </div>
      )}
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
}

export default Details;
