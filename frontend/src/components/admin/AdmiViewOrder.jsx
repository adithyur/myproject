import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { FaRobot } from 'react-icons/fa';
import { FaTag } from 'react-icons/fa';



function AdmiViewOrder() {

    const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
    const [orderHistory, setOrderHistory] = useState([]);
    const navigate=useNavigate()


    const logout = () => {
        setShowLogoutOverlay(true); 
      }
    
      const handleLogoutOrder = () => {
        localStorage.removeItem('authid')
        navigate('/')
      };

      useEffect(() => {
        fetchOrderHistory();
      }, []);
    
      const fetchOrderHistory = async () => {
        try {
          const res = await axios.post('http://localhost:8000/api/order/viewOrder');
          setOrderHistory(res.data);
        } catch (error) {
          console.error('Error fetching order history:', error);
        }
      };
    
  return (
    <div>
        <div className='fulladmin'>
        <div className='sideoption'>
          <div className='sideoption1'>
            <h1 href='/AdminHome' style={{paddingTop:'20px'}}>New2U</h1>
            <table style={{width:'100%', marginTop:'40px'}}>
              <tr>
                <td href='/AdminHome' className='admindashtd2'>
                  <div className='admindashdiv2'>
                  <AiOutlineHome style={{fontSize:'22'}}/>
                  <a href='/AdminHome' className='dashtxt' style={{marginLeft:'5px'}}>HOME</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='admindashtd1'>
                <div href='ViewUser'className='admindashdiv1'>
                <FaUsers style={{fontSize: '22'}}/>
                <a href='ViewUser' className='dashtxt' style={{marginLeft:'5px', width:'100%'}}>MANAGE USER</a>
                </div>
              </td>
              </tr>
              <tr>
                <td className='admindashtd2'>
                <div className='admindashdiv2'>
                <FaRobot style={{fontSize: '22'}}/>
                <a className='dashtxt' style={{marginLeft:'5px'}}>MANAGE VERIFIER</a>
                </div>
                </td>
              </tr>
              <tr>
                <td className='admindashtd2'>
                <div href='/ManageProduct' className='admindashdiv2'>
                <FaTag style={{fontSize: '15'}}/>
                <a href='/ManageProduct' className='dashtxt' style={{marginLeft:'5px'}}>MANAGE PRODUCT</a>
                </div>
                </td>
              </tr>
              <tr>
                <td className='admindashtd1'>
                <div href='/AdmiViewOrder' className='admindashdiv'>
                <FaEye style={{fontSize: '22'}}/>
                <a href='/AdmiViewOrder' className='dashtxt' style={{marginLeft:'5px'}}>VIEW ORDERS</a>
                </div>
                </td>
              </tr>
              <tr>
                <td className='admindashtd2'>
                <div className='admindashdiv2'>
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
                </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
    <div className='adminbody'>
        <table className='verifierproduct_table'>
      <thead>
        <tr className='verifierproduct_tr'>
            
          <th className='verifierproduct_th'>Order Id</th>
          <th className='verifierproduct_th'>User Id</th>
          <th className='verifierproduct_th'>Seller Id</th>
          <th className='verifierproduct_th'>Price</th>
          <th className='verifierproduct_th'>Status</th>
          <th className='verifierproduct_th'></th>
          
        </tr>
      </thead>
      <tbody>
      {orderHistory.map((order, index) => (
            <tr key={index} className='verifier_table_tr'>
            
            <td className='verifierproduct_td'>{order.orderid}</td>
            <td className='verifierproduct_td'>{order.userid}</td>
            <td className='verifierproduct_td'>{order.sellerid}</td>
            <td className='verifierproduct_td'>₹{order.total}</td>
            <td className='verifierproduct_td'>{order.status}</td>
            <td>
            <a style={{textDecoration:'underline', color:'blue'}}>View More</a>
            </td>
          </tr>

          
      ))}
      </tbody>
    </table>

        </div>
    </div>
    </div>
  )
}

export default AdmiViewOrder