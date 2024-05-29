import "./App.css";
import "./input.css";

import Home from "./routes/Home.js";

import About from "./routes/About.js";
import Service from "./routes/Service.js";
import Hospital from "./routes/Hospital.js";
import Contact from "./routes/Contact.js";
import HospitalList from "./routes/HospitalList.js";
import { Route, Routes } from "react-router-dom";
import Body from "./Body.js";
import BookingForm from "./routes/Booking.js";
import NearbyHospitals from "./routes/NearbyHospital.js";
import Register from "./routes/Register.js";
import Login from "./routes/Login.js";
import { LanguageProvider } from "./language/context.js";

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/hospitalList" element={<HospitalList />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/nearby" element={<NearbyHospitals />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Body />
      </div>
    </LanguageProvider>
  );
}

export default App;
