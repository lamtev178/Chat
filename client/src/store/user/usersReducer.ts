import { IUser, IUserInfo } from "~/types/user";

export enum UserActionTypes {
  LOGIN_IN = "LOGIN_IN",
  LOGIN_OUT = "LOGIN_OUT",
  ADD_SUB = "ADD_SUB",
}

interface LoginInAction {
  type: UserActionTypes.LOGIN_IN
  payload: IUserInfo
}

interface LoginOutAction {
  type: UserActionTypes.LOGIN_OUT
}

interface AddSubAction {
  type: UserActionTypes.ADD_SUB
  payload: string
}

export type userActions = LoginInAction | LoginOutAction | AddSubAction
export const defaultUserInfo: IUserInfo = { login: "", subscriptions: [] }
export const defaultUser: IUser = { isAuth: false, user: defaultUserInfo }

export const usersReducer = (state = defaultUser, action: userActions): IUser => {
  switch (action.type) {
    case UserActionTypes.LOGIN_IN:
      return { isAuth: true, user: action.payload }
    case UserActionTypes.LOGIN_OUT:
      return { isAuth: false, user: defaultUserInfo }
    case UserActionTypes.ADD_SUB:
      return { ...state, user: { ...state.user, subscriptions: [...state.user.subscriptions, action.payload] } }
    default:
      return state
  }
}
