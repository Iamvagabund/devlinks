import React, { useState, useContext } from "react";
import { AppContext } from "../../AppContext";
import "./LinksContent.scss";
import { FaPlus, FaEquals, FaLink } from "react-icons/fa";

function LinksContent() {
  const { links, addLink, showNotification } = useContext(AppContext);
  const [localLinks, setLocalLinks] = useState(links);

  const platforms = ["GitHub", "YouTube", "LinkedIn", "Twitter", "Facebook"];

  const handleAddLink = () => {
    if (localLinks.length < 5) {
      const usedPlatforms = localLinks.map((link) => link.platform);
      const availablePlatform = platforms.find(
        (platform) => !usedPlatforms.includes(platform)
      );

      setLocalLinks([
        ...localLinks,
        { platform: availablePlatform || platforms[0], url: "" },
      ]);
    } else {
      showNotification("You can add only 5 links", "error");
    }
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = localLinks.filter((_, i) => i !== index);
    setLocalLinks(updatedLinks);
  };

  const handlePlatformChange = (index, newPlatform) => {
    const updatedLinks = localLinks.map((link, i) =>
      i === index ? { ...link, platform: newPlatform } : link
    );
    setLocalLinks(updatedLinks);
  };

  const handleUrlChange = (index, newUrl) => {
    const updatedLinks = localLinks.map((link, i) =>
      i === index ? { ...link, url: newUrl } : link
    );
    setLocalLinks(updatedLinks);
  };

  const handleSaveLinks = () => {
    const invalidLink = localLinks.find(
      (link) => !link.url.startsWith("https://")
    );
    if (invalidLink) {
      showNotification("All URLs must begin with 'https://'", "error");
    } else {
      let hasError = false;

      localLinks.forEach((link, index) => {
        const isPlatformExist = localLinks
          .slice(0, index)
          .some((existingLink) => existingLink.platform === link.platform);

        if (isPlatformExist) {
          hasError = true;
          showNotification(
            `There can only be one link for ${link.platform}`,
            "error"
          );
        }
      });

      if (!hasError) {
        addLink(localLinks);
        showNotification("Links have been successfully saved!", "success");
      }
    }
  };

  return (
    <div className="links-content">
      <div className="links-header">
        <h2 className="links-title">Customize your links</h2>
        <p className="links-subtitle">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <button
          className="link-add-btn"
          onClick={handleAddLink}
          disabled={localLinks.length >= 5}
        >
          <FaPlus className="link-add-btn__icon" />
          Add new link
        </button>
      </div>
      <div className="links-inner">
        {localLinks.map((link, index) => (
          <div key={index} className="link-item">
            <div className="link-header">
              <span>
                <FaEquals className="link-item__icon" /> Link #{index + 1}
              </span>
              <button onClick={() => handleRemoveLink(index)}>Remove</button>
            </div>

            <label htmlFor={`platform-${index}`}>Platform</label>
            <select
              id={`platform-${index}`}
              value={link.platform}
              onChange={(e) => handlePlatformChange(index, e.target.value)}
            >
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>

            <label htmlFor={`url-${index}`}>Link</label>
            <div className="link__input-wrapper">
              <FaLink className="link__input-icon" />
              <input
                id={`url-${index}`}
                type="text"
                placeholder="Enter URL (https://...)"
                value={link.url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      {localLinks.length > 0 && (
        <button className="link-submit" onClick={handleSaveLinks}>
          Save
        </button>
      )}
    </div>
  );
}

export default LinksContent;
