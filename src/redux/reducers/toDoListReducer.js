import { GET_TASK_API } from "../constants/ToDoListType"


const initialState = {
    taskList: [],
}

export const toDoListReducer = (state = initialState, action) => {

  switch (action.type) {

  case GET_TASK_API:
    return { ...state, taskList: action.taskList}

  default:
    return state
  }
}
