import React from 'react';
import Navbar from '../Components/Navbar';
import SearchService from './SearchService';
import "./serviceStyles.css";
import { useLanguage } from "../language/context"; // Import the language context

const Service = () => {
  const { translate } = useLanguage(); // Use the translate function from the context

  return (
    <>
      <Navbar />
      <div className='Health'>
        <div className='HealthService'>
          <h1>{translate('Health Services')}</h1>
          <p>
            {translate('Welcome to our medical devices identifier and location provider! We are a team of dedicated professionals committed to improving the healthcare industry through innovative technology.')}
          </p>
          <img className="hospitalImage" src="https://i0.wp.com/www.ethiopiaobserver.com/wp-content/uploads/2019/04/Doctor_Patient1.jpg?resize=937%2C450&ssl=1" alt="Hospital" />
        </div>
      </div>
      <p>{translate('The healthcare services offered in Addis Ababa')}</p>
      <SearchService />
      <div className="butn">
        <h5 className="top">{translate('Our top Services')}</h5>
        <button className='topService'>
          <a href='#'>{translate('Dental')}</a>
        </button>
        <button className='topService'>
          <a href='#'>{translate('Maternity')}</a>
        </button>
        <button className='topService'>
          <a href='#'>{translate('Mental Health')}</a>
        </button>
        <button className='topService'>
          <a href='#'>{translate('Emergency')}</a>
        </button>
      </div>
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
            <a href='/'>whatsapp</a>
            <a href='/'>Twitter</a>
            <a href='/'>Instagram</a>
          </div>
          <div>
            <h2>{translate('Contact Us')}</h2>
            <a href='/'>firii9@gmail.com</a>
            <a href='/'>+251978796545</a>
          </div>
          <hr />
          <div className='sb-footer-below'>
            <p>&copy; 2024 {translate('Hospital Information')}. {translate('All rights reserved.')}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
