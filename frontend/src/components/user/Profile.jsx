import { useState , React} from 'react';
import axios from "axios";
import "./Profile.css";
import NoIconNav from './NoIconNav';


export default function Profile() {

    const authid= localStorage.getItem('authid')
    const [formData, setFormData] = useState({
      userid: authid,
      fname: '', 
      lname: '', 
      address: '', 
      pincode: '', 
      city: '' ,
      state: '' ,
      mobile1: '' ,
      mobile2: ''});

    const handleChange = (e) => {
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
        setFormData({ fname: '', lname: '', address: '', pincode: '', city: '',state: '',mobile1: '',mobile2: '' });
        alert(" successfully")
      }
    }
     catch{
      alert("can't insert address")
    }

    };
    
  return (
    <div>
        <div>
            <NoIconNav/>
        </div>
        <div className='profilediv' >
        <form className='profileform' onSubmit={handleSubmit}>
      <div>
        <input className='profileinput'
          type="text"
          placeholder="First Name"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input className='profileinput'
          type="text"
          placeholder="Last Name"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input className='profileinput'
          type="text"
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input className='profileinput'
          type="text"
          placeholder='Pin Code'
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input className='profileinput'
          type="text"
          placeholder='City'
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input className='profileinput'
          type="text"
          placeholder='State'
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input className='profileinput'
          type="tel"
          placeholder='Primary number'
          name="mobile1"
          pattern="[5-9]{1}[0-9]{9}"
          maxLength="10"
          title="Must contain 10 numbers and first digit in greater than 5"
          value={formData.mobile1}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input className='profileinput'
          type="tel"
          placeholder='Secondary number'
          name="mobile2"
          pattern="[5-9]{1}[0-9]{9}"
          maxLength="10"
          title="Must contain 10 numbers and first digit in greater than 5"
          value={formData.mobile2}
          onChange={handleChange}
          required
        />
      </div>
      <button className="profilesubmit" type="submit">Submit</button>
    </form>
    </div>
    </div>
  );
};
