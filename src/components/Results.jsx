import React from 'react'
import Pet from './Pet';

const Results = ({pets}) => {
    return (
        <div className="search">
            {!pets.length || !animal.length ? (
                <h1>No Pets Found</h1>
            ) : (
                pets.map((pet) => {
                    return (
                        <Pet
                            key={pet.id}
                            animal={pet.animal}
                            name={pet.name}
                            breed={pet.breed}
                        />
                    );
                })
            )}
        </div>
    )
}

export default Results
