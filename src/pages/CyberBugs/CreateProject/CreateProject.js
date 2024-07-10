import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useDispatch, useSelector } from "react-redux";
import { GET_PROJECT_CAT_API } from "../../../redux/constants/Cyberbugs/CyberbugsConst";
import { createProjectActionAPI } from "../../../redux/actions/CyberbugsAction";
function CreateProject(props) {
    let [valueInput, setValue] = useState("");
    const { values, touched, errors, handleChange, handleBlur, handleSubmit, setValues, setFieldValue } = props;
    let arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_PROJECT_CAT_API,
        })
    }, [])
    const editorRef = useRef(null);


    const handleEditorChange = (content, editor) => {
      setFieldValue("description", content);
      
    }

  return (
    <div className="container m-5">
      <h3>Create Project</h3>
      <form className="container" onSubmit={handleSubmit} onChange={handleChange}>
        <div className="form-group mb-4">
          <p>Name</p>
          <input className="form-control" name="projectName"></input>
        </div>
        <div className="form-group mb-4">
          <p >Description</p>
          <Editor
            apiKey="ue6o8j1a0g8bu6qv7kykykhucg7ju68jiaka2ahzfsjtqe0b"
            initialValue=""
            onInit={(evt, editor) => editorRef.current = editor}
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
        </div>
        <div className="form-group mb-5">
          <select className="form-control" name="categoryId">
            {arrProjectCategory.map((item, index) => (
                <option key={index} value={item.id} >{item.projectCategoryName}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Create Project
        </button>
      </form>
    </div>
  );
}

const createProjectForm = withFormik({
  enableReinitialize: true,
    mapPropsToValues: (props) => {
      return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id,
      }
    },
  
    validationSchema: Yup.object().shape({
      
    }),
  
    handleSubmit: (values, { props, setSubmitting }) => {
      props.dispatch(createProjectActionAPI(values))
      
    },
    displayName: "CreateProjectFormik",
  })(CreateProject);

  const mapStateToProps = (state) => ({
    
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
  })
  
  export default connect(mapStateToProps)(createProjectForm);
