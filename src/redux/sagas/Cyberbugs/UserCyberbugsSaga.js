import { call, put, takeLatest, delay, select } from "redux-saga/effects";
import {
  ASSIGN_USER_PROJECT_SAGA,

  DELETE_USER_FROM_PROJECT_SAGA,

  GET_ALL_PROJECT_API,
  SEARCH_KEYWORD_SAGA,
  SEND_SEARCHED_USER,
  USER_SIGNIN_API,
} from "../../constants/Cyberbugs/CyberbugsConst";
import { cyberbugsService } from "../../../services/CyberbugService";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../util/constants/settingSystem";
import { navigateTo, usLogin } from "../../actions/CyberbugsAction";
import { globalNavigate } from "../../../util/GlobalNavigate";
import { userService } from "../../../services/UserCyberbugsService";
import { DELETE_USER_SAGA, GET_ALL_USER, GET_ALL_USER_SAGA, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA, REGISTER_CYBERBUGS_SAGA, SEARCH_USER, SEARCH_USER_SAGA, UPDATE_USER_SAGA } from "../../constants/Cyberbugs/UserConst";

function* signInSaga(action) {
  yield put({
    type: "DISPLAY_LOADING",
  });

  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.signinCyberbugs(action.userLogin)
    );
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put(usLogin(data.content));
    globalNavigate("/cyberbugs");
  } catch (err) {
    alert(err.response.data.message);
  }

  yield put({
    type: "HIDE_LOADING",
  });
}

export function* trackSignInSaga() {
  yield takeLatest(USER_SIGNIN_API, signInSaga);
}

function* getSearchedUser(action) {
  console.log("hello")
  try {

    const { data, status } = yield call(() =>
      userService.getSearchedUser(action.keyword)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SEND_SEARCHED_USER,
        listSearchedUser: data.content,
      });
    }
  } catch (err) {
    alert(err.response.data.message);
  }
}

export function* watchGetSearchedUser() {
  yield takeLatest(SEARCH_KEYWORD_SAGA, getSearchedUser);
}

function* assignUserProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.data)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_API,
      });
    }
  } catch (err) {
    alert(err.response.data.message);
  }
}

export function* watchAssignUserProject() {
  yield takeLatest(ASSIGN_USER_PROJECT_SAGA, assignUserProjectSaga);
}

function* deleteUserFromProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.deleteUserFromProject(action.deletedUser)
    );
    if (status === STATUS_CODE.SUCCESS) {
      alert("Xóa thành công!")
      yield put({  
        type: GET_ALL_PROJECT_API,
      });
    }
  } catch (err) {
    alert(err.response.data.message);
  }
}

export function * watchDeleteUserFromProject() {
  yield takeLatest(DELETE_USER_FROM_PROJECT_SAGA, deleteUserFromProjectSaga);
}

export function * getUserByProjectIdSaga(action) {
  try {
    const {data, status} = yield call(() => userService.getUserByProjectId(action.projectId))
    if (status === STATUS_CODE.SUCCESS) {
      yield put({type: GET_USER_BY_PROJECT_ID, arrUser: data.content})
    }
  } catch(err) {
    yield put({type: GET_USER_BY_PROJECT_ID, arrUser: []})
  }
}

export function * watchGetUserByProjectId() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga)
}

export function * registerCyberBugSaga(action) {
  try {
    const {data, status } = yield call(() => userService.registerUser(action.userRegister));
    if (status === STATUS_CODE.SUCCESS) {
      alert("Register successfully!")
      globalNavigate("/login")
    }
  } catch (err) {
    alert(err.response.data.message)
  }
}

export function * watchRegisterCyberbug() {
  yield takeLatest(REGISTER_CYBERBUGS_SAGA, registerCyberBugSaga);
}

export function * getAllUserSaga (action) {
  try {
    const {data, status} = yield call(() => userService.getAllUser());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({type: GET_ALL_USER, userList: data.content})
      console.log("get user successfully")
    }
  } catch (err) {
    alert(err.response.data.message)
  
  }
}

export function * watchGetAllUserSaga() {
  yield takeLatest(GET_ALL_USER_SAGA, getAllUserSaga)
}

export function * updateUserSaga(action) {
  try {
    const {data, status} = yield call(() => userService.updateUser(action.userUpdate));
    if (status === STATUS_CODE.SUCCESS) {
      alert("Update successfully!")
      yield put({type: GET_ALL_USER_SAGA})
    }
  } catch (err) {
    alert(err.response.data.message)
  }
}
export function * watchUpdateUserSaga() {
  yield takeLatest(UPDATE_USER_SAGA, updateUserSaga);
}

export function * deleteUserSaga(action) {
  try {
    const {data, status } = yield call(() => userService.deleteUser(action.userId));
    if (status === STATUS_CODE.SUCCESS) {
      alert("Delete successfully!")
      yield put({type: GET_ALL_USER_SAGA})
    }
  } catch (err) {
    alert(err.response.data.message)
  }
}

export function * watchDeleteUserSaga() {
  yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}

export function * searchUserSaga(action) {
  try {
    const {data, status} = yield call(() => userService.getUserByKeyWord(action.keyword));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({type: SEARCH_USER, userSearchList: data.content})
    }
  } catch (err) {
    alert(err.response.data.message)
  }
}

export function * watchSearchUserSaga() {
  yield takeLatest(SEARCH_USER_SAGA, searchUserSaga);
}

