import React from 'react'
import './favorites.css'
import { useContext, useState, useEffect } from 'react'
import FavoritesContext from '../../store/favorites-context'
import { Link } from 'react-router-dom'
import Searchbar from '../searchbar/Searchbar'
import Moviecard from '../moviecard/Moviecard'
import everyMovie from  '../../images/every_trans.png'
import fetchGenre from '../../genrefetch'

function Favorites() {
  // Context
  const favoritesCtx = useContext(FavoritesContext)
  
  // State
  const [inputMovie, setInputMovie] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [genreId, setGenreId] = useState([])
  const [genre, setGenre] = useState('')
  
  // Constant
  let favoritesData = favoritesCtx.favorites
  console.log(favoritesData)
  const newFevData = favoritesData.filter(movie => {
    return movie.data.title.toLowerCase().includes(inputMovie.toLowerCase())
  })

  const genreFilterDate = favoritesData.filter(movie =>  {
      for(const genre_id of movie.data.genre_ids) {
        if(genre_id == genre) {
          return movie
        }
      }
  })

  console.log(genreFilterDate)
  if(inputMovie) {
    favoritesData = newFevData
  } else if(genre) {
    favoritesData = genreFilterDate
  }
  // favoritesData = !inputMovie ?  favoritesData : newFevData ;
  // switch(true) {
  //   case (inputMovie) :
  //     favoritesData = newFevData
  //     break;
  //   case (genre) :
  //     favoritesData = genreFilterDate
  //   default : 
  //     // eslint-disable-next-line no-self-assign
  //     favoritesData = favoritesData
  // }

 
  useEffect(() => {
    const fetchData = async () => { 
      const genreResponse = await fetchGenre();
      setGenreId(genreResponse); 
    }

    fetchData()
    
  },[])

  console.log(genre)

  return (
    <div className='favorites'>

      <img src={everyMovie} alt="every" height={250} className="logo"/>

      <div className='container1'>
          <Searchbar setInputMovie={setInputMovie} className="top"/>
          <div className='bottom'>
          <div className='dropdown'>
                <button className='btn1' onClick={() => setIsOpen(!isOpen)}>Movie category</button>
                {isOpen && (
                  <div className="dropdown-content">
                      {genreId.map(genre => (
                          <a key={genre.id} style={{cursor: 'pointer'}}onClick={()=> setGenre(genre.id)}>{genre.name}</a>
                      ))}
                  </div>
                )}
              </div>

            <Link to="/" >
                  <button  className='btn2'>
                    Homepage 
                  </button>
            </Link>
            
          </div>
      </div>

      <div className='container2'>
          {favoritesData.map((movie,index) => (
          <Moviecard key={index} data={movie.data} images={movie.image} convertTime={movie.date} />
        ))}

      </div>

    </div>
  )
}

export default Favorites