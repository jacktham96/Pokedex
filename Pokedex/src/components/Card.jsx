import React from 'react'

const Card = ({id , name , image , type}) => {
  return (
    <div className='pokemonInfo p-5 bg-slate-100 '>
      <div>
        <small>#0{id}</small>
      </div>
      
      <img src={image} alt={name} className='object-cover h-48 w-96' />

      <div className='pokeName'>
        <h5 className='capitalize text-4xl	'>{name}</h5>
      </div>

      <div className='type-container '>
        {type}
      </div>

    </div>
  )
}

export default Card