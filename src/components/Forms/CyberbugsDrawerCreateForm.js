import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import { Select, Space, Slider, Button } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  CLOSE_FORM_CYBERBUGS,
  GET_ALL_PROJECT_SAGA,
  SEARCH_KEYWORD_SAGA,
} from "../../redux/constants/Cyberbugs/CyberbugsConst";
import { GET_PRIORITY_SAGA } from "../../redux/constants/Cyberbugs/PriorityCyberbugsConst";
import { GET_TASK_TYPE_SAGA } from "../../redux/constants/Cyberbugs/TaskTypeConst";
import { withFormik } from "formik";
import * as Yup from "yup";
import { CREATE_TASK_SAGA } from "../../redux/constants/Cyberbugs/CreateTaskConst";
import { GET_ALL_STATUS_SAGA } from "../../redux/constants/Cyberbugs/StatusConst";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../redux/constants/Cyberbugs/UserConst";

function CyberbugsDrawerCreateForm(props) {
  const dispatch = useDispatch();
  const { arrProject } = useSelector((state) => state.ProjectCyberbugsReducer);
  const { priorityList } = useSelector(
    (state) => state.PriorityCyberbugsReducer
  );
  const { arrTaskType } = useSelector(
    (state) => state.TaskTypeCyberbugsReducer
  );
  const { arrUser } = useSelector((state) => state.UserCyberBugsReducer);
  const {arrStatus} = useSelector(state => state.StatusCyberbugsReducer);
  const searchRef = useRef(null);

  const options = arrUser?.map((item, index) => {
    return { label: item.name, value: item.userId };
  });
  console.log("optionshii", options)
  let [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;

  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_SAGA,
    });
    dispatch({
      type: GET_PRIORITY_SAGA,
    });
    dispatch({ type: GET_TASK_TYPE_SAGA });
    dispatch({type: GET_ALL_STATUS_SAGA});
    
  }, []);
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group">
          <select
            name="projectId"
            className="form-control"
            onChange={(e) => {
              handleChange(e);
              dispatch({type: GET_USER_BY_PROJECT_ID_SAGA, projectId: e.target.value})
            }}
          >
            {arrProject?.map((project, index) => {
              return (
                <option key={index} value={project.id}>
                  {project.projectName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <p>TaskName</p>
          <input
            className="form-control"
            name="taskName"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <p>Status</p>
          <select
            className="form-control"
            name="statusId"
            onChange={handleChange}
          >
            {arrStatus?.map((status, index) => {
              return <option key={index} value={status.statusId}>{status.alias}</option>
            })}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <p>Priority</p>
            <select
              name="priorityId"
              className="form-control"
              onChange={handleChange}
            >
              {priorityList?.map((priority, index) => {
                return (
                  <option key={index} value={priority.priorityId}>
                    {priority.description}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <p>Task type</p>
            <select
              name="typeId"
              className="form-control"
              onChange={handleChange}
            >
              {arrTaskType.map((taskType, index) => {
                return (
                  <option key={index} value={taskType.id}>
                    {taskType.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="form-group" style={{ marginBottom: "9%" }}>
            <p className="mb-3">Assignee</p>
            <Space
              style={{
                width: "100%",
              }}
              direction="vertical"
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                onChange={(values) => {
                  setFieldValue("listUserAsign", values);
                }}
                placeholder="Please select"
                optionFilterProp="label"
                onSearch={(value) => {
                  if (searchRef.current) {
                    clearTimeout(searchRef.current);
                  }
                  searchRef.current = setTimeout(() => {
                    dispatch({ type: SEARCH_KEYWORD_SAGA, keyword: "" });
                  }, 500);
                }}
                options={options}
              />
            </Space>
          </div>
          <div className="form-group">
            <p>Original Estimate</p>
            <input
              name="originalEstimate"
              className="form-control"
              type="number"
              defaultValue={0}
              min={0}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-6">
          <p>Time tracking</p>
          <Slider
            max={
              Number(timeTracking.timeTrackingSpent) +
              Number(timeTracking.timeTrackingRemaining)
            }
            value={timeTracking.timeTrackingSpent}
            defaultValue={30}
            tooltip={{
              open: true,
            }}
          />
          <div className="row">
            <div className="col-6 text-start fw-bold">
              {timeTracking.timeTrackingSpent}h logged
            </div>
            <div className="col-6 text-end fw-bold">
              {timeTracking.timeTrackingRemaining}h remaining
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>Time spent</p>
              <input
                name="timeTrackingSpent"
                defaultValue={0}
                className="form-control"
                type="number"
                min={0}
                onChange={(e) => {
                  setTimeTracking({
                    ...timeTracking,
                    timeTrackingSpent: e.target.value,
                  });
                  setFieldValue("timeTrackingSpent", e.target.value);
                }}
              />
            </div>
            <div className="col-6">
              <p>Time remaining</p>
              <input
                defaultValue={0}
                className="form-control"
                type="number"
                min={0}
                onChange={(e) => {
                  setTimeTracking({
                    ...timeTracking,
                    timeTrackingRemaining: e.target.value,
                  });
                  setFieldValue("timeTrackingRemaining", e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <p>Description</p>
          <Editor
            apiKey="ue6o8j1a0g8bu6qv7kykykhucg7ju68jiaka2ahzfsjtqe0b"
            // value = {values?.description}
            // onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={handleEditorChange}
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
          <Space style={{ marginLeft: "71%", marginTop: "2%" }}>
            <Button
              onClick={() => {
                dispatch({
                  type: CLOSE_FORM_CYBERBUGS,
                });
              }}
            >
              Cancel
            </Button>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Space>
        </div>
      </div>
    </form>
  );
}

const formCreateFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({arrProject}) => {
    return {
      listUserAsign: [],
      taskName: "string",
      description: "string",
      statusId: "1",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: arrProject[0]?.id,
      typeId: 1,
      priorityId: 1,
    };
  },

  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("values", values)
    props.dispatch({type: CREATE_TASK_SAGA, newTask: values})

  },
  displayName: "formCreateFormik",
})(CyberbugsDrawerCreateForm);

const mapStateToProps = (state) => {
  return {
    arrProject: state.ProjectCyberbugsReducer.arrProject
  }
}

export default connect(mapStateToProps)(formCreateFormik);
