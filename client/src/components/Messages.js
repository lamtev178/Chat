import React, {useContext, useState} from 'react';
import {useSelector} from 'react-redux'
import MyModal from './UI/Modal/MyModal'
import ModalHeader from './UI/Modal/ModalHeader'
import ModalFooter from './UI/Modal/ModalFooter'
import ModalBody from './UI/Modal/ModalBody'
import AddUsersToChat from './AddUsersToChat'
import {ThemeContext} from '../App'
import {Link} from 'react-router-dom'
import MyButton from './UI/Button/MyButton';
import MyInput from './UI/Input/MyInput'
import { BiUser } from 'react-icons/bi';

function Messages({chatName, setChatName, mess, setMess, setNewChatUsers, newChat, checkedState, handleChecked}){
  const [toggle, setToggle] = useState(false)
  const subs = useSelector(state => state.isAuth.user.subscriptions)
  const chats = useSelector(state => state.chats) || []
  const login = useSelector(state => state.isAuth.user.login) || []
  const {theme} = useContext(ThemeContext)
  return(
    <>
      <div className="justifyBetween">
        <h1>Сообщения</h1>
        <MyButton onClick={()=>setToggle(true)}>Создать беседу</MyButton>
      </div>
      {chats.length === 0 ? "У вас пока нет сообщений..." : chats.map(chat => {
        return(
          <Link to={`chat/${chat.chat}`} style={{textDecoration:'none'}} key={chat.chat}>
            <div className={theme ? "box-dark box-darkHover" : "box-light box-lightHover"}>
              <div className="messages">
                <h3 style={{display:"inline"}}>{ chat.chatName==='' ? chat.users[Number(!chat.users.indexOf(login))] : chat.chatName} </h3>
              </div>
              {chat.messages.length === 0 ? null :
              <div className={"comments-info " +
                (chat.messages[chat.messages.length - 1].isReaded ?
                "" :
                (theme ? "message-not-readed-dark" : "message-not-readed-light"))}
                style={{fontSize:'16px'}}
              >
                <p>
                  {chat.messages[chat.messages.length - 1].message}
                </p>
                <p>
                  <BiUser />{chat.messages[chat.messages.length - 1].author}
                </p>
                <p>{chat.messages[chat.messages.length - 1].date}</p>
              </div>
              }
            </div>
          </Link>
        )
      })}
      <MyModal
      toggle={toggle}>
        <ModalHeader onClick={() => setToggle(false)}>
          Создание беседы
        </ModalHeader>
        <ModalBody>
          <MyInput title="Название беседы" value={chatName} onChange={(e)=>setChatName(e.target.value)}/>
          <MyInput title="Сообщение" value={mess} onChange={(e)=>setMess(e.target.value)}/>
          <AddUsersToChat allSubs={subs} checkedState={checkedState} handleChecked={handleChecked}/>
        </ModalBody>
        <ModalFooter>
          <MyButton onClick={()=>newChat(checkedState)}>
            Создать
          </MyButton>
        </ModalFooter>
      </MyModal>
      </>
  )
}
export default Messages
