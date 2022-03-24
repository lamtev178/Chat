const initTopics = [
    {id:1, score:4 , title:"Ситуация на украине", description:"Здесь будет актуальная информация о ситуации на украине"},
    {id:2, score:14 , title:"Фондовый рынок", description:"Когда откроют российскую биржу?))))"},
    {id:3, score:24 , title:"Мемы", description:"Лол, кек"},
    {id:4, score:41 , title:"Помощь студентам", description:"Помогите молодым"}
  ]

export const topicsReduser = (state=[...initTopics], action)=>{
  switch(action.type){
    case "GET_TOPICS":

  default:
    return state
  }
}