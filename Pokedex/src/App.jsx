import { useEffect, useState } from 'react'
import './index.css'
import Card from './components/Card'

function App() {

  const [pokemon , setPokemon] = useState([])
  const [nextUrl , setNextUrl] = useState('')
  const [prevUrl , setPrevUrl] = useState('')
  const [loading , setLoading] = useState(true)

  async function getPokemonData(url) {
      return new Promise((resolve, reject) => {
          fetch(url)
          .then(response => response.json())
          .then(data => {
            resolve(data)
          })
      })
    }
  
  useEffect(() => {
    async function fetchData() {
      const data = await getPokemonData('https://pokeapi.co/api/v2/pokemon?limit=20')
      setNextUrl(data.next)
      setPrevUrl(data.previous)
      setPokemon(data.results)
      console.log(pokemon);
      setLoading(false)
    }
    fetchData()
  } ,[])



  return (
    <div>
      { loading ? <h1>Loading...</h1>:(
        <>
          <div className='pokemon-container'>
              {pokemon.map((pokemon , i) => {
                return <Card key={i} pokemon= {pokemon}/>
              })}
          </div>
        </>  
        )
      }
    </div>
  )
}

export default App
