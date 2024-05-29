import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.js";
import "./HospitalList.css"; // CSS file for styling
import axios from "axios";
import { useLanguage } from "../language/context"; // Import the language context

function HospitalList() {
  const { translate } = useLanguage(); // Use the translate function from the context
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios
      .get("/api/hospitals/")
      .then((response) => {
        setHospitals(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="listHospital">
        <div className="Hospitals">
          <h1>{translate('List of Hospitals')}</h1>
          <p>{translate('These are some hospitals in Addis Ababa')}</p>
          <img
            className="Hospital-image"
            src="https://www.centralwest.health.qld.gov.au/__data/assets/image/0019/120565/Banner-6.png"
            alt=""
          />
        </div>
      </div>
      <div className="Hospital">
        <div className="hospital-list">
          {hospitals.map((hospital) => (
            <div className="hospital-card" key={hospital.id}>
              <a href={`/Hospital/${hospital.id}`} className="hospital-link">
                <img
                  className="hospital-image"
                  src={hospital.image}
                  alt={hospital.name}
                />
                <div className="hospital-details">
                  <h2>{translate(hospital.name)}</h2>
                  <p>{translate('Address')}: {translate(hospital.location)}</p>
                  <i className="fas fa-map-marker-alt"></i>
                  <p>
                    <a
                      href={`https://www.google.com/maps?q=${hospital.location}`}
                    >
                      {translate('Location')}
                    </a>
                  </p>
                  <i className="fas fa-stethoscope"></i>
                  <p>
                    <a href={hospital.services}>{translate('Services')}</a>
                  </p>
                  <i className="fa fa-calendar"></i>
                  <p>
                    <a href="/Book">{translate('Book')}</a>
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="footer">
          <div className="top">
            <div>
              <h1>{translate('Hospital Information')}</h1>
              <p>{translate('Get the information and location of the Hospitals')}.</p>
            </div>
          </div>
          <div className="bottom">
            <div>
              <h2>{translate('Services')}</h2>
              <a href="/">{translate('Conditions')}</a>
              <a href="/">{translate('Listings')}</a>
              <a href="/">{translate('What we offer')}</a>
              <a href="/">{translate('How it Works')}</a>
              <a href="/">{translate('Latest News')}</a>
            </div>
            <div>
              <h2>{translate('Useful Links')}</h2>
              <a href="http://localhost:3000/About">{translate('About')}</a>
              <a href="http://localhost:3000/service">{translate('Services')}</a>
              <a href="http://localhost:3000/Hospital">{translate('Hospitals')}</a>
              <a href="http://localhost:3000/Contact">{translate('Contact')}</a>
            </div>
            <div>
              <h2>{translate('Follow us')}</h2>
              <a href="/">Facebook</a>
              <a href="/">Telegram</a>
              <a href="/">WhatsApp</a>
              <a href="/">Twitter</a>
              <a href="/">Instagram</a>
            </div>
            <div>
              <h2>{translate('Contact Us')}</h2>
              <a href="/">firii9@gmail.com</a>
              <a href="/">+251978796545</a>
            </div>
            <hr />
            <div className="sb-footer-below">
              {/* Add content here if needed */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HospitalList;
