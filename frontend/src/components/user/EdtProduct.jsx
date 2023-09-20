import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NoIconNav from './NoIconNav';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import './UserNav.css';
import './EdtProduct.css';

function EdtProduct() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('productId');

  const [product, setProduct] = useState({
    productName: '',
    price: '',
    productType: '',
    category: '',
    brand: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    description: '',
    quantity: 0,
  });

  useEffect(() => {
    const authid = localStorage.getItem('authid');
    if (!authid) {
      navigate('/login');
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('authid');
    navigate('/');
  };

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/products/display/${productId}`);
      setProduct(res.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Error fetching product');
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setProduct((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('productName', product.productName);
      formData.append('price', product.price);
      formData.append('productType', product.productType);
      formData.append('category', product.category);
      formData.append('brand', product.brand);
      formData.append('description', product.description);
      formData.append('quantity', product.quantity);

      if (product.image1) {
        formData.append('image1', product.image1);
      }
      if (product.image2) {
        formData.append('image2', product.image2);
      }
      if (product.image3) {
        formData.append('image3', product.image3);
      }
      if (product.image4) {
        formData.append('image4', product.image4);
      }

      const res = await axios.put(`http://localhost:8000/api/products/updateproduct/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        console.log('Response = ', res.data);
        alert('Product updated successfully');
      }

      navigate('/ViewProduct');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    }
  };

  return (
    <div>
      <div>
        <NoIconNav />
      </div>
      <div>
         <p style={{fontWeight: 'bold', fontSize: '28px', paddingTop: '70px',}}>
          <BsDatabaseFillAdd style={{color:'green'}}/> Update Product
        </p>
        <div className="usform" style={{marginTop:'50px'}}>
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

            <label htmlFor="image1">Image 1</label>
            <input
              type="file"
              name="image1"
              accept="image/*"
              onChange={handleChange}
            />

            <label htmlFor="image2">Image 2</label>
            <input
              type="file"
              name="image2"
              accept="image/*"
              onChange={handleChange}
            />

            <label htmlFor="image3">Image 3</label>
            <input
              type="file"
              name="image3"
              accept="image/*"
              onChange={handleChange}
            />

            <label htmlFor="image4">Image 4</label>
            <input
              type="file"
              name="image4"
              accept="image/*"
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Brand"
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

            <input
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />

            <button type="submit">Update Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EdtProduct;
