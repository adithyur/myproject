/*import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

export default function AddProduct() {
  const authid = localStorage.getItem('authid');
  const [formData, setFormData] = useState({
    sellerid: authid,
    productName: '',
    price: '',
    productType: '',
    category: '',
    brand: '',
    images: [], // Use an array to store multiple images
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // If the input type is 'file', handle multiple image files
    if (type === 'file') {
      const imageFiles = Array.from(files); // Convert FileList to an array
      setFormData((prevData) => ({
        ...prevData,
        [name]: imageFiles, // Store an array of image files
      }));
    } else {
      // For other input types, update the value as usual
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData(); // Create a FormData object

      // Append data to the FormData object
      formDataToSend.append('sellerid', formData.sellerid);
      formDataToSend.append('productName', formData.productName);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('productType', formData.productType);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('brand', formData.brand);

      // Append each image to the FormData
      formData.images.forEach((image, index) => {
        formDataToSend.append(`image${index + 1}`, image);
      });

      formDataToSend.append('description', formData.description);

      // Send the FormData to the backend
      await axios.post('http://localhost:8000/api/products/addproduct', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Reset the form after successful submission
      setFormData({
        sellerid: authid,
        productName: '',
        price: '',
        productType: '',
        category: '',
        brand: '',
        images: [],
        description: '',
      });

      alert('Product Added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product:');
    }
  };

  return (
    <div>
      <div>
        <div className="usform">
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

            <div className="protype">
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
              <option value="headphone">HeadPhone</option>
              <option value="Watch">Watch</option>
              <option value="bike">Bike</option>
              <option value="mobile">Mobile</option>
              <option value="tv">TV</option>
            </select>

            <input
              type="text"
              placeholder="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />

            <label htmlFor="images">Images</label>
            <input
  type="file"
  name="image"
  accept="image/*"
  onChange={handleChange}
  required
/>

<input
  type="file"
  name="image2"
  accept="image/*"
  onChange={handleChange}
  required
/>

<input
  type="file"
  name="image3"
  accept="image/*"
  onChange={handleChange}
  required
/>

<input
  type="file"
  name="image4"
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
  );
}*/

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css';

export default function AddProduct() {

  const navigate = useNavigate();
  const authid = localStorage.getItem('authid');
  const [formData, setFormData] = useState({
    sellerid: authid,
    productName: '',
    price: '',
    productType: '',
    category: '',
    brand: '',
    quantity: '',
    image1: null, // Initialize image fields with null
    image2: null,
    image3: null,
    image4: null,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0], // Update the image fields with the selected file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('sellerid', formData.sellerid);
      form.append('productName', formData.productName);
      form.append('price', formData.price);
      form.append('productType', formData.productType);
      form.append('category', formData.category);
      form.append('brand', formData.brand);
      form.append('quantity', formData.quantity);
      form.append('image1', formData.image1);
      form.append('image2', formData.image2);
      form.append('image3', formData.image3);
      form.append('image4', formData.image4);
      form.append('description', formData.description);

      await axios.post('http://localhost:8000/api/products/addproduct', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData({
        sellerid: authid,
        productName: '',
        price: '',
        productType: '',
        category: '',
        brand: '',
        quantity: '',
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        description: '',
      });

      alert('Product Added successfully');
      navigate('/Profile');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product:');
    }
  };

  return (
    <div>
      <div>
        <div className="usform">
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
        <option value="Refrigerator">Refrigerator</option>
        <option value="Watch">Watch</option>
        <option value="sports">Sports</option>
        <option value="mobile">Mobile</option>
        <option value="tv">TV</option>
        <option value="washing machine">Washing Machine</option>
      </select>

      <input
        type="text"
        placeholder='Brand'
        name="brand"
        value={formData.brand}
        onChange={handleChange}
      />

      <input
        type="number"
        placeholder='Quantity'
        name="quantity"
        min="1" max="120"
        value={formData.quantity}
        onChange={handleChange}
      />

<label htmlFor="image1">Image 1</label>
            <input
              type="file"
              name="image1"
              accept="image/*"
              onChange={handleChange}
              required
            />

            <label htmlFor="image2">Image 2</label>
            <input
              type="file"
              name="image2"
              accept="image/*"
              onChange={handleChange}
              required
            />

            <label htmlFor="image3">Image 3</label>
            <input
              type="file"
              name="image3"
              accept="image/*"
              onChange={handleChange}
              required
            />

            <label htmlFor="image4">Image 4</label>
            <input
              type="file"
              name="image4"
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
