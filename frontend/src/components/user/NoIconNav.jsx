import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import "./UserNav.css"

function NoIconNav() {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const authid= localStorage.getItem('authid')
    if(!authid){
      navigate('/login')
    }
  },[])

    const logout = () => {
      localStorage.removeItem('authid')
      navigate('/')
    }
    const navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      useEffect(() => {
        const fetchUserName = async () => {
          try {
            console.log("user id : ",localStorage.getItem('authid'))
            const res = await axios.get(`http://localhost:8000/api/user/getname/${localStorage.getItem('authid')}`);
            const userData = res.data;
    
            if (userData && userData.username) {
              setUserName(userData.username);
            }
          } catch (error) {
            console.error('Error fetching user:', error);
          }
        };
    
        fetchUserName();
      }, []);



  return (
    <div>
    <div style={{height:'80px', borderBottom:'1px solid rgb(225, 217, 217)', marginTop:'30px', marginLeft:'100px', display:'flex', marginRight:'100px',/*backgroundColor:'blanchedalmond'*/ }}>
      <a className="pnav" style={{textAlign:'left', fontWeight:'bold', fontSize:'30px', fontFamily:'unset', paddingTop:'5px'}} href='/UserHome'>New2U</a>
      <div className="navbar2">
        <div className="nav-item2" style={{ paddingleft:'10px', paddingRight:'10px'}}>Fresh</div>
        <div className="nav-item2" style={{ paddingleft:'10px', paddingRight:'15px', marginLeft:'-15px'}}>Refurbished</div>
        <div className="nav-item2" style={{ paddingleft:'10px', paddingRight:'15px', marginLeft:'-15px'}}>Both</div>
        <div className="search-bar2">
          <input className='navtext2'type="text" placeholder="Search your products" />
          <button className='navbutton2'><FaSearch/></button>
        </div>
      </div>
      <div style={{display:'flex',textAlign:'left', marginLeft:'220px', marginTop:'15px'}}>    
        <a style={{fontWeight:'bold', fontSize:'20px'}} className='pnav' href="/Cart">
          <FaShoppingCart size={22} className='pnav-icon'/>  Cart</a>

        <a style={{paddingLeft:'25px', fontWeight:'bold', fontSize:'20px'}} className='pnav' href="/Wishlist">
          <AiFillHeart size={24} className='pnav-icon'/> Wishlist
        </a>

        <a style={{paddingLeft:'25px', fontWeight:'bold', fontSize:'20px'}} className='pnav' href="/Profile">
          <FaUser size={22} className='pnav-icon'/> {userName}
        </a>
      </div>
    </div>
</div>
  )
}

export default NoIconNav