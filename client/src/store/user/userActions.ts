import axios, { AxiosResponse } from "axios";
import { UserActionTypes, userActions } from "./usersReducer";
import { IUserInfo } from "~/types/user";
import { Dispatch } from "react";

export const loginOut = () => async (dispatch: Dispatch<userActions>) => {
    dispatch({
        type: UserActionTypes.LOGIN_OUT,
    })
}

export const loginAuth = (login: string, password: string, redirect: any) => async (dispatch: Dispatch<userActions>) => {
    try {
        const response: AxiosResponse<IUserInfo> = await axios.post('auth/login', {
            login: login,
            password: password
        });
        redirect("/topics")
        if (response.status < 400)
            dispatch({ type: UserActionTypes.LOGIN_IN, payload: response.data })
    } catch (error: any) {
        alert(error)
    }
}

export const createSub = (login: string, subscription: string) => async (dispatch: Dispatch<userActions>) => {
    try {
        const response = await axios.post('auth/addsub', {
            login: login,
            subscription: subscription
        })
        if (response.status < 400)
            dispatch({ type: UserActionTypes.ADD_SUB, payload: subscription })
    } catch (error: any) {
        alert(error.response.data.message)
    }
}