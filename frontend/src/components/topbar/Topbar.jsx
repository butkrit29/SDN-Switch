import React from 'react'
import "./topbar.css"
import SettingsIcon from "@mui/icons-material/Settings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";


export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWraper">
        <div className="topLeft">
          <span className="logo">SDN Switch</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <SupervisorAccountIcon />
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
