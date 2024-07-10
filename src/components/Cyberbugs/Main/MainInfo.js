import { Tooltip } from "antd";
import React from "react";

export default function MainInfo({ projectDetail }) {
  const renderAvatar = () => {
    return projectDetail.members?.map((member, index) => (
      <Tooltip key={index} title={member.name}>
      <div  className="avatar">
        <img src={member.avatar} alt={member.avatar} />
      </div>
      </Tooltip>
    ));
  };
  return (
    <div className="info" style={{ display: "flex" }}>
      <div className="search-block">
        <input className="search" />
        <i className="fa fa-search" />
      </div>
      <div className="avatar-group" style={{ display: "flex" }}>
        {renderAvatar()}
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Only My Issues
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Recently Updated
      </div>
    </div>
  );
}
