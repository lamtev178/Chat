export const topicsReduser = (state=[], action)=>{
  switch(action.type){
    case "GET_TOPICS":
      return [...action.payload];
  default:
    return state
  }
}