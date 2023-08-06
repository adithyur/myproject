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
import EdtProduct from './components/user/EdtProduct';
import ProductDetail from './components/ProductDetail';
import Wishlist from './components/user/Wishlist';
import Cart from './components/user/Cart';
import Checkout from './components/user/Checkout';


import AdminHome from './components/admin/AdminHome';
import ViewUser from './components/admin/ViewUser';


import VerifierHome from './components/verifier/VerifierHome';
import ApproveProduct from './components/verifier/ApproveProduct';
import ViewOrders from './components/verifier/ViewOrders';


import Rohit from './components/user/Rohit';

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
          <Route path='/EdtProduct' element={<EdtProduct/>}/>
          <Route path='/ProductDetail' element={<ProductDetail/>}/>
          <Route path='/Wishlist' element={<Wishlist/>}/>
          <Route path='/Cart' element={<Cart/>}/>
          <Route path='/Checkout' element={<Checkout/>}/>

          
          <Route path='AdminHome' element={<AdminHome/>}/>
          <Route path='ViewUser' element={<ViewUser/>}/>


          <Route path='VerifierHome' element={<VerifierHome/>}/>
          <Route path='ApproveProduct' element={<ApproveProduct/>}/>
          <Route path='ViewOrders' element={<ViewOrders/>}/>

          <Route path='/Rohit' element={<Rohit/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
