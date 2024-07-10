
import { CHANGE_TASK_DETAIL, DELETE_ASSIGNEE_FROM_TASK, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_SAGA, UPDATE_STATUS_TASK_SAGA } from "../../constants/Cyberbugs/TaskTypeConst";
import { taskService } from "../../../services/taskService";
import { call, put, select } from "redux-saga/effects";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { takeLatest } from "redux-saga/effects";
import { GET_PROJECT_DETAIL_SAGA } from "../../constants/Cyberbugs/CyberbugsConst";
import { update } from "react-spring";
import { SELECT_ASSIGNEE } from "../../constants/Cyberbugs/CreateTaskConst";

function * getTaskDetailSaga(action) {
    try {
        const {data, status} = yield call(() => taskService.getTaskDetail(action.taskId));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL,
                taskDetailModal: data.content
            })
        }
    } catch(err) {
        alert(err.message)
        console.log(err);
    }
}

export function * watchGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)
}

function * updateStatusTaskSaga(action) {
    try {
        const {data, status } = yield call(() => taskService.updateStatusTask(action.taskUpdateStatus));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.taskUpdateStatus.taskId
            })
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: action.projectId
            })
            
        }
    } catch(err) {
        alert(err.message);
        console.log(err);
    }
}

export function * watchUpdateStatusTaskSaga() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateStatusTaskSaga)
}

function * updateTaskSaga(action) {
    switch(action.actionType) {
        case CHANGE_TASK_DETAIL: {
            const {value, name} = action;
            yield put({
                type: CHANGE_TASK_DETAIL,
                name,
                value,
            })
            break;
        };
        case SELECT_ASSIGNEE: {
            yield put({
                type: SELECT_ASSIGNEE,
                assignee: action.assignee
            })
            break;
        }
        case DELETE_ASSIGNEE_FROM_TASK: {
            yield put({
                type: DELETE_ASSIGNEE_FROM_TASK,
                id: action.id,
            })
            break;
        }
        
        
        default: {
            console.log("Action type is not valid");
           
        }
    }

    let {taskDetail} = yield select(state => state.TaskDetailReducer);
    const listUserAsign = taskDetail.assigness.map(user => user.id);

    taskDetail = {...taskDetail, listUserAsign};
    console.log("hdlafkj",taskDetail);
    try {
        const {data, status} = yield call(() => taskService.updateTask(taskDetail));
        if (status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: taskDetail.projectId
            })
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskDetail.taskId
            })
        }
    } catch(err) {
        alert(err.message);
        console.log(err);
    }
}

export function * watchUpdateTaskSaga() {
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, updateTaskSaga)
}