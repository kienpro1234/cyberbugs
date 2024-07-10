import { BaseService } from "./baseService";

class TaskTypeService extends BaseService{
    getTaskType = () => {
        return this.get("TaskType/getAll");
    }
}

export const taskTypeService = new TaskTypeService();