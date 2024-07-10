import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constants/Cyberbugs/StatusConst";
import { GET_PRIORITY_SAGA } from "../../../redux/constants/Cyberbugs/PriorityCyberbugsConst";
import { Tooltip, Button, Popover, Avatar, Space, Select } from "antd";
import parse from "html-react-parser";
import "./ModalCss.css";
import {
  CHANGE_TASK_DETAIL,
  DELETE_ASSIGNEE_FROM_TASK,
  HANDLE_CHANGE_POST_API_SAGA,
  UPDATE_STATUS_TASK_SAGA,
} from "../../../redux/constants/Cyberbugs/TaskTypeConst";
import { Editor } from "@tinymce/tinymce-react";
import { SELECT_ASSIGNEE } from "../../../redux/constants/Cyberbugs/CreateTaskConst";
import { INSERT_COMMENT_SAGA } from "../../../redux/constants/Cyberbugs/commentCyberbug";

export default function ModalCyberbugs() {
  const [visible, setVisible] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);

  const { taskDetail } = useSelector((state) => state.TaskDetailReducer);
  const [editorContent, setEditorContent] = useState(taskDetail.description);
  const [editorComment, setEditorComment] = useState("");
  const dispatch = useDispatch();
  const { arrStatus } = useSelector((state) => state.StatusCyberbugsReducer);
  const { priorityList } = useSelector(
    (state) => state.PriorityCyberbugsReducer
  );
  const { projectDetail } = useSelector(
    (state) => state.ProjectCyberbugsReducer
  );
  let { timeTrackingSpent, timeTrackingRemaining } = taskDetail;
  let max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
  let percent = (Number(timeTrackingSpent) / max) * 100;

  useEffect(() => {
    dispatch({
      type: GET_PRIORITY_SAGA,
    });
    dispatch({
      type: GET_ALL_STATUS_SAGA,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: HANDLE_CHANGE_POST_API_SAGA,
      actionType: CHANGE_TASK_DETAIL,
      name,
      value,
    });
  };
  console.log("taskDetail", taskDetail);

  const renderDescription = () => {
    let description = taskDetail?.description;
    return visible ? (
      <div>
        <Editor
          apiKey="ue6o8j1a0g8bu6qv7kykykhucg7ju68jiaka2ahzfsjtqe0b"
          // value = {values?.description}
          // onInit={(evt, editor) => (editorRef.current = editor)}
          onEditorChange={(content, editor) => {
            setEditorContent(content);
          }}
          initialValue={taskDetail.description}
          // value={taskDetail.description}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <button
          onClick={() => {
            setVisible(false);
            dispatch({
              type: HANDLE_CHANGE_POST_API_SAGA,
              actionType: CHANGE_TASK_DETAIL,
              name: "description",
              value: editorContent,
            });
          }}
          className="btn btn-primary"
        >
          Save
        </button>
        <button
          onClick={() => {
            setVisible(false);
            setEditorContent(taskDetail.description);
            dispatch({
              type: HANDLE_CHANGE_POST_API_SAGA,
              actionType: CHANGE_TASK_DETAIL,
              name: "description",
              value: taskDetail?.description,
            });
          }}
          className="btn btn-secondary"
        >
          Close
        </button>
      </div>
    ) : (
      <p
        className="form-control"
        onClick={() => {
          setVisible(true);
        }}
      >
        {parse(description)}
      </p>
    );
  };

  const renderComment = () => {
    return commentVisible ? (
      <div>
        <Editor
          apiKey="ue6o8j1a0g8bu6qv7kykykhucg7ju68jiaka2ahzfsjtqe0b"
          onEditorChange={(content, editor) => {
            setEditorComment(content)
          }}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <button
          onClick={() => {
            setCommentVisible(false);
            if (editorComment.length > 0) {
              dispatch({
                type: INSERT_COMMENT_SAGA,
                taskId: taskDetail.taskId,
                commentContent: editorComment
              });
            }
            
          }}
          className="btn btn-primary"
        >
          Save
        </button>
        <button
          onClick={() => {
            setCommentVisible(false);
          }}
          className="btn btn-secondary"
        >
          Close
        </button>
      </div>
    ) : (
      <input
        type="text"
        placeholder="Add a comment ..."
        onClick={() => {
          setCommentVisible(true);
        }}
      />
    );
  };

  const options = projectDetail.members
    ?.filter((mem, index) => {
      let indexUs = taskDetail.assigness?.findIndex(
        (us) => us.id == mem.userId
      );
      if (indexUs == -1) {
        return true;
      }
      return false;
    })
    .map((mem, index) => {
      return { label: mem.name, value: mem.userId };
    });

  const renderListComment = () => {
    return taskDetail.lstComment.map((comment, index) => {
      console.log("comment", comment)
      return (
        <>
          <p style={{ marginBottom: 5 }}>
           {comment.name} <span>a month ago</span>
          </p>
          <p style={{ marginBottom: 5 }}>
            {parse(comment.commentContent)}
          </p>
          <div>
            <Button style={{ color: "#929398" }}>Edit</Button>•
            <Button style={{ color: "#929398" }}>Delete</Button>
          </div>
        </>
      );
    });
  };

  return (
    <>
      {/* Search Modal */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="searchModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-search">
          <div className="modal-content">
            <div className="modal-header">
              <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
              </div>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>RECENT ISSUES</p>
              <div style={{ display: "flex" }}>
                <div className="icon">
                  <i className="fa fa-bookmark" />
                </div>
                <div>
                  <p>cyberlearn</p>
                  <p>BUG-238066</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Info Modal */}
      <div
        className="modal"
        id="infoModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="infoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-info">
          <div className="modal-content">
            <div className="modal-header">
              <div className="task-title">
                <i className="fa fa-bookmark" />
                <span>{taskDetail.taskName}</span>
              </div>
              <div style={{ display: "flex" }} className="task-click">
                <div>
                  <i className="fab fa-telegram-plane" />
                  <span style={{ paddingRight: 20 }}>Give feedback</span>
                </div>
                <div>
                  <i className="fa fa-link" />
                  <span style={{ paddingRight: 20 }}>Copy link</span>
                </div>
                <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-8">
                    <p className="issue">{taskDetail.taskName}</p>
                    <div className="description">
                      <h3>Description</h3>
                      {renderDescription()}
                    </div>

                    <div className="comment">
                      <h6>Comment</h6>

                      <div
                        className="block-comment"
                        style={{ display: "flex" }}
                      >
                        <div className="input-comment">
                          {/* <input type="text" placeholder="Add a comment ..." onClick={() => {
                            setCommentVisible(true)
                          }}/> */}
                          {renderComment()}
                        </div>
                      </div>
                      <div className="lastest-comment">
                        <div className="comment-item">
                          <div
                            className="display-comment"
                            style={{ display: "flex" }}
                          >
                            <div className="avatar">
                              <img
                                src="./assets/img/download (1).jfif"
                                alt=""
                              />
                            </div>
                            <div>{renderListComment()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="status">
                      <h6>STATUS</h6>
                      <select
                        className="custom-select"
                        value={taskDetail.statusId}
                        name="statusId"
                        onChange={handleChange}
                      >
                        {arrStatus.map((status, index) => {
                          return (
                            <option key={index} value={status.statusId}>
                              {status.statusName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="assignees">
                      <h6>ASSIGNEES</h6>
                      <div className="row">
                        {taskDetail.assigness?.map((mem, index) => {
                          return (
                            <div
                              key={index}
                              className="col-4"
                              style={{
                                background: "#e9eaf0",
                                padding: "5px",
                                borderRadius: "5px",
                              }}
                            >
                              <div className="avatar">
                                <img src={mem.avatar} alt={mem.avatar} />
                              </div>
                              <p className="name">
                                {mem.name}
                                <i
                                  className="fa fa-times"
                                  style={{ marginLeft: 5, cursor: "pointer" }}
                                  onClick={() => {
                                    dispatch({
                                      type: HANDLE_CHANGE_POST_API_SAGA,
                                      actionType: DELETE_ASSIGNEE_FROM_TASK,
                                      id: mem.id,
                                    });
                                  }}
                                />
                              </p>
                            </div>
                          );
                        })}

                        <div className="col-6">
                          <Select
                            style={{
                              width: "100%",
                              position: "relative",
                              zIndex: 2000,
                              marginTop: "10px",
                            }}
                            value={"+ Add more"}
                            onSelect={(LabeledValue, option) => {
                              dispatch({
                                type: HANDLE_CHANGE_POST_API_SAGA,
                                actionType: SELECT_ASSIGNEE,
                                assignee: {
                                  id: option.value,
                                  name: option.label,
                                },
                              });
                            }}
                            // onChange={handleChange}
                            options={options}
                          ></Select>
                        </div>
                      </div>
                    </div>

                    <div className="priority" style={{ marginBottom: 20 }}>
                      <h6>PRIORITY</h6>
                      <select
                        className="form-control"
                        value={taskDetail.priorityId}
                        name="priorityId"
                        onChange={handleChange}
                      >
                        {priorityList.map((priority, index) => {
                          return (
                            <option k ey={index} value={priority.priorityId}>
                              {priority.priority}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="estimate">
                      <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                      <input
                        type="text"
                        className="estimate-hours"
                        name="originalEstimate"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="time-tracking">
                      <h6>TIME TRACKING</h6>
                      <div style={{ display: "flex" }}>
                        <i className="fa fa-clock" />
                        <div style={{ width: "100%" }}>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: `${percent}` }}
                              aria-valuenow={timeTrackingSpent}
                              aria-valuemin={0}
                              aria-valuemax={max}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p className="logged">
                              {timeTrackingSpent}h logged
                            </p>
                            <p className="estimate-time">
                              {timeTrackingRemaining}h estimated
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ color: "#929398" }}>
                      Create at a month ago
                    </div>
                    <div style={{ color: "#929398" }}>
                      Update at a few seconds ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
