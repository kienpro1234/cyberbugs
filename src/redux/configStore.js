import { applyMiddleware, combineReducers, createStore } from "redux";
import {thunk} from 'redux-thunk'


import createSagaMiddleware  from "redux-saga";
import  {rootSaga} from "./sagas/rootSaga";
import { loadingReducer } from "./reducers/LoadingReducer";
import { toDoListReducer } from "./reducers/toDoListReducer";
import { ModalReducer } from "./reducers/ModalReducer";
import { UserCyberBugsReducer } from "./reducers/UserCyberbugsReducer";
import { ProjectCategoryReducer } from "./reducers/ProjectCategoryReducer";
import { ProjectCyberbugsReducer } from "./reducers/ProjectCyberbugsReducer";
import { DrawerCyberbugsReducer } from "./reducers/DrawerCyberbugsReducer";
import { ProjectFormCyberbugsReducer } from "./reducers/ProjectFormCyberbugsReducer";
import { PriorityCyberbugsReducer } from "./reducers/PriorityCyberbugsReducer";
import { TaskTypeCyberbugsReducer } from "./reducers/TaskTypeCyberbugsReducer";
import { StatusCyberbugsReducer } from "./reducers/StatusCyberbugsReducer";
import { TaskDetailReducer } from "./reducers/TaskDetailReducer";
import { UserManagementCyberbugReducer } from "./reducers/UserManagementCyberbugReducer";
import EditUserCyberbugsReducer from "./reducers/EditUserCyberbugsReducer";


const middleWareSaga = createSagaMiddleware ();

const rootReducer = combineReducers({
    toDoListReducer,
    loadingReducer,
    ModalReducer,
    UserCyberBugsReducer,
    ProjectCategoryReducer,
    ProjectCyberbugsReducer,
    DrawerCyberbugsReducer,
    ProjectFormCyberbugsReducer,
    PriorityCyberbugsReducer,
    TaskTypeCyberbugsReducer,
    StatusCyberbugsReducer,
    TaskDetailReducer,
    UserManagementCyberbugReducer,
    EditUserCyberbugsReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk, middleWareSaga));

middleWareSaga.run(rootSaga);
export default store;
