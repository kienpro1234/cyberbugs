import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from "../../constants/Cyberbugs/StatusConst";
import { statusService } from "../../../services/StatusService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";

function * getAllStatus() {
    try {
        const {data, status} = yield call(() => statusService.getArrStatus());
        if (status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_ALL_STATUS,
                arrStatus: data.content
            })
        }
    } catch(err){
        alert(err.message)
    }
}

export function * watchGetAlStatus() {
    yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatus)
}