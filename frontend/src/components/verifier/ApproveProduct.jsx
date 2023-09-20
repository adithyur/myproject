import React, { useState ,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './ApproveProduct.css'
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { FaTag } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { Button } from 'bootstrap';

function ApproveProduct() {


    const [product,setProduct]= useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);

    const navigate=useNavigate()

    const fetchUnverifiedProducts = async () => {
      try {
        const res = await axios.post('http://localhost:8000/api/products/unproducts');
        setProduct(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching unverified products:', error);
      }
    };
  
    useEffect(() => {
      fetchUnverifiedProducts();
    }, []);

    const handleApprove = async (selectedProduct) => {
      if (selectedProduct) {
        console.log(selectedProduct);
        try {
          const updatedProduct = { ...selectedProduct, status: 'verified' };
          await axios.put(`http://localhost:8000/api/products/unupdate/${selectedProduct}`, updatedProduct);
          // Product status updated to 'verified', now you can refetch the unverified products
          fetchUnverifiedProducts();
        } catch (error) {
          console.error('Error approving product:', error);
        }
      } else {
        // Handle the case where no product is selected
        console.log('No product selected for approval');
      }
    };
    const handleDecline = async (productId) => {
      if (productId) {
        const reason = prompt("Enter reason for declining:");
        if (reason !== null) {
          try {
            const updatedProduct = { status: 'rejected', reason };
            await axios.put(`http://localhost:8000/api/products/unupdate/${productId}`, updatedProduct);
            // Product status updated to 'rejected', now you can refetch the unverified products
            fetchUnverifiedProducts();
          } catch (error) {
            console.error('Error declining product:', error);
          }
        } else {
          console.log('No reason provided for decline');
        }
      } else {
        // Handle the case where no product is selected
        console.log('No product selected for decline');
      }
    };

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
            <th className='verifierproduct_th'></th>
        </tr>
      </thead>
      <tbody>
      {product && product.map((details, index) => (
  <tr className='verifier_table_tr' key={index}>
    <td className='verifierproduct_td'>
      <button className="button-24" role="button" onClick={() => handleApprove(details._id)}>Approve</button>
    </td>
    <td className='verifierproduct_td'>{details.sellerid}</td>
    <td className='verifierproduct_td'>{details.productName}</td>
    <td className='verifierproduct_td'>{details.price}</td>
    <td className='verifierproduct_td'>{details.productType}</td>
    <td className='verifierproduct_td'>{details.category}</td>
    <td className='verifierproduct_td'>{details.brand}</td>
    <td>
      <img src={`http://localhost:8000/${details.image}`} alt="Product" style={{ height: '50px' }} />
    </td>
    <td className='verifierproduct_td'>
      <button className="button-124" role="button" onClick={() => handleDecline(details._id)}>DECLINE</button>
    </td>
    <td className='verifierproduct_td'>
      {details.status === 'rejected' && details.reason && (
        <div className="reason-message">
          <strong>Reason for Decline:</strong> {details.reason}
        </div>
      )}
    </td>
  </tr>
))}

      </tbody>
    </table>

    
    {/*<button className="button-124" role="button" onClick={() => handleDecline(details._id)}>DECLINE</button>*/}

        </div>
    </div>
  )
}

export default ApproveProduct