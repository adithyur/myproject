import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NoIconNav from './NoIconNav';
import { LuFileBox } from 'react-icons/lu';
import "./Overlay.css"
import "./test.css"

function OrderDetails() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderId');
    const productId = searchParams.get('productId');

    const [orderDetails, setOrderDetails] = useState(null);
    const [product, setProduct] = useState({});
    const [averageRating, setAverageRating] = useState(0);
    const [transactionDetails, setTransactionDetails] = useState(null);
    const [order, setOrder] = useState(null);
    const [showCancelOverlay, setShowCancelOverlay] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    
        const fetchOrderDetails = async () => {
          try {
            const res = await axios.post(`http://localhost:8000/api/order/getOrderDetails/${orderId}`);
            setOrderDetails(res.data);
          } catch (error) {
            console.error('Error fetching order details:', error);
          }
        };
    
        fetchOrderDetails();
    }, [orderId]);
    
    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const res = await axios.post(`http://localhost:8000/api/products/display/${productId}`);
            setProduct(res.data);
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        };
    
        fetchProduct();
    }, [productId]);

    useEffect(() => {
        const fetchAverageRating = async () => {
          try {
            const res = await axios.get(`http://localhost:8000/api/review/averagerating/${productId}`);
            if (res.data) {
              setAverageRating(res.data.averageRating);
            }
          } catch (error) {
            console.error('Error fetching average rating:', error);
          }
        };
    
        fetchAverageRating();
    }, [productId]);

    const rateProduct = () => {
        navigate(`/review?productId=${product._id}`);
    };

    useEffect(() => {
      const fetchTransactionDetails = async () => {
        try {
          console.log("order id : ", orderId);
          const res = await axios.get(`http://localhost:8000/api/transaction/getTransactionDetails/${orderId}`);
    
          if (res.data) {
            
            const transactionDate = new Date(res.data.date);
            const formattedDate = `${transactionDate.toLocaleString('en-US', { weekday: 'long' })}, ${transactionDate.getDate()} ${transactionDate.toLocaleString('en-US', { month: 'long' })} ${transactionDate.getFullYear()}`;
            res.data.date = formattedDate;
    
            setTransactionDetails(res.data);
          }
        } catch (error) {
          console.error('Error fetching transaction details:', error);
        }
      };
    
      fetchTransactionDetails();
    }, [orderId]);

    const handleMakePayment = async () => {

      const res = await axios.get(`http://localhost:8000/api/transaction/getTransactionDetails/${orderId}`);
      const status= res.data.status;
      //console.log("Order status:",status);
      if (status=== 'unpaid') {
        navigate(`/CreditCardForm?orderId=${orderId}&productId=${productId}`);
        //console.log('Payment logic goes here');
      } else {
        alert('Payment has already been made for this order.');
      }
    };

    const returnorcancel = async () => {

      const res = await axios.post(`http://localhost:8000/api/order/getOrderDetails/${orderId}`);
      const status= res.data.status;
      console.log("Order status:",status);
      if (status=== 'delivered') {

        const deliveryDateStr = res.data.deliverydate;
        const deliveryDate = new Date(deliveryDateStr);
        console.log("delivery date : ",deliveryDate);
        const currentDate = new Date();

        console.log("today : ",currentDate)
        const differenceInDays = Math.floor((currentDate - deliveryDate) / (1000 * 60 * 60 * 24));
        
        console.log("dif : ",differenceInDays)
    
        if (differenceInDays <= 7) {
          navigate(`/OrderReturn?orderId=${orderId}`);
        }
        
      } else {
        setShowCancelOverlay(true);
      }
    };

    const handleCancelOrder = () => {
      
      setShowCancelOverlay(false);

    };
    
    

    return (
        <div>
            <div>
                <NoIconNav/>
            </div>
            <p style={{ paddingTop:'120px', fontSize:'30px', fontWeight:'bold'}}> <LuFileBox size={40} color='red'/> OrderDetails</p>
            <div style={{ marginLeft:'300px', marginRight:'300px', display:'flex', marginTop:'75px'}}>
                <div style={{ textAlign:'left', paddingLeft:'25px', flexBasis:'33%'}}>
                    <p style={{fontSize:'18px', fontWeight:'bold'}}>Delivery Address</p>
                    {orderDetails && (
                        <div>
                            <p style={{fontSize:'15px', fontWeight:'bold'}}>{orderDetails.name}</p>
                            <p>{orderDetails.address} {orderDetails.place}</p>
                            <p style={{fontSize:'15px', fontWeight:'bold'}}>Phone Number</p>
                            <p>{orderDetails.mobile1}</p>
                        </div>
                    )}
                </div>
                <div style={{ flexBasis:'40%', marginLeft:'25px'}}>
                    <div style={{display:'flex'}}>
                        <img src={`http://localhost:8000/${product.image}`} alt="Product" style={{ height: "120px", width:'120px' }} />
                        <div style={{display:'flex', flexDirection:'column', textAlign:'left'}}>
                            <p style={{fontSize:'24px', fontWeight:'bold', paddingLeft:'10px'}}>{product.productName}</p>
                            <p style={{fontSize:'15px', paddingLeft:'10px'}}>★ {averageRating}</p>
                            <p style={{fontSize:'15px', paddingLeft:'10px'}}>Seller : {product.sellerName}</p>
                            <button onClick={rateProduct} style={{border:'none', backgroundColor:'transparent', textDecoration:'underline', fontWeight:'bold', textAlign:'left', paddingLeft:'10px'}}>Rate Product</button>
                        </div>
                    </div>
                </div>
                <div style={{ flexBasis:'26%', textAlign:'left', marginLeft:'50px'}}>
                <div>
                {transactionDetails ? (
        <div>
          <p style={{fontSize:'18px', fontWeight:'bold'}}>Payment Details</p>
          <p>Payment Mode: {transactionDetails.mode}</p>
          <p>Amount: ₹ {transactionDetails.amount}</p>
          <p>Date: {transactionDetails.date}</p>
          <button
  onClick={handleMakePayment}
  style={{
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = 'darkgreen')}
  onMouseLeave={(e) => (e.target.style.backgroundColor = 'green')}
>
  Make Payment
</button>

        </div>
      ) : (
        <p>Loading transaction details...</p>
      )}
    </div>
                </div>
            </div>
 <button
 onClick={returnorcancel}
 style={{
   backgroundColor: 'red',
   color: 'white',
   border: 'none',
   padding: '10px 20px',
   borderRadius: '5px',
   cursor: 'pointer',
   fontSize: '16px',
   fontWeight: 'bold',
   transition: 'background-color 0.3s' // Smooth transition for background color change
 }}
 onMouseEnter={(e) => (e.target.style.backgroundColor = 'darkred')} // Hover effect
 onMouseLeave={(e) => (e.target.style.backgroundColor = 'red')} // Reset color on hover out
>
 Revoke Order
</button>
 
{showCancelOverlay && (
  <div className="overlay">
    <div className="overlay-content">
      <h2>Cancel Order</h2>
      <p>Are you sure you want to cancel this order?</p>
      <div>
        <label htmlFor="reason">Select a reason:</label>
        <select id="reason">
          <option value="item_not_needed">Item is not needed</option>
          <option value="found_better_deal">Found a better deal</option>
          <option value="delayed_delivery">Delayed delivery</option>
          <option value="other">Other (please specify)</option>
        </select>
        <div style={{paddingtop:'10px'}}>
      <textarea style={{margintop:'10px'}}
        id="reasonDetails"
        placeholder="Additional details (optional)" 
      ></textarea>
      </div>
      </div>
      <button onClick={handleCancelOrder}>Yes, Cancel</button>
      <button onClick={() => setShowCancelOverlay(false)}>No, Go Back</button>
    </div>
  </div>
)}


      
    </div>
  );
}

export default OrderDetails;




