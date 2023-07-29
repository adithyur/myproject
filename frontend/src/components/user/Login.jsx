import "./login.css"
import { BiUser } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Example() {

  const navigate=useNavigate()

  const [formData, setFormData] = useState({ email: '', password: ''});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const fieldValue = value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{

      console.log(formData)
      const response = await axios.post('http://localhost:8000/api/user/login', formData);
      console.log(response.data)
      if( response){

      localStorage.setItem('authid',response.data._id)
      localStorage.setItem('authrole',response.data.role)
      setFormData({ email: '', password: ''});
      if(response.data.role==='user'){
        alert("Login successfully")
        navigate('/UserHome')
      }
      else if(response.data.role==='verifier')
      {
        alert("Login successfully")
        navigate('/VerifierHome')
      }
      else{
        alert("Login successfully")
        navigate('/AdminHome')
      }


      }
    }
    catch{
      alert("Invalid Mail id or Password")
    }
    
  };

  return (
    <div className="loginc1">
    <div className="logincontainer1">
       <div className="logincontainer2"/>
       <div className="logincontainer3">
    <h2 className="loginh">SIGN IN</h2>
    <p className="loginp">Login your account to start the service</p>
    <form onSubmit={handleSubmit}>
    <BiUser className="icon1"/>
      <input className="logint" 
        type="email" 
        placeholder="E-Mail"
        name="email" 
        value={formData.email}
        onChange={handleChange}
        required/>
      <br/>
      <br/>
      <RiLockPasswordFill className="icon1"/>
      <input className="logint" 
        type="password" 
        placeholder="Password" 
        name="password" 
        value={formData.password}
        onChange={handleChange}
        required/>
      <br/>
      <br/>
      <div className="loginb">
      <button className="log" role="button"><span className="logintext1">Login</span></button>
      <br/>
      </div>
      <a className="logina1"href="/">forgot password?</a>
      <a className="logina2"href="/registration"> New User</a>
    </form>
  </div>
    </div>
    </div>
  );
}

export default Example;