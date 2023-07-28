import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { HiShoppingCart } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import "./UserNav.css";
import "./Cart.css";

function Cart() {

    const [selectedRows, setSelectedRows] = useState([]);

    const deleteProduct = async (productId) => {
        const authid = localStorage.getItem('authid');
        try {
          await axios.delete(`http://localhost:8000/api/cart/cart/${authid}/${productId}`);
          fetchproduct();
        } catch (error) {
          console.error('Error deleting product from cart:', error);
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
        const res=await axios.get(`http://localhost:8000/api/cart/getcartbyuserid/${localStorage.getItem('authid')}`)
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

    const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter((id) => id !== productId)
        : [...prevSelectedProducts, productId]
    );
  };

  const handleCheckboxClick = (productId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(productId)) {
        // If the product is already selected, remove it from the selection
        return prevSelectedRows.filter((id) => id !== productId);
      } else {
        // If the product is not selected, add it to the selection
        return [...prevSelectedRows, productId];
      }
    });
  };

  const orderclick = () => {
    navigate(`/Checkout`);
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
        <div className='cardcart'>
          <div>
            <div className='carthead'>
              <h1>
                <HiShoppingCart className='cartheadicon' size={52} color='red' />
                My cart
              </h1>
            </div>
            <div>
              <table className='cart_table'>
                {product.map((cart, index) => (
              <tr
                key={index}
                className={`cart_tr ${
                  selectedRows.includes(cart.productDetails._id) ? 'selected' : ''
                }`}
              >
                <td className='cart_checkbox'>
                  <input
                    type='checkbox'
                    checked={selectedRows.includes(cart.productDetails._id)}
                    onChange={() => handleCheckboxClick(cart.productDetails._id)}
                  />
                </td>
                    <td></td>
                    <td className='dummy' onClick={() => handleCardClick(cart.productDetails._id)}>
                      <img
                        className='cart_image'
                        src={`http://localhost:8000/${cart.productDetails.image}`}
                        style={{ height: '70px', width: '80px' }}
                      />
                    </td>
                    <td className='cart_name' onClick={() => handleCardClick(cart.productDetails._id)}>
                      {cart.productDetails.productName}
                    </td>
                    <td className='cart_counter'>
                      <button class='box_left-box' onClick={handleDecrement}>
                        -
                      </button>
                      <span class='box_center-box'>{count}</span>
                      <button class='box_right-box' onClick={handleIncrement}>
                        +
                      </button>
                    </td>
                    <td className='cart_price'>{cart.productDetails.price}</td>
                    <td className='deleteicon'>
                      <MdDelete size={24} onClick={() => deleteProduct(cart.productDetails._id)} />
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
      <button className="button-25" role="button" onClick={orderclick}>Order</button>
    </div>
  );
}

export default Cart;