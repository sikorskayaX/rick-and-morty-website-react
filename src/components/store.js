import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import charactersReducer from "./charactersReducer";
import locationsReducer from "./locationsReducer";
import episodesReducer from "./episodesReducer";

const rootReducer = combineReducers({
  characters: charactersReducer,
  locations: locationsReducer,
  episodes: episodesReducer,
});

// Updated the way to pass middleware to configureStore
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
