import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";


import  NoIconNav from './NoIconNav'
import "./Checkout.css"

function Checkout() {

        const [product, setProduct] = useState([]);
        const navigate = useNavigate();
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

      const fetchBio = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/profile/profile/${localStorage.getItem('authid')}` );
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
        if (bio.mobile1===bio.mobile2){
          alert("use different mobile number as secondary")
          }
        else{
          console.log(bio)
          const res = await axios.get(`http://localhost:8000/api/order/getOrderDetails/${localStorage.getItem('authid')}`);
          const orderId = res.data.orderId;
          console.log('order id : ',orderId)
          await axios.post(`http://localhost:8000/api/order/profile/${orderId}`, bio)
          alert("Address Added successfully");
        }
      
      } catch (error) {
        console.error('Error adding Address:', error);
        alert("Error adding Address:");
      }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch user's orders
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/order/dsplywaiting/${localStorage.getItem('authid')}`);
      setProduct(res.data);
      console.log('Order ID: ', res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Delete orders with "waiting for confirmation" status
  const deleteOrders = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/order/delete/${localStorage.getItem('authid')}`, {
        params: { status: 'waiting for confirmation' },
      });
      console.log('Orders with status "waiting for confirmation" deleted.');
    } catch (error) {
      console.error('Error deleting orders:', error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Call the deleteOrders function before leaving the page
      deleteOrders();
    };

    // Add the event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleCheckout = async () => {
    try {
      console.log('Handle Checkout called');
      const res = await axios.get(`http://localhost:8000/api/order/getOrderDetails/${localStorage.getItem('authid')}`);
      console.log(" address : ",res.data.address);
      if(res.data.address){
      const { orderId, productId } = res.data;
  
      if (orderId && productId) {
        navigate(`/CreditCardForm?orderId=${orderId}&productId=${productId}`);
      } else {
        console.error('Order ID or Product ID not found in the response');
      }
    }
    else{
      alert("Please select the delivery address")
    }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };
  
  
  
  
//navigate('/CreditCardForm')
  


  return (
    <div>
      <div>
        < NoIconNav/>
        </div>
        <div className='checkbody'>
          <div className='subcheckbody'>
            <div className='checkformdiv'>

              <form className='checkform' onSubmit={handleSubmit}>

                <div className='vertical1'>
                  <div className='checkform1'>
                  <label className="fname">Name*</label>
                  <input 
                    className="checktxt" 
                    type="text" 
                    name="name"
                    value={bio.name}
                    onChange={handlechange}
                  />
                </div>
                <div className='checkform2'>
                  <label className="fname">Mobile Number*</label>
                  <input className="checktxt" 
                    type="tel" 
                    name="mobile1"
                    pattern="[5-9]{1}[0-9]{9}"
                    maxLength="10"
                    title="Must contain 10 numbers and first digit in greater than 5"
                    value={bio.mobile1}
                    onChange={handlechange}
                  />
                </div>
                </div>
                <div className='vertical2'>
                <div className='checkform3'>
                  <label className="fname">Pincode*</label>
                  <input className="checktxt" 
                    type="tel" 
                    placeholder="pincode"
                    name="pincode"
                    value={bio.pincode}
                    onChange={handlechange}
                  />
                </div>
                <div className='checkform4'>
                  <label className="fname">Locality*</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="place"
                    name="place"
                    value={bio.place}
                    onChange={handlechange}
                  />
                </div>
                </div>
                <div className='checkform5'>
                  <label className="fname">Address*</label>
                  <textarea className="checktxt1" 
                    type="text" 
                    placeholder="Address"
                    name="address"
                    rows="4" cols="1"
                    value={bio.address}
                    onChange={handlechange}
                  />
                </div>
                <div className='vertical3'>
                <div className='checkform6'>
                  <label className="fname">City*</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="City"
                    name="city"
                    value={bio.city}
                    onChange={handlechange}
                  />
                </div>
                <div className='checkform7'>
                  <label className="fname">State*</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="State"
                    name="state"
                    value={bio.state}
                    onChange={handlechange}
                  />
                </div>
                </div>
                <div className='vertical4'>
                <div className='checkform8'>
                  <label className="fname">Landmark</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="Landmark"
                    name="landmark"
                    value={bio.landmark}
                    onChange={handlechange}
                  />
                </div>
                <div className='checkform9'>
                  <label className="fname">Alternate Mobile number</label>
                  <input className="checktxt" 
                    type="text" 
                    placeholder="mobile2"
                    name="mobile2"
                    pattern="[5-9]{1}[0-9]{9}"
                    maxLength="10"
                    title="Must contain 10 numbers and first digit in greater than 5"
                    value={bio.mobile2}
                    onChange={handlechange}
                  />
                </div>
                </div>
                <button className="button-65" type="submit">Save & Delivery here</button>
              </form>
            </div>
            <div className='cartdiv'>
        <h1>YOUR ORDER</h1>
          <div id="overflowTest">
            {product.map((order, index) => (
            
            <table key={index} style={{textAlign:'left', marginTop:'20px', height:'200px'}}>
              <tr className='ordertr'>
                <td className='ordertd1'>
                  <img className='card-img-top' src={`http://localhost:8000/${order.productDetails.image}`} alt='Card' style={{ height: '180px' , width: '180px'}} />
                </td>
                <td>
                  <h4>{order.productDetails.productName}</h4>
                  <br></br>
                  <h5 style={{color:'green'}}>₹ {order.price}</h5>
                  <br></br>
                  <h5>Quantity : {order.quantity}</h5>
                  <h4 style={{paddingTop:'10px', color:'green'}}> TOTAL ₹ {order.total} </h4>
                </td>             
              </tr>
            </table>
            
            ))}
            <button className="button-37" type="submit" onClick={handleCheckout} style={{marginTop:'70px'}}> Check Out </button>
          </div>
          
      </div>
    </div>
    </div>
  </div>
  )
}

export default Checkout;