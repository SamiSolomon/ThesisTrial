import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import Modal from './Modal';
import { useLanguage } from '../language/context'; // Import the language context
import { Navigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Register = () => {
  const { translate } = useLanguage(); // Use the translate function from the context
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { username, email, password, confirmPassword } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register/', formData);
      setModalMessage(translate('Registration completed successfully!'));
      setIsModalOpen(true);
      console.log(response.data);
      // Reset form fields
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      setModalMessage(translate('Registration failed. Please try again.'));
      setIsModalOpen(true);
      console.error(error.response.data);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Navbar />
    <div>
      <div className='register-page'>
        <div className='register-container'>
          <h2>{translate('Register now')}</h2>
          <form onSubmit={handleSubmit}>
            <div className='username-input'>
              <label>{translate('Username')}:</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>{translate('Email')}:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>{translate('Password')}:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                minLength="6"
                required
              />
            </div>
            <div>
              <label>{translate('Confirm Password')}:</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                minLength="6"
                required
              />
            </div>
            <button type="submit">{translate('Register')}</button>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <Modal message={modalMessage} onClose={handleCloseModal} />
      )}
    </div>
    </>
  );
};

export default Register;
