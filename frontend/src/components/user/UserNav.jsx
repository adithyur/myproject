import React, { useState } from 'react';
import "./UserNav.css"
import { CiMobile3 } from 'react-icons/ci';
import {TbMotorbike} from 'react-icons/tb';
import {BsCarFront} from 'react-icons/bs' ;
import {MdHeadset} from 'react-icons/md' ;
import {CgSmartHomeRefrigerator} from 'react-icons/cg' ;
import {CgSmartHomeWashMachine} from 'react-icons/cg' ;
import {FiWatch} from 'react-icons/fi' ;
import {AiOutlineLaptop} from 'react-icons/ai';
import {MdSportsSoccer} from 'react-icons/md' ;
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function UserNav() {

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
  return (
    <div>
<meta charSet="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>New2U</title>
<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" />
<link rel="stylesheet" href="style.css" />
<div className="main-navbar shadow-sm sticky-top">
  <div className="top-navbar">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
         <div className="gradient-text">
          <a className="nav-link" href="/UserHome">
          <h5 className="brand-name">New2U</h5>
          </a>
          </div>
        </div>
        <div className="col-md-5 my-auto">
          <form role="search">
            <div className="input-group">
              <input type="search" placeholder="Search your product" className="form-control" />
              <span className="search-button">
              <button className="search-button1" type="submit">
                <i className="fa fa-search" />
              </button>
              </span>
              
              
            </div>
          </form>
        </div>
        
        <div className="col-md-5 my-auto">
          <ul className="nav justify-content-end">
            
            <li className="nav-item">
            <div className="gradient-text">
              <a className="nav-link" href="/Cart">
                <i className="fa fa-shopping-cart" /> Cart
              </a>
            </div>
            </li>
            <li className="nav-item">
            <div className="gradient-text">
              <a className="nav-link" href="/Wishlist">
                <i className="fa fa-heart" /> Wishlist
              </a>
            </div>
            </li>
            <li className="nav-item">
            <div className="gradient-text">
              <a className="nav-link" href="/Profile">
                <i className="fa fa-user" /> My Account
              </a>
            </div>
            </li>
            <li className="nav-item">
            <div className={`dropdown ${isOpen ? 'open' : ''}`}>
      <button className="dropdown-btn" onClick={toggleDropdown}>
        Profile <i className="fa fa-caret-down" />
      </button>
      <div className="dropdown-content">
        <a href="/Profile">My Profile</a>
        <a href="#">Orders</a>
        <a href="/ProductManagement">Products</a>
        <a onClick={logout}>Logout</a>
      </div>
    </div>

            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
      <a className="navbar-brand d-block d-sm-block d-md-none d-lg-none" href="/UserHome">
        New2U
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li onClick={()=>{navigate(`/Category?category=${'mobile'}`)}} children="nav-item">
          <a className="icon-container" >
            <CiMobile3 className="icon"/>
            <span className="text">Mobile</span>
          </a>
          </li>
          <li onClick={()=>{navigate(`/Category?category=${'headset'}`)}} className="nav-item">
          <a className="icon-container">
            <MdHeadset className="icon"/>
            <span className="text">Headphone</span>
          </a>
          </li>
          <li onClick={()=>{navigate(`/Category?category=${'refridgerator'}`)}} className="nav-item">
          <a className="icon-container">
            <CgSmartHomeRefrigerator className="icon"/>
            <span className="text">Refridgerator</span>
          </a>
          </li>
          <li onClick={()=>{navigate(`/Category?category=${'washing machine'}`)}} className="nav-item">
          <a className="icon-container">
            <CgSmartHomeWashMachine className="icon"/>
            <span className="text">Washing machine</span>
          </a>
          </li>
          <li onClick={()=>{navigate(`/Category?category=${'bike'}`)}} className="nav-item">
          <a className="icon-container">
            <TbMotorbike className="icon"/>
            <span className="text">Bike</span>
          </a>
          </li>
          <li onClick={()=>{navigate(`/Category?category=${'car'}`)}} className="nav-item">
          <a className="icon-container">
            <BsCarFront className="icon"/>
            <span className="text">Car</span>
          </a>
          </li>
          <li onClick={()=>{navigate(`/Category?category=${'watches'}`)}} className="nav-item">
          <a className="icon-container">
            <FiWatch className="icon"/>
            <span className="text">Watches</span>
          </a>
          </li>
          <li onClick={()=>{navigate(`/Category?category=${'computer'}`)}} className="nav-item">
          <a className="icon-container">
            <AiOutlineLaptop className="icon"/>
            <span className="text">Computer</span>
          </a>
          </li>
          <li onClick={()=>{navigate(`/Category?category=${'tv'}`)}} className="nav-item">
          <a className="icon-container">
            <CiMobile3 className="icon"/>
            <span className="text">Television</span>
          </a>
          </li>
          <li onClick={()=>{navigate(`/Category?category=${'sports'}`)}} className="nav-item">
          <a className="icon-container">
            <MdSportsSoccer className="icon"/>
            <span className="text">Sports</span>
          </a>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
</div>
</div>
  )
}

export default UserNav