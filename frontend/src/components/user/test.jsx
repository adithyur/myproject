import React, { useState } from 'react';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '', gender: '' });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'radio' ? value : value.trim();
    /*console.log(value)*/
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic with formData.email, formData.password, and formData.gender
    console.log('Email:', formData.email);
    console.log('Password:', formData.password);
    console.log('Gender:', formData.gender);
    // Reset form
    setFormData({ email: '', password: '', gender: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          checked={formData.gender === 'female'}
          onChange={handleChange}
        />
        <label htmlFor="female">Female</label>
      </div>
      <div>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          checked={formData.gender === 'male'}
          onChange={handleChange}
        />
        <label htmlFor="male">Male</label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

