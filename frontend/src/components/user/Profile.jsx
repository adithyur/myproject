import { useState , React} from 'react'
import "./Profile.css";
import NoIconNav from './NoIconNav';

export default function Profile() {

    const [address, setAddress] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission here
      console.log('Form submitted:', { address, pinCode, city, state });
      // Reset form fields
      setAddress('');
      setPinCode('');
      setCity('');
      setState('');
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
          placeholder="Address"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <input className='profileinput'
          type="text"
          placeholder='Pin Code'
          id="pinCode"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
          required
        />
      </div>
      <div>
        <input className='profileinput'
          type="text"
          placeholder='City'
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div>
        <input className='profileinput'
          type="text"
          placeholder='State'
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </div>
      <button className="profilesubmit" type="submit">Submit</button>
    </form>
    </div>
    </div>
  );
};
