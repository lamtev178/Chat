import React, {useState} from 'react';
import MyButton from './UI/Button/MyButton'
import MyInput from './UI/Input/MyInput'
import MyModal from './UI/Modal/MyModal'
import ModalHeader from './UI/Modal/ModalHeader'
import ModalFooter from './UI/Modal/ModalFooter'
import ModalBody from './UI/Modal/ModalBody'
const axios = require('axios');

function Modal({toggleModal, toggle, setToggle}){
  const [login, setLogin] = useState('') 
  const [mail, setMail] = useState('') 
  const [password, setPassword] = useState('') 
  console.log(login, mail, password);
  async function registration(e){
    e.preventDefault();
    try {
    await axios.post('http://localhost:8000/auth/registration/',{
      login:login,
      email:mail,
      password:password
    })
    toggleModal()
    alert('На вашу почту отправлено письмо с подтверждением')
    } catch (error) {
      let err = ''
      error.response.data.message ? 
      alert(error.response.data.message) : 
      (error.response.data.errors.map(er => err += er.msg))
      alert(err)
    }
  }
  return(
    <MyModal 
      toggle={toggle} 
    >
      <ModalHeader onClick={() => setToggle(false)}>
        <h1>Регистрация</h1>
      </ModalHeader>
      <ModalBody>
        <MyInput value={login} type='text' onChange={e => setLogin(e.target.value)} title='login'/>
        <MyInput value={password} type='password' onChange={e => setPassword(e.target.value)} title='password'/>
        <MyInput value={mail} type='text' onChange={e => setMail(e.target.value)} title='mail'/>
      </ModalBody>
      <ModalFooter>
        <MyButton onClick={registration}>Sign in</MyButton>
      </ModalFooter>
    </MyModal>
  )
}

export default Modal