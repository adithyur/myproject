import "./ViewOrders.css"
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';

function ViewOrders() {
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
        <table className='verifierproduct_table'>
      <thead>
        <tr className='verifierproduct_tr'>
            
            <th className='verifierproduct_th'>User Id</th>
          <th className='verifierproduct_th'>Product id</th>
          <th className='verifierproduct_th'>Price</th>
          <th className='verifierproduct_th'>Product Type</th>
          <th className='verifierproduct_th'>Status</th>
          <th className='verifierproduct_th'>Image</th>
          
        </tr>
      </thead>
      <tbody>
          <tr className='verifier_table_tr'>
            
            <td className='verifierproduct_td'>648b618e8cd8cafefda3b467</td>
            <td className='verifierproduct_td'>649829df0fb09883118bad65</td>
            <td className='verifierproduct_td'>₹3,605</td>
            <td className='verifierproduct_td'>Black Marble Chess Board</td>
            <td className='verifierproduct_td'>Delivered</td>
            <td>
              <img src='https://rukminim2.flixcart.com/image/416/416/kf0087k0/board-game/r/a/4/magnetic-chess-an-enterprise-original-imafvkyzedbwkzbw.jpeg?q=70' alt="Product" style={{ height: '50px' }} />
            </td>
          </tr>

          

      </tbody>
    </table>

        </div>
    </div>
  )
}

export default ViewOrders