// import { useNavigate } from "react-router-dom";
import { USERLOGIN, USER_SIGNIN_API } from "../constants/Cyberbugs/CyberbugsConst";

export const singinCyberbugsAction = ({email, password}) => ({
    
    type: USER_SIGNIN_API,
    userLogin: {
        email: email,
        passWord: password,
    },

})

export const usLogin = (userLogin) => ({
    type: USERLOGIN,
    userLogin,
})
