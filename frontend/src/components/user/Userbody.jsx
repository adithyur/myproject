import React, { useState ,useEffect} from 'react'
import "./Userbody.css"
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';

export default function Userbody() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const [product,setproduct]= useState([]);

  const fetchproduct=async()=>{
    try{
      const res=await axios.get(`http://localhost:8000/api/products/getproduct`)
      setproduct(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    
    fetchproduct()
    }, [category]);

    const handleCardClick = (productId) => {
      console.log(productId)
      navigate(`/ProductDetail?productId=${productId}`);
    };


  return (
    <div>

<div className='cardbox'>
        
        {product.map((cardData, index) => (
        <div className="cards" key={index} onClick={() => handleCardClick(cardData._id)}>
          <img className="card-img-top" src={`http://localhost:8000/${cardData.image}`} alt="Card" style={{ height: "250px" }} />
          <div className="card-body">
            <h5 className="card-title">{cardData.productName}</h5>
            <p className="card-text">{cardData.price}</p>
            <a href="#" className="btn btn-primary">Add to cart</a>
          </div>
        </div>
      ))}
        </div>

      </div>

  )
}
