import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function Details() {
  const {id} = useParams();
  const  navigate = useNavigate();
  return (
    <div className='details'>
      <h3>Pet id :{id}  </h3>
      <button onClick={()=>{navigate("/")}}>Back</button>
    </div>
  )
}

export default Details
