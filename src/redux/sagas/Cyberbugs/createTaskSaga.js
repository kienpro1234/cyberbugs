import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_TASK_SAGA } from "../../constants/Cyberbugs/CreateTaskConst";
import { taskService } from "../../../services/taskService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notifiFuntion } from "../../../util/NotificationFunction";
import { CLOSE_FORM_CYBERBUGS } from "../../constants/Cyberbugs/CyberbugsConst";

function * createTaskSaga(action){
    yield put({
        type: "DISPLAY_LOADING",
    })
    try {
        const {data, status} = yield call(() => taskService.createTask(action.newTask));
        if (status === STATUS_CODE.SUCCESS){
           
            notifiFuntion("success", "Create Task Success!")
            yield put({
                type: CLOSE_FORM_CYBERBUGS,
            })
        }

    } catch (err) {
        alert(err.response.data.message);
    }

    yield put({
        type: "HIDE_LOADING",
    })
}

export function * watchCreateTaskSaga() {
   yield takeLatest(CREATE_TASK_SAGA, createTaskSaga)
}