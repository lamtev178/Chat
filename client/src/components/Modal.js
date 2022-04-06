import React, {useState} from 'react';
import MyModal from './UI/Modal/MyModal'
const axios = require('axios');

function Modal({toggleModal, toggle, setToggle}){
  const [login, setLogin] = useState('') 
  const [mail, setMail] = useState('') 
  const [password, setPassword] = useState('') 
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
    <MyModal login={login} setLogin={setLogin} setMail={setMail} setPassword={setPassword} mail={mail} password={password}  registration={registration} toggle={toggle} setToggle={setToggle}/>
  )
}

export default Modal