import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuCyberbugs() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require("../.././assets/img/download.jfif")} alt="" />
        </div>
        <div className="account-info">
          <p>Kien</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card me-1" />
          <NavLink className={({isActive}) => (isActive ? "active" : "text-dark")} style={{textDecoration: "none"}} to={"/cyberbugs"}>Cyber Board</NavLink>
        </div>
        <div>
          <i className="fa fa-cog me-1" />
          <NavLink className={({isActive}) => (isActive ? "active" : "text-dark")} style={{textDecoration: "none"}} to={"/createproject"}>Create Project</NavLink>
        </div>
        <div>
          <i className="fa fa-cog me-1" />
          <NavLink className={({isActive}) => (isActive ? "active" : "text-dark")} style={{textDecoration: "none"}} to={"/projectmanagement"}>Project Management</NavLink>
        </div>
        <div>
          <i className="fa fa-cog me-1" />
          <NavLink className={({isActive}) => (isActive ? "active" : "text-dark")} style={{textDecoration: "none"}} to={"/usermanagement"}>User management</NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck me-1" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals me-1" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste me-1" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow me-1" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box me-1" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
