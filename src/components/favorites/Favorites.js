import React from 'react'
import './favorites.css'
import { useContext, useState } from 'react'
import FavoritesContext from '../../store/favorites-context'
import { Link } from 'react-router-dom'
import Searchbar from '../searchbar/Searchbar'
import Moviecard from '../moviecard/Moviecard'
import everyMovie from  '../../images/every_trans.png'

function Favorites() {
  const favoritesCtx = useContext(FavoritesContext)

  const [inputMovie, setInputMovie] = useState('')
  const favoritesData = favoritesCtx.favorites
  console.log(favoritesData)

  return (
    <div className='favorites'>

      <img src={everyMovie} alt="every" height={200}/>

      <div className='container1'>
          <Searchbar setInputMovie={setInputMovie} className="top"/>
          <div className='bottom'>
            <div className='dropdown'>
                <button className='btn1'>Movie category</button>
                
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