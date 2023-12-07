import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit'
import thunkMiddleware from "redux-thunk";
import { usersReducer } from './user/usersReducer';

const rootReducer = combineReducers({ users: usersReducer })

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store