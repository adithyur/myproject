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
import Orders from './components/user/Orders';
import Review from './components/Review';
import UserAddress from './components/user/UserAddress';
import ComDetail from './components/user/ComDetail';
import PickupAddress from './components/user/PickupAddress';
import Payment from './components/user/Payment';
import OrderDetails from './components/user/OrderDetails';
import OrderReturn from './components/user/OrderReturn';
import LoginAndSecurity from './components/user/LoginAndSecurity';
import UserCategory from './components/user/UserCategory';
import FreshProduct from './components/user/FreshProduct';
import ReProduct from './components/user/ReProduct';
import SellerHome from './components/user/SellerHome';
import SellLandS from './components/user/SellLandS';
import NewOrders from './components/user/NewOrders';
import SearchPro from './components/user/SearchPro';
import ContactUs from './components/user/Contactus';
import BuyProfile from './components/user/BuyProfile';


import CreditCardForm from './components/user/CreditCardForm';



import AdminHome from './components/admin/AdminHome';
import ViewUser from './components/admin/ViewUser';
import ManageProduct from './components/admin/ManageProduct';
import AdmiViewOrder from './components/admin/AdmiViewOrder';
import ViewVerifier from './components/admin/ViewVerifier';


import VerifierHome from './components/verifier/VerifierHome';
import ApproveProduct from './components/verifier/ApproveProduct';
import ViewOrders from './components/verifier/ViewOrders';
import UpdateOrder from './components/verifier/UpdateOrder';
import AdOrderDetail from './components/verifier/AdOrderDetail';


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
          <Route path='/SellerHome' element={<SellerHome/>}/>
          <Route path='/ProductManagement' element={<ProductManagement/>}/>
          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/Category' element={<Category/>}/>
          <Route path='/UserCategory' element={<UserCategory/>}/>
          <Route path='/FreshProduct' element={<FreshProduct/>}/>
          <Route path='/ReProduct' element={<ReProduct/>}/>
          <Route path='/ViewProduct' element={<ViewProduct/>}/>
          <Route path='/EdtProduct' element={<EdtProduct/>}/>
          <Route path='/ProductDetail' element={<ProductDetail/>}/>
          <Route path='/Wishlist' element={<Wishlist/>}/>
          <Route path='/Cart' element={<Cart/>}/>
          <Route path='/Checkout' element={<Checkout/>}/>
          <Route path='/Orders' element={<Orders/>}/>
          <Route path='NewOrders' element={<NewOrders/>}/>
          <Route path='/review' element={<Review/>}/>
          <Route path='/UserAddress' element={<UserAddress/>}/>
          <Route path='/ComDetail' element={<ComDetail/>}/>
          <Route path='/PickupAddress' element={<PickupAddress/>}/>
          <Route path='/Payment' element={<Payment/>}/>

          <Route path='/CreditCardForm' element={<CreditCardForm/>}/>
          <Route path='/OrderDetails' element={<OrderDetails/>}/>
          <Route path='/OrderReturn' element={<OrderReturn/>}/>
          <Route path='/LoginAndSecurity' element={<LoginAndSecurity/>}/>
          <Route path='/SellLandS' element={<SellLandS/>}/>
          <Route path='/SearchPro' element={<SearchPro/>}/>
          <Route path='/ContactUs' element={<ContactUs/>}/>
          <Route path='/BuyProfile' element={<BuyProfile/>}/>
         

         
          <Route path='AdminHome' element={<AdminHome/>}/>
          <Route path='ViewUser' element={<ViewUser/>}/>
          <Route path='/ManageProduct' element={<ManageProduct/>}/>
          <Route path='/AdmiViewOrder' element={<AdmiViewOrder/>}/>
          <Route path='/ViewVerifier' element={<ViewVerifier/>}/>


          <Route path='VerifierHome' element={<VerifierHome/>}/>
          <Route path='ApproveProduct' element={<ApproveProduct/>}/>
          <Route path='ViewOrders' element={<ViewOrders/>}/>
          <Route path='UpdateOrder' element={<UpdateOrder/>}/>
          <Route path='AdOrderDetail' element={<AdOrderDetail/>}/>

          <Route path='/Rohit' element={<Rohit/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
