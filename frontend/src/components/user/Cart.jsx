import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { HiShoppingCart } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import  NoIconNav from './NoIconNav'
import "./UserNav.css";
import "./Cart.css";

function Cart() {

    const authid = localStorage.getItem('authid');
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]); // List of products from order table
    const [productCount, setProductCount] = useState({});
    


    const deleteProduct = async (productId) => {
        try {
          await axios.delete(`http://localhost:8000/api/cart/cart/${authid}/${productId}`);
          fetchproduct();
        } catch (error) {
          console.error('Error deleting product from cart:', error);
        }
      };

     useEffect(() => {
        const authid= localStorage.getItem('authid')
        if(!authid){
          navigate('/login')
        }
    },[])

    const navigate=useNavigate()

    const [product,setproduct]= useState([])

    const fetchproduct=async()=>{
        const res=await axios.get(`http://localhost:8000/api/cart/getcartbyuserid/${localStorage.getItem('authid')}`)
      setproduct(res.data)
      console.log(res.data)
    }


    useEffect(() => {
        fetchproduct()
    },[])

    const handleCardClick = (productId) => {
    console.log(productId)
    navigate(`/ProductDetail?productId=${productId}`);
    };

  

  const initializeProductCount = (cartItems) => {
    const initialCount = {};
    cartItems.forEach((cart) => {
      initialCount[cart.productDetails._id] = 1; // Set the initial count to 1 for each product
    });
    setProductCount(initialCount);
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter((id) => id !== productId)
        : [...prevSelectedProducts, productId]
    );
  };

  const isProductSelected = (productId) => selectedProducts.includes(productId);

  const orderclick = async () => {
    const cartItems = product;
    const selectedProduct = cartItems.find((cartItem) =>
      isProductSelected(cartItem.productDetails._id)
    );
  
    if (!selectedProduct) {
      alert("Please select a product to order.");
      return;
    }
  
    const authid = localStorage.getItem('authid');
    const productId = selectedProduct.productDetails._id;
  
    try {
      const res = await axios.get(`http://localhost:8000/api/cart/quantity/${authid}/${productId}`);
      const cartData = res.data;
  
      if (!cartData) {
        console.error(`Cart data not found for product: ${productId}`);
        return;
      }
  
      const order = {
        userid: authid,
        productid: productId,
        sellerid: selectedProduct.productDetails.sellerid,
        quantity: cartData.quantity,
        price: selectedProduct.productDetails.price,
        total: cartData.total,
      };
  
      console.log(`Quantity for product ${productId}: ${cartData.quantity}`);
      console.log('Selected Order:', order);
  
      // Place your order with the selected product
      const orderRes = await axios.post(`http://localhost:8000/api/order/place`, [order]);
      console.log('Order placed:', orderRes.data);
  
      // Now, navigate to the checkout or payment page as needed
      navigate('/Checkout');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  

  const handleCheckboxClick = (productId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(productId)) {
        // If the product is already selected, remove it from the selection
        return prevSelectedRows.filter((id) => id !== productId);
      } else {
        // If the product is not selected, add it to the selection
        return [...prevSelectedRows, productId];
      }
    });
  };

  const fetchOrderProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/order/user/${localStorage.getItem('authid')}`);
      setOrderProducts(res.data);
    } catch (error) {
      console.error('Error fetching order products:', error);
    }
  };

  useEffect(() => {
    fetchproduct();
    fetchOrderProducts(); // Fetch products from order table
  }, []);

  const isProductInOrder = (productId) => {
    return orderProducts.some((product) => product.productid === productId);
  };

  const incrementQuantity = async (productId,e ) => {
    e.preventDefault();
    try {
      const authid = localStorage.getItem('authid');
      const res = await axios.get(`http://localhost:8000/api/cart/increment/${authid}/${productId}`);
      const updatedCart = res.data.cart;
      console.log("quantity : ", updatedCart.quantity);
      console.log("productid : ",productId)
      console.log("authid : ",authid)
      fetchproduct();
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  };

  const decrementQuantity = async (productId,e ) => {
    e.preventDefault();
    try {
      const authid = localStorage.getItem('authid');
      const res = await axios.get(`http://localhost:8000/api/cart/decrement/${authid}/${productId}`);
      const updatedCart = res.data.cart;
      console.log("quantity : ", updatedCart.quantity);
      console.log("productid : ",productId)
      console.log("authid : ",authid)
      fetchproduct();
      
    } catch (error) {
      console.error('Error decrementing quantity:', error);
    }
  };

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
    deleteOrders();
  }, []);


  return (
    <div>
      <div>
        < NoIconNav/>
      </div>
      <div>
        <div className='cardcart'>
          <div>
            <div className='carthead'>
              <h1>
                <HiShoppingCart className='cartheadicon' size={52} color='red' />
                My cart
              </h1>
            </div>
            <div>
              <table className='cart_table'>
        {<tbody>
          {product.map((cart, index) => (
            <tr
              key={index}
              className={`cart_tr ${isProductSelected(cart.productDetails._id) ? 'selected' : ''}`}
            >
              <td className='cart_checkbox'>
                <input
                  type='checkbox'
                  checked={isProductSelected(cart.productDetails._id)}
                  onChange={() => handleCheckboxChange(cart.productDetails._id)}
                />
              </td>
                    <td></td>
                    <td className='dummy' onClick={() => handleCardClick(cart.productDetails._id)}>
                      <img
                        className='cart_image'
                        src={`http://localhost:8000/${cart.productDetails.image}`}
                        style={{ height: '70px', width: '80px' }}
                      />
                    </td>
                    <td className='cart_name' onClick={() => handleCardClick(cart.productDetails._id)}>
                      {cart.productDetails.productName}
                    </td>
                    <td className='cart_counter'>
                      <button className='box_left-box' onClick={(e) => decrementQuantity(cart.productDetails._id, e)}>
                        -
                      </button>
                      <span className="box_center-box">{cart.quantity}</span>
                      <button className='box_right-box' onClick={(e) => incrementQuantity(cart.productDetails._id, e)}>
                        +
                      </button>
                    </td>
                    <td className='cart_price'>₹{cart.total}
                    </td>
                    <td className='deleteicon'>
                      <MdDelete size={24} onClick={() => deleteProduct(cart.productDetails._id)} />
                    </td>
                  </tr>
                ))}
          </tbody>}
              </table>
            </div>
          </div>
        </div>
      </div>
      <button className="button-25" role="button" onClick={orderclick}>Order</button>
    </div>
  );
}

export default Cart;