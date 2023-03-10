import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './components/homepage/Homepage'
import Favorites from './components/favorites/Favorites'


function Routing() {
  return (
    
        <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/favorites' element={<Favorites/>} />
        </Routes>
  
  )
}

export default Routing