import axios from "axios";



const fetchGenre = async () => {
    const genreURI = `${process.env.REACT_APP_BASE}/genre/movie/list`
    try {
        const genreResponse = await axios.get(genreURI,{
            params: {
              api_key: `${process.env.REACT_APP_API}`,
            }
        })

        return genreResponse.data.genres

    } catch (error) {
        console.log(error)
    }
}

export default fetchGenre;