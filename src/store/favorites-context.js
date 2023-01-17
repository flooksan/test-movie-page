import { createContext, useState } from "react";

const FavoriteContext = createContext({
    favorites: [],
    addFavorite: (favoriteMeetup) => {},
    removeFavorite: (meetupId) => {},
    itemIsFavorite: (meetupId) => {},
});

export function FavoriteContextProvider(props) {
    const [ userFavorites, setUserFavorites ] = useState([]);

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
    
    const context = {
        favorites: userFavorites,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite,
        itemIsFavorite: itemIsFavorite
    }

    return (
        <FavoriteContext.Provider value={context} >
            {props.children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteContext