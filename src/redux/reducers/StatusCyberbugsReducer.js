import { GET_ALL_STATUS } from "../constants/Cyberbugs/StatusConst"

const initialState = {
    arrStatus: [],

}

export const StatusCyberbugsReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_STATUS:
    return { ...state, arrStatus: action.arrStatus}

  default:
    return state
  }
}
