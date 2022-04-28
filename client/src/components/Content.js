import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {getChats, loginAuth, createChat,createSub} from '../redux/ActionCreator'
import Topics from './Topics'
import Chat from './Chat'
import Messages from './Messages'
import Account from './Account'
import Friends from './Friends'
import Topic from './Topic'
import LoginForm from './LoginInForm'
import {Routes, Route} from 'react-router'

function Content({handleSendMess}){
  const redirect = useNavigate()
  const dispatch= useDispatch()

  const [toggle, setToggle] = useState(false)
  const [mess, setMess] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [chatName, setChatName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const myUser = useSelector(state => state.isAuth.user)
  const [checkedState, setCheckedState] = useState(
    new Array(myUser.subscriptions.length).fill(false)
  )
  useEffect(()=>setCheckedState(new Array(myUser.subscriptions.length).fill(false)),[myUser])

  async function newChat(users){
    dispatch(createChat(users, mess, chatName, redirect, myUser, setToggle))
    setMess('')
    setCheckedState(new Array(myUser.subscriptions.length).fill(false))
    setChatName('')
  }
  async function Login(log, pass){
    dispatch(loginAuth(log, pass, redirect, login, password))
    setLogin('')
    setPassword('')
    dispatch(getChats())
  }
  useEffect(()=>{
    if(localStorage.user){
      Login(localStorage.user.split(' ')[0], localStorage.user.split(' ')[1])
    }
  }, [])
  function toggleModal(){
    setToggle(!toggle)
  }
  const handleChecked = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  }
  async function addSubscription({login, subscription}){
    dispatch(createSub(login, subscription, setIsLoading))
  }
  return(
    <Routes>
      <Route path='/topics' element={<Topics />} />
      <Route path='/Messages' element={<Messages checkedState={checkedState} handleChecked={handleChecked} isLoading={isLoading} setMess={setMess} mess={mess} chatName={chatName} setChatName={setChatName} newChat={newChat}/>} />
      <Route path='/users/:login' element={<Account isLoading={isLoading} mess={mess} setMess={setMess} myUser={myUser} addSubscription={addSubscription} newChat={newChat}/>} />
      <Route path='/Friends' element={<Friends addSubscription={addSubscription}/>} />
      <Route path='/Messages/chat/:chatID' element={<Chat handleSendMess={handleSendMess} handleChecked={handleChecked} checkedState={checkedState}/>}/>
      <Route path='/:topicID' element={<Topic />} />
      <Route path='/' element={<LoginForm toggle={toggle} setToggle={setToggle} toggleModal={toggleModal} Login={Login} login={login} setLogin={setLogin} setPassword={setPassword} password={password}/>} />
    </Routes>
  )
}
export default Content
