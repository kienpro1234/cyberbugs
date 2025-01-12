import { BaseService } from "./baseService";

class ProjectService extends BaseService{
    constructor(){
        super();
    }

    deleteProject = (id) => {
        return this.delete(`Project/deleteProject?projectId=${id}`)
    }

    getProjectDetail = (projectId) => {
        return this.get(`Project/getProjectDetail?id=${projectId}`)
    }

    getAllProjectForm = () => {
        return this.get("Project/getAllProject")
    }
}

export const projectService = new ProjectService();