import React from 'react'
import './favorites.css'
import { useContext, useState } from 'react'
import FavoritesContext from '../../store/favorites-context'
import { Link } from 'react-router-dom'
import Searchbar from '../searchbar/Searchbar'
import Moviecard from '../moviecard/Moviecard'

function Favorites() {
  const favoritesCtx = useContext(FavoritesContext)

  const [inputMovie, setInputMovie] = useState('')
  const favoritesData = favoritesCtx.favorites
  console.log(favoritesData)

  return (
    <div className='favorites'>
      
      <div className='container1'>
          <Searchbar setInputMovie={setInputMovie} className="top"/>
          <div className='bottom'>
            <button className='btn'>Movie category</button>
            <Link to="/" >
              <button  className='btn'>
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