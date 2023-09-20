import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import  NoIconNav from './user/NoIconNav';
import { FaCloudUploadAlt } from 'react-icons/fa';
import './Review.css';

function Review() {

    const location = useLocation();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [userCount, setUserCount] = useState(0);


  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('productId');
  const userId = localStorage.getItem('authid'); 

  useEffect(() => {
    //console.log('Product ID from URL:', productId);
  }, [productId]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post(`http://localhost:8000/api/products/display/${productId}`);
        console.log(' product : ',res)
        setProduct(res.data);

        const userReviewResponse = await axios.get(`http://localhost:8000/api/review/display/${productId}/${userId}`);
      if (userReviewResponse.data) {
        setRating(userReviewResponse.data.review);
        setComment(userReviewResponse.data.comments);
      }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleStarClick = async (selectedRating) => {
    setRating(selectedRating);
    console.log('pressed : ',selectedRating)
    console.log('product id : ',productId)
    try {
      if (selectedRating === 0) {
        return;
      }
  
      const response = await axios.post('http://localhost:8000/api/review/create', {
        userid: localStorage.getItem('authid'),
        productid: productId,
        review: selectedRating,
        comments: '', 
      });
  
      if (response.status === 201) {
        console.log('Review and rating saved to the database');
      }
    } catch (error) {
      console.error('Error saving review and rating:', error);
    }
  };

  const handleStarHover = (hoveredIndex) => {
    setHoveredStar(hoveredIndex);
  };
 
  const [comment, setComment] = useState('');

  const handleSubmitComment = async (e) => {
    try {
      e.preventDefault();
      console.log("product id : ",productId)
      
      if (comment.trim() === '' || rating === 0) {
        return;
      }

      const res = await axios.post('http://localhost:8000/api/review/create', {
        userid: localStorage.getItem('authid'),
        productid: productId,
        review: rating,
        comments: comment,
      });
      

      if (res.status === 201) {
        console.log('Review and comment saved to the database');
        //navigate('/ProductDetail');
      }
    } catch (error) {
      console.error('Error saving review and comment:', error);
    }
  };

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/review/averagerating/${productId}`);
        if (response.data) {
          setAverageRating(response.data.averageRating);
        }
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    fetchAverageRating();
  }, [productId]);


  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/review/usercount/${productId}`);
        if (response.data) {
          setUserCount(response.data.userCount);
        }
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, [productId]);

  return (
    <div>
        <div>
            < NoIconNav/>
        </div>
        <div style={{height:'1000px'}}>
            <div style={{marginLeft:'300px',width:'60%',height:'100%',marginTop:'15px', backgroundColor:'white'}}>
                <div style={{ display: 'flex',marginTop:'10px',border:'5px solid #ECECE0'}}>

                    <h1 style={{
                        textAlign:'left',
                        paddingLeft:'20px',
                        paddingRight:'10px', 
                        paddingTop:'35px',
                        width:'70%'
                        }}> Rating & Review 
                    </h1>
                    <div style={{ 
                        flexBasis:'80%', 
                        textAlign:'right',
                        paddingRight:'10px',
                        paddingTop:'10px'}}>
                        <h2>{product.productName}</h2>
                        <h2 style={{backgroundColor:'green' ,color:'white',marginLeft:'450px', width:'50px',textAlign:'center',paddingTop:'2px',  height:'30px', fontWeight:'bold', fontSize:'larger', borderRadius:'10px'}}>{averageRating} ★ </h2>
                        <h5 style={{fontFamily:'monospace', fontSize:'larger'}}> ({userCount})</h5>
                    </div>

                    <div style={{ flexBasis:'20%'}}>
                        <img src={`http://localhost:8000/${product.image}`} alt="Product" style={{ height: "100px",width:'100px',marginTop:'10px' }} />
                    </div>
                    
                </div>
                <div style={{ display: 'flex', backgroundColor:'#ddd',border:'5px solid #ECECE0'}}>
                    <div style={{flexBasis:'40%',paddingRight:'10px', backgroundColor:'white',borderRight:'5px solid #ECECE0'}}>
                        <div className='reviewleft' style={{width:'100%',height:'100px'}}>
                            <h4 style={{textAlign:'left', paddingLeft:'30px', paddingTop:'30px'}}>What makes a good review</h4>
                        </div>
                        <div className='reviewleft' style={{width:'100%',height:'150px',backgroundColor:'white'}}>
                            <h5 style={{textAlign:'left', paddingLeft:'30px', paddingTop:'30px'}}>Have you used this product?</h5>
                            <h5 style={{textAlign:'left', paddingLeft:'30px', paddingTop:'10px'}}>Your review should be about your experience with the product.</h5>
                        </div>
                        <div className='reviewleft' style={{width:'100%',height:'150px',backgroundColor:'white', paddingRight:'10px',}}>
                            <h5 style={{textAlign:'left', paddingLeft:'30px', paddingTop:'30px'}}>Why review a product?</h5>
                            <h5 style={{textAlign:'left', paddingLeft:'30px', paddingTop:'10px'}}>Your valuable feedback will help fellow shoppers decide!</h5>
                        </div>
                        <div style={{width:'100%',height:'250px',backgroundColor:'white'}}>
                            <h5 style={{textAlign:'left', paddingLeft:'30px', paddingTop:'30px'}}>How to review a product?</h5>
                            <h5 style={{textAlign:'left', paddingLeft:'30px', paddingTop:'10px'}}>Your review should include facts. An honest opinion is always appreciated. If you have an issue with the product or service please contact us from the help centre.</h5>
                        </div>
                    </div>
                    <div style={{flexBasis:'60%',backgroundColor:'white'}}>
                    <div className='reviewleft' style={{width:'100%',height:'150px', display:'flex', flexDirection:'column'}}>
                        <h4 style={{textAlign:'left', paddingLeft:'30px', paddingTop:'30px'}}>Rate this product</h4>
                        <div className="star-rating">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`star ${star <= rating ? 'active' : ''} ${star <= hoveredStar ? 'hovered' : ''}`}
                              onClick={() => handleStarClick(star)}
                              onMouseEnter={() => handleStarHover(star)}
                              onMouseLeave={() => handleStarHover(0)}
                            >★</span>
                          ))}
                        </div>

                    </div>
                    <div style={{marginTop:'20px'}}>
                        <h3 style={{paddingTop:'10px'}}>Review this product</h3>
                        <form style={{marginTop:'50px', marginLeft:'50px', backgroundColor:'transparent'}}>
                             <textarea
                                rows="10"
                                cols="60"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write your comment...">
                            </textarea>
                            <br></br><br></br>
                            <button className='sendicon' onClick={handleSubmitComment}> <FaCloudUploadAlt size={30} />
                            </button>
                            
                            </form>
                    </div>  
                </div>
            </div>
        </div>
    </div>        
</div>
  )
}

export default Review