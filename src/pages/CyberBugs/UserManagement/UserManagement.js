import { Button, Input, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GET_ALL_PROJECT_API,
  OPEN_FORM_CYBERBUGS,
} from "../../../redux/constants/Cyberbugs/CyberbugsConst";
import { useSelector } from "react-redux";
import {
  CLICK_ON_USER_EDIT,
  DELETE_USER_SAGA,
  GET_ALL_USER_SAGA,
  SEARCH_USER_SAGA,
} from "../../../redux/constants/Cyberbugs/UserConst";
import {
  SearchOutlined,
  UserOutlined,
  AntDesignOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import CyberbugsEditUserForm from "../../../components/Forms/CyberbugsEditUserForm";

export default function UserManagement() {
  const dispatch = useDispatch();
  let [keyword, setKeyword] = useState("");
  const userList = useSelector(
    (state) => state.UserManagementCyberbugReducer.userList
  );

  const userSearchList = useSelector(
    (state) => state.EditUserCyberbugsReducer.userSearchList
  );
  useEffect(() => {
    dispatch({
      type: GET_ALL_USER_SAGA,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: SEARCH_USER_SAGA,
      keyword: keyword,
    });
  }, [keyword]);

  

  

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      render: (text, record, index) => <p className="text-center">{index}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <a
            href="#"
            onClick={() => {
              dispatch({
                type: OPEN_FORM_CYBERBUGS,
                payload: CyberbugsEditUserForm,
                title: "Edit user",
              });

              dispatch({
                type: CLICK_ON_USER_EDIT,
                userEdit: record,
              });
            }}
            className="btn btn-primary"
          >
            <EditOutlined style={{ fontSize: "20px", color: "white" }} />
          </a>
          <Popconfirm
            onConfirm={() => {
              console.log("userId", record.userId);
              dispatch({
                type: DELETE_USER_SAGA,
                userId: record.userId,
              });
            }}
            title="Delete the project"
            description="Are you sure to delete this user?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <a href="#" className="btn btn-danger">
              <DeleteOutlined style={{ fontSize: "20px", color: "white" }} />
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-100 pt-4">
      <div className="ms-2">
        <h3 className="mb-4">Create user</h3>
        <div className="d-flex pb-3">
          <input
            className="form-control me-3"
            style={{ width: "80%" }}
            onChange={(e) => {
              setKeyword(e.target.value);
            }
            }
          ></input>
          <button
            className="btn btn-outline-primary"
            style={{ width: "10vw", cursor: "no-drop"}}
            
          >
            Search
          </button>
        </div>
      </div>
      {userSearchList?.length > 0 || keyword ? (
        <Table dataSource={userSearchList} columns={columns} />
      ) : (
        <Table dataSource={userList} columns={columns} />
      )}
    </div>
  );
}
