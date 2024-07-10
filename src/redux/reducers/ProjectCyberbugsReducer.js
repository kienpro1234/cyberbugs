import { GET_ALL_PROJECT, GET_ALL_PROJECT_FORM, GET_PROJECT_DETAIL } from "../constants/Cyberbugs/CyberbugsConst"

const initialState = {
    projectList: [],
    projectDetail: {},
    arrProject: [],
}

export const ProjectCyberbugsReducer = (state = initialState, action) => {
    switch(action.type){

        case GET_ALL_PROJECT: {
            return {...state, projectList: action.projectList}
        }
        case GET_PROJECT_DETAIL: {
            return {...state, projectDetail: action.projectDetail}
        }

        case GET_ALL_PROJECT_FORM: {
            return {...state, arrProject: action.arrProject};
        }
        default: {
            return state
        }
    }
}