import { all } from "redux-saga/effects";
import * as toDoListSaga from "./toDoListSaga"
import * as cyberbugSaga from "./Cyberbugs/UserCyberbugsSaga";
export function * rootSaga(){
    yield all([
        toDoListSaga.theoDoiActionGetTaskApi(),
        toDoListSaga.trackAddTaskApiAction(),
        toDoListSaga.trackDeleteTaskApiAction(),
        toDoListSaga.trackCheckTaskApiAction(),
        toDoListSaga.trackRejectTaskApiAction(),
        cyberbugSaga.trackSignInSaga(),
    ])
}