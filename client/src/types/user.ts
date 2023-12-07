export interface IUser {
    isAuth: boolean;
    user: IUserInfo
}

export interface IUserInfo {
    login: string, subscriptions: string[]
}