import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./UserNav.css"
import "./Checkout.css"

function Checkout() {

        const [formFields, setFormFields] = useState(['']);
        const [product, setProduct] = useState([]);
        const [bio, setBio]= useState({fname:'',
                                      mobile1:'',
                                      pincode:'',
                                      place:'',
                                      Address:'',
                                      city:'',
                                      state:'',
                                      Landmark:'',
                                      mobile2:''});
        
        const logout = () => {
            localStorage.removeItem('authid')
            navigate('/')
        }

        const navigate=useNavigate()
        const [isOpen, setIsOpen] = useState(false);
        const toggleDropdown = () => {
            setIsOpen(!isOpen);
        };
      

        const fetchProducts = async () => {
          try {
            const res = await axios.get(`http://localhost:8000/api/cart/getcartbyuserid/${localStorage.getItem('authid')}`);
            setProduct(res.data);
            console.log(res.data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
        useEffect(() => {
          fetchProducts()
      },[])

      const fetchBio = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/profile/profile/${localStorage.getItem('authid')}`);
          if(res){
            setBio({fname:res.data.fname,
          mobile1:res.data.fname,
          pincode:res.data.pincode,
          place:res.data.lname,
          Address:res.data.address,
          city:res.data.city,
          state:res.data.state,
          Landmark:res.data.mobile2,
          mobile2:res.data.mobile1});
        console.log(res)}

          else{
            alert("thenj poyi gooyis")
          }
          
          console.log('profile',bio);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };
      useEffect(() => {
        fetchBio()
    },[])

  return (
    <div>
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>New2U</title>
            <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" />
            <link rel="stylesheet" href="style.css" />
            <div className="main-navbar shadow-sm sticky-top">
                <div className="top-navbar">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
                                <div className="gradient-text">
                                    <a className="nav-link" href="/UserHome">
                                    <h5 className="brand-name">New2U</h5>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-5 my-auto">
                                <form role="search">
                                <div className="input-group">
                                    <input type="search" placeholder="Search your product" className="form-control" />
                                    <span className="search-button">
                                    <button className="search-button1" type="submit">
                                    <i className="fa fa-search" />
                                    </button>
                                    </span> 
                                </div>
                                </form>
                            </div>
                            <div className="col-md-5 my-auto">
                                <ul className="nav justify-content-end">
                                <li className="nav-item">
                                <div className="gradient-text">
                                    <a className="nav-link" href="#">
                                    <i className="fa fa-shopping-cart" /> Cart
                                    </a>
                                </div>
                                </li>
                                <li className="nav-item">
                                <div className="gradient-text">
                                    <a className="nav-link" href="#">
                                    <i className="fa fa-heart" /> Wishlist
                                    </a>
                                </div>
                                </li>
                                <li className="nav-item">
                                <div className="gradient-text">
                                    <a className="nav-link" href="/login">
                                    <i className="fa fa-user" /> My Account
                                    </a>
                                </div>
                                </li>
                                <li className="nav-item">
                                    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
                                        <button className="dropdown-btn" onClick={toggleDropdown}>
                                            Profile <i className="fa fa-caret-down" />
                                        </button>
                                    <div className="dropdown-content">
                                        <a href="/Profile">My Profile</a>
                                        <a href="#">Orders</a>
                                        <a href="/ProductManagement">Products</a>
                                        <a onClick={logout}>Logout</a>
                                    </div>
                                </div>
                                </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='checkbody'>
          <div className='subcheckbody'>
            <div className='checkformdiv'>
              <form className='checkform'>

                <div className='vertical1'>
                  <div className='checkform1'>
                  <label className="fname">First Name*</label>
                  <input className="checktxt" 
                    type="text" 
                    
                    name="fname"
                    value={bio.fname}
                  />
                </div>
                <div className='checkform2'>
                  <label className="fname">Mobile Number*</label>
                  <input className="checktxt" 
                    type="text" 
                    
                    name="mobile1"
                    value={bio.mobile1}

                  />
                </div>
                </div>
                <div className='vertical2'>
                <div className='checkform3'>
                  <label className="fname">Pincode*</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="pincode"
                    name="pincode"
                    value={bio.pincode}

                  />
                </div>
                <div className='checkform4'>
                  <label className="fname">Locality*</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="place"
                    name="place"
                    value={bio.fname}
                  />
                </div>
                </div>
                <div className='checkform5'>
                  <label className="fname">Address*</label>
                  <textarea className="checktxt1" 
                    type="text" 
                    placeholder="Address"
                    name="Address"
                    rows="4" cols="1"
                    value={bio.fname}
                  />
                </div>
                <div className='vertical3'>
                <div className='checkform6'>
                  <label className="fname">City*</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="City"
                    name="City"
                    value={bio.city}

                  />
                </div>
                <div className='checkform7'>
                  <label className="fname">State*</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="State"
                    name="State"
                    value={bio.state}
                  />
                </div>
                </div>
                <div className='vertical4'>
                <div className='checkform8'>
                  <label className="fname">Landmark</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="Landmark"
                    name="Landmark"
                    value={bio.state}
                  />
                </div>
                <div className='checkform9'>
                  <label className="fname">Alternate Mobile number</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="mobile2"
                    name="mobile2"
                    value={bio.mobile1}
                  />
                </div>
                </div>
                <button className="button-65" role="button">Save & Delivery here</button>
              </form>
            </div>
            <div className='cartdiv'>
        <h1>YOUR ORDER</h1>
          <div id="overflowTest">
            {product.map((cart, index) => (
            
            <table key={index} style={{textAlign:'left'}}>
              <tr className='ordertr'>
                <td className='ordertd'>
                  <img className='card-img-top' src={`http://localhost:8000/${cart.productDetails.image}`} alt='Card' style={{ height: '150px' , width: '200px'}} />
                </td>
                <td>
                  <h4 style={{paddingLeft:'10px'}}>{cart.productDetails.productName}</h4>
                  <br></br>
                <h5 style={{paddingLeft:'10px'}}>{cart.productDetails.price}</h5>
                </td>
              
              </tr>
            </table>
            
            ))}
          </div>
          <h2 style={{paddingTop:'20px'}}> TOTAL ₹ 10298 </h2><br/>
          <button className="button-37" role="button">Check Out</button>
          
      </div>
    </div>
    </div>
  </div>
  )
}

export default Checkout;