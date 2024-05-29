import React from 'react';
import Navbar from '../Components/Navbar';
import './HospitalList.css'; // CSS file for styling
import { useLanguage } from "../language/context"; // Import the language context

const hospitals = [
  {
    name: "Menelik Hospital",
    image: "https://lh5.googleusercontent.com/p/AF1QipNVTepeA4VcoFzkBa9hazYKiENwWezDEJGsOTSM=w500-h500-k-no",
    address: "Jan Meda, Russia Street, Addis Ababa.",
    location: "https://www.google.com/maps?q=Menelik+Hospital",
    services: "https://www.menelikhospital.com/services",
    Book: "http://localhost:3000/Book",
  },
  {
    name: "Yekatit 12 Hospital",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQwmcrVAolZfQXJ-_4Q1PABLCGwAfu4QqlTNzETqFuKA&s",
    address: "Tewodros Street, Addis Ababa.",
    location: "https://www.google.com/maps?q=Yekatit+12+Hospital",
    services: "https://www.yekatit12hospital.com/services",
  },
  {
    name: "St.Paul's Hospital",
    image: "https://quod.lib.umich.edu/c/cirht/images/mpub9712319-hospital.jpg",
    address: "Medical school in Addis Ababa, Ethiopia",
    location: "https://www.google.com/maps?q=St.Paul%27s+Hospital",
    services: "http://localhost:3000/service",
  }
  // Add more hospitals as needed
];

function Hospital() {
  const { translate } = useLanguage(); // Use the translate function from the context

  return (
    <>
      <Navbar />
      <div className='listHospital'>
        <div className='Hospitals'>
          <h1>{translate('List of Hospitals')}</h1>
          <p>{translate('These are the some hospitals in Addis Ababa')}</p>
          <img className="Hospital-image" src="https://www.centralwest.health.qld.gov.au/__data/assets/image/0019/120565/Banner-6.png" alt="" />
        </div>
      </div>
      <div className='Hospit'>
        <div className="hospital-list">
          {hospitals.map((hospital, index) => (
            <div className="hospital-card" key={index}>
              <a href={`/Hospital/${index}`} className="hospital-link">
                <img className="hospital-image" src={hospital.image} alt={hospital.name} />
                <div className="hospital-details">
                  <h2>{translate(hospital.name)}</h2>
                  <p>{translate('Address')}: {translate(hospital.address)}</p>
                  <i className='fas fa-map-marker-alt'></i>
                  <p><a href={hospital.location}>{translate('Location')}</a></p>
                  <i className='fas fa-stethoscope'></i>
                  <p><a href={hospital.services}>{translate('Services')}</a></p>
                  <i className="fa fa-calendar"></i>
                  <p><a href={hospital.Book}>{translate('Book')}</a></p>
                </div>
              </a>
            </div>
          ))}
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
            <hr />
            <div className='sb-footer-below'>
              <p>&copy; 2024 {translate('Hospital Information')}. {translate('All rights reserved.')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hospital;
