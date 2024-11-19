import React, { createContext, useState } from "react";


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: null
  });

  const updateProfile = (updatedProfile) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      ...updatedProfile,
    }));
  };
  

  const [links, setLinks] = useState([]);
  const addLink = (newLinks) => {
    setLinks(newLinks);
  };

  const [notificationMessage, setNotificationMessage] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotificationMessage({ message, type });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        links,
        addLink,
        notificationMessage,
        showNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
