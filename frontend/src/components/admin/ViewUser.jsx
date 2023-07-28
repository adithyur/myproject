import React from 'react'
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { FaRobot } from 'react-icons/fa';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';

function ViewUser() {
  return (
   <div className='fulladmin'>
        <div className='sideoption'>
          <div className='sideoption1'>
            <h1 style={{paddingTop:'20px'}}>New2U</h1>
            <table style={{width:'100%', marginTop:'40px'}}>
              <tr>
                <td className='admindashtd1'>
                  <div className='admindashdiv1'>
                  <AiOutlineHome style={{fontSize:'22'}}/>
                  <a className='dashtxt' style={{marginLeft:'5px'}}>HOME</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='admindashtd1'>
                <div className='admindashdiv'>
                <FaUsers style={{fontSize: '22'}}/>
                <a className='dashtxt' style={{marginLeft:'5px'}}>MANAGE USER</a>
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
        <table className='verifierproduct_table'>
      <thead>
        <tr className='verifierproduct_tr'>
            
        <th className='verifierproduct_th'></th>
            <th className='verifierproduct_th'>User Id</th>
          <th className='verifierproduct_th'>User Name</th>
          <th className='verifierproduct_th'>Email iD</th>
          <th className='verifierproduct_th'>Trade Type</th>
          
        </tr>
      </thead>
      <tbody>
          <tr className='verifier_table_tr'>

          <td className='verifierproduct_td'>
                <input type='checkbox'/>
            </td>
            
            <td className='verifierproduct_td'>648b618e8cd8cafefda3b467</td>
            <td className='verifierproduct_td'>Adhi</td>
            <td className='verifierproduct_td'>adhi@gmail.com</td>
            <td className='verifierproduct_td'>Both</td>

          </tr>

      </tbody>
    </table>
    <button className="button-124" role="button">REMOVE</button>

        </div>
        </div>

  )
}

export default ViewUser