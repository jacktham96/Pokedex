import { useEffect, useState } from 'react'
import './index.css'
import Card from './components/Card'

function App() {

  const [pokemonData , setPokemonData] = useState([])
  const [nexturl , setNexturl] = useState('')
  const [prevurl , setPrevurl] = useState('')
  const [loading , setLoading] = useState(true)

  const getAllPokemon = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const data = await response.json()

    console.log(data);
    setNexturl(data.next)
    setPrevurl(data.previous)
    setLoading(false)


    function createPokemonObject (result) {
      result.forEach(async (pokemon) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const objectData = await response.json()
        setPokemonData(prevState => [...prevState, objectData])
      })
    }
    createPokemonObject(data.results)
  }


  useEffect(() => {
    getAllPokemon()
    setLoading(false)
  }, [])


  return (
    <div className='pokemon-container'>
      {pokemonData.map((pokemon,index) => 
        <Card 
        key={index} 
        id={pokemon.id}
        name={pokemon.name} 
        image={pokemon.sprites.front_default} 
        type={pokemon.types[0].type.name} 
        />
      )}
    </div>
  )
}

export default App
