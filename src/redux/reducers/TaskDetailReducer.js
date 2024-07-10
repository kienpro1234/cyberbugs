import { SELECT_ASSIGNEE } from "../constants/Cyberbugs/CreateTaskConst";
import { CHANGE_TASK_DETAIL, DELETE_ASSIGNEE_FROM_TASK, GET_TASK_DETAIL } from "../constants/Cyberbugs/TaskTypeConst"

const initialState = {
    taskDetail: {
        "priorityTask": {
            "priorityId": 1,
            "priority": "High"
          },
          "taskTypeDetail": {
            "id": 1,
            "taskType": "bug"
          },
          "assigness": [
            {
              "id": 5669,
              "avatar": "https://ui-avatars.com/api/?name=tran thi thu huong",
              "name": "tran thi thu huong",
              "alias": "tran-thi-thu-huong"
            },
            {
              "id": 6682,
              "avatar": "https://ui-avatars.com/api/?name=Kien dep trai",
              "name": "Kien dep trai",
              "alias": "kien-dep-trai"
            },
            {
              "id": 5726,
              "avatar": "https://ui-avatars.com/api/?name=vipham",
              "name": "vipham",
              "alias": "vipham"
            },
            {
              "id": 6208,
              "avatar": "https://ui-avatars.com/api/?name=Vinh",
              "name": "Vinh",
              "alias": "vinh"
            }
          ],
          "lstComment": [],
          "taskId": 12168,
          "taskName": "mimi",
          "alias": "mimi",
          "description": "<p>fdasfdsaf</p>",
          "statusId": "1",
          "originalEstimate": 3,
          "timeTrackingSpent": 2,
          "timeTrackingRemaining": 3,
          "typeId": 1,
          "priorityId": 1,
          "projectId": 15561
    },
}

export const TaskDetailReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_TASK_DETAIL: {
    return {...state, taskDetail: action.taskDetailModal}
  }

  case CHANGE_TASK_DETAIL: {
    const {name,value} = action;
    return {...state,taskDetail: {...state.taskDetail, [name]: value} }
  }

  case SELECT_ASSIGNEE: {
    console.log("hello",action.assignee);
    state.taskDetail.assigness = [...state.taskDetail.assigness, action.assignee]
    return {...state}
  }

  case DELETE_ASSIGNEE_FROM_TASK: {
    state.taskDetail.assigness = state.taskDetail.assigness.filter(item => item.id != action.id);
    return {...state}
  }
  default:
    return state
  }
}

