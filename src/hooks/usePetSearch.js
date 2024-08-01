import { useQuery } from '@tanstack/react-query';


const fetchPetsList = async ({ queryKey }) => {
    const [, {animal ,location, breed}] = queryKey;

    const res = await fetch(
        `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    return res.json();
};

const usePetSearch = (animal , location , breed) => {
    return  useQuery({

        queryKey: ['pets', animal , location, breed],

        queryFn: fetchPetsList,

    });
};

export default usePetSearch;