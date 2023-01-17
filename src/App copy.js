import axios from 'axios';
import { useEffect, useState } from 'react';
import './app.css'
import Moviecard from './components/moviecard/Moviecard';
import Searchbar from './components/searchbar/Searchbar.js'

function App() {
  
    // All state
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [inputMovie, setInputMovie] = useState('')
    
    // Constant
    const images = `https://image.tmdb.org/t/p/w500/`;
    const path = inputMovie ? 'search' : 'discover' ;
    const URI = `${process.env.REACT_APP_BASE}/${path}/movie`;
    
    

    // Convert time
    const convertTime = (timeInput='2021-02-07') => { // set default prevent error
      const arrTime = timeInput.split('-')
      const month = new Date(arrTime[0],arrTime[1]-1,arrTime[2])
      month.setMonth(arrTime[1]-1)
      const returnTime = month.toLocaleString('en-US', {month: 'short'}); 
      return `${returnTime} ${arrTime[2]}, ${arrTime[0]}`
    }
    
    // Fetch movie data 
    async function fetchData () {
      try {
        if(path !== 'search') {
          setIsLoading(true)
        }

        const response = await axios.get(URI,{
          params: {
            api_key: `${process.env.REACT_APP_API}`,
            query: inputMovie
          }
        })
        setData(response.data.results)
        setIsLoading(false)

      } catch (error) {
        console.log(error)
      }
    }


    
    // Fetch movies
    useEffect(() => {
      fetchData()
      
    },[inputMovie])



    


    

    // Loading data
    if(isLoading) {
      return (
        <p>Loading...</p>
      )
    }

 

    // console.log(data.map(item => item.id))
  
    return (
      <div className='App'>
        
        {/* <div className="searchbar">
              <input type="text" placeholder="Search Movies !!" onChange={(event) => setInputMovie(event.target.value)}/>
        </div> */}
        

        <div className='container1'>
          <Searchbar setInputMovie={setInputMovie} className="top"/>
          <div className='bottom'>
            <button className='btn'>Movie category</button>
            <button className='btn'>Favorite movies</button>
          </div>
        </div>

        <div className='container2'>
          {data.map((movie,index) => (
          <Moviecard key={index} data={movie} images={images} convertTime={convertTime} />
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

export default App;


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