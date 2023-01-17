import './searchbar.css'
import { AiOutlineSearch } from "react-icons/ai";

function Searchbar(props) {
    const {setInputMovie} = props;
    
    return (
        <div className="searchbar">
            
            <input type="text" placeholder='🔍 Search Movies....' onChange={(event) => setInputMovie(event.target.value)}/>
        </div>
    )
}

export default Searchbar;