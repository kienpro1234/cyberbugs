import { Editor } from "@tinymce/tinymce-react";
import { Button, Space } from "antd";
import React, { useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { CLOSE_FORM_CYBERBUGS, GET_PROJECT_CAT, GET_PROJECT_CAT_API, SUBMIT_FORM_EDIT_API } from "../../redux/constants/Cyberbugs/CyberbugsConst";
import * as Yup from "yup";
import { withFormik } from "formik";

function CyberbugsDrawerEditForm(props) {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content)
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
  const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
  useEffect(() => {
    dispatch({
        type: GET_PROJECT_CAT_API,
    })
  }, [])


  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <h5>Project ID</h5>
            <input
              value={values.id}
              disabled
              className="form-control"
            ></input>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <h5>Project Name</h5>
            <input value={values.projectName} onChange={handleChange} name="projectName" className="form-control"></input>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <h5>Project Category</h5>
            <select value={values.categoryId} name="categoryId" onChange={handleChange} className="form-control">
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <h5>Description</h5>
          {/* Editor */}
          <Editor
            apiKey="ue6o8j1a0g8bu6qv7kykykhucg7ju68jiaka2ahzfsjtqe0b"
            value = {values?.description}
            onInit={(evt, editor) => (editorRef.current = editor)}
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
            <Button
              htmlType="submit"
              type="primary"
            >
              Submit
            </Button>
          </Space>
        </div>
      </div>
    </form>
  );
}

const editDrawerForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ projectEdit }) => {
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      creator: projectEdit.creator,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
      
    };
  },

  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: CLOSE_FORM_CYBERBUGS,
    });
    console.log("values",values)
    props.dispatch({
      type: SUBMIT_FORM_EDIT_API,
      projectEdit: values,
    })
  },
  displayName: "editDrawerFormFormik",
})(CyberbugsDrawerEditForm);

const mapStateToProps = (state) => ({
  
  projectEdit: state.ProjectFormCyberbugsReducer.projectEdit,
});

export default connect(mapStateToProps)(editDrawerForm);
