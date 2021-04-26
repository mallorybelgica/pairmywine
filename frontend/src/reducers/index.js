import { combineReducers } from "redux";
import foodsListReducer from "./foodsListReducer";
import grapesListReducer from "./grapesListReducer";
import grapeDetailsReducer from "./grapeDetailsReducer";
import winePairingReducer from "./winePairingReducer";
import userInfoReducer from "./userInfoReducer";
import wineCellarReducer from "./wineCellarReducer";
import wineDetailsReducer from "./wineDetailsReducer";
import groupsReducer from "./groupsReducer";
import starRatingReducer from "./starRatingReducer";

export default combineReducers({
  foodsListReducer,
  grapesListReducer,
  grapeDetailsReducer,
  winePairingReducer,
  wineCellarReducer,
  wineDetailsReducer,
  userInfoReducer,
  groupsReducer,
  starRatingReducer,
});
