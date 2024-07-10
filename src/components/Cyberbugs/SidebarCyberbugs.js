import React from "react";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { OPEN_FORM_CYBERBUGS } from "../../redux/constants/Cyberbugs/CyberbugsConst";
import CyberbugsDrawerCreateForm from "../Forms/CyberbugsDrawerCreateForm";

export default function SidebarCyberbugs() {
  const dispatch = useDispatch();
  return (
    <div className="sideBar">
      <div className="sideBar-top">
        <div className="sideBar-icon">
          <i className="fab fa-jira" />
        </div>
        <div
          className="sideBar-icon"
          data-toggle="modal"
          data-target="#searchModal"
          style={{ cursor: "pointer" }}
        >
          <SearchOutlined />
          <span className="title">SEARCH ISSUES</span>
        </div>
        <div className="sideBar-icon">
          <PlusOutlined />
          <span style={{cursor: "pointer"}} className="title" onClick={() => {
            dispatch({
              type: OPEN_FORM_CYBERBUGS,
              payload: CyberbugsDrawerCreateForm,
              title: "Create task"
            })
          }
          }>CREATE ISSUES</span>
        </div>
      </div>
      <div className="sideBar-bottom">
        <div className="sideBar-icon">
          <i className="fa fa-question-circle" />
          <span className="title">ABOUT</span>
        </div>
      </div>
    </div>
  );
}
