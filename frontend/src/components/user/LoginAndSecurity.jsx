import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NoIconNav from './NoIconNav';
import { Await } from 'react-router-dom';

function LoginAndSecurity() {
    
  const [showUsername, setShowUsername] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showTrade, setShowTrade] = useState(false);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [trade, setTrade] = useState('both');
  const [result, setResult] = useState('');

  const authid = localStorage.getItem('authid');
  const navigate = useNavigate();

  const handleName = () => {

    setShowUsername(true);
    setShowEmail(false);
    setShowTrade(false);
    setShowPassword(false);
  };

  const handleEmail = () => {

    setShowUsername(false);
    setShowEmail(true);
    setShowTrade(false);
    setShowPassword(false);
  };

  const handlePassword = () => {

    setShowUsername(false);
    setShowEmail(false);
    setShowPassword(true);
    setShowTrade(false);
  };

  const handleTrade = () => {

    setShowUsername(false);
    setShowEmail(false);
    setShowPassword(false);
    setShowTrade(true);
  };

  const Cancel = () => {

    setShowUsername(false);
    setShowEmail(false);
    setShowTrade(false);
    setShowPassword(false);
    setNewName('');
    setNewPassword('');
  };

  const handleSubmit = async () => {
    try {
      console.log('New Name:', newName);
      console.log('New Password:', newPassword);
  
      const passwordCheckResponse = await axios.get(`http://localhost:8000/api/user/check-password/${authid}/${newPassword}`);
  
      const passwordCheckResult = passwordCheckResponse.data.message;
  
      if (passwordCheckResult === 'correct') {

        if(newName){
            const usernameUpdateResponse = await axios.put(`http://localhost:8000/api/user/update-username/${authid}`, {
            newName: newName,
        });
  
            const usernameUpdateResult = usernameUpdateResponse.data;
            if (usernameUpdateResult.message === 'User name updated successfully') {
              navigate('/login')
            } else {
            alert('Error updating username');
            }
        }

        if(newEmail){
          console.log("maild id",newEmail)
          const emailUpdateResponse = await axios.put(`http://localhost:8000/api/user/updateEmail/${authid}`, {
            newEmail: newEmail,
        });

            const emailUpdateResult = emailUpdateResponse.data;
            if (emailUpdateResult.message === 'Email updated successfully') {
              navigate('/login')
            } else {
            alert('Error updating email');
            }

        }

        if(newPassword1 && newPassword2){
          if(newPassword1 == newPassword2){
            
            const passwordUpdateResponse = await axios.put(`http://localhost:8000/api/user/updatePassword/${authid}`, {
              newPassword2: newPassword2,
            });

            const passwordUpdateResult = passwordUpdateResponse.data;
            if (passwordUpdateResult.message === 'Password updated successfully') {
              navigate('/login')
            } else {
            alert('Error updating Password');
            }
          }
          else{
            alert("Mismatch : New Password & Retype password")
          }
        } 
        /*else{
          alert("Please fill the required field")
        }*/

        if(trade)
        {
          if(trade === 'both')
          {

            const tradeUpdateResponse = await axios.put(`http://localhost:8000/api/user/updateTrade/${authid}`, {
              trade: trade,
            });

            const tradeUpdateResult = tradeUpdateResponse.data;
            if (tradeUpdateResult.message === 'Password updated successfully') {
              navigate('/login')
            } else {
            alert('Error updating trade type');
            }

          }
          console.log("trade", trade)
        }
        
      } else {
        alert('Invalid Password');
      }
    } catch (error) {
      console.error(error);
      setResult('Error occurred while checking the password');
    }
  };
  
  return (
    <div>
      <div>
        <NoIconNav />
      </div>
      <div style={{ marginLeft: '18%', marginRight: '18%' }}>
        <div>
          <p
            style={{
              paddingTop: '40px',
              color: '#4F4F4A',
              textAlign: 'left',
              fontWeight: 'bold',
            }}
          >
            <a href='./Profile'>Account</a> &nbsp;&nbsp;&nbsp; &gt; &nbsp;&nbsp;&nbsp;Login & Security
          </p>
        </div>
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '28px',
            color: '#4F4F4A',
            textAlign: 'left',
            paddingTop: '5px',
          }}
        >
          Login & Security
        </p>
        <div
          style={{
            display: 'flex',
            marginTop: '50px',
            borderBottom: '1px solid #ECECE4',
            width: '60%',
          }}
        >
          <p style={{ fontWeight: 'bold', color: '#4F4F4A' }}>User Name</p>
          <p style={{ paddingLeft: '45px', fontWeight: 'bold', color: '#4F4F4A' }}>
            Email id
          </p>
          <p style={{ paddingLeft: '45px', fontWeight: 'bold', color: '#4F4F4A' }}>
            Password
          </p>
          <p style={{ paddingLeft: '45px', fontWeight: 'bold', color: '#4F4F4A' }}>
            Trade Type
          </p>
        </div>
        <div style={{ width: '60%' }}>
          <div style={{ borderBottom: '1px solid #ECECE4' }}>
            <p
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                color: '#4F4F4A',
                fontSize: '22px',
                paddingTop: '50px',
              }}
            >
              User Name
            </p>
            <div style={{ display: 'flex' }}>
              <p style={{ textAlign: 'left', color: '#4F4F4A' }}>
                Update your username to personalize your profile.
              </p>
              <button
                style={{ marginLeft: '190px', marginBottom: '20px', color:'green',border:'none', backgroundColor:'transparent', fontWeight:'bold' }}
                onClick={handleName}
              >
                UPDATE
              </button>
            </div>
            <div>
              {showUsername && (
                <div style={{marginLeft:'5px', marginTop:'5px'}}>
                  <p style={{textAlign:'left', fontFamily:'arial',color: '#4F4F4A' }}>New Name</p>

                  <input type="text" 
                    style={{marginLeft:'-450px', borderRadius:'5px', height:'40px', border: '1px solid #63635C', marginBottom:'20px'}}
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        required/> 

                  <p style={{textAlign:'left', fontFamily:'arial',color: '#4F4F4A'}}>Password</p>

                  <input type='password' 
                    style={{marginLeft:'-450px', borderRadius:'5px', height:'40px', border: '1px solid #63635C', marginBottom:'20px'}}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required/>
                        
                  <br></br>
                  <a style={{textDecoration:'underline', fontWeight:'bold', transition: 'color 0.3s', cursor:'pointer'}}

                        onMouseEnter={(e) => (e.target.style.color = 'red')}
                        onMouseLeave={(e) => (e.target.style.color = 'black')}
                        onClick={Cancel}> Cancel</a> 

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                  <a style={{textDecoration:'underline', fontWeight:'bold', cursor:"pointer"}}

                        onMouseEnter={(e) => (e.target.style.color = 'green')}
                        onMouseLeave={(e) => (e.target.style.color = 'black')}
                        onClick={handleSubmit}>Submit</a>
                </div>
              )}
            </div>
          </div>
          <div style={{ borderBottom: '1px solid #ECECE4' }}>
            <p
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                color: '#4F4F4A',
                fontSize: '22px',
                paddingTop: '50px',
              }}
            >
              Email id
            </p>
            <div style={{ display: 'flex' }}>
              <p style={{ textAlign: 'left', color: '#4F4F4A' }}>
                Update your email ID for notifications and account recovery.
              </p>
              <button
                style={{ marginLeft: '120px', marginBottom: '20px', color:'green',border:'none', backgroundColor:'transparent', fontWeight:'bold' }}
                onClick={handleEmail}
              >
                UPDATE
              </button>
            </div>
            <div>
            {showEmail && (
                <div style={{marginLeft:'5px', marginTop:'5px'}}>
                  <p style={{textAlign:'left', fontFamily:'arial',color: '#4F4F4A' }}>New Mail id</p>
                  <input
                      type="email"
                      style={{
                        marginLeft: '-450px',
                        borderRadius: '5px',
                        height: '40px',
                        border: '1px solid #63635C',
                        marginBottom: '20px',
                      }}
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      required
                      pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                      title="Please enter a valid email address"
                    />
 
                <p style={{textAlign:'left', fontFamily:'arial',color: '#4F4F4A' }}>Password</p>
                <input type="text" 
                  style={{marginLeft:'-450px', borderRadius:'5px', height:'40px', border: '1px solid #63635C', marginBottom:'20px'}}
                      value={newPassword}
                      required
                      onChange={(e) => setNewPassword(e.target.value)}
                      />
                <br></br>
                <a style={{textDecoration:'underline', fontWeight:'bold', transition: 'color 0.3s', cursor:'pointer'}}

                      onMouseEnter={(e) => (e.target.style.color = 'red')}
                      onMouseLeave={(e) => (e.target.style.color = 'black')}
                      onClick={Cancel}> Cancel</a> 

                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <a style={{textDecoration:'underline', fontWeight:'bold', cursor:"pointer"}}

                      onMouseEnter={(e) => (e.target.style.color = 'green')}
                      onMouseLeave={(e) => (e.target.style.color = 'black')}
                      onClick={handleSubmit}>Submit</a>
              </div>
            )}
            </div>
          </div>
          <div style={{ borderBottom: '1px solid #ECECE4' }}>
            <p
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                color: '#4F4F4A',
                fontSize: '22px',
                paddingTop: '50px',
              }}
            >
              Password
            </p>
            <div style={{ display: 'flex' }}>
              <p style={{ textAlign: 'left', color: '#4F4F4A' }}>
                Update your password and secure your account.
              </p>
              <button
                style={{ marginLeft: '210px', marginBottom: '20px', color:'green',border:'none', backgroundColor:'transparent', fontWeight:'bold' }}
                onClick={handlePassword}
              >
                UPDATE
              </button>
            </div>
            <div>
              {showPassword && (
                <div style={{marginLeft:'5px', marginTop:'5px'}}>
 
                <p style={{textAlign:'left', fontFamily:'arial',color: '#4F4F4A' }}>Password</p>
                
                <input type="text" 
                  style={{marginLeft:'-450px', borderRadius:'5px', height:'40px', border: '1px solid #63635C', marginBottom:'20px'}}
                      value={newPassword}
                      required
                      onChange={(e) => setNewPassword(e.target.value)}
                      />

                <p style={{textAlign:'left', fontFamily:'arial',color: '#4F4F4A' }}>New Password</p>

                <input
                    type="newpassword1"
                    style={{
                      marginLeft: '-450px',
                      borderRadius: '5px',
                      height: '40px',
                      border: '1px solid #63635C',
                      marginBottom: '20px',
                    }}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    value={newPassword1}
                    onChange={(e) => setNewPassword1(e.target.value)}
                    required
                  />

                  <p style={{textAlign:'left', fontFamily:'arial',color: '#4F4F4A' }}>Retype Password</p>

                  <input
                      type="newpassword2"
                      style={{
                        marginLeft: '-450px',
                        borderRadius: '5px',
                        height: '40px',
                        border: '1px solid #63635C',
                        marginBottom: '20px',
                      }}
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      value={newPassword2}
                      onChange={(e) => setNewPassword2(e.target.value)}
                      required
                    />

                  <br></br>

                <a style={{textDecoration:'underline', fontWeight:'bold', transition: 'color 0.3s', cursor:'pointer'}}

                      onMouseEnter={(e) => (e.target.style.color = 'red')}
                      onMouseLeave={(e) => (e.target.style.color = 'black')}
                      onClick={Cancel}> Cancel</a> 

                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <a style={{textDecoration:'underline', fontWeight:'bold', cursor:"pointer"}}

                      onMouseEnter={(e) => (e.target.style.color = 'green')}
                      onMouseLeave={(e) => (e.target.style.color = 'black')}
                      onClick={handleSubmit}>Submit</a>
              </div>
                    )}
            </div>
          </div>


          <div style={{ borderBottom: '1px solid #ECECE4' }}>
            <p
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                color: '#4F4F4A',
                fontSize: '22px',
                paddingTop: '50px',
              }}
            >
              Trade Type
            </p>
            <div style={{ display: 'flex' }}>
              <p style={{ textAlign: 'left', color: '#4F4F4A' }}>
                Update your trade type for a better user experience.
              </p>
              <button
                style={{ marginLeft: '190px', marginBottom: '20px', color:'green',border:'none', backgroundColor:'transparent', fontWeight:'bold' }}
                onClick={handleTrade}
              >
                UPDATE
              </button>
            </div>
            <div>
              {showTrade && (
                <div style={{marginLeft:'5px', marginTop:'5px'}}>

                  <div style={{display:'flex'}}>
                    <p style={{textAlign:'left', fontFamily:'arial',color: '#4F4F4A' }}>Trade Type : </p> 

                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    <label>
                    <input
                      type="radio"
                      name="trade"
                      value="buy"
                      checked={trade === 'buy'}
                      onChange={(e) => setTrade(e.target.value)}
                    />
                    Buy
                    </label>

                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    <label>
                      <input
                        type="radio"
                        name="trade"
                        value="both"
                        checked={trade === 'both'}
                        onChange={(e) => setTrade(e.target.value)}
                      />
                      Both
                    </label>
                  </div>

                <p style={{textAlign:'left', fontFamily:'arial',color: '#4F4F4A' }}>Password</p>

                <input type="text" 
                  style={{marginLeft:'-450px', borderRadius:'5px', height:'40px', border: '1px solid #63635C', marginBottom:'20px'}}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required/>
                      
                <br></br>
                <a style={{textDecoration:'underline', fontWeight:'bold', transition: 'color 0.3s', cursor:'pointer'}}

                      onMouseEnter={(e) => (e.target.style.color = 'red')}
                      onMouseLeave={(e) => (e.target.style.color = 'black')}
                      onClick={Cancel}> Cancel</a> 

                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <a style={{textDecoration:'underline', fontWeight:'bold', cursor:"pointer"}}

                      onMouseEnter={(e) => (e.target.style.color = 'green')}
                      onMouseLeave={(e) => (e.target.style.color = 'black')}
                      onClick={handleSubmit}>Submit</a>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAndSecurity;
