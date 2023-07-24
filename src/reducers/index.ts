import albumClickedReducer from "./albumClicked";
import { combineReducers } from "@reduxjs/toolkit";

const allReducers = combineReducers({
  albumClicked: albumClickedReducer,
});

export default allReducers;
