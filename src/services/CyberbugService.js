import axios from "axios"
import { DOMAIN_CYBERBUGS } from "../util/constants/settingSystem"

export const cyberbugsService = {
    signinCyberbugs: (userLogin) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/Users/signin`,
            method: "POST",
            data: userLogin,
        })
    }
}