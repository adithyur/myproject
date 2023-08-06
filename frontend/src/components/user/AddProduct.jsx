import React, { useState } from 'react';
import axios from "axios";
import "./AddProduct.css";

export default function AddProduct() {
  const authid= localStorage.getItem('authid')
  const [formData, setFormData] = useState({
    userid: authid,
    productName: '',
    price: '',
    productType: '',
    category: '',
    brand: '',
    image: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      await axios.post('http://localhost:8000/api/products/addproduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',}});
          
      setFormData({
        
        productName: '',
        price: '',
        productType: '',
        category: '',
        brand: '',
        image: null,
        description: ''
      });
      alert("Product Added successfully");
    } catch (error) {
      console.error('Error adding product:', error);
      alert("Error adding product:");
    }
  };

  return (
    <div>

<div>
<div className='usform'>
      <form className="usraddform" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        name="productName"
        value={formData.productName}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        placeholder="Price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <div className='protype'>
      <label htmlFor="productType">Type</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            id="fresh"
            name="productType"
            value="fresh"
            checked={formData.productType === 'fresh'}
            onChange={handleChange} 
            required
          />
          Fresh
        </label>
        <label>
          <input
            type="radio"
            id="used"
            name="productType"
            value="used"
            checked={formData.productType === 'used'}
            onChange={handleChange} 
            required
          />
          Used
        </label>
      </div>
      </div>

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        <option value="car">Car</option>
        <option value="car">HeadPhone</option>
        <option value="car">Watch</option>
        <option value="bike">Bike</option>
        <option value="mobile">Mobile</option>
        <option value="tv">TV</option>
      </select>

      <input
        type="text"
        placeholder='Brand'
        name="brand"
        value={formData.brand}
        onChange={handleChange}
      />

      <label htmlFor="image">Image</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Product</button>
    </form>
                </div>
            </div>
      


    </div>
  )
}
