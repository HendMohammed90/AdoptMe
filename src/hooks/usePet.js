import { useQuery } from '@tanstack/react-query';

const usePet = (petId) => {
    
    const fetchPet = async () => {
        // Wrap the fetch in try-catch to handle potential errors
        try {
            const res = await fetch(
                `http://pets-v2.dev-apis.com/pets?id=${petId}`
            ).then((res) => res.json());
            // Check if the response contains data
            if (res && res.pets && res.pets.length > 0) {
                const pet = res.pets[0];
                // setPetImage(pet.images[0]);
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

    const petData = useQuery({
        queryKey: ['pets', petId],
        queryFn: fetchPet, // Directly pass the fetchPet function
        enabled: !!petId, // Only fetch if the id is provided
    });

    return petData

}

export default usePet;