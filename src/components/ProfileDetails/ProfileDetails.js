import React, { useState, useContext } from "react";
import "./ProfileDetails.scss";
import ImageUploader from "./../ImageUploader/ImageUploader";
import { AppContext } from "./../../AppContext";

function ProfileDetails() {
  const { profile, updateProfile, showNotification } = useContext(AppContext);
  const [localProfile, setLocalProfile] = useState(profile);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSave = () => {
    if (!localProfile.firstName || !localProfile.lastName) {
      showNotification("First Name and Last Name are required!", "error");
      return;
    }

    if (localProfile.email && !emailRegex.test(localProfile.email)) {
      showNotification("Please enter a valid email address!", "error");
      return;
    }

    updateProfile(localProfile);
    showNotification("Your changes have been successfully saved!", "success");
  };

  return (
    <div className="profile-details">
      <h2 className="profile-title">Profile Details</h2>
      <p className="profile-subtitle">
        Add your details to create a personal touch to your profile
      </p>
      <ImageUploader
        image={localProfile.image}
        setImage={(image) => setLocalProfile({ ...localProfile, image })}
      />

      <div className="profile-fields">
        <div className="profile-field">
          <label htmlFor="first-name">First Name*</label>
          <input
            id="first-name"
            type="text"
            value={localProfile.firstName}
            onChange={(e) =>
              setLocalProfile({ ...localProfile, firstName: e.target.value })
            }
          />
        </div>

        <div className="profile-field">
          <label htmlFor="last-name">Last Name*</label>
          <input
            id="last-name"
            type="text"
            value={localProfile.lastName}
            onChange={(e) =>
              setLocalProfile({ ...localProfile, lastName: e.target.value })
            }
          />
        </div>

        <div className="profile-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={localProfile.email}
            onChange={(e) =>
              setLocalProfile({ ...localProfile, email: e.target.value })
            }
          />
        </div>
      </div>

      <button className="profile-submit" onClick={handleSave}>Save</button>
    </div>
  );
}

export default ProfileDetails;
