import React, { useState ,useEffect} from 'react'
import "./Homebody.css"
import axios from 'axios'

export default function Homebody() {

  const [product,setproduct]= useState([])
  const fetchproduct=async()=>{
    const res=await axios.get('http://localhost:8000/api/products/getproduct')
    setproduct(res.data)
  }

  useEffect(() => {
    
  fetchproduct()
  }, [])
  
  return (
    <div>

<div className='cardbox'>
        
        {product.map((cardData, index) => (
        <div className="card" key={index}>
          <img className="card-img-top" src={`http://localhost:8000/${cardData.image}`} alt="Card" />
          <div className="card-body">
            <h5 className="card-title">{cardData.productName}</h5>
            <p className="card-text">{cardData.description}</p>
            <a href="#" className="btn btn-primary">Add to cart</a>
          </div>
        </div>
      ))}
        </div>

      </div>

  )
}
