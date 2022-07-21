import React from 'react'

const Card = ({id , name , image , type}) => {
  return (
    <div className='pokemon-container'>
      <div>
        <small>#0{id}</small>
      </div>
      
      <img src={image} alt={name} />

      <div className='detail'>
        <h3>{name}</h3>
        <small>{type}</small>
      </div>

    </div>
  )
}

export default Card