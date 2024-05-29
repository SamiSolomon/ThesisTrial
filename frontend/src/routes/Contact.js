import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Modal from '../routes/Modal';
import "./Contactstyles.css";
import { useLanguage } from "../language/context"; // Import the language context

function Contact() {
  const { translate } = useLanguage(); // Use the translate function from the context
  const [hospitals, setHospitals] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    familyname: '',
    email: '',
    phone: '',
    hospital: '',
    message: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('/api/hospitals')
      .then(response => {
        setHospitals(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the hospitals!', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/feedback/', formData)
      .then(response => {
        console.log('Feedback submitted successfully:', response.data);
        setSuccessMessage(translate('Thank you for your feedback!'));
        setFormData({
          name: '',
          familyname: '',
          email: '',
          phone: '',
          hospital: '',
          message: ''
        });
        setShowModal(true);
      })
      .catch(error => {
        console.error('There was an error submitting the feedback:', error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <div className='contact'>
        <div className='healthcontact'>
          <h1>{translate('Contact Us')}</h1>
          <p>{translate('Welcome to our medical devices identifier and location provider! Ask a question, get health advice, give a compliment or make a complaint')}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">{translate('name')}:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="familyname">{translate('Family Name')}:</label>
            <input type="text" id="familyname" name="familyname" value={formData.familyname} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="email">{translate('Email')}:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="phone">{translate('Phone Number')}:</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="hospital">{translate('Which hospital is your feedback about?')}</label>
            <select id="hospital" name="hospital" value={formData.hospital} onChange={handleChange} required>
              <option value="">{translate('Select a hospital')}</option>
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>{translate(hospital.name)}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="message">{translate('Provide detailed feedback for us')}</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" />
          </div>
          <div className='submit-container'>
            <button type="submit">{translate('Submit')}</button>
          </div>
        </form>
        <div className='footer'>
          <div className='top'>
            <div>
              <h1>{translate('Hospital Information')}</h1>
              <p>{translate('Get the information and location of the Hospitals.')}</p>
            </div>
          </div>
          <div className='bottom'>
            <div>
              <h2>{translate('Services')}</h2>
              <a href='/'>{translate('Conditions')}</a>
              <a href='/'>{translate('Listings')}</a>
              <a href='/'>{translate('What we offer')}</a>
              <a href='/'>{translate('How it Works')}</a>
              <a href='/'>{translate('Latest News')}</a>
            </div>
            <div>
              <h2>{translate('Useful Links')}</h2>
              <a href='http://localhost:3000/About'>{translate('About')}</a>
              <a href='http://localhost:3000/service'>{translate('Services')}</a>
              <a href='http://localhost:3000/Hospital'>{translate('Hospitals')}</a>
              <a href='http://localhost:3000/Contact'>{translate('Contact')}</a>
            </div>
            <div>
              <h2>{translate('Follow us')}</h2>
              <a href='/'>Facebook</a>
              <a href='/'>Telegram</a>
              <a href='/'>WhatsApp</a>
              <a href='/'>Twitter</a>
              <a href='/'>Instagram</a>
            </div>
            <div>
              <h2>{translate('Contact Us')}</h2>
              <a href='/'>firii9@gmail.com</a>
              <a href='/'>+251978796545</a>
            </div>
          </div>
        </div>
      </div>
      {showModal && <Modal message={successMessage} onClose={handleCloseModal} />}
    </>
  );
}

export default Contact;
