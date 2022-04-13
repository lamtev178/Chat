import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import Topics from './Topics'
import Messages from './Messages'
import Account from './Account'
import Friends from './Friends'
import Topic from './Topic'
import LoginForm from './LoginInForm'
import {Routes, Route} from 'react-router'
const axios = require('axios')

function Content(){
    const redirect = useNavigate()
  const dispatch= useDispatch()
  const [toggle, setToggle] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  async function Login(log, pass){
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        login: login ? login : log,
        password: password ? password : pass
      });
      console.log(response);
      localStorage.setItem('user', (login ? login : log) + ' ' + (password ? password : pass))
      redirect("/topics")
      dispatch({type:"LOGIN_IN", payload:response.data})
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
    console.log(login, subscription);
    try {
    const response = await axios.post('http://localhost:8000/auth/addsub',{
      login:login,
      subscription:subscription
    })
    console.log(response);
    } catch (error) {
        alert(error.response.data.message)
    }
  }
  return(
    <Routes>
      <Route path='/topics' element={<Topics />} />
      <Route path='/Messages' element={<Messages />} />
      <Route path='/users/:login' element={<Account addSubscription={addSubscription}/>} />
      <Route path='/Friends' element={<Friends addSubscription={addSubscription}/>} />
      <Route path='/:topicID' element={<Topic />} />
      <Route path='/' element={<LoginForm toggle={toggle} setToggle={setToggle} toggleModal={toggleModal} Login={Login} login={login} setLogin={setLogin} setPassword={setPassword} password={password}/>} />
    </Routes>
  )
}
export default Content