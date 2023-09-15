import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoIconNav from './NoIconNav';
import { useNavigate } from 'react-router-dom';
import "./Orders.css";


function Orders() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    fetchOrderHistory();
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

  

  return (
    <div>
      <div>
        < NoIconNav/>
      </div>
        <div style={{marginLeft:'300px', marginRight:'300px'}}>
          <h1 style={{paddingTop:'50px',textAlign:'center', fontFamily:'-moz-initial'}}>Order Histroy</h1>
          <div style={{marginTop:'100px'}}>
            <table style={{width:'100%', marginTop:'-25px'}}>
              <thead>
                <tr className='OrderHistroytr'>
                  <th className='OrderHistroyth'>Order Id</th>
                  <th className='OrderHistroyth'>Product</th>
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
                      <td className='OrderHistroytd'>
                        <a onClick={() => orderDetail(order.orderId, order.product.productId)} style={{color:'blue', textDecoration:'underline', cursor: 'pointer' }}>{order.orderId}</a>
                      </td>
                      <td className='OrderHistroytd'>
                        <img src={`http://localhost:8000/${order.product.image}`} alt={order.product.productName} style={{ width: '50px', height: '50px' }} />
                        {order.product.productName}
                      </td>
                      <td className='OrderHistroytd'>{formattedDate}</td>
                      <td className='OrderHistroytd'>{order.payment}</td>
                      <td className='OrderHistroytd'>{order.status}</td>
                      <td className='OrderHistroytd'>₹{order.total}</td>
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