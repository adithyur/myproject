import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import "./UserNav.css"
import "./Wishlist.css"
import { MdDelete } from 'react-icons/md';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';


function Wishlist() {

    const deleteProduct = async (productId) => {
        const authid = localStorage.getItem('authid');
        try {
          await axios.delete(`http://localhost:8000/api/wishlist/wishlist/${authid}/${productId}`);
          fetchproduct();
        } catch (error) {
          console.error('Error deleting product from wishlist:', error);
        }
      };

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

    const [product,setproduct]= useState([])
    const fetchproduct=async()=>{
        const res=await axios.get(`http://localhost:8000/api/wishlist/getwishlistbyuserid/${localStorage.getItem('authid')}`)
      setproduct(res.data)
      console.log(res.data)
    }

    useEffect(() => {
        fetchproduct()
    },[])

    const handleCardClick = (productId) => {
    console.log(productId)
    navigate(`/ProductDetail?productId=${productId}`);
    };

  return (
    <div>
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
                                    <a className="nav-link" href="#">
                                    <i className="fa fa-shopping-cart" /> Cart
                                    </a>
                                </div>
                                </li>
                                <li className="nav-item">
                                <div className="gradient-text">
                                    <a className="nav-link" href="#">
                                    <i className="fa fa-heart" /> Wishlist
                                    </a>
                                </div>
                                </li>
                                <li className="nav-item">
                                <div className="gradient-text">
                                    <a className="nav-link" href="/login">
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
            </div>
        </div>
        <div>
            <div className='wishlisthead'>
                <h1>
                    <BsFillBookmarkHeartFill className='wishlistheadicon' size={52} color="red" />
               My Wishlist</h1>
            </div>
            <div >
                <div className='cardbox'>
        {product.map((wishlist, index) => (
          <div className='cards' key={index} onClick={() => handleCardClick(wishlist.productDetails._id)}>
            <img className='card-img-top' src={`http://localhost:8000/${wishlist.productDetails.image}`} alt='Card' style={{ height: '250px' }} />
            <div className='card-body'>
              <h5 className='card-title'>{wishlist.productDetails.productName}</h5>
              <p className='card-text'>{wishlist.productDetails.price}</p>
            </div>
          </div>
        ))}
      </div>
            </div>
        </div>
    </div>
  )
}

export default Wishlist