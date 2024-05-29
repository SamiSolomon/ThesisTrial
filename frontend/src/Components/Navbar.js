import React, { useState } from "react";
import { MenuItems } from "./Menu";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../routes/LanguageSwitcher";
import { useLanguage } from "../language/context";

const initialState = {
  clicked: false,
};

function Navbar() {
  const [state, setState] = useState(initialState);
  const { translate } = useLanguage(); // Use the translate function from the context

  const handleClick = () => {
    setState({ ...state, clicked: !state.clicked });
  };

  return (
    <header>
      <nav className="flex flex-row">
        <h1 className="fa fa-heartbeat">{translate('title')}</h1> {/* Translate the header */}
        
        <div className=" flex flex-row" onClick={handleClick}>
          <i className={state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <div>
          <LanguageSwitcher />
        </div>
        <div className="flex flex-row">
        <ul className={`{state.clicked ? "nav-menu active" : "nav-menu"} flex flex-row gap-4`}>
          {MenuItems.map((item, index) => (
            <li key={index}>
              <Link className={item.cName} to={item.url}>
                <i className={item.icon}></i>
                {translate(item.title)} {/* Translate the title */}
              </Link>
            </li>
          ))}
        </ul>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;
