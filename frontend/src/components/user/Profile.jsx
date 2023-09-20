import  React, { useState , useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import NoIconNav from './NoIconNav';
import { FaRegAddressCard } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { BsBox } from 'react-icons/bs';
import { MdOutlineSell } from 'react-icons/md';
import {MdOutlineConnectWithoutContact} from 'react-icons/md'
import { FaPowerOff } from 'react-icons/fa';


export default function Profile() {

    const authid= localStorage.getItem('authid')
    const [userName, setUserName] = useState('');
    const [mailid, setMailId] = useState('');
    const navigate=useNavigate()

  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };

  const logout = () => {
    setShowLogoutOverlay(true); 
  }

    /*const handleChange = (e) => {
      const { name, value, type } = e.target;
      setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      if (formData.mobile1===formData.mobile2){
        alert("use different mobile number as secondary")
        }
      else{
        console.log(formData)
        await axios.post('http://localhost:8000/api/profile/profile', formData);
        setFormData({ name: '', mobile1: '', pincode: '', place: '', address: '', city: '',state: '',landmark: '',mobile2: '' });
        alert(" successfully")
      }
    }
     catch{
      alert("can't insert address")
    }

    };*/

  useEffect(() => {
        const fetchUserName = async () => {
          try {
            console.log("user id : ",localStorage.getItem('authid'))
            const res = await axios.get(`http://localhost:8000/api/user/getname/${localStorage.getItem('authid')}`);
            const userData = res.data;
    
            if (userData && userData.username) {
              setUserName(userData.username);
              setMailId(userData.mailid)
            }
          } catch (error) {
            console.error('Error fetching user:', error);
          }
        };
    
        fetchUserName();
      }, []);

      const handleLogoutOrder = () => {
        localStorage.removeItem('authid')
        navigate('/')
      };
    
  return (
    <div>
        <div>
            <NoIconNav/>
        </div>
        <div className='pro'>
            <div className='pro1'>
                <div className='pro2' style={{display:'flex'}}>
                  <div style={{flexBasis:'90%'}}>
                    <p className='h1'>Account</p>
                    <p className='h2'> {userName} , {mailid} </p>
                  </div>
                  <div style={{marginTop:'80px' ,paddingTop:'10px' ,borderRadius:'10px', backgroundImage:'linear-gradient(135deg, #f34079 40%, #fc894d)',color:'white', height:'50px', width:'125px', flexBasis:'10%', fontWeight:'bold', fontSize:'18px'}}>
                    <FaPowerOff/> <a onClick={logout} style={{ cursor: 'pointer' }}>Logout</a>
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
                  </div>
                </div>
                <div style={{marginTop:'50px'}}>
                  <div style={{display:'flex'}} >

                      <div className='box'>
                      <Link to="/UserAddress" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <FaRegAddressCard size={35}/>
                        <br/>
                        <p style={{paddingTop:'10px',fontWeight:'600', fontSize:'20px', fontFamily:'times new roman'}}> Shipping Address</p>
                        <p style={{color:'gray'}}>Where should we send your orders? Keep your address updated to ensure smooth and accurate deliveries.</p>
                      </Link>
                      </div>

                      <div className='box' style={{marginLeft:'50px'}}>
                      <Link to="/PickupAddress" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <FaRegAddressCard size={35}/>
                        <br/>
                        <p style={{paddingTop:'10px',fontWeight:'600', fontSize:'20px', fontFamily:'times new roman'}}> Pickup Address</p>
                        <p style={{color:'gray'}}>Where should we collect your items? Keep your address updated to ensure smooth and accurate deliveries.</p>
                      </Link>
                      </div>

                      <div className='box' style={{marginLeft:'50px'}}>
                      <Link to="/LoginAndSecurity" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <MdSecurity size={35}/>   
                        <br/>
                        <p style={{paddingTop:'10px',fontWeight:'600', fontSize:'20px', fontFamily:'times new roman'}}> Login & security</p>
                        <p style={{color:'gray'}}>Update your password and secure your account.</p>
                      </Link>
                      </div>
                    
                  </div>
                    
                  <div style={{marginTop:'50px', display:'flex'}}>
                    <div className='box'>
                    <Link to="/Orders" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <BsBox size={35}/>
                      <br/>
                      <p style={{paddingTop:'10px',fontWeight:'600', fontSize:'20px', fontFamily:'times new roman'}}> Orders</p>
                      <p style={{color:'gray'}}>Track your purchase history and view order details.</p>
                    </Link>
                    </div>

                    <div className='box' style={{marginLeft:'50px'}}>
                    <Link to="/ProductManagement" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <MdOutlineSell size={35}/>
                      <br/>
                      <p style={{paddingTop:'10px',fontWeight:'600', fontSize:'20px', fontFamily:'times new roman'}}> Products</p>
                      <p style={{color:'gray'}}>Showcase items you've listed for sale.</p>
                    </Link>
                    </div>

                    <div className='box' style={{marginLeft:'50px'}}>
                    <Link to='/ContactUs' style={{ textDecoration: 'none', color: 'inherit' }}>
                      <MdOutlineConnectWithoutContact size={35}/>
                      <br/>
                      <p style={{paddingTop:'10px',fontWeight:'600', fontSize:'20px', fontFamily:'times new roman'}}> Contact us</p>
                      <p style={{color:'gray'}}>Touch in with our team.</p>
                    </Link>
                    </div>

                  </div> 

              </div>


                    {/*PRODUCT MANAGEMENT
                    <div className={`prodropdown ${isOpen ? 'open' : ''}`}>
                      <button className="prodropdown-btn1" onClick={toggleDropdown}>
                          Product Management <i className="fa fa-caret-down" />
                      </button>
                      <div className="prodropdown-content1">
                        <a href="/UserAddress">Shipping Address</a>
                        <a href="/ComDetail">Company Address</a>
                        <a href="/ViewProduct">Profile Deactivate</a>
                      </div>
                    </div>*/}


                <div>
                  
                </div>  
            </div>
            
          </div>
          {/*<div style={{ marginTop:'100px'}}>
          Need to deactivate your account?
          <br/>
          <a style={{textDecoration:'underline', fontWeight:'bold', paddingBottom:'10px'}}>Take care of that now</a>
                  </div>*/}
          <div style={{marginTop:'50px'}}>
            <button style={{border:'none', backgroundColor:'transparent', color:'transparent'}}>hi</button>
          </div>
    </div>
  );
};
