import React from 'react'
import MyInput from './UI/Input/MyInput'
import MyButton from './UI/Button/MyButton'
import Modal from './Modal'

function LoginForm({toggle, setToggle, toggleModal, Login, login, password, setPassword, setLogin}){

  return(
  <div className="Container">
    <MyInput style={{width:"80%", margin: "auto", marginBottom:"5px"}} dark type='text' value={login} onChange={(e)=>{setLogin(e.target.value)}} title='Login'/>
    <MyInput style={{width:"80%", margin:"auto"}} dark type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} title='Password'/>
    <div className="loginFormButtons">
      <MyButton onClick={Login}>Login In</MyButton>
      <MyButton onClick={toggleModal}>Sign In</MyButton>
    </div>
    <Modal toggleModal={toggleModal} toggle={toggle} setToggle={setToggle} />
  </div>
  )
}

export default LoginForm
