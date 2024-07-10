import { GET_TASK_TYPE } from "../constants/Cyberbugs/TaskTypeConst"

const initialState = {
    arrTaskType: [],
}

export const TaskTypeCyberbugsReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_TASK_TYPE: {
            return {...state, arrTaskType: action.arrTaskType};
        }
        default: {return state}
    }
}