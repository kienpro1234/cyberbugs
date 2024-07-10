import { Button, Space } from "antd";
import React from "react";
import {connect } from "react-redux";
import * as Yup from "yup";
import { withFormik } from "formik";
import { CLOSE_FORM_CYBERBUGS } from "../../redux/constants/Cyberbugs/CyberbugsConst";
import { useDispatch } from "react-redux";
import { GET_ALL_USER_SAGA, UPDATE_USER_SAGA } from "../../redux/constants/Cyberbugs/UserConst";

function CyberbugsEditUserForm(props) {
    const {values, touched, errors, handleChange, handleBlur, handleSubmit} = props;
    const dispatch = useDispatch();
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <h5>Id</h5>
        <input className="form-control" disabled value={""} />
      </div>
      <div className="form-group">
        <h5>Email</h5>
        <input className="form-control" name="email" value={values.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <h5>Name</h5>
        <input className="form-control" name="name" value={values.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <h5>Phone number</h5>
        <input className="form-control" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
      </div>
      <div className="form-group">
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
    </form>
  );
}

const EditFormWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const {userEdit} = props;
        return {
            id: userEdit.userId,
            email: userEdit.email,
            name: userEdit.name,
            phoneNumber: userEdit.phoneNumber,
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().required("Email is required!").email("Email is invalid!"),
        name: Yup.string().required("Name is required!"),
        phoneNumber: Yup.string().required("Phone number is required!"),
    }),
    handleSubmit: (values, {props, setSubmitting}) => {
        props.dispatch({
            type: UPDATE_USER_SAGA,
            userUpdate: values,
        })
    }
})(CyberbugsEditUserForm);

const mapStateToProps = (state) => {
    return {
        userEdit: state.EditUserCyberbugsReducer.userEdit,
    }
}

export default connect(mapStateToProps, null)(EditFormWithFormik);


