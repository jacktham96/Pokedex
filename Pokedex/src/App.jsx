import { useEffect, useState } from 'react'
import './index.css'
import Card from './components/Card'

function App() {

  let offset = 0

  const [pokemonData , setPokemonData] = useState([])
  const [loadMore , setLoadMore] = useState(`https://pokeapi.co/api/v2/pokemon/?limit=100&offset=${offset}`)

  const [loading , setLoading] = useState(true)


  const getAllPokemon = async () => {
    const response = await fetch(loadMore)
    const data = await response.json()

    setLoadMore(data.next)
    offset += 50

    function createPokemonObject (result) {
      result.forEach(async (pokemon) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const objectData = await response.json()
        setPokemonData(prevState => [...prevState, objectData])
        pokemonData.sort((a, b) => a.id > b.id ? 1 : -1)
      })
    }
    createPokemonObject(data.results)
  }


  useEffect(() => {
    getAllPokemon();
    setLoading(false);
  }, [])


  return (
    <div className='bg-pokeBG'>
      <div className='pokemon-container relative h-auto w-full max-w-5xl mx-auto grid grid-cols-4 gap-5'>
        {pokemonData.map((pokemon,index) => {
          return <Card 
          key={index} 
          id={pokemon.id}
          name={pokemon.name} 
          image={pokemon.sprites.front_default} 
          type={pokemon.types.map(type => {
            const typeStyle ='mt-4 px-2 py-1 mr-3.5 w-[70px] text-center float-left bg-blue rounded-md'
            return (
              <span className= {`${type.type.name} ${typeStyle}`}>
                <small className='capitalize'>{type.type.name}</small>
              </span>
            )
          })} 
          />
        })}

      </div>
      <span className='bg-grey text-white	my-5 py-6 flex justify-center text-center cursor-pointer w-full max-w-md mx-auto' onClick={()=> getAllPokemon()}>Load More</span>

    </div>
  )
}

export default App
