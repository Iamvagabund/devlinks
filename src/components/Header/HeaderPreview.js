import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import "./Header.scss";

const HeaderPreview = () => {
  const navigate = useNavigate();
  const { profile, links, showNotification } = useContext(AppContext);

  const handleBack = () => {
    navigate("/");
  };

  const handleShareLink = () => {
    const missingItems = [];

    if (!profile.image) missingItems.push("photo");
    if (!profile.firstName || !profile.lastName) missingItems.push("name");
    if (links.length === 0) missingItems.push("links");

    if (missingItems.length > 0) {
      const message = `Missing required items for sharing: ${missingItems.join(", ")}`;
      showNotification(message, "error");
    } else {
      const currentUrl = window.location.href;
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => showNotification("Link copied successfully!", "success"))
        .catch(() => showNotification("Failed to copy the link.", "error"));
    }
  };

  return (
    <header className="header-preview header">
      <button className="back-to-main header__preview" onClick={handleBack}>
        Back
      </button>
      <button className="share-button" onClick={handleShareLink}>
        Share Link
      </button>
    </header>
  );
};

export default HeaderPreview;
