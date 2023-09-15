import React, { useState } from 'react';
import "./ProductManagement.css";
import NoIconNav from './NoIconNav';
import { Placeholder } from 'react-bootstrap';
import AddProduct from './AddProduct';

import { BsDatabaseFillAdd } from 'react-icons/bs';
 


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
            <NoIconNav/>
        </div>
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '28px',
            paddingTop: '50px',
          }}
        >
          <BsDatabaseFillAdd style={{color:'green'}}/> Add Product
        </p>
        <div className='Add'>
            <div className='Add1'>
                <div className='Add2'>
                    
                    <div >
                      <p className="dropdown-btn1">
                        Product Management 
                      </p>

                      <div style={{backgroundColor:'#ccc',marginLeft:'150px', width:'300px', height:'50px'}}>
                        <a href="/ViewProduct">
                          View Product
                        </a>
                      </div>
                      
                       
                      <div style={{backgroundColor:'#ccc',marginLeft:'150px', width:'300px', height:'50px'}}>
                        <a href="/AddProduct">
                          Add Product
                        </a>
                      </div>

                      <div style={{backgroundColor:'#ccc',marginLeft:'150px', width:'300px', height:'50px'}}>
                        <a href="/ViewProduct">
                          Update Product
                        </a>
                      </div>

                      <div style={{backgroundColor:'#ccc',marginLeft:'150px', width:'300px', height:'50px'}}>
                        <a href="/ViewProduct">
                          Orders
                        </a>
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
