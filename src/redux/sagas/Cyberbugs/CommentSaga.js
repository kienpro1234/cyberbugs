import { call, put, takeLatest } from "redux-saga/effects";
import { INSERT_COMMENT_SAGA } from "../../constants/Cyberbugs/commentCyberbug";
import { commentService } from "../../../services/CommentService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA } from "../../constants/Cyberbugs/TaskTypeConst";

function * insertCommentSaga(action) {
    console.log("action", action)
    const model = {
        taskId: action.taskId,
        contentComment: action.commentContent
    }
    try {
        const {data, status} = yield call(() => commentService.insertComment(model))
    
        if (status === STATUS_CODE.SUCCESS) {
            console.log("insert comment successfully")
            yield put({type: GET_TASK_DETAIL_SAGA,taskId: action.taskId})
        }
    } catch (err) {
        alert(err);
    }
    
}

export function * watchInsertCommentSaga() {
    yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga)
} 