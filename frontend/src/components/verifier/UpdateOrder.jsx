import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import "./VerifierHome.css"


function UpdateOrder() {

    const [order, setOrder] = useState([]);
    const [newStatus, setNewStatus] = useState('');
    const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);

    const navigate=useNavigate()
    
  
    useEffect(() => {
      fetchOrder();
    }, []);
  
    const fetchOrder = async () => {
      try {
        const res = await axios.post('http://localhost:8000/api/order/viewveriOrder');
        setOrder(res.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };
  
    const handleUpdateStatus = async (orderId) => {
      if (newStatus)
       {
        console.log('status : ',newStatus)
        try {
          await axios.put(`http://localhost:8000/api/order/statusUpdate/${orderId}`, { status: newStatus });
          alert('Order status updated successfully');
          fetchOrder(); // Fetch updated order history
          setNewStatus('');
        } catch (error) {
          console.error('Error updating order status:', error);
          alert('Error updating order status');
        }
      } else {
        alert('Please select a new status');
      }
    };

    const logout = () => {
      setShowLogoutOverlay(true); 
    }
  
    const handleLogoutOrder = () => {
      localStorage.removeItem('authid')
      navigate('/')
    };

  return (
   <div className='fullverifier'>
        <div className='sideoption'>
          <div className='sideoption1'>
          <a href='VerifierHome' style={{textDecoration:'none', color:'white'}}>
            <h1 style={{paddingTop:'20px'}}>New2U</h1>
          </a>
            <table style={{width:'100%', marginTop:'40px'}}>
              <tr>
                <td className='verifierhomedashtd1'>
                  <div className='verifierdashdiv1'>
                  <AiOutlineHome style={{fontSize:'22'}}/>
                  <a href='VerifierHome' className='dashtxt' style={{marginLeft:'5px'}}>HOME</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='verifierhomedashtd1'>
                    <div className='verifierdashdiv1'>
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
                  <div className='verifierdashdiv'>
                    <FaEye style={{fontSize: '22'}}/>
                    <a className='dashtxt' style={{marginLeft:'5px'}}>UPDATE ORDERS</a>
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
          <table className='verifierproduct_table'>
      <thead>
        <tr className='verifierproduct_tr'>
            <th className='verifierproduct_th'>Order Id</th>
          <th className='verifierproduct_th'>Current Status</th>
          <th className='verifierproduct_th1'>New Status</th>
          <th className='verifierproduct_th'>Delivery Date</th>
          <th className='verifierproduct_th'></th>
        </tr>
      </thead>
      <tbody>
      
      {order.map((order) => (
              <tr key={order.orderId} className='verifier_table_tr'>
                <td className='verifierproduct_td'>{order.orderId}</td>
                <td className='verifierproduct_td'>{order.status}</td>
               
                <td className='verifierproduct_td1'>
                <section id="pattern3">
              <input 
                type="radio" 
                id="g3_1" 
                name="newstatus"
                value="pickup"
                checked={newStatus === 'pickup'}
                onChange={(e) => setNewStatus(e.target.value)}
              />
              <label for="g3_1" style={{paddingLeft:'10px'}}>    Pending Pickup</label>
              <br/>

              <input //className='radioinput' 
                type="radio" 
                id="g3_2" 
                name="newstatus"
                value="transit"
                checked={newStatus === 'transit'}
                onChange={(e) => setNewStatus(e.target.value)}
              />
              <label for="g3_2" style={{paddingLeft:'10px'}}>  In Transit</label>
              <br/>

              <input
                type="radio" 
                id="g3_3" 
                name="newstatus"
                value="outofdelivery"
                checked={newStatus === 'outofdelivery'}
                onChange={(e) => setNewStatus(e.target.value)}
              />
              <label for="g3_3" style={{paddingLeft:'10px'}}>  Out for Delivery</label>
              <br/>

              <input
                type="radio" 
                id="g3_4" 
                name="newstatus"
                value="delivered"
                checked={newStatus === 'delivered'}
                onChange={(e) => setNewStatus(e.target.value)}
              />
              <label for="g3_4" style={{paddingLeft:'10px'}}>  Delivered</label>
              <br/>

              </section>
            </td>

            <td className='verifierproduct_tdate'>
                <label className='datelabel' htmlFor="dateofbirth"></label>
                <input className='datelabel' type="date" name="dateofbirth" id="dateofbirth" />
            </td>
            
                <td className='verifierproduct_td'>
                  <button className="button-24" role="button" onClick={() => handleUpdateStatus(order.orderId)}>Update</button>
                </td>
              </tr>
              
            ))}
          </tbody>
      
    </table>
    
        </div>
    </div>
  )
}


export default UpdateOrder