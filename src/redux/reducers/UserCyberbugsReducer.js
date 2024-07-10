import { USER_LOGIN } from "../../util/constants/settingSystem";
import { SEND_SEARCHED_USER, USERLOGIN } from "../constants/Cyberbugs/CyberbugsConst";
import { GET_USER_BY_PROJECT_ID } from "../constants/Cyberbugs/UserConst";

let usLogin = {}

if (localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: usLogin,
    searchedUser: [],
    arrUser: [], //arr user cho option của thẻ select bên create form 

}

export const UserCyberBugsReducer = (state = stateDefault, action) => {
    switch(action.type){
        case USERLOGIN: {
            state.userLogin = action.userLogin;
            return {...state}
        }

        case SEND_SEARCHED_USER: {
            return {...state, searchedUser: action.listSearchedUser}
        }

        case GET_USER_BY_PROJECT_ID: {
            return {...state, arrUser: action.arrUser}
        }

        default: return state
    }
}
