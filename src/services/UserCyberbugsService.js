import { BaseService } from "./baseService";

class UserService extends BaseService{
    getSearchedUser = (keyword) => {
        return this.get(`Users/getUser?keyword=${keyword}`);
    }

    assignUserProject = (data) => {
        return this.post("Project/assignUserProject", data);
    }

    deleteUserFromProject = (data) => {
        return this.post("Project/removeUserFromProject", data);
    }

    getUserByProjectId = (projectId) => {
        return this.get(`Users/getUserByProjectId?idProject=${projectId}`)
    }

    registerUser = (user) => {
        return this.post("Users/signup", user);
    }

    getAllUser = () => {
        return this.get("Users/getUser");
    }

    getUserByKeyWord = (keyword) => {
        return this.get(`Users/getUser?keyword=${keyword}`);
    }

    updateUser = (user) => {
        return this.put("Users/editUser", user);
    }

    deleteUser = (userId) => {
        return this.delete(`Users/deleteUser?id=${userId}`);
    }
}

export const userService = new UserService();