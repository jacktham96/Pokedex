import { useEffect, useState } from 'react'
import './index.css'
import Card from './components/Card'

function App() {

  const [pokemon , setPokemon] = useState([])
  const [nexturl , setNexturl] = useState('')
  const [prevurl , setPrevurl] = useState('')
  const [loading , setLoading] = useState(true)

  const getAllPokemon = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    const data = await response.json()

    setNexturl(data.next)
    setPrevurl(data.previous)
    setLoading(false)


    function createPokemonObject (result) {
      result.forEach(async (pokemon) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await response.json()
        setPokemon(prevState => [...prevState, data])
      })
    }

    createPokemonObject(data.results)
    await console.log(pokemon);

  }


  useEffect(() => {
    getAllPokemon()
  }, [])




  return (
    <div className='pokemon-container'>
      {pokemon.map((pokemon,index) => 
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
