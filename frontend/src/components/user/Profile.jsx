import  React, { useState , useEffect} from 'react';
import axios from "axios";
import "./Profile.css";
import NoIconNav from './NoIconNav';


export default function Profile() {

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
      console.log(bio)
      await axios.post(`http://localhost:8000/api/profile/update/${localStorage.getItem('authid')}`, bio)
      alert("Address Added successfully");
    } catch (error) {
      console.error('Error adding Address:', error);
      alert("Error adding Address:");
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
      <div>
        <input className='profileinput'
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
      <div>
        <input className='profileinput'
          type="text"
          placeholder="Pin Code"
          name="pincode"
          value={bio.pincode}
          onChange={handlechange}
          required
        />
      </div>
      <div>
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
          <div>
            <input
              className='profileinput'
              type="text"
              placeholder='Address'
              name="address"
              value={bio.address}
              onChange={handlechange}
              required
            />
          </div>
      <div>
        <input className='profileinput'
          type="text"
          placeholder='city'
          name="city"
          value={bio.city}
          onChange={handlechange}
          required
        />
      </div>
      <div>
        <input className='profileinput'
          type="text"
          placeholder='State'
          name="state"
          value={bio.state}
          onChange={handlechange}
          required
        />
      </div>
      <div>
        <input className='profileinput'
          type="text"
          placeholder='Landmark'
          name="landmark"
          value={bio.landmark}
          onChange={handlechange}
          required
        />
      </div>
      <div>
        <input className='profileinput'
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
      <button className="profilesubmit" type="submit">Submit</button>
    </form>
    </div>
    </div>
  );
};
