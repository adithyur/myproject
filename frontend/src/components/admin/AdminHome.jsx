import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./AdminHome.css"
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { FaRobot } from 'react-icons/fa';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';


function AdminHome() {

  const [userCount, setUserCount] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [verifierCount, setVerifierCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/countUsers');
        const { count } = response.data;
        setUserCount(count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, []);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/countProducts');
        const { count } = response.data;
        setProductCount(count);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, []);

  useEffect(() => {
    const fetchVerifierCount = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/countVerifier');
        const { count } = response.data;
        setVerifierCount(count);
      } catch (error) {
        console.error('Error fetching verifier count:', error);
      }
    };

    fetchVerifierCount();
  }, []);

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/order/countOrders');
        const { count } = response.data;
        setOrderCount(count);
      } catch (error) {
        console.error('Error fetching order count:', error);
      }
    };

    fetchOrderCount();
  }, []);

  const logout = () => {
    setShowLogoutOverlay(true); 
  }

  const handleLogoutOrder = () => {
    localStorage.removeItem('authid')
    navigate('/')
  };

  
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };


  return (
    <div className='fulladmin'>
        <div className='sideoption'>
          <div className='sideoption1'>
            <h1 href='AdminHome' style={{paddingTop:'20px'}}>New2U</h1>
            <table style={{width:'100%', marginTop:'40px'}}>
              <tr>
                <td href='AdminHome' className='admindashtd1'>
                  <div className='admindashdiv'>
                  <AiOutlineHome style={{fontSize:'22'}}/>
                  <a href='AdminHome' className='dashtxt' style={{marginLeft:'5px'}}>HOME</a>
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
                <div href='/ViewVerifier' className='admindashdiv2'>
                <FaRobot style={{fontSize: '22'}}/>
                <a href='/ViewVerifier' className='dashtxt' style={{marginLeft:'5px'}}>MANAGE VERIFIER</a>
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
                <td className='admindashtd2'>
                <div  href='/AdmiViewOrder' className='admindashdiv2'>
                <FaEye style={{fontSize: '22'}}/>
                <a  href='/AdmiViewOrder' className='dashtxt' style={{marginLeft:'5px'}}>VIEW ORDERS</a>
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
          <div className='adminbody1'>
            <div className='adminbody2'>
              <div className='adminbodyicon1'>
                <FaUsers style={{fontSize: '30', color:'violet'}}/>
                  &nbsp; {userCount} USERS
              </div>
              <div className='adminbodyicon2'>
                <FaRobot style={{fontSize: '30', color:'red'}}/>
                &nbsp; {verifierCount} VERIFIER
              </div>
            </div>
            <div className='adminbody3'>
                <div className='adminbodyicon3'>
                  <FaTag style={{fontSize: '22', color:'orange'}}/>
                  &nbsp; {productCount} PRODUCTS
                </div>
             <div className='adminbody4'>
                <FaCheckCircle size={30} color="green" />
                &nbsp; {orderCount} ORDER COMPLETED
              </div>
            </div>
 
          </div>
        </div>
    </div>
  )
}

export default AdminHome