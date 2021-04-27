import { combineReducers } from "redux";
import grapesListReducer from "./grapesListReducer";
import grapeDetailsReducer from "./grapeDetailsReducer";
import winePairingReducer from "./winePairingReducer";
import userInfoReducer from "./userInfoReducer";
import wineCellarReducer from "./wineCellarReducer";
import wineDetailsReducer from "./wineDetailsReducer";
import groupsReducer from "./groupsReducer";
import starRatingReducer from "./starRatingReducer";

export default combineReducers({
  grapesListReducer,
  grapeDetailsReducer,
  winePairingReducer,
  wineCellarReducer,
  wineDetailsReducer,
  userInfoReducer,
  groupsReducer,
  starRatingReducer,
});
