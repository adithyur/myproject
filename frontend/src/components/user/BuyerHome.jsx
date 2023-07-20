import React from 'react'
import NavScroll from './BuyerNav'


export default function BuyerHome() {
  return (
    <div>
      <div>
        <NavScroll/>
      </div>

      <div className='cardbox'>
        <div className="card">
          <img className="card" src="https://images-na.ssl-images-amazon.com/images/I/613A7vcgJ4L._SL1500_.jpg" alt="..." />
          <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Add to cart</a>
           </div>
        </div>

        <div className="card">
          <img className="card" src="https://images-na.ssl-images-amazon.com/images/I/613A7vcgJ4L._SL1500_.jpg" alt="..." />
          <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Add to cart</a>
           </div>
        </div>

        <div className="card">
          <img className="card" src="https://images-na.ssl-images-amazon.com/images/I/613A7vcgJ4L._SL1500_.jpg" alt="..." />
          <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Add to cart</a>
           </div>
        </div>

        <div className="card">
          <img className="card" src="https://images-na.ssl-images-amazon.com/images/I/613A7vcgJ4L._SL1500_.jpg" alt="..." />
          <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Add to cart</a>
           </div>
        </div>

      </div>

    </div>



  )
}