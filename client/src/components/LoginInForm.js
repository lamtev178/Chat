import React, {useState} from 'react'
import MyInput from './UI/Input/MyInput'
import MyButton from './UI/Button/MyButton'
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal'
const axios = require('axios').default;

function LoginForm(){
  const dispatch= useDispatch()
  const [toggle, setToggle] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  async function Login(){
    try {
      console.log(login, password);
      const response = await axios.post('http://localhost:8000/auth/login', {
        login:login,
        password:password
      });
      console.log(response);
      dispatch({type:"LOGIN_IN", payload:response.data.login})
    } catch (error) {
      let err = ''
      error.response.data.message ? 
      alert(error.response.data.message) : 
      (error.response.data.errors.map(er => err += er.msg))
      alert(err)
    }
  }
  function toggleModal(){
    setToggle(!toggle)
  }
  return(
  <div className="Container Mt-5">
    <MyInput dark type='text' value={login} onChange={(e)=>{setLogin(e.target.value)}} title='Login'/>
    <MyInput dark type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} title='Password'/>
    <div style={{marginTop:'20px', display:'flex', justifyContent:'space-between'}}>
      <MyButton onClick={Login}>Login In</MyButton>
      <MyButton onClick={toggleModal}>Sign In</MyButton>
    </div>
    <Modal toggleModal={toggleModal} toggle={toggle} setToggle={setToggle}/>
  </div>
  )
}

export default LoginForm