import {React ,useEffect , useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Audio } from 'react-loader-spinner'
import Loader from '../components/Loader';

function Details() {
  const {id} = useParams();
  const  navigate = useNavigate();
  const  [petData, setPetData] = useState([]);
  const [petImage, setPetImage ] = useState('http://pets-images.dev-apis.com/pets/none.jpg')
  const [isLoading , setIsLoading] = useState(true);
  const [error , setError] = useState(null)


  const fetchPetDetails = async () => {
    try {
      const res = await fetch(
        `http://pets-v2.dev-apis.com/pets?id=${id}`
      );
      const json = await res.json();
      // console.log(json.pets[0].images[0])
      setPetImage(json.pets[0].images[0])
      setPetData(json.pets);
      setIsLoading(false);
      setError( null);
    } catch (error) {
      // console.log(error.message);
      setError(error.message)
    }
  };

  useEffect(() => {
    fetchPetDetails();
  }, [id]); 

  return (
    <div className='details'>
      {/* {isLoading && <div>Data Is Loading....</div>} */}
      {isLoading && <Loader/>}
      {!isLoading && petData.map((petDetails) => (
        <div value={petDetails} key={petDetails.id}>
                <img src={petImage} alt={petDetails.name} className="image-container"/>
                <h3>{petDetails.name} - {petDetails.animal} - {petDetails.breed} <br/>{petDetails.city}, {petDetails.state} </h3>
                <p>{petDetails.description}</p>
                <button onClick={()=>{navigate("/")}}>Adopt {petDetails.name}</button>
                <br/>
              </div>
            ))}
      {error && <div>{error}</div>}
      <br/>
        <button onClick={()=>{navigate("/")}}>Back</button>
    </div>
  )
}

export default Details
