import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoIconNav from './NoIconNav';
import { useNavigate } from 'react-router-dom';
import "./Orders.css";


function Orders() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [orderHistory, setOrderHistory] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const [showUser1, setShowUser1] = useState(false);

  useEffect(() => {
    fetchOrderHistory();
    handleCheck();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/order/getorderbyuserid/${localStorage.getItem('authid')}`);
      setOrderHistory(res.data);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  function getDayName(date) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getDay()];
  }
  
  function getMonthName(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()];
  }

  const orderDetail = (orderId, productId ) => {
    /*console.log("order id  : ", orderId)
    console.log("product id : ",productId)*/
    navigate(`/OrderDetails?orderId=${orderId}&productId=${productId}`);
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
    <div>
      <div>
          {showUser && (
          < NoIconNav/> 
          )}
          {showUser1 && (
            <div style={{height:'80px', borderBottom:'1px solid rgb(225, 217, 217)', marginTop:'30px', marginLeft:'100px', display:'flex', marginRight:'100px', /*backgroundColor:'blanchedalmond'*/ }}>
              <a className="pnav" style={{textAlign:'left', fontWeight:'bold', fontSize:'30px', fontFamily:'unset', paddingTop:'5px'}} href='/SellerHome'>New2U</a>
            </div>
          )}
      </div>
        <div style={{marginLeft:'200px', marginRight:'200px'}}>
          <h1 style={{paddingTop:'50px',textAlign:'center', fontFamily:'-moz-initial'}}>Order Histroy</h1>
          <div style={{marginTop:'100px'}}>
            <table style={{width:'100%', marginTop:'-25px'}}>
              <thead>
                <tr className='OrderHistroytr'>
                  <th className='OrderHistroyth' style={{width:'50px'}}>Order Id</th>
                  <th className='OrderHistroyth' style={{width:'200px'}}>Product</th>
                  <th className='OrderHistroyth'>Date</th>
                  <th className='OrderHistroyth'>Payment Status</th>
                  <th className='OrderHistroyth'>Order Status</th>
                  <th className='OrderHistroyth'>Price</th>
                </tr>
                </thead>
                <tbody>
                {orderHistory.map((order, index) => {
                  const orderDate = new Date(order.date);
                  const formattedDate = `${getDayName(orderDate)}, ${orderDate.getDate()} ${getMonthName(orderDate)}, ${orderDate.getFullYear()}`;
                  return (
                    <tr key={index} className='OrderHistroytr'>
                      <td className='OrderHistroytd' style={{width:'50px'}}>
                        <a onClick={() => orderDetail(order.orderId, order.product.productId)} style={{color:'blue', textDecoration:'underline', cursor: 'pointer' }}>{order.orderId}</a>
                      </td>
                      <td className='OrderHistroytd' style={{textAlign:'left', width:'200px'}}>
                        <img src={`http://localhost:8000/${order.product.image}`} alt={order.product.productName} style={{ width: '50px', height: '50px'}} />
                        {order.product.productName}
                      </td>
                      <td className='OrderHistroytd'>{formattedDate}</td>
                      <td className='OrderHistroytd1'>{order.payment}</td>
                      <td className='OrderHistroytd1'>{order.status}</td>
                      <td className='OrderHistroytd1'>₹{order.total}</td>
                    </tr>
                  );
                })}
        </tbody>
          </table>
          </div>
        </div>
    </div>
  )
}

export default Orders