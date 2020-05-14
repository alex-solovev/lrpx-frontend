import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from 'app/state';

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
