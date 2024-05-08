import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USERLOGIN } from "../constants/Cyberbugs/CyberbugsConst";

let usLogin = {}

if (localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: usLogin
}

export const UserCyberBugsReducer = (state = stateDefault, action) => {
    switch(action.type){
        case USERLOGIN: {
            state.userLogin = action.userLogin;
            return {...state}
        }
        default: return state
    }
}
