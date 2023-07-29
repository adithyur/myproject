import React, { useState ,useEffect } from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import "./ProductManagement.css";
import "./ViewProduct.css"
import  UserNav from './UserNav';
import { useNavigate } from "react-router-dom";

function ViewProduct() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const [product,setproduct]= useState([])
    const fetchproduct=async()=>{
      const res=await axios.get(`http://localhost:8000/api/products/getproductbyuserid/${localStorage.getItem('authid')}`)
      setproduct(res.data)
      console.log(res.data)
      console.log(res.data.productName)
    }
  
    useEffect(() => {
      
    fetchproduct()
    }, [category])

    const navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

  return  (
  <div>
  <div>
      <UserNav/>
  </div>
  <div className='Add'>
      <div className='Add1'>
          <div className='Add2'>
              PRODUCT MANAGEMENT
              <div className={`dropdown ${isOpen ? 'open' : ''}`}>
<button className="dropdown-btn1" onClick={toggleDropdown}>
  Product Management <i className="fa fa-caret-down" />
</button>
<div className="dropdown-content1">
  <a href="/ViewProduct">View Product </a>
  <a href="/ProductManagement">Add Product</a>
  <a href="/UpdateProduct">Update Product</a>
  <a href="/DeleteProduct">Delete Product</a>
</div>
</div>

          </div>
          <div className="table-container">
          <table className='viewproduct_table'>
      <thead>
        <tr className='viewproduct_tr'>
          <th className='viewproduct_th'>Product Name</th>
          <th className='viewproduct_th'>Price</th>
          <th className='viewproduct_th'>Product Type</th>
          <th className='viewproduct_th'>Category</th>
          <th className='viewproduct_th'>Brand</th>
          <th className='viewproduct_th'>Image</th>
        </tr>
      </thead>
      <tbody>
        {product.map((product, index) => (
          <tr key={index} className='view_table_tr'>
            <td className='viewproduct_td'>{product.productName}</td>
            <td className='viewproduct_td'>{product.price}</td>
            <td className='viewproduct_td'>{product.productType}</td>
            <td className='viewproduct_td'>{product.category}</td>
            <td className='viewproduct_td'>{product.brand}</td>
            <td>
              <img src={`http://localhost:8000/${product.image}`} alt="Product" style={{ height: '50px' }} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
          </div>
          <div>
              
          </div>
          
      </div>
      </div>
</div>
)
}

export default ViewProduct