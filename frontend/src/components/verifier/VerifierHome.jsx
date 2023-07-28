import React from 'react'
import "./VerifierHome.css"
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';


function VerifierHome() {
  return (
    <div className='fullverifier'>
        <div className='sideoption'>
          <div className='sideoption1'>
            <h1 style={{paddingTop:'20px'}}>New2U</h1>
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
                <td className='verifierhomedashtd'>
                    <FaEye style={{fontSize: '22'}}/>
                    <a className='dashtxt' style={{marginLeft:'5px'}}>VIEW ORDERS</a>
                </td>
              </tr>
              <tr>
                <td className='verifierhomedashtd'>
                <FaEye style={{fontSize: '22'}}/>
                <a className='dashtxt' style={{marginLeft:'5px'}}>UPDATE ORDERS</a>
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
          
        </div>
    </div>
  )
}

export default VerifierHome