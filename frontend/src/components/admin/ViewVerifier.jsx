import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { FaRobot } from 'react-icons/fa';
import { FaTag } from 'react-icons/fa';

function ViewVerifier() {

    const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
    const [verifier, setVerifier] = useState([]);
    const navigate=useNavigate()


    const logout = () => {
        setShowLogoutOverlay(true); 
      }
    
      const handleLogoutOrder = () => {
        localStorage.removeItem('authid')
        navigate('/')
      };

      
    useEffect(() => {
    fetchVerifier();
  }, []);

      const fetchVerifier = async () => {
        try {
          const res = await axios.post('http://localhost:8000/api/user/viewverifier');
          console.log("data : ",res.data)
          setVerifier(res.data);
        } catch (error) {
          console.error('Error fetching verifier:', error);
        }
      };
    
      const deleteVerifier = async (userId) => {
        try {
          await axios.delete(`http://localhost:8000/api/user/delete/${userId}`);
          // Remove the deleted user from the users list
          setVerifier(verifier.filter(user => user._id !== userId));
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };
      
  return (
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
            <td className='admindashtd1'>
            <div className='admindashdiv'>
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
            <td className='admindashtd2'>
            <div href='/AdmiViewOrder' className='admindashdiv2'>
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
        
          <th className='verifierproduct_th'>User Id</th>
          <th className='verifierproduct_th'>User Name</th>
          <th className='verifierproduct_th'>Email iD</th>
          <th className='verifierproduct_th'></th>
          
        </tr>
      </thead>
      <tbody>
      {verifier.map((user) => (
            <tr key={user._id} className='verifier_table_tr'>
          
              <td className='verifierproduct_td'>{user._id}</td>
              <td className='verifierproduct_td'>{user.name}</td>
              <td className='verifierproduct_td'>{user.email}</td>
             <td className='verifierproduct_td'>
                <button className="button-124" role="button" onClick={() => deleteVerifier(user._id)}>REMOVE</button>
      </td>
            </tr>
          ))}

      </tbody>
    </table>

        </div>
    </div>
)
}

export default ViewVerifier