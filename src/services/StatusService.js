import { BaseService } from "./baseService";

class StatusService extends BaseService{
    getArrStatus = () => {
       return this.get(`Status/getAll`);
    }
}

export const statusService = new StatusService();