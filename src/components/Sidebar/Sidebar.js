import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import { FaGithub, FaYoutube, FaLinkedin, FaTwitter, FaFacebook, FaArrowRight } from "react-icons/fa";
import "./Sidebar.scss";

function Sidebar() {
  const { profile, links } = useContext(AppContext);

  const renderPlaceholderLinks = (remainingCount) => {
    const placeholderLinks = [];
    for (let i = 0; i < remainingCount; i++) {
      placeholderLinks.push(
        <div key={`placeholder-${i}`} className="placeholder-links"></div>
      );
    }
    return placeholderLinks;
  };

  const platformIcons = {
    GitHub: <FaGithub />,
    YouTube: <FaYoutube />,
    LinkedIn: <FaLinkedin />,
    Twitter: <FaTwitter />,
    Facebook: <FaFacebook />,
  };

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__inner">
          <div className={`profile__image ${profile.image ? "has-image" : ""}`}>
            {profile.image ? <img src={profile.image} alt="User" /> : null}
          </div>

          <div className="profile__info">
            <p
              className={
                profile.firstName || profile.lastName
                  ? "profile__info-name"
                  : "placeholder placeholder-name"
              }
            >
              {profile.firstName} {profile.lastName}
            </p>
            <p className={profile.email ? "profile__info-email" : "placeholder placeholder-email"}>
              {profile.email}
            </p>
          </div>

          <div className="links">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={`links-social links-${
                  link.platform ? link.platform.toLowerCase() : ""
                }`}
              >
                <span className="links-social__icon">{platformIcons[link.platform]}</span>
                <span className="links-social__text">{link.platform}</span>
                <FaArrowRight className="links-social__arrow" />
              </a>
            ))}

            {links.length < 5 && renderPlaceholderLinks(5 - links.length)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
