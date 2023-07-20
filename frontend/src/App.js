import './App.css';
import {  
  BrowserRouter as Router,  
  Routes,  
  Route, 
}   
from 'react-router-dom'; 
import Login from './components/user/Login';
import Registration from './components/user/Registration';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import UserHome from './components/user/UserHome';
import ProductManagement from './components/user/ProductManagement';
import Profile from './components/user/Profile';
import Category from './components/category';
import ViewProduct from './components/user/ViewProduct';
import ProductDetail from './components/ProductDetail';
import Wishlist from './components/user/Wishlist';


function App() {
  return (
    <div className="App">
      <Router >
        <Routes >
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path='/UserHome' element={<UserHome/>}/>
          <Route path='/ProductManagement' element={<ProductManagement/>}/>
          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/Category' element={<Category/>}/>
          <Route path='/ViewProduct' element={<ViewProduct/>}/>
          <Route path='/ProductDetail' element={<ProductDetail/>}/>
          <Route path='/Wishlist' element={<Wishlist/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
