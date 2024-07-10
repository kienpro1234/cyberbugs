// import { BaseService } from "./baseService";

import { BaseService } from "./baseService";


class PrioritysService extends BaseService{
    getPriorityService = () => {
        return this.get("Priority/getAll?id=5");
    }
}

export const priorityService = new PrioritysService();