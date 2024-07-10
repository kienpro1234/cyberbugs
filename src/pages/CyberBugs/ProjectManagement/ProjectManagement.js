import React, { useEffect, useRef, useState } from "react";
import {
  SearchOutlined,
  UserOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Tag,
  Popconfirm,
  Avatar,
  Divider,
  Tooltip,
  Popover,
  AutoComplete,
} from "antd";
import Highlighter from "react-highlight-words";
import parse from "html-react-parser";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectActionAPI } from "../../../redux/actions/CyberbugsAction";
import {
  ASSIGN_USER_PROJECT_SAGA,
  CLICK_EDIT_FORM_CYBERBUGS,
  CREATE_TITLE,
  DELETE_PROJECT_SAGA,
  DELETE_USER_FROM_PROJECT_SAGA,
  OPEN_FORM_CYBERBUGS,
  SEARCH_KEYWORD_SAGA,
} from "../../../redux/constants/Cyberbugs/CyberbugsConst";
import CyberbugsDrawerForm from "../../../components/Forms/CyberbugsDrawerEditForm";
import { NavLink } from "react-router-dom";

export default function ProjectManagement(props) {
  const [value, setValue] = useState("");
  const data = useSelector(
    (state) => state.ProjectCyberbugsReducer.projectList
  );
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const listSearchedUser = useSelector(
    (state) => state.UserCyberBugsReducer.searchedUser
  );

  const options = listSearchedUser?.map((user, index) => {
    return { label: user.name, value: user.userId.toString() };
  });

  let open = useSelector((state) => state.UserCyberBugsReducer.open);

  useEffect(() => {
    dispatch(getAllProjectActionAPI());
  }, []);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "15%",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      width: "30%",
      ...getColumnSearchProps("projectName"),
      sorter: (item2, item1) => {
        let projectName2 = item2.projectName?.trim().toLowerCase();
        let projectName1 = item1.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
      render: (text ,record, index) => {
        return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>
      }
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   width: "20%",
    //   ...getColumnSearchProps("description"),
    //   render: (text, record, index) => {
    //     return parse(text);
    //   },
    // },

    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      ...getColumnSearchProps("creator"),
      render: (text, index, record) => {
        return <Tag color="lime">{text?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creatorName2 = item2.creator.name.trim().toLowerCase();
        let creatorName1 = item1.creator.name.trim().toLowerCase();
        if (creatorName2 < creatorName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      ...getColumnSearchProps("members"),
      render: (text, record, index) => {
        return (
          <div key={index}>
            <Avatar.Group
            
              maxCount={3}
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            >
              {record.members?.map((member, index) => {
                if (index <= 2) {
                  return (
                    <Popover
                      key={index}
                      placement="top"
                      title="members"
                      content={() => (
                        <table>
                          <thead>
                            <th>id</th>
                            <th>avatar</th>
                            <th>name</th>
                          </thead>
                          <tbody>
                            {record.members?.map((member, index) => (
                              <tr key={index}>
                                <td>{member.userId}</td>
                                <td>
                                  <img
                                    style={{
                                      width: "30px",
                                      borderRadius: "50%",
                                    }}
                                    src={member.avatar}
                                    alt=""
                                  />
                                </td>
                                <td>{member.name}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      dispatch({
                                        type: DELETE_USER_FROM_PROJECT_SAGA,
                                        deletedUser: {
                                          projectId: record.id,
                                          userId: member.userId,
                                        },
                                      });
                                    }}
                                    className="btn btn-danger"
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    >
                      <Avatar src={member.avatar}></Avatar>
                    </Popover>
                  );
                }

                if (index > 2) {
                  return (
                    <Tooltip key={index} title={member.name} placement="top">
                      <Avatar
                        key={index}
                        style={{ backgroundColor: "#87d068" }}
                        src={member.avatar}
                      />
                    </Tooltip>
                  );
                }
              })}
            </Avatar.Group>

            <Popover
              placement="rightTop"
              title="Add new member"
              trigger={"click"}
              content={
                <AutoComplete
                  value={value}
                  onChange={(text) => {
                    setValue(text);
                  }}
                  options={options}
                  style={{
                    width: "100%",
                  }}
                  onSelect={(value, option) => {
                    setValue(option.label);
                    dispatch({
                      type: ASSIGN_USER_PROJECT_SAGA,
                      data: { projectId: record.id, userId: value },
                    });
                  }}
                  onSearch={(keyword) => {
                    if (searchRef.current) {
                      clearTimeout(searchRef.current);
                    }
                    searchRef.current = setTimeout(() => {
                      dispatch({
                        type: SEARCH_KEYWORD_SAGA,
                        keyword: keyword,
                      });
                    }, 300);
                  }}
                  placeholder="input here"
                />
              }
            >
              <Button
                style={{
                  borderRadius: "50%",
                  padding: "10px",
                  lineHeight: "10px",
                  transform: "translateY(-9px)",
                }}
              >
                +
              </Button>
            </Popover>
          </div>
        );
      },
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
                payload: CyberbugsDrawerForm,
                title: "Edit project",
              });
              dispatch({
                type: CLICK_EDIT_FORM_CYBERBUGS,
                projectEdit: { ...record, creator: record.creator.id },
              });
            }}
            className="btn btn-primary"
          >
            <EditOutlined style={{ fontSize: "20px", color: "white" }} />
          </a>
          <Popconfirm
            onConfirm={() => {
              dispatch({
                type: DELETE_PROJECT_SAGA,
                id: record.id,
              });
            }}
            title="Delete the project"
            description="Are you sure to delete this project?"
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
    <div className="w-100 container mt-5">
      <h3>Project Management</h3>
      <Table rowKey={"id"} columns={columns} dataSource={data} />
    </div>
  );
}
