import React, { Component } from "react";

const initialState = {
    Component: <p>Kien pro</p>
}

export const ModalReducer = (state = initialState, action) => {
    switch(action.type){

        case "LOGIN_FORM": {
            return {...state, Component: action.Component}
        }

        case "REGISTER_FORM": {
            return {...state, Component: action.Component}
        }
        default: return {...state}
    }
}