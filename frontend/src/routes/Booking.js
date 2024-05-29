import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./BookStyles.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLanguage } from "../language/context"; // Import the language context
import Navbar from '../Components/Navbar';
import Modal from './Modal'; // Import the Modal component

const BookingForm = () => {
  const { translate } = useLanguage(); // Use the translate function from the context
  const [hospitals, setHospitals] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState(new Date());
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const [modalMessage, setModalMessage] = useState(''); // State for modal message

  const excludedDates = [
    new Date('2024-06-01'),
    new Date('2024-06-02'),
    new Date('2024-06-03')
  ];

  useEffect(() => {
    axios.get('http://localhost:8000/api/hospitals/')
      .then(response => {
        setHospitals(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the hospitals!', error);
      });
  }, []);

  useEffect(() => {
    if (selectedHospital) {
      console.log(`Fetching services for hospital ID: ${selectedHospital}`);
      axios.get(`http://127.0.0.1:8000/api/hospitals/${selectedHospital}/`)
        .then(response => {
          if (Array.isArray(response.data)) {
            setServices(response.data);
            console.log(`Services for hospital ${selectedHospital}:`, response.data);
          } else {
            setServices([]);
            console.warn(`Expected an array of services but received:`, response.data);
          }
        })
        .catch(error => {
          console.error('There was an error fetching the services!', error);
          setServices([]);
        });
    } else {
      setServices([]);
    }
  }, [selectedHospital]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const hospitalId = parseInt(selectedHospital, 10);
    const serviceId = parseInt(selectedService, 10);

    // Ensure all required fields are filled
    if (!firstName || !lastName || !email || !selectedHospital || !selectedService) {
      alert(translate('Please fill in all the required fields.'));
      return;
    }

    const booking = {
      hospital: hospitalId,
      service: serviceId,
      first_name: firstName,
      last_name: lastName,
      appointment_date: appointmentDate.toISOString().split('T')[0],
      appointment_time: appointmentTime.toTimeString().split(' ')[0].substring(0, 8),
      email: email,
    };

    axios.post('http://localhost:8000/api/appointments/', booking)
      .then(response => {
        console.log('Response:', response);
        setModalMessage(translate('Appointment booked successfully!'));
        setShowModal(true);
        // Reset the form fields
        setSelectedHospital('');
        setSelectedService('');
        setFirstName('');
        setLastName('');
        setAppointmentDate(new Date());
        setAppointmentTime(new Date());
        setEmail('');
        setServices([]);
      })
      .catch(error => {
        console.error('There was an error booking the appointment!', error.response || error);
        if (error.response && error.response.data) {
          console.error('Response data:', error.response.data);
        }
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <Navbar />
    {showModal && <Modal message={modalMessage} onClose={closeModal} />} {/* Modal for success message */}
    <div className="information">
        <h3>{translate('Important Information')}:</h3>
        <p>{translate('Please read the following information before scheduling your appointment')}:</p>
        <ul>
          <li>{translate('Make sure to arrive at least 15 minutes before your scheduled appointment time')}.</li>
          <li>{translate('Bring your identification card and any relevant medical documents with you')}.</li>
          <li>{translate('Payment is required at the time of the appointment. We accept cash and major credit cards')}.</li>
          <li>{translate('Please note that appointment cancellation should be done at least 24 hours in advance')}.</li>
        </ul>
      </div>
    <form onSubmit={handleSubmit} className="mx-auto p-6 max-h-full w-96 bg-white shadow-md rounded-lg flex-col">
      <div className="m-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hospital">
          {translate('Hospital')}
        </label>
        <select
          id="hospital"
          value={selectedHospital}
          onChange={(e) => setSelectedHospital(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">{translate('Select a hospital')}</option>
          {hospitals.map(hospital => (
            <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
          ))}
        </select>
      </div>
      <div className="m-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="service">
          {translate('Service')}
        </label>
        <select
          id="service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">{translate('Select a service')}</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>{service.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
          {translate('First Name')}
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="m-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
          {translate('Last Name')}
        </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="m-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="appointmentDate">
          {translate('Appointment Date')}
        </label>
        <DatePicker
          id="appointmentDate"
          selected={appointmentDate}
          onChange={(date) => setAppointmentDate(date)}
          excludeDates={excludedDates}
          dateFormat="yyyy-MM-dd"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="m-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="appointmentTime">
          {translate('Appointment Time')}
        </label>
        <DatePicker
          id="appointmentTime"
          selected={appointmentTime}
          onChange={(time) => setAppointmentTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="HH:mm:ss"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="m-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          {translate('Email')}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {translate('Book Appointment')}
      </button>
    </form>
   
    <div className='footer'>
          <div className='top'>
            <div>
              <h1>{translate('Hospital Information')}</h1>
              <p>{translate('Get the information and location of the Hospitals')}.</p>
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
    
    </>
  );
};

export default BookingForm;
