import { all } from "redux-saga/effects";
import * as toDoListSaga from "./toDoListSaga"
import * as cyberbugSaga from "./Cyberbugs/UserCyberbugsSaga";
import * as projectCategorySaga from "./Cyberbugs/ProjectCategorySaga";
import * as projectSaga from "./Cyberbugs/ProjectSaga";
import * as prioritySaga from "./PrioritySaga";
import * as taskTypeSagaCyberbugs from "./Cyberbugs/TaskTypeCyberbugsSaga";
import * as taskSaga from "./Cyberbugs/createTaskSaga";
import * as statusSaga from "./Cyberbugs/StatusSaga";
import * as taskDetailSaga from "./Cyberbugs/TaskSaga";
import * as commentSaga from "./Cyberbugs/CommentSaga";
export function * rootSaga(){
    yield all([
        toDoListSaga.theoDoiActionGetTaskApi(),
        toDoListSaga.trackAddTaskApiAction(),
        toDoListSaga.trackDeleteTaskApiAction(),
        toDoListSaga.trackCheckTaskApiAction(),
        toDoListSaga.trackRejectTaskApiAction(),
        cyberbugSaga.trackSignInSaga(),
        cyberbugSaga.watchGetSearchedUser(),
        cyberbugSaga.watchAssignUserProject(),
        cyberbugSaga.watchDeleteUserFromProject(),
        cyberbugSaga.watchGetUserByProjectId(),
        cyberbugSaga.watchRegisterCyberbug(),
        cyberbugSaga.watchGetAllUserSaga(),
        cyberbugSaga.watchUpdateUserSaga(),
        cyberbugSaga.watchDeleteUserSaga(),
        cyberbugSaga.watchSearchUserSaga(),
        projectCategorySaga.trackGetAllProjectCategory(),
        projectSaga.trackCreateProjectSaga(),
        projectSaga.trackgetAllProjectSaga(),
        projectSaga.trackUpdateProjectSaga(),
        projectSaga.trackDeleteProject(),
        projectSaga.watchgetProjectDetail(),
        projectSaga.watchgetAllProjectSaga(),
        prioritySaga.watchGetprioritySaga(),
        taskTypeSagaCyberbugs.watchGetTaskTypeSaga(),
        taskSaga.watchCreateTaskSaga(),
        statusSaga.watchGetAlStatus(),
        taskDetailSaga.watchGetTaskDetailSaga(),
        taskDetailSaga.watchUpdateStatusTaskSaga(),
        taskDetailSaga.watchUpdateTaskSaga(),
        commentSaga.watchInsertCommentSaga(),

    ])
}