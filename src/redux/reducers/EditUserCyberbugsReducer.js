import { CLICK_ON_USER_EDIT, SEARCH_USER } from "../constants/Cyberbugs/UserConst"

const initialState = {
    userEdit: {
        id: "0",
        passWord: "string",
        email: "string",
        name: "string",
        phoneNumber: "string",
    },

    userSearchList: [],
}

export default function EditUserCyberbugsReducer(state = initialState, action) {
  switch (action.type) {

  case (CLICK_ON_USER_EDIT): {
    return {...state, userEdit: action.userEdit}
  }

  case SEARCH_USER: {
    return {...state, userSearchList: action.userSearchList}
  }

  default:
    return state
  }
}
