import "./registration.css"
import{BiUser }from 'react-icons/bi';
import{RiLockPasswordFill}from 'react-icons/ri';
import{CiMail}from 'react-icons/ci';
import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Registration() {

  const navigate=useNavigate()

  const [formData, setFormData] = useState({ name: '', email: '', password: '', repassword:'', trade: '', securityQuestion: '', securityAnswer: '', });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    /*const fieldValue = type === 'radio' ? value : value;
    console.log(value)*/
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{

      if (formData.password===formData.repassword){
      console.log(formData)
      await axios.post('http://localhost:8000/api/user/reguser', formData);
      setFormData({
        name: '',
        email: '',
        password: '',
        trade: '',
        securityQuestion: '',
        securityAnswer: '',
      });
      alert("Registration successfully")
      navigate('/login')
      }
      else{
        alert("password and retype password should be same")
      }
    }
    catch{
      alert("Existing user")
    }
    
  };


  return (
    <div className="d">
      <div className="d1">
      <div className="d2"/>
      <div className="d3">
    <h2>Registration</h2>
    <form onSubmit={handleSubmit}>
    <BiUser className='ic'/>
      <input className="t1"  style={{width:'200px', borderRadius:'10px'}}
        type="text" 
        placeholder="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <br/>
      <CiMail className='ic'/>
      <input className="t1" 
        type="email" 
        placeholder="E-mail"
        name="email" 
        value={formData.email}
        onChange={handleChange}
        required
      />
      <br/>
      <RiLockPasswordFill className='ic'/>
      <input className="t1" 
        type="password" 
        name="password" 
        placeholder="Password"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        value={formData.password}
        onChange={handleChange} 
        required
      />
      <br/>
      <RiLockPasswordFill className='ic'/>
      <input className="t1" 
        type="password"
        name="repassword" 
        placeholder="Re-type Password"
        value={formData.repassword}
        onChange={handleChange}
        required
      />
      <br/>
      <br/>
      <br/>
      <div  class="wrap">
      Trade Type:
  <input className='radioinput' 
    type="radio" 
    id="buy" 
    name="trade"
    value="buy"
    checked={formData.trade === 'buy'}
    onChange={handleChange} 
    required
  />
  <label className='but' for="buy">Buy</label>
  <input className='radioinput' 
    type="radio" 
    id="sell" 
    name="trade"
    value="sell"
    checked={formData.trade === 'sell'}
    onChange={handleChange}  
    required
  />
  <label className='but' for="sell">Sell</label>
  <input className='radioinput' 
    type="radio" 
    id="both" 
    name="trade" 
    value="both"
    checked={formData.trade === 'both'}
    onChange={handleChange} 
    required
  />
  <label className='but' for="both">Both</label>
  <br/>
  <br/>
  <br/>
      <br/>
      <br/>
      <br/>
      <br/>
  </div>
{/*
  <div className="security-question">
  <select
    style={{ marginTop: '25px',}}
    name="securityQuestion"
    id="securityQuestion"
    value={formData.securityQuestion}
    onChange={handleChange}
    required
  >
    <option value="">Select a Security Question</option>
    <option value="q1">What is your favorite book or movie?</option>
    <option value="q2">What is your favorite sports team?</option>
    <option value="q3">What is the name of your favorite childhood friend?</option>
  </select>
</div>

        <CiMail className='ic'/>
        <input 
          className="t1 security-answer-input"
          type="text"
          placeholder="Answer"
          name="securityAnswer"
          value={formData.securityAnswer}
          onChange={handleChange}
          required
        />
        <br />
        <br />
      {/*<input ClassName="check" type="checkbox" id="terms" required/>
      <label for="terms">I agree to the Terms and Conditions</label>*/}
      
      <button className="reg" role="button"><span class="text1">SIGN UP</span></button>
    </form>
  </div>
</div>
    </div>
  );
}