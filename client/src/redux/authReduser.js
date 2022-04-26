export const authReduser = (state={isAuth:false, user : {login:'', subscriptions:[]}},action)=>{
  switch(action.type){
    case "LOGIN_IN" :
      return {...state, isAuth:true, user : {login : action.payload.login, subscriptions: action.payload.subscriptions}}
    case "LOGIN_OUT" :
      return {...state, isAuth:false, user : []}
    case "ADD_SUB":
      return {...state, user : {...state.user, subscriptions: [...state.user.subscriptions, action.payload]} }
    default :
      return state
  }
}
