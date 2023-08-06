import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import "./UserNav.css"
import "./EdtProduct.css"

function EdtProduct() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('productId');

    const [product, setProduct] = useState({ productName: '',
                                              price: '',
                                              productType: '',
                                              category: '',
                                              brand: '',
                                              image: '',
                                              description: ''
                                            });

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

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${productId}`);
        console.log(res)
          setProduct({
            productName: res.data.productName,
            price: res.data.price,
            productType: res.data.productType,
            category: res.data. category,
            brand: res.data.brand,
            image: res.data.image,
            description: res.data.description,
          });
          /*console.log('Profile:', product); // Log the updated product state*/
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Error fetching profile');
      }
    }
      useEffect(() => {
        fetchProduct()
    },[])


    const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProduct((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      /*console.log(product);*/
      const res=await axios.put(`http://localhost:8000/api/products/edit/${productId}`, product);
      if(res.status===200){
        console.log("responds = ",res.data);
      alert("Product updated successfully");
      }
      
      navigate('/ViewProduct');
    } catch (error) {
      console.error('Error updating product:', error);
      alert("Error updating product:");
    }
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
        <div className='usform'>
      <form className="usraddform" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        name="productName"
        value={product.productName}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        placeholder="Price"
        name="price"
        value={product.price}
        onChange={handleChange}
        required
      />

      {/*<div className='protype'>
      <label htmlFor="productType">Type</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            id="fresh"
            name="productType"
            value="fresh"
            checked={formData.productType === 'fresh'}
            onChange={handleChange} 
            required
          />
          Fresh
        </label>
        <label>
          <input
            type="radio"
            id="used"
            name="productType"
            value="used"
            checked={formData.productType === 'used'}
            onChange={handleChange} 
            required
          />
          Used
        </label>
      </div>
      </div>

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        <option value="car">Car</option>
        <option value="car">HeadPhone</option>
        <option value="car">Watch</option>
        <option value="bike">Bike</option>
        <option value="mobile">Mobile</option>
        <option value="tv">TV</option>
      </select>

      <label htmlFor="image">Image</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        multiple
        onChange={handleChange}
        required
  />*/}

      <input
        type="text"
        placeholder='Brand'
        name="brand"
        value={product.brand}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        required
      />
            <button type="submit">Add Product</button>
    </form>
                </div>
        </div>
    </div>
  )
}

export default EdtProduct