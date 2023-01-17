import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Moviecard from '../moviecard/Moviecard';
import Searchbar from '../searchbar/Searchbar.js'
import './homepage.css'
import FavoriteContext from '../../store/favorites-context';
import fetchGenre from '../../genrefetch';
import everyMovie from  '../../images/every_trans.png'



function Homepage() {
    // Context
    const favoritesCtx = useContext(FavoriteContext)

    // All state
    const [data, setData] = useState([])
    const [genreId, setGenreId] = useState([])
    const [genre, setGenre] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [inputMovie, setInputMovie] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    
    // Constant
    const path = inputMovie ? 'search' : 'discover' 
    const URI = `${process.env.REACT_APP_BASE}/${path}/movie`
    // const genreURI = `${process.env.REACT_APP_BASE}/genre/movie/list`
    
    
    

    
    
    // Fetch movie data 
    async function fetchData () {
      try {
        if(path !== 'search') {
          setIsLoading(true)
        }
        
        const genreResponse = await fetchGenre();
        setGenreId(genreResponse);

        const movieResponse = await axios.get(URI,{
          params: {
            api_key: `${process.env.REACT_APP_API}`,
            query: inputMovie,
            with_genres : genre ? genre : ''
          }
        })
        setData(movieResponse.data.results)
        setIsLoading(false)

      } catch (error) {
        console.log(error)
      }
    }

    // console.log(genreId)

    
    // Fetch movies
    useEffect(() => {
      fetchData()
      
    },[inputMovie, genre])



    


    

    // Loading data
    if(isLoading) {
      return (
        <div className="lds-ring">
          <div></div><div></div><div></div><div></div>
          <p className='text'>Loading...</p>
        </div>
      )
    }

    // Dropdown menu 
    // const Dropdown = () => (
    //   <ul style={{display: 'list-item'}}>
    //     <li style={{cursor:'pointer'}} onClick={()=>setGenre('test')}>test</li>
    //     <li style={{cursor:'pointer'}} onClick={()=>setGenre('test2')}>test2</li>
    //   </ul>
    // )
 
      // console.log(genre,isOpen)
    // console.log(data.map(item => item.id))
  
    return (
      <div className='homepage'>
        
        <img src={everyMovie} alt="every" height={250}/>
        {/* <div className="searchbar">
              <input type="text" placeholder="Search Movies !!" onChange={(event) => setInputMovie(event.target.value)}/>
        </div> */}
        

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
              
              
              <Link to="/favorites" >
                <button  className='btn2'>Favorite movies</button>
              </Link>
              
              
            </div>
        </div>

        <div className='container2'>
          {data.map((movie,index) => (
          <Moviecard key={index} data={movie} />
        ))}

        </div>
        {/* Map data */}

        
        

        {/* {data && (<Moviecard data={data} images={images} covertTime={covertTime} />)} */}
      
        {/* <img src={`${images}${data.poster_path}`} alt={data.original_title} className={classes.img}/>
        <p>{data.original_title}</p>
        <p>{convertTime(data.release_date)}</p> */}
      
      </div>
    );
}

export default Homepage;


 /* Movies data  คร่าวๆ
    adult: false
​
    backdrop_path: "/tGwO4xcBjhXC0p5qlkw37TrH6S6.jpg"
    ​
    genre_ids: Array(6) [ 16, 28, 12, … ]
    ​
    id: 315162
    ​
    original_language: "en"
    ​
    original_title: "Puss in Boots: The Last Wish"
    ​
    overview: "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives."
    ​
    popularity: 12066.07
    ​
    poster_path: "/1NqwE6LP9IEdOZ57NCT51ftHtWT.jpg"
    ​
    release_date: "2022-12-07"
    ​
    title: "Puss in Boots: The Last Wish"
    ​
    video: false
    ​
    vote_average: 8.6
    ​
    vote_count: 1677
  */