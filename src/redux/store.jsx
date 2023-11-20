
import { configureStore } from '@reduxjs/toolkit';
import authReducer from  './auth/auth'
import profileReducer from './profile/Profile'

const saveStateMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = JSON.stringify(store.getState());
    localStorage.setItem("reduxState", state);
  
    return result;
  };
  

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(saveStateMiddleware);
  },

});
