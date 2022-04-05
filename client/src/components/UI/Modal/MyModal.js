import React from 'react'
import MyButton from '../Button/MyButton'
import MyInput from '../Input/MyInput'
import classes from './MyModal.module.css'
import { BiX } from 'react-icons/bi';

function MyModal({registration, login, password, mail, setLogin, setPassword, setMail, toggle, setToggle}){
  return(
    <>
    <div className={classes.modal + ' ' + (toggle ? classes.active : '')} >
      <div className={classes.modalContent}>
        <div className={classes.modalHeader}>
          <h1>Регистрация</h1>
          <BiX style={{height:'30px', width:'30px', cursor: 'pointer'}} onClick={() => setToggle(false)}/>
        </div>
        <div className={classes.modalBody}>
          <MyInput value={login} type='text' onChange={e => setLogin(e.target.value)} title='login'/>
          <MyInput value={password} type='password' onChange={e => setPassword(e.target.value)} title='password'/>
          <MyInput value={mail} type='text' onChange={e => setMail(e.target.value)} title='mail'/>
        </div>
        <div className={classes.modalFooter}>
        <MyButton onClick={registration}>Sign in</MyButton>
        </div>
      </div>
    </div>
    <div className={classes.modalBackdrop + ' ' + (toggle ? classes.active : '')} ></div>
    </>
  )
}

export default MyModal