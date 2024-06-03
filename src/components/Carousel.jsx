import React, { useState } from 'react'

function Carousel({images}) {
    const [activeImage, setActiveImage] = useState(0)

    const handelImageClick = (e) =>{
        setActiveImage(+e.target.dataset.index)

    }
  return (
    <div className='carousel'>
      <img src={images[activeImage]} alt='imagePic'/>
      <div className='carousel-smaller'>
        {images.map((photo,i)=>{
            return <img key={i} src={photo} alt='imagePic' className={i === activeImage ? 'active': '' } data-index={i} onClick={(e)=> handelImageClick(e)}/>
        })}
      </div>
    </div>
  )
}

Carousel.defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"]
}

export default Carousel
