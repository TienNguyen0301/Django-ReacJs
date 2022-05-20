import { combineReducers } from "redux";
import React from 'react';
import userReducer from "./UserReducer";

const mainReducer = combineReducers({
    'user': userReducer,
})

export default mainReducer