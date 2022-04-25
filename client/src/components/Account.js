import React, {useContext, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import MyButton from './UI/Button/MyButton'
import MyInput from './UI/Input/MyInput'
import MyModal from './UI/Modal/MyModal'
import ModalHeader from './UI/Modal/ModalHeader'
import ModalFooter from './UI/Modal/ModalFooter'
import ModalBody from './UI/Modal/ModalBody'
import {ThemeContext} from '../App'
const axios = require('axios')

function Account({addSubscription, newChat, myUser, mess, setMess, setNewChatUsers}){
  const {theme} = useContext(ThemeContext)

  const dispatch = useDispatch()

  const [toggle, setToggle] = useState(false)

  const redirect = useNavigate()

  const {login} = useParams()
  setNewChatUsers(login)

  const chats = useSelector(state => state.chats) || []
  const comments = useSelector(state => state.comments)
  const user = useSelector(state => state.users.filter( user => user.login===login)[0]) || []

  async function newMessage(){
    let isExists = false
    chats.forEach(ch => {
      if(ch.users.length>2)
        return false
      if(ch.users.includes(myUser.login)&&ch.users.includes(user.login))
        isExists = ch
      return false
    })
    if(isExists)
      redirect(`/Messages/chat/${isExists.chat}`)
    else
      setToggle(true)
  }
  return(
      <div className={theme ? "box-dark" : "box-light"}>
        <div className="justifyBetween">
          <h1>Личная информация</h1>
          {((myUser.login === user.login) ||  (myUser.subscriptions.indexOf(user.login) > -1)) ? null :
            <MyButton onClick={() => addSubscription({login : myUser.login, subscription: user.login})}>
              Подписаться
            </MyButton>
          }
          { myUser.login === user.login ? null :
            <MyButton onClick={newMessage}>
              Написать сообщение
            </MyButton>
          }
        </div>
        <h3>login : {user.login}</h3>
        <h3>Комментарии : {comments.filter(c => c.author === user.login).length}</h3>
        <h3>Подписки : {user.subscriptions === undefined ? null : (user.subscriptions.length === 0 ? "Подписок нет" :
            user.subscriptions.length
        )}
        </h3>
        <MyModal toggle={toggle} >
          <ModalHeader onClick={() => setToggle(false)}>
            <h1>Написать сообщение {user.login}</h1>
          </ModalHeader>
          <ModalBody>
            <MyInput value={mess} type='text' onChange={e => setMess(e.target.value)} title='Сообщение'/>
          </ModalBody>
          <ModalFooter>
            <MyButton onClick={newChat}>Написать</MyButton>
          </ModalFooter>
        </MyModal>
      </div>
  )
}
export default Account
