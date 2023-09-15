import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Payment.css'

function PaymentPage() {

const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const orderId = searchParams.get('orderId');
const productId = searchParams.get('productId');
const authid = localStorage.getItem('authid');
const currentDate = new Date();
//console.log("product id : ", productId);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [ccv, setCcv] = useState('');
  const [isCODPayment, setIsCODPayment] = useState(false);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleCardHolderChange = (e) => {
    setCardHolder(e.target.value);
  };

  const handleExpirationMonthChange = (e) => {
    setExpirationMonth(e.target.value);
  };

  const handleExpirationYearChange = (e) => {
    setExpirationYear(e.target.value);
  };

  const handleCcvChange = (e) => {
    setCcv(e.target.value);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (paymentMethod === 'cod') {
  
      console.log("Payment method: ",paymentMethod);
      setIsCODPayment(true);
      try {
        const currentDate = new Date().toISOString();
        const dataToSend = {
          userid: localStorage.getItem('authid'),
          orderid: orderId,
          mode: paymentMethod,
          date: currentDate,
        };
  
        const transactionResponse = await axios.post(`http://localhost:8000/api/transaction/cod`, dataToSend);
  
        if (transactionResponse.status === 201) {
          console.log('Transaction details saved successfully.');
          const transactionId = transactionResponse.data.transactionId;
          
          if (transactionId) {
            console.log('Transaction ID:', transactionId);
            const updateOrderResponse = await axios.put(`http://localhost:8000/api/order/confirmOrder/${orderId}`, { transactionId });
            if (updateOrderResponse.status === 200) {
              console.log('Order status updated to confirmed.');

              const deleteProductResponse = await axios.delete(`http://localhost:8000/api/cart/cart/${authid}/${productId}`);
              if (deleteProductResponse.status === 200) {
                console.log('Product deleted from the cart.');
              } else {
                console.error('Error deleting product from the cart:', deleteProductResponse.data.message);
              }

            } else {
              console.error('Error updating order status:', updateOrderResponse.data.message);
            }
          } else {
            console.error('Transaction ID not found in the response.');
          }
        } else {
          console.error('Error saving transaction details:', transactionResponse.data.message);
        }
      } catch (error) {
        console.error('Error sending payment data:', error);
      }
    } else {
      setIsCODPayment(false);
      const paymentData = {
        cardNumber,
        cardHolder,
        expirationMonth,
        expirationYear,
        ccv,
      };
  
      try {
        const currentDate = new Date().toISOString();
        const dataToSend = {
          userid: localStorage.getItem('authid'),
          orderid: orderId,
          mode: paymentMethod,
          date: currentDate,
        };
  
        const transactionResponse = await axios.post(`http://localhost:8000/api/transaction/createTransaction`, dataToSend);
  
        if (transactionResponse.status === 201) {
          console.log('Transaction details saved successfully.');
          const transactionId = transactionResponse.data.transactionId;
          
          if (transactionId) {
            console.log('Transaction ID:', transactionId);
            const updateOrderResponse = await axios.put(`http://localhost:8000/api/order/confirmOrder/${orderId}`, { transactionId });
            if (updateOrderResponse.status === 200) {
              console.log('Order status updated to confirmed.');

              const deleteProductResponse = await axios.delete(`http://localhost:8000/api/cart/cart/${authid}/${productId}`);
              if (deleteProductResponse.status === 200) {
                console.log('Product deleted from the cart.');
              } else {
                console.error('Error deleting product from the cart:', deleteProductResponse.data.message);
              }

            } else {
              console.error('Error updating order status:', updateOrderResponse.data.message);
            }
          } else {
            console.error('Transaction ID not found in the response.');
          }
        } else {
          console.error('Error saving transaction details:', transactionResponse.data.message);
        }
      } catch (error) {
        console.error('Error sending payment data:', error);
      }
    }
  };
  
  
  
  

  return (
    <div className="payment-container">
      <h2>Payment Information</h2>
      <form onSubmit={handlePaymentSubmit}>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="card">Credit/Debit Card</option>
            <option value="cod">Cash on Delivery (COD)</option>
          </select>
        </div>

        {paymentMethod === 'card' && (
          <div>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardHolder">Card Holder</label>
              <input
                type="text"
                id="cardHolder"
                value={cardHolder}
                onChange={handleCardHolderChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="expirationMonth">Expiration Date</label>
              <div className="expiration-date">
                <select
                  id="expirationMonth"
                  value={expirationMonth}
                  onChange={handleExpirationMonthChange}
                  required
                >
                  <option value="">Month</option>
                  <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option>07</option>
              <option>08</option>
              <option>09</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
                </select>
                <select
                  id="expirationYear"
                  value={expirationYear}
                  onChange={handleExpirationYearChange}
                  required
                >
                  <option value="">Year</option>
                  <option value="2016">2016</option>
              <option>2017</option>
              <option>2018</option>
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="ccv">CCV</label>
              <input
                type="text"
                id="ccv"
                value={ccv}
                onChange={handleCcvChange}
                placeholder="123"
                required
              />
            </div>
          </div>
        )}

        <button type="submit" className="submit-button">
          {paymentMethod === 'cod' ? 'Place Order (COD)' : 'Pay Now'}
        </button>
      </form>

      {isCODPayment && (
        <div className="confirmation-message">
          Your order has been placed. You will pay with cash upon delivery.
        </div>
      )}
    </div>
  );
}

export default PaymentPage;
