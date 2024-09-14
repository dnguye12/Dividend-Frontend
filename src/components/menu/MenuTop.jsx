import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MenuTop = () => {
  const [lightMode, setLightMode] = useState(false);
  const { t } = useTranslation();

  const toggleTheme = () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    setLightMode(!lightMode);
  };

  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-center bg-base-950 text-text px-5 h-16 border-b border-b-border shadow z-50">
      <div className="flex items-center">
        <label
          htmlFor="my-drawer-1"
          aria-label="open sidebar"
          className="menu-btn me-2"
        >
          <FontAwesomeIcon icon="fa-solid fa-bars" />
        </label>

        <Link to="/" className="text-text font-semibold text-lg">
          <span className="hidden sm:block">Dividend Insight</span>
          <span className="block sm:hidden">DI</span>
        </Link>
      </div>

      <div className="flex items-center">
        <button className="menu-btn me-2">
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </button>
        <button onClick={toggleTheme} className="menu-btn me-2">
          <FontAwesomeIcon icon="fa-solid fa-circle-half-stroke" />
        </button>
        <button className="h-10 px-4 login-btn">
          <FontAwesomeIcon icon="fa-solid fa-user" className="me-1" />
          Login
        </button>
      </div>
    </div>
  );
};

export default MenuTop;
