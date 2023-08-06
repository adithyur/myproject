import React, { useState ,useEffect } from 'react';

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
      {product && product.map((details, index) => (
          <tr className='verifier_table_tr' key={index}>
            <td className='verifierproduct_td'>
              <button className="button-24" role="button" onClick={() => handleApprove(details._id)}>Approve</button>
            </td>
            <td className='verifierproduct_td'>{details.userid}</td>
            <td className='verifierproduct_td'>{details.productName}</td>
            <td className='verifierproduct_td'>{details.price}</td>
            <td className='verifierproduct_td'>{details.productType}</td>
            <td className='verifierproduct_td'>{details.category}</td>
            <td className='verifierproduct_td'>{details.brand}</td>
            <td>
              <img src={`http://localhost:8000/${details.image}`} alt="Product" style={{ height: '50px' }} />
            </td>
          </tr>
          ))}
      </tbody>
    </table>


    <button className="button-124" role="button">DECLINE</button>

        </div>
    </div>
  )
}

export default ApproveProduct