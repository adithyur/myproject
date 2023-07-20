import React, { useState } from 'react';
import "./ProductManagement.css";
import  UserNav from './UserNav';
import { Placeholder } from 'react-bootstrap';
import AddProduct from './AddProduct';


export default function ProductManagement() {
 

  const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      const [isProduct, setisProduct] = useState('ViewProduct');
      const View = (name) => {
          setisProduct(name);
        };
    
  return (
    <div>
        <div>
            < UserNav/>
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
        <a href="/ViewProduct">View Product</a>
        <a href="/AddProduct">Add Product</a>
        <a href="/ViewProduct">Update Product</a>
        <a href="/ViewProduct">Delete Product</a>
      </div>
    </div>
                </div>
                <div>
                    <AddProduct/>
                </div>
                <div>
                    
                </div>
                
            </div>
            </div>
    </div>
  )
}
