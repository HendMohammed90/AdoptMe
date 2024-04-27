const Pet = (props) => {

    return (
      <div>
        <h1 style={{color:'#ff4f61'}}>{props.name}</h1>
        <p>It's a {props.animal} and type of breed: {props.breed}</p>
      </div>
    );
  };
  
  export default Pet;