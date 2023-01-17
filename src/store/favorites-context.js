import { createContext, useState, useEffect } from "react";
import axios from "axios";

const FavoriteContext = createContext({
    favorites: [],
    addFavorite: (favoriteMeetup) => {},
    removeFavorite: (meetupId) => {},
    itemIsFavorite: (meetupId) => {},
    
});

export function FavoriteContextProvider(props) {
    // const genreURI = `${process.env.REACT_APP_BASE}/genre/movie/list`

    const [ userFavorites, setUserFavorites ] = useState([]);
    // const [ genreId, setGenreId ] = useState([])

    function addFavorite(favoriteMovie) {
        
        setUserFavorites((prevUserFavorites) => { 
            return prevUserFavorites.concat(favoriteMovie);
        });
    }

    function removeFavorite(movieId) {
        setUserFavorites(prevUserFavorites => {
            return prevUserFavorites.filter(movie => movie.id !== movieId);
        });
    }

    function itemIsFavorite(movieId) {
        return userFavorites.some(movie => movie.id === movieId);
    }

    // const fetchData = async () => {
    //     try {
    //         const genreResponse = await axios.get(genreURI,{
    //             params: {
    //               api_key: `${process.env.REACT_APP_API}`,
    //             }
    //         })
    //         console.log(genreResponse.data)
    //         setGenreId(genreResponse.data.genres)

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    // useEffect(() => {
    //     fetchData()
    // },[])

    
    
    const context = {
        favorites: userFavorites,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite,
        itemIsFavorite: itemIsFavorite,
        
    }

    return (
        <FavoriteContext.Provider value={context} >
            {props.children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteContext