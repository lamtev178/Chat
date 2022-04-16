import { createStore, combineReducers } from '@reduxjs/toolkit'
import {authReduser} from './authReduser'
import {commentsReduser} from './commentsReduser'
import {topicsReduser} from './topicsReduser'
import {chatsReduser} from './chatsReduser'
import {usersReduser} from './usersReduser'

export const ConfigureStore = () => {
  const store = createStore(combineReducers({
    isAuth: authReduser,
    topics: topicsReduser,
    comments: commentsReduser,
    users: usersReduser,
    chats: chatsReduser
  }))
  return store
}