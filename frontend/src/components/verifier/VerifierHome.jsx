import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./VerifierHome.css"
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';


function VerifierHome() {

  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
  const navigate=useNavigate()

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
                  <div className='verifierdashdiv'>
                  <AiOutlineHome style={{fontSize:'22'}}/>
                  <a className='dashtxt' style={{marginLeft:'5px'}}>HOME</a>
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
          
        </div>
    </div>
  )
}

export default VerifierHome