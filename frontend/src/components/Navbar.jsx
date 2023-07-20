import "./Navbar.css"
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

function NavScrollExample() {

  const navigate=useNavigate()

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
          <a className="nav-link" href="/">
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
              <a className="nav-link" href="/registration">
                <i className="fa fa-shopping-cart" /> Cart
              </a>
            </div>
            </li>
            <li className="nav-item">
            <div className="gradient-text">
              <a className="nav-link" href="/registration">
                <i className="fa fa-heart" /> Wishlist
              </a>
            </div>
            </li>
            <li className="nav-item">
            <div className="gradient-text">
              <a className="nav-link" href="/login">
                <i className="fa fa-user" /> Login
              </a>
            </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
      <a className="navbar-brand d-block d-sm-block d-md-none d-lg-none" href="/">
        New2U
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li onClick={()=>{navigate(`/Category?category=${'mobile'}`)}} children="nav-item">
          <a className="icon-container">
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
          <li className="nav-item">
          <a className="icon-container" href="/BuyerHome">
            <CgSmartHomeRefrigerator className="icon"/>
            <span onClick={()=>{navigate(`/Category?category='Refridgerator'`)}} className="text">Refridgerator</span>
          </a>
          </li>
          <li className="nav-item">
          <a className="icon-container" href="/BuyerHome">
            <CgSmartHomeWashMachine className="icon"/>
            <span className="text">Washing machine</span>
          </a>
          </li>
          <li className="nav-item">
          <a className="icon-container" href="/BuyerHome">
            <TbMotorbike className="icon"/>
            <span className="text">Bike</span>
          </a>
          </li>
          <li className="nav-item">
          <a className="icon-container" href="/BuyerHome">
            <BsCarFront className="icon"/>
            <span className="text">Car</span>
          </a>
          </li>
          <li className="nav-item">
          <a className="icon-container" href="/BuyerHome">
            <FiWatch className="icon"/>
            <span className="text">Watches</span>
          </a>
          </li>
          <li className="nav-item">
          <a className="icon-container" href="/BuyerHome">
            <AiOutlineLaptop className="icon"/>
            <span className="text">Computer</span>
          </a>
          </li>
          <li className="nav-item">
          <a className="icon-container" href="/BuyerHome">
            <CiMobile3 className="icon"/>
            <span className="text">Television</span>
          </a>
          </li>
          <li className="nav-item">
          <a className="icon-container" href="/BuyerHome">
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

export default NavScrollExample;