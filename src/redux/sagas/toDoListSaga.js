import { call, put, takeLatest, delay } from "redux-saga/effects";
import { toDoListService } from "../../services/TooDoListService";
import {
  ADD_TASK_API_ACTION,
  CHECK_TASK_API_ACTION,
  DELETE_TASK_API_ACTION,
  GET_TASK_API,
  GET_TASK_API_ACTION,
  REJECT_TASK_API_ACTION,
} from "../constants/ToDoListType";
import { STATUS_CODE } from "../../util/constants/settingSystem";

/*
- Action saga thực hiện getTask
*/
function* getTaskApiAction(action) {
  yield put({
    type: "DISPLAY_LOADING",
  });

  yield delay(500);
  try {
    let { data, status } = yield call(toDoListService.getTaskApi);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_API,
        taskList: data,
      });
    } else {
      console.log("Lỗi cmnr");
    }
  } catch (err) {
    console.log(err.message);
  }
  yield put({
    type: "HIDE_LOADING",
  });
}

export function* theoDoiActionGetTaskApi() {
  yield takeLatest(GET_TASK_API_ACTION, getTaskApiAction);
}

/*
- Action saga thực hiện addTask
*/

function* addTaskApiAction(action) {
  yield put({
    type: "DISPLAY_LOADING",
  });
  yield delay(500);
  try {
    let { taskName } = action;
    let { data, status } = yield call(() => {
      return toDoListService.addTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_API_ACTION,
      });
      alert("ADD SUCCESSFULLY");
    } else {
      console.log("Lỗi sml");
    }
  } catch (err) {
    console.log(err.message);
  }

  yield put({
    type: "HIDE_LOADING",
  });
}

export function* trackAddTaskApiAction() {
  yield takeLatest(ADD_TASK_API_ACTION, addTaskApiAction);
}

//Action saga thực hiện delete task

function* deleteTaskApiAction(action) {
  yield put({
    type: "DISPLAY_LOADING",
  });
  yield delay(500);
  try {
    let { taskName } = action;
    let { status } = yield call(() => {
      return toDoListService.deleteTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_API_ACTION,
      });
      alert("DELETE SUCCESSFULLY");
    } else {
      console.log("Lỗi sml");
    }
  } catch (err) {
    console.log(err.message);
  }

  yield put({
    type: "HIDE_LOADING",
  });
}

export function* trackDeleteTaskApiAction() {
  yield takeLatest(DELETE_TASK_API_ACTION, deleteTaskApiAction);
}

//Action check task
function* checkTaskApiAction(action) {
  yield put({
    type: "DISPLAY_LOADING",
  });
  yield delay(500);

  try {
    let { taskName } = action;
    let { status } = yield call(() => {
      return toDoListService.checkTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_API_ACTION,
      });
    } else {
      alert("Lỗi sml");
    }
  } catch (err) {
    alert(err.message);
  }

  yield put({
    type: "HIDE_LOADING",
  });
}

export function* trackCheckTaskApiAction() {
  yield takeLatest(CHECK_TASK_API_ACTION, checkTaskApiAction);
}

//action reject

function * rejectTaskApiAction(action) {
    yield put({
        type: "DISPLAY_LOADING",

    })
    yield delay(500);

    try{

        let {taskName} = action;
        let {status} = yield call(() => {return toDoListService.rejectTaskApi(taskName)});
        console.log(status)
        if (status === STATUS_CODE.SUCCESS){
            yield put({type: GET_TASK_API_ACTION})
        } else {
            alert ("Lỗi sml");
        }
    } catch(err) {
        alert(err.message)
    }

    yield put({
        type: "HIDE_LOADING",
    })
}

export function * trackRejectTaskApiAction() {
    yield takeLatest(REJECT_TASK_API_ACTION, rejectTaskApiAction);
}
