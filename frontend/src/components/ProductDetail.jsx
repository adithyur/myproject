import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('productId');

  const [isSaved, setIsSaved] = useState(false);

  const handleButtonClick = async () => {
    const authid = localStorage.getItem('authid');
    if (!authid) {
      navigate('/login');
    } else {
      try {
        if (isSaved) {
          await axios.delete(`http://localhost:8000/api/wishlist/wishlist/${authid}/${productId}`);
          setIsSaved(false);
        } else {
          await axios.post('http://localhost:8000/api/wishlist/wishlist', { userid: authid, productid: productId });
          setIsSaved(true);
        }
      } catch (error) {
        console.error('Error updating wishlist:', error);
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const authid = localStorage.getItem('authid');
    if (authid) {
      const fetchWishlistStatus = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/wishlist/wishlist/${authid}/${productId}`);
          setIsSaved(res.data.exists);
        } catch (error) {
          console.error('Error fetching wishlist status:', error);
        }
      };

      fetchWishlistStatus();
    }
  }, [productId]);

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
                <i className="fa fa-user" /> Login
              </a>
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
    <div className='productdiv1'>
      <div className='productbook'>
      <h2>{product.productName}</h2>
      <button className={`wishlist-button ${isSaved ? 'saved' : ''}`} onClick={handleButtonClick}>
        <FontAwesomeIcon icon={faHeart} />
        <span className="button-text">{isSaved ? 'Saved' : 'Save'}</span>
      </button>

    
      
      </div>
      <div className='productdiv2'>
        <div className='product-div-image'>
            <img className="product-img1" src={`http://localhost:8000/${product.image}`} alt="Product" style={{ height: "450px" }} />
        </div>
        <div className='productdiv3'>
            <div className='productdiv4'>
              <img className="product-img2" src={`http://localhost:8000/${product.image}`} alt="Product" style={{ height: "220px" }} />
              <img className="product-img3" src={`http://localhost:8000/${product.image}`} alt="Product" style={{ height: "220px" }} />
            </div>
            <div className='productdiv5'>
              <img className="product-img4" src={`http://localhost:8000/${product.image}`} alt="Product" style={{ height: "220px" }} />
              <img className="product-img5" src={`http://localhost:8000/${product.image}`} alt="Product" style={{ height: "220px" }} />
            </div>
          </div>
        </div>
        <div className="product-detail">
          <h1 className='price'> {product.price}</h1>
          <div className='testdiv'>
            <div className='descri'>
            {product.description?.split(',').map((i)=> (
              
              <div><p>. {i}</p></div>
            ))}
          </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductDetail;
