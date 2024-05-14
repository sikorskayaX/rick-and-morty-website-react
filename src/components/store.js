import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'; 
import { thunk } from 'redux-thunk'; 
import entitiesReducer from './entitiesReducer';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  // Other reducers can be added here
});

// Updated the way to pass middleware to configureStore
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

