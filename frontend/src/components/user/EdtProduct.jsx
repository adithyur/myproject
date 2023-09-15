import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import  NoIconNav from './NoIconNav'
import "./UserNav.css"
import "./EdtProduct.css"

function EdtProduct() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('productId');

    const [product, setProduct] = useState({ productName: '',
                                              price: '',
                                              productType: '',
                                              category: '',
                                              brand: '',
                                              image: '',
                                              description: ''
                                            });

    useEffect(() => {
        const authid= localStorage.getItem('authid')
        if(!authid){
          navigate('/login')
        }
    },[])

    const logout = () => {
        localStorage.removeItem('authid')
        navigate('/')
    }

    const navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const fetchProduct = async () => {
      try {
        const res = await axios.post(`http://localhost:8000/api/products/display/${productId}`);
        console.log(res)
          setProduct({
            productName: res.data.productName,
            price: res.data.price,
            productType: res.data.productType,
            category: res.data. category,
            brand: res.data.brand,
            image: res.data.image,
            description: res.data.description,
          });
          /*console.log('Profile:', product); // Log the updated product state*/
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Error fetching profile');
      }
    } 
      useEffect(() => {
        fetchProduct()
    },[])


    const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProduct((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      /*console.log(product);*/
      const res=await axios.put(`http://localhost:8000/api/products/edit/${productId}`, product);
      if(res.status===200){
        console.log("responds = ",res.data);
      alert("Product updated successfully");
      }
      
      navigate('/ViewProduct');
    } catch (error) {
      console.error('Error updating product:', error);
      alert("Error updating product:");
    }
  };
  

  return (
    <div>
      <div>
        < NoIconNav/>
      </div>
      <div>
        <div className='usform'>
      <form className="usraddform" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        name="productName"
        value={product.productName}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        placeholder="Price"
        name="price"
        value={product.price}
        onChange={handleChange}
        required
      />

      <label htmlFor="image">Image</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        multiple
        onChange={handleChange}
        required
  />

      <input
        type="text"
        placeholder='Brand'
        name="brand"
        value={product.brand}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        required
      />
            <button type="submit">Update Product</button>
    </form>
                </div>
        </div>
    </div>
  )
}

export default EdtProduct