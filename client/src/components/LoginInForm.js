import React from 'react'
import MyInput from './UI/Input/MyInput'
import MyButton from './UI/Button/MyButton'
import Modal from './Modal'

function LoginForm({toggle, setToggle, toggleModal, Login, login, password, setPassword, setLogin}){

  return(
  <div className="Container">
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