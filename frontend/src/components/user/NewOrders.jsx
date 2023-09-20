import  React, { useState , useEffect} from 'react';
import axios from "axios";
import NoIconNav from './NoIconNav';



function NewOrders() {

    const [showUser, setShowUser] = useState(false);
    const [showUser1, setShowUser1] = useState(false);
    const [orderHistory, setOrderHistory] = useState([]);

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

      useEffect(() => {
        handleCheck();
    },[])

    const fetchOrderHistory = async () => {
        try {
          const res = await axios.get('http://localhost:8000/api/order/all');
          setOrderHistory(res.data);
        } catch (error) {
          console.error('Error fetching order history:', error);
        }
      }

      useEffect(() => {
        fetchOrderHistory();
      }, []);

  return (
    <div>
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
      <div>
      <table className='viewproduct_table' style={{marginTop:'150px', marginLeft:'250px', width:'70%'}}>
      <thead>
        <tr className='viewproduct_tr'>
        <th className='viewproduct_th'>Order id</th>
          <th className='viewproduct_th'>Product id</th>
          <th className='viewproduct_th'>Status</th>
          <th className='viewproduct_th'>Quantity</th>
          <th className='viewproduct_th'>Total</th>
          <th className='viewproduct_th'>Place</th>
        </tr>
      </thead>
      <tbody>
      {orderHistory.map((order, index) => (
            <tr key={index} className='verifier_table_tr'>
            
            <td className='viewproduct_td'>{order._id}</td>
            <td className='viewproduct_td'>{order.productid}</td>
            <td className='viewproduct_td'>{order.status}</td>
            <td className='viewproduct_td'>{order.quantity}</td>
            <td className='viewproduct_td'>₹{order.total}</td>
            <td className='viewproduct_td'>{order.place}</td>
          </tr>

          
      ))}
    </tbody>
    </table>
      </div>
    </div>
  )
}

export default NewOrders