import  React, { useState , useEffect} from 'react';
import axios from "axios";
import NoIconNav from './NoIconNav';
import "./Profile.css";

function PickupAddress() {

    const authid= localStorage.getItem('authid')
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

  const [isOpen, setIsOpen] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showUser1, setShowUser1] = useState(false);
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };

  const fetchBio = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/sellerprofile/sellerprofile/${localStorage.getItem('authid')}`);
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
        handleCheck();
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
      if(bio.mobile1===bio.mobile2){
        alert("use different mobile number as secondary")
      }
      else{
        console.log(bio)
        await axios.post(`http://localhost:8000/api/sellerprofile/update/${localStorage.getItem('authid')}`, bio)
        alert("Address Added successfully");
      }   
    } catch (error) {
      console.error('Error adding Address:', error);
      alert("Error adding Address:");
    }
  };

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
    <div className='flex2'>
      <div>
          {showUser && (
          < NoIconNav/> 
          )}
          {showUser1 && (
                <div style={{height:'80px', borderBottom:'1px solid rgb(225, 217, 217)', marginTop:'30px', marginLeft:'100px', display:'flex', marginRight:'100px',/*backgroundColor:'blanchedalmond'*/ }}>
                    <a className="pnav" style={{textAlign:'left', fontWeight:'bold', fontSize:'30px', fontFamily:'unset', paddingTop:'5px'}} href='/SellerHome'>New2U</a>
                 </div>
          )}
      </div>

      <div className='profilediv' >
      
  <form className='profileform' onSubmit={handleSubmit}>
  <div className='grid-container'>
    <div className='grid-row'>
      <div style={{display:'flex'}}>
      <p style={{fontFamily:'times new roman', fontSize:'20px', paddingTop:'4px'}}>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </p>
        <input
          className='profileinput'
          type="text"
          placeholder="Name"
          name="name"
          value={bio.name}
          onChange={handlechange}
          required
        />
      </div>
    </div>
    <div className='grid-row'>
      <div style={{display:'flex', marginLeft:'20px'}}>
        <p style={{fontFamily:'times new roman', fontSize:'20px', paddingTop:'4px', textAlign:'left'}}>Mobile Number &nbsp; &nbsp; &nbsp;: </p>
        <input
          className='profileinput'
          type="tel"
          placeholder="Primary number"
          name="mobile1"
          pattern="[5-9]{1}[0-9]{9}"
          maxLength="10"
          title="Must contain 10 numbers and first digit in greater than 5"
          value={bio.mobile1}
          onChange={handlechange}
          required
        />
      </div>
    </div>
      <div className='address-div'>
      <p style={{fontFamily:'times new roman', fontSize:'20px', paddingTop:'4px', textAlign:'left', width:'100%'}}>Address &nbsp; &nbsp; &nbsp;: </p>
      <textarea
        className='inputaddress' 
        rows="5"
        cols="52"
        type="text"
        placeholder='Address'
        name="address"
        value={bio.address}
        onChange={handlechange}
        required
      />
    </div>
    <div className='grid-row'>
      <div style={{display:'flex'}}>
      <p style={{fontFamily:'times new roman', fontSize:'20px', paddingTop:'4px', textAlign:'left'}}>Pin Code &nbsp; &nbsp; &nbsp;: </p>
        <input
          className='profileinput'
          type="text"
          placeholder="Pin Code"
          name="pincode"
          value={bio.pincode}
          onChange={handlechange}
          required
        />
      </div>
    </div>
    <div className='grid-row'>
      <div style={{display:'flex', marginLeft:'100px'}}>
      <p style={{fontFamily:'times new roman', fontSize:'20px', paddingTop:'4px', textAlign:'left'}}>Place &nbsp; &nbsp; &nbsp;: </p>
        <input
          className='profileinput'
          type="text"
          placeholder="Place"
          name="place"
          value={bio.place}
          onChange={handlechange}
          required
        />
      </div>
    </div>
    <div className='grid-row'>
      <div style={{display:'flex'}}>
      <p style={{fontFamily:'times new roman', fontSize:'20px', paddingTop:'4px', textAlign:'left'}}>City &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;: </p>
        <input
          className='profileinput'
          type="text"
          placeholder='city'
          name="city"
          value={bio.city}
          onChange={handlechange}
          required
        />
      </div>
    </div>
    <div className='grid-row'>
      <div style={{display:'flex', marginLeft:'100px'}}>
      <p style={{fontFamily:'times new roman', fontSize:'20px', paddingTop:'4px', textAlign:'left'}}>State &nbsp; &nbsp; &nbsp;: </p>
        <input
          className='profileinput'
          type="text"
          placeholder='State'
          name="state"
          value={bio.state}
          onChange={handlechange}
          required
        />
      </div>
    </div>
    <div className='grid-row'>
      <div style={{display:'flex'}}>
      <p style={{fontFamily:'times new roman', fontSize:'20px', paddingTop:'4px', textAlign:'left'}}>Landmark &nbsp; &nbsp;: </p>
        <input
          className='profileinput'
          type="text"
          placeholder='Landmark'
          name="landmark"
          value={bio.landmark}
          onChange={handlechange}
          required
        />
      </div>
    </div>
    <div className='grid-row'>
      <div style={{display:'flex'}}>
      <p style={{fontFamily:'times new roman', fontSize:'20px', paddingTop:'4px', textAlign:'left'}}>Secondary Number &nbsp; : </p>
        <input
          className='profileinput'
          type="tel"
          placeholder="Secondary number"
          name="mobile2"
          pattern="[5-9]{1}[0-9]{9}"
          maxLength="10"
          title="Must contain 10 numbers and first digit in greater than 5"
          value={bio.mobile2}
          onChange={handlechange}
          required
        />
      </div>
    </div>
  </div>
  <button className="button-37" style={{marginTop:'35px'}} type="submit">Submit</button>
  <p style={{textAlign:'center',marginTop:'-800px' ,marginLeft:'-60%',color:'white', fontFamily:'times new roman', fontWeight:'bold', fontSize:'25px', backgroundColor:'orangered', width:'280px'}}>PICKUP ADDRESS</p>
</form>

      
    
    </div>
    </div>
  )
}

export default PickupAddress