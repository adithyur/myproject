import React from 'react'
import "./AdminHome.css"
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { FaRobot } from 'react-icons/fa';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';


function AdminHome() {
  return (
    <div className='fulladmin'>
        <div className='sideoption'>
          <div className='sideoption1'>
            <h1 style={{paddingTop:'20px'}}>New2U</h1>
            <table style={{width:'100%', marginTop:'40px'}}>
              <tr>
                <td className='admindashtd1'>
                  <div className='admindashdiv'>
                  <AiOutlineHome style={{fontSize:'22'}}/>
                  <a className='dashtxt' style={{marginLeft:'5px'}}>HOME</a>
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
                <td className='admindashtd'>
                <FaTag style={{fontSize: '15'}}/>
                <a className='dashtxt' style={{marginLeft:'5px'}}>MANAGE PRODUCT</a>
                </td>
              </tr>
              <tr>
                <td className='admindashtd'>
                <FaEye style={{fontSize: '22'}}/>
                <a className='dashtxt' style={{marginLeft:'5px'}}>VIEW ORDERS</a>
                </td>
              </tr>
              <tr>
                <td className='admindashtd'>
                <BiLogOut style={{fontSize: '22'}}/>
                <a className='dashtxt' style={{marginLeft:'5px'}}>LOGOUT</a>
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
                  7 USERS
              </div>
              <div className='adminbodyicon2'>
                <FaRobot style={{fontSize: '30', color:'red'}}/>
                  2 VERIFIER
              </div>
            </div>
            <div className='adminbody3'>
                <div className='adminbodyicon3'>
                  <FaTag style={{fontSize: '22', color:'orange'}}/>
                    46 PRODUCTS
                </div>
             <div className='adminbody4'>
                <FaCheckCircle size={30} color="green" />
                13 ORDER COMPLETED
              </div>
            </div>

          </div>
        </div>
    </div>
  )
}

export default AdminHome