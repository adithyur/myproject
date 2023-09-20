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


function ManageProduct() {

    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
    const navigate=useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/products/getproduct');
            setProducts(response.data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
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

    const handleDecline = async (productId) => {
        if (productId) {
          const reason = prompt("Enter reason for declining:");
          if (reason !== null) {
            try {
              const updatedProduct = { status: 'rejected', reason };
              await axios.put(`http://localhost:8000/api/products/unupdate/${productId}`, updatedProduct);
              //fetchProducts();
            } catch (error) {
              console.error('Error declining product:', error);
            }
          } else {
            console.log('No reason provided for decline');
          }
        } else {
          console.log('No product selected for decline');
        }
      };
  
  return (

    <div className='fulladmin' style={{width:'1800px'}}>
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
                <FaTag style={{fontSize: '15'}}/>
                <a className='dashtxt' style={{marginLeft:'5px'}}>MANAGE PRODUCT</a>
                </div>
                </td>
              </tr>
              <tr>
                <td className='admindashtd2'>
                <div className='admindashdiv2'>
                <FaEye style={{fontSize: '22'}}/>
                <a className='dashtxt' style={{marginLeft:'5px'}}>VIEW ORDERS</a>
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
        <div>
        <table className='verifierproduct_table' style={{width:'100%', marginLeft:'75px'}}>
      <thead>
        <tr className='verifierproduct_tr'>
            <th className='verifierproduct_th'>User Id</th>
            <th className='verifierproduct_th'>Product Name</th>
            <th className='verifierproduct_th'>Price</th>
            <th className='verifierproduct_th'>Product Type</th>
            <th className='verifierproduct_th'>Category</th>
            <th className='verifierproduct_th'>Status</th>
            <th className='verifierproduct_th'>Reason</th>
            <th className='verifierproduct_th'></th>
            
        </tr>
        </thead>
        <tbody>
            {products && products.map((details, index) => (
            <tr className='verifier_table_tr' key={index}>
                <td className='verifierproduct_td'>{details.sellerid}</td>
                <td className='verifierproduct_td'>{details.productName}</td>
                <td className='verifierproduct_td'>{details.price}</td>
                <td className='verifierproduct_td'>{details.productType}</td>
                <td className='verifierproduct_td'>{details.category}</td>
                <td className='verifierproduct_td'>{details.status}</td>
                <td className='verifierproduct_td'>
                    {details.status === 'rejected' && details.reason && (
                    <div className="reason-message">
                        <strong>{details.reason}</strong> 
                    </div>
                    )}
                </td>
                <td className='verifierproduct_td'>
                    <button className="button-124" role="button" onClick={() => handleDecline(details._id)}>DECLINE</button>
                </td>
            </tr>
        ))}

      </tbody>
        </table>
        </div>
    </div>
  )
}

export default ManageProduct