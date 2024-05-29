import React from "react";
import Navbar from "../Components/Navbar.js";
import Hero from "../Components/Hero.js";
import Facility from "../Components/Facility.js";
import { useLanguage } from "../language/context"; // Import the language context

// import SearchBar from '../Components/searchBar.js';

function Home() {
  const { translate } = useLanguage(); // Use the translate function from the context

  return (
    <>
      <Navbar />
      <div className="welcome">
        <div className="Home">
          <h1>{translate('heroTitle')}</h1>
          <p>{translate('text')}</p>
          <button className="List">
            <a href="http://localhost:3000/hospitalList">{translate('List of Hospitals')}</a>
            <i className="fas fa-chevron-right"></i>
          </button>
          <br />
          <button className="List">
            <a href="http://localhost:3000/service">{translate('Find Your nearest service')}</a>
            <i className="fas fa-chevron-right"></i>
          </button>

          <img
            className="home-image"
            src="https://www.shutterstock.com/image-photo/medicine-healthcare-people-concept-female-600nw-2188588635.jpg"
            alt=""
          />
        </div>
        <Facility />
        <div className="footer">
          <div className="top">
            <div>
              <h1>{translate('title')}</h1>
              <p>{translate('Get the information and location of the Hospitals.')}</p>
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
              <a href="http://localhost:3000/hospitalList">{translate('Hospitals')}</a>
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
            <div className="sb-footer-below"></div>
          </div>
        </div>
      </div>

      {/* <SearchBar/> */}
    </>
  );
}

export default Home;
