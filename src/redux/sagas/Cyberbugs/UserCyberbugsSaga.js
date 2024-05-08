import { call, put, takeLatest, delay, select } from "redux-saga/effects";
import { USER_SIGNIN_API } from "../../constants/Cyberbugs/CyberbugsConst";
import { cyberbugsService } from "../../../services/CyberbugService";
import { TOKEN, USER_LOGIN } from "../../../util/constants/settingSystem";
import { navigateTo, usLogin } from "../../actions/CyberbugsAction";
import { globalNavigate } from "../../../util/GlobalNavigate";

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

    yield put(usLogin(data.content))
    globalNavigate("/home");
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
