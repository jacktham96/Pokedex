import { useEffect, useState } from 'react'
import './index.css'

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
      console.log(data);
      setNextUrl(data.next)
      setPrevUrl(data.previous)
      setPokemon(data.results)
      setLoading(false)
    }
    fetchData()
  } ,[])




  return (
    <div>
      { loading ? <h1>Loading...</h1>
        :(<h1>Data is Fetched</h1>)
      }
    </div>
  )
}

export default App
