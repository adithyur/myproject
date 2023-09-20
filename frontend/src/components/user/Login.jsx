import "./login.css";
import { BiUser } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BsEyeFill } from 'react-icons/bs';
import { BsEyeSlashFill } from 'react-icons/bs';

function Example() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [forgotPassword, setForgotPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:8000/api/user/login', formData);
      console.log(response.data);
      if (response) {
        localStorage.setItem('authid', response.data._id);
        localStorage.setItem('authrole', response.data.role);
        setFormData({ email: '', password: '' });
        if (response.data.role === 'user') {
          alert("Login successfully");
          if (response.data.trade === 'sell') {
            navigate('/SellerHome');
          } else {
            navigate('/UserHome');
          }
        } else if (response.data.role === 'verifier') {
          alert("Login successfully");
          navigate('/VerifierHome');
        } else {
          alert("Login successfully");
          navigate('/AdminHome');
        }
      }
    } catch {
      alert("Invalid Mail id or Password");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="loginc1">
      <div className="logincontainer1">
        <div className="logincontainer2" />
        <div className="logincontainer3">
          <h2 className="loginh">SIGN IN</h2>
          <p className="loginp">Login your account to start the service</p>
          <form>
            <BiUser className="icon1" />
            <input className="logint"
              type="email"
              placeholder="E-Mail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required />
            <br />
            <br />
            <RiLockPasswordFill className="icon1" style={{ marginLeft: '40px' }} />
            <input className="logint" style={{ marginLeft: '0px' }}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required />
            <button type="button" onClick={toggleShowPassword} style={{ borderWidth: '0px', backgroundColor: 'transparent' }}>
              {showPassword ? <BsEyeSlashFill size={24} color="black" /> : <BsEyeFill size={24} color="black" />}
            </button>
            <br />
            <br />
            <div className="loginb" style={{ display: 'flex', marginLeft: '-60px', marginTop: '25px' }}>
              <button className="log" role="button" onClick={handleSubmit}><span className="logintext1">Login</span></button>
              <a className="logina2" href="/registration" style={{ paddingTop: '10px', fontWeight: 'bold', color: 'black' }}> New User!</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Example;
