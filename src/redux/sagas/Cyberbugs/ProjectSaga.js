import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_PROJECT_API,
  DELETE_PROJECT_SAGA,
  GET_ALL_PROJECT_API,
  GET_ALL_PROJECT_FORM,
  GET_ALL_PROJECT_SAGA,
  GET_PROJECT_CAT,
  GET_PROJECT_CAT_API,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SAGA,
  SUBMIT_FORM_EDIT_API,
} from "../../constants/Cyberbugs/CyberbugsConst";
import { cyberbugsService } from "../../../services/CyberbugService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { getAllProjectAction } from "../../actions/CyberbugsAction";
import { globalNavigate } from "../../../util/GlobalNavigate";
import { projectService } from "../../../services/ProjectcyberbugsService";
import {RadiusUprightOutlined} from "@ant-design/icons";
import { notifiFuntion } from "../../../util/NotificationFunction";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../constants/Cyberbugs/UserConst";

function* createProjectSaga(action) {
  yield put({
    type: "DISPLAY_LOADING",
  });
  yield delay(500);
  try {
    let { data, status } = yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      alert("create success")
      globalNavigate("/projectmanagement")
    }
  } catch (err) {
    alert(err.response.data.content)
  }
  yield put({
    type: "HIDE_LOADING",
  });
}

export function* trackCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_API, createProjectSaga);
}

//saga dùng để get all project từ api
// Kiên - code ngày 15/5/2024

function * getAllProjectSaga(action) {

  try{
    let {data, status } = yield call(() => cyberbugsService.getAllProjectAuthorization())

    if (status === STATUS_CODE.SUCCESS){
      yield put(getAllProjectAction(data.content))
    }
  } catch(err){
    alert(err.response.data.content);
  }


}

export function * trackgetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_API, getAllProjectSaga)
}

function * updateProjectSaga(action){
  yield put({
    type: "DISPLAY_LOADING",
  })
  try{
    const {data, status} = yield call(() => cyberbugsService.updateProjectAuthorization(action.projectEdit));
    if (status === STATUS_CODE.SUCCESS){
      yield put({
        type: GET_ALL_PROJECT_API,
      })
      alert(data.message);
    }
  } catch (err){
    alert(err.message)
  }

  yield put({
    type: "HIDE_LOADING",
  })
}

export function * trackUpdateProjectSaga(){
  yield takeLatest(SUBMIT_FORM_EDIT_API, updateProjectSaga);
}

//delete
function * deleteProjectSaga(action){

  try{
    const {data, status} = yield call(() => projectService.deleteProject(action.id));
    if (status === STATUS_CODE.SUCCESS){
      
      yield put({
        type: GET_ALL_PROJECT_API,
      });
      notifiFuntion("success", "Delete project successfully!")
    } else {
      notifiFuntion("error", "Delete project failed!")
    }
  } catch (err){
    notifiFuntion("error", "Delete project failed!")
  }
}

export function * trackDeleteProject(){
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}


function * getProjectDetailSaga(action){

  try{
    const {data, status} = yield call(() => projectService.getProjectDetail(action.projectId));
    if (status === STATUS_CODE.SUCCESS){
      console.log("data",data)
      yield put({
        type: GET_PROJECT_DETAIL,
        projectDetail: data.content
      })

    }
  } catch (err){
    notifiFuntion("error", "failed!")
  }
}

export function * watchgetProjectDetail(){
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}


function * getAllProjectForFormSaga(action) {

  try{
    let {data, status } = yield call(() => projectService.getAllProjectForm())

    if (status === STATUS_CODE.SUCCESS){
      yield put ({
        type: GET_ALL_PROJECT_FORM,
        arrProject: data.content,
      })
      yield put({
        type: GET_USER_BY_PROJECT_ID_SAGA,
        projectId: data.content[0].id,
      })
    }
  } catch(err){
    alert(err.response.data.content);
  }


}

export function * watchgetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectForFormSaga)
}

