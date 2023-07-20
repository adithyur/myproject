import React from 'react'
import "./HomeBody.css"

export default function () {
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
