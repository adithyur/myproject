import React, { useState, useEffect } from 'react';
import "./ProductManagement.css";
import NoIconNav from './NoIconNav';
import axios from 'axios';
import AddProduct from './AddProduct';

import { BsDatabaseFillAdd } from 'react-icons/bs';
 


export default function ProductManagement() {
 
  const [showUser, setShowUser] = useState(false);
  const [showUser1, setShowUser1] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      const [isProduct, setisProduct] = useState('ViewProduct');
      const View = (name) => {
          setisProduct(name);
        };

        useEffect(() => {
          handleCheck();
        }, []);

        const handleCheck = async () => {
          const res = await axios.get(`http://localhost:8000/api/user/userdetail/${localStorage.getItem('authid')}`);
          const role= res.data.trade;
          console.log('role : ',role)
          if(role==='sell'){
            setShowUser1(true);
            
          }
          else{
            setShowUser(true);
          }
        }

    
  return (
    <div>
       <div>
          {showUser && (
          < NoIconNav/> 
          )}
          {showUser1 && (
            <div style={{height:'80px', borderBottom:'1px solid rgb(225, 217, 217)', marginTop:'30px', marginLeft:'100px', display:'flex', marginRight:'100px',position:'fixed',overflow:'hidden',top:'0', width:'100%'  /*backgroundColor:'blanchedalmond'*/ }}>
              <a className="pnav" style={{textAlign:'left', fontWeight:'bold', fontSize:'30px', fontFamily:'unset', paddingTop:'5px'}} href='/SellerHome'>New2U</a>
            </div>
          )}
      </div>
      <div className='Add'>
          <div style={{marginTop:'50px'}}>
              <a href="/ViewProduct" style={{textDecorationColor:'black', color:'black', fontWeight:'bold',fontSize:'24px', fontFamily:'time new roman'}}>
                  View Product
              </a>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <a href="/AddProduct" style={{paddingleft:'25px', textDecorationColor:'black', color:'black', fontWeight:'bold',fontSize:'24px', fontFamily:'time new roman'}}>
                  Add Product
              </a>

                    </div>
                </div>
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '28px',
            paddingTop: '70px',
          }}
        >
          <BsDatabaseFillAdd style={{color:'green'}}/> Add Product
        </p>
                <div>
                    <AddProduct/>
                </div>
                <div>
                <button style={{border:'none', backgroundColor:'transparent', color:'transparent'}}>hi</button>
                </div>
                
            </div>
  )
}
