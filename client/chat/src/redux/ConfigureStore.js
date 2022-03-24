import { createStore, combineReducers } from '@reduxjs/toolkit'
import {authReduser} from './authReduser'
import {topicsReduser} from './topicsReduser'
export const ConfigureStore = () => {
  const store = createStore(combineReducers({
    isAuth: authReduser,
    topics: topicsReduser
  }))
  return store
}