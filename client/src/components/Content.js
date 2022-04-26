import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Topics from './Topics'
import Chat from './Chat'
import Messages from './Messages'
import Account from './Account'
import Friends from './Friends'
import Topic from './Topic'
import LoginForm from './LoginInForm'
import {Routes, Route} from 'react-router'
const axios = require('axios')

function Content({handleSendMess}){
  const redirect = useNavigate()
  const dispatch= useDispatch()

  const [toggle, setToggle] = useState(false)
  const [newChatUsers, setNewChatUsers] = useState([])
  const [mess, setMess] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [chatName, setChatName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const myUser = useSelector(state => state.isAuth.user) || []
  const users = useSelector(state => state.users.filter( user => newChatUsers.includes(user.login))) || []

  async function getChats(){
    try{
      const response = await axios.get('http://localhost:8000/messenger/chat',{headers: { "Authorization": 'Bearer '+localStorage.getItem('Token') }})
      dispatch({type:"GET_CHATS", payload: response.data})
      console.log(response);
    }
    catch(error){
      alert(error.response.data.message)
    }
  }
  async function newChat(){
    let date = (new Date() + "").split(' ')
    date = date[2] + " " + date[1] + " " + date[4].slice(0,5)
    let message = {
      message: mess,
      date: date,
      author: myUser.login
    }
    const usersLogins = users.map(user => {return user.login})
    try{
      const response = await axios.post('http://localhost:8000/messenger/chat', {
        users: usersLogins,
        messages: [message],
        chatName: (chatName.length == 0 ? '' : chatName)
      },{headers: { "Authorization": 'Bearer '+localStorage.getItem('Token') }});
      dispatch({type: "CREATE_CHAT", payload: response.data.data})
      console.log(response);
      setMess('')
      redirect(`/Messages/chat/${response.data.data.chat}`)
    }catch(error){
      alert(error.response.data.message)
    }
  }
  async function Login(log, pass){
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        login: login ? login : log,
        password: password ? password : pass
      });
      console.log(response);
      localStorage.setItem('user', (login ? login : log) + ' ' + (password ? password : pass))
      localStorage.setItem('Token', response.data.token)
      redirect("/topics")
      dispatch({type:"LOGIN_IN", payload:response.data})
      setLogin('')
      setPassword('')
      getChats()
    } catch (error) {
      let err = ''
      error.response.data.message ?
      alert(error.response.data.message) :
      (error.response.data.errors.map(er => err += er.msg))
      alert(err)
    }
  }
  useEffect(()=>{
    if(localStorage.user){
      Login(localStorage.user.split(' ')[0], localStorage.user.split(' ')[1])
    }
  }, [])
  function toggleModal(){
    setToggle(!toggle)
  }
  async function addSubscription({login, subscription}){
    setIsLoading(true)
    console.log(login, subscription + "----------------------------s");
    try {
    const response = await axios.post('http://localhost:8000/auth/addsub',{
      login:login,
      subscription:subscription
    })
    dispatch({type: "ADD_SUB", payload: subscription})
    console.log(response);
    } catch (error) {
        alert(error.response.data.message)
    }
    setIsLoading(false)
  }
  return(
    <Routes>
      <Route path='/topics' element={<Topics />} />
      <Route path='/Messages' element={<Messages isLoading={isLoading} setNewChatUsers={setNewChatUsers} setMess={setMess} mess={mess} chatName={chatName} setChatName={setChatName} newChat={newChat}/>} />
      <Route path='/users/:login' element={<Account isLoading={isLoading} setNewChatUsers={setNewChatUsers} mess={mess} setMess={setMess} myUser={myUser} addSubscription={addSubscription} newChat={newChat}/>} />
      <Route path='/Friends' element={<Friends addSubscription={addSubscription}/>} />
      <Route path='/Messages/chat/:chatID' element={<Chat handleSendMess={handleSendMess}/>} />
      <Route path='/:topicID' element={<Topic />} />
      <Route path='/' element={<LoginForm toggle={toggle} setToggle={setToggle} toggleModal={toggleModal} Login={Login} login={login} setLogin={setLogin} setPassword={setPassword} password={password}/>} />
    </Routes>
  )
}
export default Content
