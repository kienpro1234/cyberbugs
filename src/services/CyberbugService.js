import axios from "axios"
import { DOMAIN, DOMAIN_CYBERBUGS, TOKEN } from "../util/constants/settingSystem"

export const cyberbugsService = {
    signinCyberbugs: (userLogin) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/Users/signin`,
            method: "POST",
            data: userLogin,
        })
    },

    getAllProjectCategory: () => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/ProjectCategory`,
            method: "GET",
        })
    },

    getAllProjectAuthorization: () => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/Project/getAllProject`,
            method: "GET",
            headers: {"Authorization": "Bearer " + localStorage.getItem(TOKEN)}
        })
    },

    createProject: (newProject) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/Project/createProject`,
            method: "POST",
            data: newProject
        })
    },

    createProjectAuthorization: (newProject) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/Project/createProjectAuthorize`,
            method: "POST",
            data: newProject,
            headers: {"Authorization": "Bearer " + localStorage.getItem(TOKEN)},
        })
    },

    updateProjectAuthorization: (projectUpdate) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/Project/updateProject?projectId=${projectUpdate.id}`,
            method: "PUT",
            data: projectUpdate,
            headers: {"Authorization": "Bearer " + localStorage.getItem(TOKEN)},
        })
    },

}