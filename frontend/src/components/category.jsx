import React, { useState ,useEffect} from 'react'
import NavScrollExample from './Navbar'
import axios from 'axios'
import { useLocation } from 'react-router-dom';

export default function Homebody() {
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const [product,setproduct]= useState([])
  const fetchproduct=async()=>{
    const res=await axios.get(`http://localhost:8000/api/products/getcategory/${category}`)
    setproduct(res.data)
  }

  useEffect(() => {
    
  fetchproduct()
  }, [category])
  
  return (
    <div>
         <div>
        <NavScrollExample/>
      </div>

<div className='cardbox'>
        
        {product.map((cardData, index) => (
        <div className="card" key={index}>
          <img className="card-img-top" src={`http://localhost:8000/${cardData.image}`} alt="Card" style={{ height: "200px" }}/>
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
