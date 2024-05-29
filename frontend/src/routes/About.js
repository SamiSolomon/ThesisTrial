import React from 'react';
import Navbar from '../Components/Navbar';
import "./AboutUs.css";
import Footer from '../Components/Footer';
import { useLanguage } from "../language/context"; // Import the language context

function About() {
  const { translate } = useLanguage(); // Use the translate function from the context

  return (
    <>
      <Navbar />
      <div className='About'>
        <div className='Healthcare'>
          <h1>{translate('About Us')}</h1>
          <p>
            {translate('Welcome to our medical devices identifier and location provider! We are a team of dedicated professionals committed to improving the healthcare industry through innovative technology.')}
          </p>
          <img className="hospital-image" src="https://i0.wp.com/www.ethiopiaobserver.com/wp-content/uploads/2019/04/Doctor_Patient1.jpg?resize=937%2C450&ssl=1" alt="" />
        </div>
        <div className='know'>
          <h2>{translate('Get to know Us')}</h2>
          <div className='ourWork'>
            <div className="vision">
              <i className="fa fa-medkit"></i>
              <a href="vision.js">{translate('Our Vision, Values and purpose')}</a>
              <div id="vision">
                <p>{translate('Our Vision, Values and purpose guide our work')}</p>
              </div>
            </div>
            <div className="links">
              <i className='fas fa-users'></i>
              <a href="#">{translate('Who we are')}</a>
              <div id="who-we-are">
                <p>{translate('Learn about team.')}</p>
              </div>
            </div>
          </div>
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
      <Footer />
    </>
  );
}

export default About;
