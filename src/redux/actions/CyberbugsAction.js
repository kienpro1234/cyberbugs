// import { useNavigate } from "react-router-dom";
import { CREATE_PROJECT_API, GET_ALL_PROJECT, GET_ALL_PROJECT_API, USERLOGIN, USER_SIGNIN_API } from "../constants/Cyberbugs/CyberbugsConst";

export const singinCyberbugsAction = ({email, password}) => ({
    
    type: USER_SIGNIN_API,
    userLogin: {
        email: email,
        passWord: password,
    },

})

export const usLogin = (userLogin) => ({
    type: USERLOGIN,
    userLogin,
})

export const createProjectActionAPI = (values) => ({
    type: CREATE_PROJECT_API,
    newProject: values,
})

export const getAllProjectActionAPI = () => ({
    type: GET_ALL_PROJECT_API,
})

export const getAllProjectAction = (data) => ({
    type: GET_ALL_PROJECT,
    projectList: data,
})