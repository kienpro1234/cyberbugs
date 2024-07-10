import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_PROJECT_CAT,
  GET_PROJECT_CAT_API,
} from "../../constants/Cyberbugs/CyberbugsConst";
import { cyberbugsService } from "../../../services/CyberbugService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";

function* getAllProjectCategorySaga(action) {
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getAllProjectCategory()
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_CAT,
        arrProjectCategory: data.content,
      });
    }
  } catch (err) {
    alert(err.message);
  }
}

export function* trackGetAllProjectCategory() {
  yield takeLatest(GET_PROJECT_CAT_API, getAllProjectCategorySaga);
}
