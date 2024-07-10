import { GET_ALL_USER } from "../constants/Cyberbugs/UserConst"

const initialState = {
  userList: [],
}

export const UserManagementCyberbugReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER: {
      return {...state, userList: action.userList}
    }
  default:
    return state
  }
}
