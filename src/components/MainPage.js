import React, { useState } from "react";
import HeaderMain from "./Header/HeaderMain";
import Sidebar from "./Sidebar/Sidebar";
import LinksContent from "./LinksContent/LinksContent";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import "./App.scss"
import Notification from './Notification/Notification';

const MainPage = () => {
  const [activeTab, setActiveTab] = useState("links");

  return (
    <div className="main-page">
      <HeaderMain activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="content">
        <Sidebar />
        <div className="main__content">
          {activeTab === "links" && <LinksContent />}
          {activeTab === "profile" && <ProfileDetails />}
        </div>
      </main>

      <Notification />  
    </div>
  );
};

export default MainPage;
