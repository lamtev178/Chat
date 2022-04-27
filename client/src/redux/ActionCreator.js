const axios = require('axios').default;

export const addUsers = (users) =>{
  return{
    type:"GET_USERS",
    payload: users
  }
}
export const getUsers = () => async (dispatch) => {
  try{
    const response = await axios.get('http://localhost:8000/auth/users')
    dispatch(addUsers(response.data))
  }
  catch(error){
    alert(error.response.data.message)
  }
}
export const addTopics = (topics) =>{
  return{
    type:"GET_TOPICS",
    payload: topics
  }
}
export const getTopics = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8000/alltopics/topic');
    dispatch(addTopics(response.data.reverse()))
  } catch (error) {
    alert(error.response.data.message)
  }
}
export const addComments = (comments) =>{
  return{
    type:"GET_COMMENTS",
    payload: comments
  }
}
export const getComments = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8000/alltopics/comment');
    dispatch(addComments(response.data))
  } catch (error) {
    alert(error.response.data.message)
  }
}
export const addChats = (chats) =>{
  return{
    type:"GET_CHATS",
    payload: chats
  }
}
export const getChats = () => async (dispatch) => {
  try{
    const response = await axios.get('http://localhost:8000/messenger/chat',{headers: { "Authorization": 'Bearer '+localStorage.getItem('Token') }})
    dispatch(addChats(response.data.reverse()))
  }
  catch(error){
    alert(error.response.data.message)
  }
}
export const addChat = (chat) =>{
  return{
    type:"CREATE_CHAT",
    payload: chat
  }
}
export const createChat = (users, mess, chatName, redirect, myUser, setToggle) => async (dispatch) => {
  let date = (new Date() + "").split(' ')
  date = date[2] + " " + date[1] + " " + date[4].slice(0,5)
  let message = {
    message: mess,
    date: date,
    author: myUser.login
  }
  if(mess==='' ||  chatName===''){
    alert("Введите название беседы и сообщение")
    return
  }
  if(users.length === 0){
    alert("У вас нет подписок")
    setToggle(false)
    return
  }
  const res=[]
  if(typeof(users[0])==="boolean"){
    if(users.indexOf(true) === -1){
      alert("At least one user")
      return
    } else {
      for(let i =0; i < users.length; i++){
        if(users[i])
          res.push(myUser.subscriptions[i])
      }
    }
  }
  try{
    const response = await axios.post('http://localhost:8000/messenger/chat', {
      users: res.length > 0 ? res : users,
      messages: [message],
      chatName: (chatName.length === 0 ? '' : chatName)
    },{headers: { "Authorization": 'Bearer '+localStorage.getItem('Token') }});
    dispatch(addChat(response.data.data))
    redirect(`/Messages/chat/${response.data.data.chat}`)
  }catch(error){
    alert(error.response.data.message)
  }
}
export const loginIn = (user) =>{
  return{
    type:"LOGIN_IN",
    payload: user
  }
}
export const loginAuth = (log, pass, redirect, login, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8000/auth/login', {
      login: login ? login : log,
      password: password ? password : pass
    });
    localStorage.setItem('user', (login ? login : log) + ' ' + (password ? password : pass))
    localStorage.setItem('Token', response.data.token)
    redirect("/topics")
    dispatch(loginIn(response.data))
  } catch (error) {
    let err = ''
    error.response.data.message ?
    alert(error.response.data.message) :
    (error.response.data.errors.map(er => err += er.msg))
    alert(err)
  }
}
export const addSub = (sub) =>{
  return{
    type:"ADD_SUB",
    payload: sub
  }
}
export const createSub = (login, subscription) => async (dispatch) => {
  try {
  const response = await axios.post('http://localhost:8000/auth/addsub',{
    login:login,
    subscription:subscription
  })
  dispatch(addSub(subscription))
  } catch (error) {
      alert(error.response.data.message)
  }
}
