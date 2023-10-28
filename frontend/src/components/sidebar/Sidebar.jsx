import "./sidebar.css"
import LineStyleIcon from "@mui/icons-material/LineStyle"
import React from "react"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <LineStyleIcon className="sidebarIcon" />
              Home
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
