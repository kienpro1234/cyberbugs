import { applyMiddleware, combineReducers, createStore } from "redux";
import {thunk} from 'redux-thunk'


import createSagaMiddleware  from "redux-saga";
import  {rootSaga} from "./sagas/rootSaga";
import { loadingReducer } from "./reducers/LoadingReducer";
import { toDoListReducer } from "./reducers/toDoListReducer";
import { ModalReducer } from "./reducers/ModalReducer";
import { UserCyberBugsReducer } from "./reducers/UserCyberbugsReducer";


const middleWareSaga = createSagaMiddleware ();

const rootReducer = combineReducers({
    toDoListReducer,
    loadingReducer,
    ModalReducer,
    UserCyberBugsReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk, middleWareSaga));

middleWareSaga.run(rootSaga);
export default store;
