export const commentsReduser = (state=[], action) =>{
  switch(action.type){
    case "GET_COMMENTS":
      return [...action.payload]
    case "POST_COMMENTS":
      return [...state, action.payload]
    default:
      return state
  }
}