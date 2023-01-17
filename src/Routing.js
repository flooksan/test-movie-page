import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Favorites from './components/favorites/Favorites'


function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>} />
            <Route path='/favorites' element={<Favorites/>} />
        </Routes>
    </BrowserRouter>
    
  )
}

export default Routing