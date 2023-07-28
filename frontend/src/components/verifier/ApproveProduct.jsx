import React, { useState ,useEffect } from 'react';

import axios from 'axios'
import './ApproveProduct.css'
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { Button } from 'bootstrap';

function ApproveProduct() {


    const [product,setproduct]= useState([])
    const fetchproduct=async()=>{
    const res=await axios.get(`http://localhost:8000/api/products/getproduct`)
    setproduct(res.data)
    }

    useEffect(() => {
        fetchproduct()
    }, [product])




  return (
    <div className='fullverifier'>
        <div className='sideoption'>
          <div className='sideoption1'>
            <h1 style={{paddingTop:'20px'}}>New2U</h1>
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
                    <div className='verifierdashdiv'>
                        <FaTag style={{fontSize: '15'}}/>
                        <a href="/ApproveProduct"className='dashtxt' style={{marginLeft:'5px'}}>APPROVE PRODUCT</a>
                    </div>
                </td>
              </tr>
              <tr>
                <td className='verifierhomedashtd2'>
                    <div className='verifierdashdiv2'>
                        <FaEye style={{fontSize: '22'}}/>
                        <a className='dashtxt' style={{marginLeft:'5px'}}>VIEW ORDERS</a>
                    </div>
                </td>
              </tr>
              <tr>
                <td className='verifierhomedashtd2'>
                    <div className='verifierdashdiv2'>
                        <FaEye style={{fontSize: '22'}}/>
                        <a className='dashtxt' style={{marginLeft:'5px'}}>UPDATE ORDERS</a>
                    </div>
                </td>
              </tr>
              <tr>
                <td className='verifierhomedashtd2'>
                    <div className='verifierdashdiv2'>
                        <BiLogOut style={{fontSize: '22'}}/>
                        <a className='dashtxt' style={{marginLeft:'5px'}}>LOGOUT</a>
                    </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className='verifierbody'>
          
            <table className='verifierproduct_table'>
      <thead>
        <tr className='verifierproduct_tr'>
            <th className='verifierproduct_th'></th>
            <th className='verifierproduct_th'>User Id</th>
          <th className='verifierproduct_th'>Product Name</th>
          <th className='verifierproduct_th'>Price</th>
          <th className='verifierproduct_th'>Product Type</th>
          <th className='verifierproduct_th'>Category</th>
          <th className='verifierproduct_th'>Brand</th>
          <th className='verifierproduct_th'>Image</th>
        </tr>
      </thead>
      <tbody>
          <tr className='verifier_table_tr'>
            <td className='verifierproduct_td'>
                <input type='checkbox'/>
            </td>
            <td className='verifierproduct_td'>648b618e8cd8cafefda3b467</td>
            <td className='verifierproduct_td'>Nothing Ear 2</td>
            <td className='verifierproduct_td'>₹9,999</td>
            <td className='verifierproduct_td'>Headset</td>
            <td className='verifierproduct_td'>Bluetooth Headset</td>
            <td className='verifierproduct_td'>Nothing</td>
            <td>
              <img src='https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/x/m/v/-original-imagnydghgvy9huf.jpeg?q=70' alt="Product" style={{ height: '50px' }} />
            </td>
          </tr>

      </tbody>
    </table>

    <button className="button-24" role="button">Approve</button>

    <button className="button-124" role="button">DECLINE</button>

        </div>
    </div>
  )
}

export default ApproveProduct