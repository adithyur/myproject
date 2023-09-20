import React, { useState ,useEffect} from 'react'
import "./Userbody.css"
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import ReNav from './ReNav'

function ReProduct() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const [products, setProducts] = useState([]);
  
    const fetchProducts = async () => {
      try {

        const productType = 'used';
        const res = await axios.get(`http://localhost:8000/api/products/gettype/${productType}`);
        //console.log("Products:", res.data);
  
        const productsWithRatings = await Promise.all(
          res.data.map(async (product) => {
            const ratingRes = await axios.get(`http://localhost:8000/api/review/getProductReviews/${product._id}`);
            console.log("Rating Response:", ratingRes.data);
            return {
              ...product,
              rating: ratingRes.data[0] ? ratingRes.data[0].review : 0,
            };
          })
        );
  
        setProducts(productsWithRatings);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, [category]);
  
    const handleCardClick = (productId) => {
      console.log(productId);
      navigate(`/ProductDetail?productId=${productId}`);
    };

  return (
    <div>
        <div>
            <ReNav/>
        </div>
        <div className='cardbox'>
        {products.map((cardData, index) => (
          <div className="cards" key={index} onClick={() => handleCardClick(cardData._id)}>
            <img className="card-img-top" src={`http://localhost:8000/${cardData.image}`} alt="Card" style={{ height: "300px" }} />
            <div className="card-body" style={{display:'flex', flexDirection:'row', marginTop:'15px'}}>
              <div style={{flexBasis:'80%'}}>
                <h5 className="card-title">{cardData.productName}</h5>
                <p className="card-text" style={{paddingTop:'10px',fontSize:'larger'}}>₹{cardData.price}</p>
              </div>
              <div style={{flexBasis:'20%', textAlign:'right',paddingRight:'10px', paddingTop:'30px', fontSize:'larger'}}>
                <p>★{cardData.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReProduct