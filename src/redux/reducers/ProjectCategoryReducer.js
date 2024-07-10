import { GET_PROJECT_CAT } from "../constants/Cyberbugs/CyberbugsConst";

const stateDefault = {
    arrProjectCategory: [],
}

export const ProjectCategoryReducer = (state = stateDefault , action) => {
    switch(action.type){
        case GET_PROJECT_CAT: {
            return {...state, arrProjectCategory: action.arrProjectCategory};
        }
        default: return state;
    }
}