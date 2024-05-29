import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Update the CSS file name if needed
import Modal from './Modal';
import { useLanguage } from '../language/context'; // Import the language context

const Login = () => {
  const { translate } = useLanguage(); // Use the translate function from the context
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { username, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', formData);
      console.log(response.data);
      setModalMessage(translate('Login successful!'));
      setIsModalOpen(true);
      // Optionally, save the token in local storage
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error(error.response.data);
      setModalMessage(translate('Login failed. Please check your credentials.'));
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <h1>{translate('Login to Your Account')}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='username-label'>{translate('Username')}:</label>
            <div className='username-input'>
              <input 
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className='password-label'>{translate('Password')}:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>
          <a href='#register'><h6>{translate('forget password?')}</h6></a>
          <button type="submit">{translate('Login')}</button>
        </form>
      </div>
      {isModalOpen && (
        <Modal message={modalMessage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Login;
