import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./UserNav.css"
import "./Checkout.css"

function Checkout() {

        const authid= localStorage.getItem('authid')
        const [product, setProduct] = useState([]);
        const [bio, setBio]= useState({ name:'',
                                        mobile1:'',
                                        pincode:'',
                                        place:'',
                                        address:'',
                                        city:'',
                                        state:'',
                                        landmark:'',
                                        mobile2:''
                                     });
        
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
            /*console.log(res.data);*/
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
          /*setFormFields(res.data)
          console.log(formFields)*/
          if(res){
            setBio({name:res.data[0].name,
          mobile1:res.data[0].mobile1,
          pincode:res.data[0].pincode,
          place:res.data[0].place,
          address:res.data[0].address,
          city:res.data[0].city,
          state:res.data[0].state,
          landmark:res.data[0].landmark,
          mobile2:res.data[0].mobile2});

        console.log(res.data[0].fname)}

          else{
            alert("thenj poyi gooyis")
          }
          
          /*console.log('profile',bio);*/
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };
      useEffect(() => {
        fetchBio()
    },[])

    const handlechange = (e) => {
      const { name, value, type } = e.target;
      setBio((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (bio.mobile1===bio.mobile2){
        alert("use different mobile number as secondary")
        }
      else{
        console.log(bio)
        await axios.post(`http://localhost:8000/api/profile/update/${localStorage.getItem('authid')}`, bio)
        alert("Address Added successfully");
      }
     
    } catch (error) {
      console.error('Error adding Address:', error);
      alert("Error adding Address:");
    }
  };


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
              <form className='checkform' onSubmit={handleSubmit}>

                <div className='vertical1'>
                  <div className='checkform1'>
                  <label className="fname">Name*</label>
                  <input className="checktxt" 
                    type="text" 
                    name="name"
                    value={bio.name}
                    onChange={handlechange}
                  />
                </div>
                <div className='checkform2'>
                  <label className="fname">Mobile Number*</label>
                  <input className="checktxt" 
                    type="text" 
                    name="mobile1"
                    value={bio.mobile1}
                    onChange={handlechange}
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
                    onChange={handlechange}
                  />
                </div>
                <div className='checkform4'>
                  <label className="fname">Locality*</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="place"
                    name="place"
                    value={bio.place}
                    onChange={handlechange}
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
                    value={bio.address}
                    onChange={handlechange}
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
                    onChange={handlechange}
                  />
                </div>
                <div className='checkform7'>
                  <label className="fname">State*</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="State"
                    name="State"
                    value={bio.state}
                    onChange={handlechange}
                  />
                </div>
                </div>
                <div className='vertical4'>
                <div className='checkform8'>
                  <label className="fname">Landmark</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="Landmark"
                    name="landmark"
                    value={bio.landmark}
                    onChange={handlechange}
                  />
                </div>
                <div className='checkform9'>
                  <label className="fname">Alternate Mobile number</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="mobile2"
                    name="mobile2"
                    value={bio.mobile2}
                    onChange={handlechange}
                  />
                </div>
                </div>
                <button className="button-65" type="submit">Save & Delivery here</button>
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
          <button className="button-37" type="submit">Check Out</button>
          
      </div>
    </div>
    </div>
  </div>
  )
}

export default Checkout;