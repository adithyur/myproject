import  React, { useState , useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import UserNav from './UserNav'
import Navbar from '../Navbar'

function SearchPro() {

    const [showUser, setShowUser] = useState(false);
    const [showUser1, setShowUser1] = useState(false);
    const userid = localStorage.getItem('authid');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchdata = searchParams.get('searchdata');

    const handleCheck = async () => {
        
        if(userid){
          setShowUser1(true);
          
        }
        else{
          setShowUser(true);
        }
      }

      useEffect(() => {
        handleCheck();
    },[])

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
  
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/searchdata/${searchdata}`);
        console.log("Products:", res.data);
  
        // Fetch ratings for each product
        const productsWithRatings = await Promise.all(
          res.data.map(async (product) => {
            const ratingRes = await axios.get(`http://localhost:8000/api/review/getProductReviews/${product._id}`);
            console.log("Rating Response:", ratingRes.data);
            return {
              ...product,
              rating: ratingRes.data[0] ? ratingRes.data[0].review : 0, // Assuming your API returns the rating for the product
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
    }, [searchdata]);
  
    const handleCardClick = (productId) => {
      console.log(productId);
      navigate(`/ProductDetail?productId=${productId}`);
    };

  return (
    <div>
        <div>
            {showUser && (
                <Navbar/> 
            )}
            {showUser1 && (
                <UserNav/>
            )}
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

export default SearchPro