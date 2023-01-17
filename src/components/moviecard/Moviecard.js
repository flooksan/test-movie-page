import './moviecard.css'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from 'react';
import { useContext } from 'react'
import FavoritesContext from '../../store/favorites-context'


function Moviecard({data}) {
    
    // Context 
    const favoritesCtx = useContext(FavoritesContext)

    const itemIsFavorite = favoritesCtx.itemIsFavorite(data.id)
    
    // State
    const [like, setLike] = useState(false)

    function toggleFavoriteStatusHandler() {
        if (itemIsFavorite) {
            setLike(false)
            favoritesCtx.removeFavorite(data.id)
        } else {
            setLike(true)
            favoritesCtx.addFavorite({
                id: data.id,
                data,

            })
        }
    }

    // Convert time
    const convertTime = (timeInput='2021-02-07') => { // set default prevent error
        const arrTime = timeInput.split('-')
        const month = new Date(arrTime[0],arrTime[1]-1,arrTime[2])
        month.setMonth(arrTime[1]-1)
        const returnTime = month.toLocaleString('en-US', {month: 'short'}); 
        return `${returnTime} ${arrTime[2]}, ${arrTime[0]}`
      }
    
    

    return (
        <div className='card'>
            <div className='top'>
            <div onClick={toggleFavoriteStatusHandler} className='click-like'>
            {   !itemIsFavorite ?
                <AiOutlineHeart className='like' /> :
                <AiFillHeart className='like' />
            }
            </div>
                <a href={`https://www.themoviedb.org/movie/${data.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt={data.title} className='img'/>
                </a>

            </div>
            {/* <p>Add to Favorite</p> */}
            <div className='title'>
                <a className='movie-title' href={`https://www.themoviedb.org/movie/${data.id}`}>{data.title}</a>
                <div className='movie-time'>{convertTime(data.release_date)}</div>
            </div>
            
        </div>
    )
}

export default Moviecard