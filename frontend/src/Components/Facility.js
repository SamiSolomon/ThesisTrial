import React from 'react';
import "./facility.css";
import menelik from "../Assets/menelik.jpg";
import yekatit from "../Assets/yekatit.jpg";
import { useLanguage } from "../language/context"; // Import the language context

function Facility() {
  const { translate } = useLanguage(); // Use the translate function from the context

  return (
    <div className="listFacility">
      <h1>{translate('Our Facilities')}</h1>
      <div className="facility">
        <div className="fist-fac">
          <div className="fac-text">
            <div className="image">
              <img alt="img" src={menelik} />
            </div>
            <h3>{translate('Menelik II Referral Hospital')}</h3>
            <p>
              <span className="description">{translate('Address')}</span>: {translate('Jan Meda, Russia Street, Addis Ababa.')}{/* Add translations */}
              <br />
              {translate('Location')}, {translate('Addis Ababa, Ethiopia')}.
            </p>
          </div>
        </div>

        <div className="second-fac">
          <div className="image2">
            <img alt="img" src={yekatit} />
          </div>
          <h4>{translate('Yekatit 12 Referral Hospital')}</h4>
          <p>
            <span className="description">{translate('Address')}</span>: {translate('Tewodros Street, Addis Ababa.')}{/* Add translations */}
            <br />
            {translate('Location')}, {translate('Addis Ababa, Ethiopia')}.
          </p>
        </div>
      </div>
      <h1 className="All">
        <a href='http://localhost:3000/hospitalList'>{translate('All Hospital')}</a> <i className='far fa-arrow-alt-circle-right'></i>
      </h1>
      <div className="button">
        <h5 className="text">{translate('Our Services')}</h5>
        <button className='serv'>
          <a href='#'>{translate('Dental')}</a>
        </button>
        <button className='serv'>
          <a href='#'>{translate('Maternity')}</a>
        </button>
        <button className='serv'>
          <a href='#'>{translate('Mental Health')}</a>
        </button>
        <button className='serv'>
          <a href='#'>{translate('Emergency')}</a>
        </button>
        <h1 className="All">
          <a href='http://localhost:3000/service'>{translate('All services')}</a> <i className='far fa-arrow-alt-circle-right'></i>
        </h1>
      </div>
    </div>
  );
}

export default Facility;
