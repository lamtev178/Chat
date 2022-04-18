export const topicsReduser = (state=[], action)=>{
  switch(action.type){
    case "GET_TOPICS":
      return [...action.payload];
    case "POST_TOPICS":
      return [ action.payload, ...state];
  default:
    return state
  }
}
