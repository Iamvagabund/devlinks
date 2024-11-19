import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { FaLink, FaUserCircle, FaEye } from 'react-icons/fa';


const HeaderMain = ({ activeTab, setActiveTab }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="/images/devlinks.png" alt="logo" className="header__logo" />
        <span className="header__title">devlinks</span>
      </div>

      <div className="header-buttons header__menu">
        <button
          className={`header-button header__menu-item ${activeTab === "links" ? "active" : ""}`}
          onClick={() => setActiveTab("links")}
        >
          <FaLink className="header-button__icon" />
          <span>Links</span>
        </button>
        <button
          className={`header-button header__menu-item ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <FaUserCircle className="header-button__icon" />
          <span>Profile Details</span>
        </button>
      </div>

      <Link to="/preview">
        <button className="header__preview">
          <span>Preview</span>
          <FaEye className="header-button__icon-preview" />
        </button>
      </Link>
    </header>
  );
};

export default HeaderMain;
