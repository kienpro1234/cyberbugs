import { CLOSE_FORM_CYBERBUGS, CREATE_TITLE, OPEN_FORM_CYBERBUGS } from "../constants/Cyberbugs/CyberbugsConst"
import React from "react";
const initialState = {
    open: false,
    ComponentForm: () => <p>hello</p>,
    title: ""
}

export const DrawerCyberbugsReducer =  (state = initialState, action) => {
  switch (action.type) {
    case OPEN_FORM_CYBERBUGS: {
        return {...state, open: true, ComponentForm: action.payload, title: action.title};
    }
    case CLOSE_FORM_CYBERBUGS: {
        return {...state, open: false};
    }


  default:
    return state
  }
}
