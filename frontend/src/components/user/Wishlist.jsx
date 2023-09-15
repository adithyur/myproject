import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import  NoIconNav from './NoIconNav'
import "./UserNav.css"
import "./Wishlist.css"
import { MdDelete } from 'react-icons/md';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';


function Wishlist() {

    const deleteProduct = async (productId) => {
        const authid = localStorage.getItem('authid');
        try {
          await axios.delete(`http://localhost:8000/api/wishlist/wishlist/${authid}/${productId}`);
          fetchproduct();
        } catch (error) {
          console.error('Error deleting product from wishlist:', error);
        }
      };

    useEffect(() => {
        const authid= localStorage.getItem('authid')
        if(!authid){
          navigate('/login')
        }
    },[])

    const navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const [product,setproduct]= useState([])
    const fetchproduct=async()=>{
        const res=await axios.get(`http://localhost:8000/api/wishlist/getwishlistbyuserid/${localStorage.getItem('authid')}`)
      setproduct(res.data)
      console.log(res.data)
    }

    useEffect(() => {
        fetchproduct()
    },[])

    const handleCardClick = (productId) => {
    console.log(productId)
    navigate(`/ProductDetail?productId=${productId}`);
    };

  return (
    <div>
        <div>
            < NoIconNav/>
        </div>
        <div>
            <div className='wishlisthead'>
                <h1>
                    <BsFillBookmarkHeartFill className='wishlistheadicon' size={52} color="red" />
               My Wishlist</h1>
            </div>
            <div >
                <div className='cardbox'>
        {product.map((wishlist, index) => (
          <div className='cards' key={index} onClick={() => handleCardClick(wishlist.productDetails._id)}>
            <img className='card-img-top' src={`http://localhost:8000/${wishlist.productDetails.image}`} alt='Card' style={{ height: '250px' }} />
            <div className='card-body'>
              <h5 className='card-title'>{wishlist.productDetails.productName}</h5>
              <p className='card-text'>{wishlist.productDetails.price}</p>
            </div>
          </div>
        ))}
      </div>
            </div>
        </div>
        <div>
          
        </div>
    </div>
  )
}

export default Wishlist