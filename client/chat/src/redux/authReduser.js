export const authReduser = (state={isAuth:false, login:''},action)=>{
  switch(action.type){
    case "LOGIN_IN" :
      return {...state, isAuth:true, login:action.payload}
    case "LOGIN_OUT" :
      return {...state, isAuth:false}
    default : 
      return state
  }
}