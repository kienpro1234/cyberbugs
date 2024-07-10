import { call, put, takeLatest } from "redux-saga/effects";
import { GET_TASK_TYPE, GET_TASK_TYPE_SAGA } from "../../constants/Cyberbugs/TaskTypeConst";
import { taskTypeService } from "../../../services/TaskTypeService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";

function * getTaskTypeSaga() {
    try{
        const {data,status} = yield call(() => taskTypeService.getTaskType());
        if (status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_TASK_TYPE,
                arrTaskType: data.content,
            })
        }
    } catch(err){
        alert (err.message);
    }
}

export function * watchGetTaskTypeSaga() {
    yield takeLatest(GET_TASK_TYPE_SAGA, getTaskTypeSaga);
}