import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Overlay.css';

const MyComponent = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/cart/getcartbyuserid/${localStorage.getItem('authid')}`);
      setProduct(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleShowOverlay = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <div>
      {/* Button to trigger showing the overlay */}
      <button onClick={handleShowOverlay}>Show Overlay</button>

      {/* Conditionally render the overlay */}
      {showOverlay && (
        <div className="overlay" onClick={handleCloseOverlay}>
          {/* Optional: Add content inside the overlay */}
          <div className="overlay-content">
            <h2>Overlay Content</h2>
            <div>
              {product.map((cart, index) => (
                <table key={index} style={{ textAlign: 'left' }}>
                  <tr>
                    <td>
                      <img className='card-img-top' src={`http://localhost:8000/${cart.productDetails.image}`} alt='Card' style={{ height: '150px', width: '200px' }} />
                    </td>
                    <td>
                      <h4 style={{ paddingLeft: '10px' }}>{cart.productDetails.productName}</h4>
                      <br></br>
                      <h5 style={{ paddingLeft: '10px' }}>{cart.productDetails.price}</h5>
                    </td>
                  </tr>
                </table>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
