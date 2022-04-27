export const chatsReduser = (state=[],action)=>{
  switch(action.type){
    case "GET_CHATS" :
      return [...action.payload]
    case "CREATE_CHAT" :
      return [action.payload, ...state]
    case "POST_MESSAGE" :{
      let res = [...state.map(el => el._id===action.payload.data._id ? action.payload.data : el)]
      return res
    }
    case "MESS_IS_READED" :{
      let res = [...state.map(el => el._id===action.payload.data._id ? action.payload.data : el)]
      return res
    }
    case "DELETE_USER_FROM_CHAT" :{
      let res = [...state.map(chat => chat.chat === action.payload.chat ? action.payload : chat)]
      return res
      }
    case "DELETE_CHAT" :{
      let res = [...state.filter(chat => chat.chat !== action.payload)]
      return res
    }
    default :
      return state
  }
}
