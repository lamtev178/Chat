export const authReduser = (state={isAuth:false},action)=>{
  switch(action.type){
    case "LOGIN_IN" :
      return {...state, isAuth:true}
    case "LOGIN_OUT" :
      return {...state, isAuth:false}
    default : 
      return state
  }
}