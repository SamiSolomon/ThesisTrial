import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from "../language/context"; // Import the language context

const NearbyHospitals = () => {
  const { translate } = useLanguage(); // Use the translate function from the context
  const [hospitals, setHospitals] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(9.039651);
        setLongitude(38.761808);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  // Fetch hospitals based on user's location
  useEffect(() => {
    const fetchHospitals = async () => {
      if (latitude !== null && longitude !== null) {
        try {
          const response = await axios.get('/api/nearbyhospitals', {
            params: { latitude, longitude },
          });
          setHospitals(response.data.hospitals);
        } catch (error) {
          console.error('Error fetching nearby hospitals:', error);
        }
      }
    };

    fetchHospitals();
  }, [latitude, longitude]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{translate('Nearby Hospitals')}</h1>
      {hospitals.length > 0 ? (
        <ul className="space-y-4">
          {hospitals.map((hospital, index) => (
            <li key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">{hospital.name}</h2>
              <p className="text-gray-600">{hospital.location}</p>
              <p className="text-gray-800">{translate('Distance')}: {hospital.distance.toFixed(2)} km</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">{translate('Loading hospitals...')}</p>
      )}
    </div>
  );
};

export default NearbyHospitals;
