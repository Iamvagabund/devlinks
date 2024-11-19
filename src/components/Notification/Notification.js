import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import "./Notification.css";

function Notification() {
  const { notificationMessage } = useContext(AppContext);

  if (!notificationMessage) return null;

  return (
    <div className={`notification ${notificationMessage.type}`}>
      {notificationMessage.message}
    </div>
  );
}

export default Notification;
