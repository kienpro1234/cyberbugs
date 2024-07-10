import { BaseService } from "./baseService";

class TaskService extends BaseService{
    createTask = (model) => {
        return this.post("Project/createTask", model);
    }

    getTaskDetail = (taskId) => {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }

    updateStatusTask = (model) => {
        return this.put(`Project/updateStatus`, model);
    }

    updateTask = (model) => {
        return this.post(`Project/updateTask`, model);
    }
}

export const taskService = new TaskService();