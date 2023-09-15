import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

import { FaShoppingCart } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';


import { CiMobile3 } from 'react-icons/ci';
import {TbMotorbike} from 'react-icons/tb';
import {BsCarFront} from 'react-icons/bs' ;
import {MdHeadset} from 'react-icons/md' ;
import {CgSmartHomeRefrigerator} from 'react-icons/cg' ;
import {CgSmartHomeWashMachine} from 'react-icons/cg' ;
import {FiWatch} from 'react-icons/fi' ;
import {AiOutlineLaptop} from 'react-icons/ai';
import {MdSportsSoccer} from 'react-icons/md' ;

import { BsToggles2 } from 'react-icons/bs';

import "./Navbar.css"

function NavScrollExample() {

  const navigate=useNavigate()

  return (
    
<div>
      <div style={{height:'80px', borderBottom:'1px solid rgb(225, 217, 217)', marginTop:'30px', marginLeft:'100px', display:'flex', marginRight:'100px',/*backgroundColor:'blanchedalmond'*/ }}>
        <a className="pnav" href="/" style={{textAlign:'left', fontWeight:'bold', fontSize:'30px', fontFamily:'unset', paddingTop:'5px'}}>New2U</a>
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

          <a style={{paddingLeft:'25px', fontWeight:'bold', fontSize:'20px'}} className='pnav' href="/login">
            <FaUser size={22} className='pnav-icon'/> Login
          </a>
        </div>
      </div>

      <div style={{display:'flex', borderBottom:'1px solid rgb(225, 217, 217)',height: '100px',marginLeft:'100px',marginRight:'100px'}}>

          <a onClick={()=>{navigate(`/Category?category=${'mobile'}`)}} children="nav-item" className='homeicon'>
            <CiMobile3 size={28}/>
            <br></br>
            <span>Mobile</span>
          </a>
          <a onClick={()=>{navigate(`/Category?category=${'headset'}`)}} children="nav-item" className='homeicon2'>
            <MdHeadset size={28}/>
            <br></br>
            <span>Headphone</span>
          </a>
          
          <a onClick={()=>{navigate(`/Category?category=${'refridgerator'}`)}} className='homeicon2'>
            <CgSmartHomeRefrigerator size={28}/>
            <br></br>
            <span>Refridgerator</span>
          </a>

          <a onClick={()=>{navigate(`/Category?category=${'washing machine'}`)}} className='homeicon2'>
            <CgSmartHomeWashMachine size={28}/>
            <br></br>
            <span>Washing machine</span>
          </a>

          <a onClick={()=>{navigate(`/Category?category=${'bike'}`)}} className='homeicon2'>
            <TbMotorbike size={28}/>
            <br></br>
            <span>Bike</span>
          </a>

          <a onClick={()=>{navigate(`/Category?category=${'car'}`)}} className='homeicon2'>
            <BsCarFront size={28}/>
            <br></br>
            <span>Car</span>
          </a>

          <a onClick={()=>{navigate(`/Category?category=${'watches'}`)}} className='homeicon2'>
            <FiWatch size={28}/>
            <br></br>
            <span>Watches</span>
          </a>

          <a onClick={()=>{navigate(`/Category?category=${'computer'}`)}} className='homeicon2'>
            <AiOutlineLaptop size={28}/>
            <br></br>
            <span>Computer</span>
          </a>

          <a onClick={()=>{navigate(`/Category?category=${'tv'}`)}} className='homeicon2'>
            <CiMobile3 size={28}/>
            <br></br>
            <span>Television</span>
          </a>

          <a onClick={()=>{navigate(`/Category?category=${'sports'}`)}} className='homeicon2'>
            <MdSportsSoccer size={28}/>
            <br></br>
            <span className="text">Sports</span>
          </a>

          <div className='filter'>
            <p className='filterp'> <BsToggles2/>Filter</p>
          </div>
          
 
      </div>

    </div>
  )
}

export default NavScrollExample;