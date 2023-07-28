import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ProductManagement.css';
import './ViewProduct.css';
import UserNav from './UserNav';
import { useNavigate } from 'react-router-dom';

function Rohit() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/products/getproductbyuserid/${localStorage.getItem('authid')}`);
      setProduct(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [category]);

  const handleDownload = async (link) => {
    const imageUrl = `http://localhost:8000/${link}`;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'image.jpg';
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div>
      {product.map((productData, index) => (
        <div key={index} className='chumma' onClick={() => handleDownload(productData.image)}>
          <img src={`http://localhost:8000/${productData.image}`} alt="Product" style={{ height: '450px' }} />
        </div>
      ))}
    </div>
  );
}

export default Rohit;