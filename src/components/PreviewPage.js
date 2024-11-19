import React, { useContext } from "react";
import "./App.scss";
import HeaderPreview from "./Header/HeaderPreview";
import Notification from "./Notification/Notification";
import { AppContext } from "./../AppContext";
import {
  FaGithub,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaArrowRight
} from "react-icons/fa";

const platformIcons = {
  GitHub: <FaGithub />,
  YouTube: <FaYoutube />,
  LinkedIn: <FaLinkedin />,
  Twitter: <FaTwitter />,
  Facebook: <FaFacebook />,
};

const PreviewPage = () => {
  const { profile, links } = useContext(AppContext);

  const isProfileEmpty =
    !profile.image && !profile.firstName && !profile.lastName && !profile.email;
  const isLinksEmpty = links.length === 0;

  return (
    <div className="preview__page">
      <HeaderPreview />
      <main className="main__preview">
        <div className="preview__block">
          <div className="preview__profile">
            {isProfileEmpty && isLinksEmpty ? (
              <p className="preview__empty">
                Please fill in your profile and social links.
              </p>
            ) : (
              <>
                <div className="preview__img">
                  {profile.image && (
                    <img
                      className="profile__image"
                      src={profile.image}
                      alt={`${profile.firstName} ${profile.lastName}`}
                    />
                  )}
                </div>
                <div className="preview__info">
                  {(profile.firstName || profile.lastName) && (
                    <p className="profile__info-name">
                      {profile.firstName} {profile.lastName}
                    </p>
                  )}
                  {profile.email && (
                    <p className="profile__info-email">{profile.email}</p>
                  )}
                </div>
                {links.length > 0 && (
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
                        <span className="links-social__icon">
                          {platformIcons[link.platform]}
                        </span>
                        <span className="links-social__text">
                          {link.platform}
                        </span>
                        <FaArrowRight className="links-social__arrow" />
                      </a>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Notification />
    </div>
  );
};

export default PreviewPage;
