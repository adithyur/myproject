import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ViewOrders.css"
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';

function ViewOrders() {

  const [orderHistory, setOrderHistory] = useState([]);

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
                    <div className='verifierdashdiv'>
                        <FaEye style={{fontSize: '22'}}/>
                        <a className='dashtxt' style={{marginLeft:'5px'}}>VIEW ORDERS</a>
                    </div>
              </td>
              </tr>
              <tr>
                <td className='verifierhomedashtd2'>
                    <div className='verifierdashdiv2'>
                        <FaTag style={{fontSize: '15'}}/>
                        <a href="/ApproveProduct" className='dashtxt' style={{marginLeft:'5px'}}>APPROVE PRODUCT</a>
                    </div>
                </td>
              </tr>
              <tr>
                <td className='verifierhomedashtd2'>
                  <div className='verifierdashdiv1'>
                    <FaEye style={{fontSize: '22'}}/>
                    <a href='UpdateOrder' className='dashtxt' style={{marginLeft:'5px'}}>UPDATE ORDERS</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='verifierhomedashtd2'>
                  <div className='verifierdashdiv1'>
                    <FaEye style={{fontSize: '22'}}/>
                    <a href='UpdateOrder' className='dashtxt' style={{marginLeft:'5px'}}>VIEW COMPLAINTS</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='verifierhomedashtd'>
                <BiLogOut style={{fontSize: '22'}}/>
                <a className='dashtxt' style={{marginLeft:'5px'}}>LOGOUT</a>
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
  )
}

export default ViewOrders