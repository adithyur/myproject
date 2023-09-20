import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./VerifierHome.css";
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { LuFileBox } from 'react-icons/lu';

function AdOrderDetail() {
    
    const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('orderId');
    const productId = searchParams.get('productId');
    const [transactionDetails, setTransactionDetails] = useState(null);

    const [orderDetails, setOrderDetails] = useState(null);
    const [product, setProduct] = useState({});
    const [averageRating, setAverageRating] = useState(0);
    const navigate = useNavigate();

    const logout = () => {
        setShowLogoutOverlay(true); 
    }

    const handleLogoutOrder = () => {
        localStorage.removeItem('authid')
        navigate('/')
    };

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

    return (
        <div className='fullverifier'>
            <div className='sideoption' style={{position:'fixed'}}>
                <div className='sideoption1'>
                <a href='VerifierHome' style={{textDecoration:'none', color:'white'}}>
                    <h1 style={{paddingTop:'20px'}}>New2U</h1>
                </a>
                <table style={{width:'100%', marginTop:'40px'}}>
                    <tr>
                        <td className='verifierhomedashtd2'>
                            <div className='verifierdashdiv2'>
                                <AiOutlineHome style={{fontSize:'22'}}/>
                                <a className='dashtxt' style={{marginLeft:'5px'}}>HOME</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='verifierhomedashtd1'>
                            <div className='verifierdashdiv'>
                                <FaEye style={{fontSize: '22'}}/>
                                <a href='/ViewOrders' className='dashtxt' style={{marginLeft:'5px'}}>VIEW ORDERS</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='verifierhomedashtd2'>
                            <div className='verifierdashdiv2'>
                                <FaTag style={{fontSize: '15'}}/>
                                <a href="/ApproveProduct"className='dashtxt' style={{marginLeft:'5px'}}>APPROVE PRODUCT</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='verifierhomedashtd2'>
                            <div href='/UpdateOrder' className='verifierdashdiv2'>
                                <FaEye style={{fontSize: '22'}}/>
                                <a href='/UpdateOrder' className='dashtxt' style={{marginLeft:'5px'}}>UPDATE ORDERS</a>
                            </div>
                        </td> 
                    </tr>
                    <tr>
                        <td className='verifierhomedashtd2'>
                            <div className='verifierdashdiv2'>
                                <FaEye style={{fontSize: '22'}}/>
                                <a className='dashtxt' style={{marginLeft:'5px'}}>VIEW COMPLAINTS</a>
                            </div>
                        </td> 
                    </tr>
                    <tr>
                        <td className='verifierhomedashtd' style={{cursor:'pointer'}}>
                            <BiLogOut style={{fontSize: '22'}}/>
                            <a onClick={logout} className='dashtxt' style={{marginLeft:'5px'}}>LOGOUT</a>
                            {showLogoutOverlay && (
                                <div className="overlay">
                                    <div className="overlay-content">
                                        <h2>Signing Off</h2>
                                        <p>Are you sure you want to logout?</p>
                                        <button onClick={handleLogoutOrder}>Yes, Cancel</button>
                                        <button onClick={() => setShowLogoutOverlay(false)}>No, Go Back</button>
                                    </div>
                                </div>
                            )}
                        </td>
                    </tr>
                </table>
                </div>
            </div>
            <div className='verifierbody'>
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
                            </div>
                        </div>
                    </div>
                    <div>
                        <p style={{fontSize:'18px', fontWeight:'bold'}}>Payment Details</p>
                        {transactionDetails ? (
                            <>
                                <p>Payment Mode: {transactionDetails.mode}</p>
                                <p>Amount: ₹ {transactionDetails.amount}</p>
                                <p>Date: {transactionDetails.date}</p>
                            </>
                        ) : (
                            <p>Loading payment details...</p>
                        )}
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default AdOrderDetail;
