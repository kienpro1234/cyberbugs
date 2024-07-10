import { GET_PRIORITY } from "../constants/Cyberbugs/PriorityCyberbugsConst";

const initialState = {
    priorityList: [],
}

export const PriorityCyberbugsReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_PRIORITY: {
            return {...state, priorityList: action.priorityList};
        }
        default: {
            return state;
        }
    }
}