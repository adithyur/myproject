import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NoIconNav from './NoIconNav';

function OrderReturn() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();

  // State to hold the selected reason
  const [selectedReason, setSelectedReason] = useState('');

  // Array of reasons for return (you can populate this with your own reasons)
  const returnReasons = [
    'Item damaged',
    'Wrong item received',
    'Item not as described',
    'Changed my mind',
    // Add more reasons here
  ];

  // Event handler for when a reason is selected
  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };

  // Function to handle the submission of the return request
  const handleSubmit = () => {
    // You can use the selectedReason for further processing
    // For example, send it to the server via an API request.
    console.log('Selected reason:', selectedReason);
    // Add your logic here to submit the return request
  };

  return (
    <div>
      <div>
        <NoIconNav />
      </div>
      <div style={{ marginLeft: '320px' }}>
        <div>
          <div style={{ backgroundColor: 'orangered' }}>
            <h2>REASON FOR RETURN</h2>
          </div>
          <div>
            <label htmlFor="returnReason">Select reason for return:</label>
            <select
              id="returnReason"
              value={selectedReason}
              onChange={handleReasonChange}
            >
              <option value="">Select a reason</option>
              {returnReasons.map((reason, index) => (
                <option key={index} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleSubmit}>Submit Return Request</button>
        </div>
      </div>
    </div>
  );
}

export default OrderReturn;
