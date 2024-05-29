import React from "react";
import { useLanguage } from "../language/context";

const LanguageSwitcher = () => {
  const { switchLanguage, language } = useLanguage();

  const handleLanguageChange = (e) => {
    switchLanguage(e.target.value);
    
  };

  return (
    <select value={language} onChange={handleLanguageChange}>
      <option value="en">English</option>
      <option value="am">አማሪኛ</option>
      <option value="om">Oromifaa</option>
      {/* Add more languages as needed */}
    </select>
  );
};

export default LanguageSwitcher;
