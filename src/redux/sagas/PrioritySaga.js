import { call, put, takeLatest } from "redux-saga/effects";
import { GET_PRIORITY, GET_PRIORITY_SAGA } from "../constants/Cyberbugs/PriorityCyberbugsConst";

import { STATUS_CODE } from "../../util/constants/settingSystem";
import {priorityService} from "../../services/PriorityService";

function * getPrioritySaga() {
    try{
        const {data, status} = yield call(() => priorityService.getPriorityService());
        if (status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_PRIORITY,
                priorityList: data.content,
            })
        }
    } catch(err){
        alert(err.message);
    }
}

export function * watchGetprioritySaga() {
    yield takeLatest(GET_PRIORITY_SAGA, getPrioritySaga)
}