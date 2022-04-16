import React, {useContext} from 'react';
import {useSelector} from 'react-redux'
import {ThemeContext} from '../App'
import {Link} from 'react-router-dom'
import { BiUser } from 'react-icons/bi';

function Messages(){
  const chats = useSelector(state => state.chats) || []
  console.log(chats);
  const login = useSelector(state => state.isAuth.user.login) || []
  const {theme} = useContext(ThemeContext)
  return(
    <>
      <h1>Сообщения</h1>
      {chats.map(chat => {
        return(
          <Link to={`chat/${chat.chat}`} style={{textDecoration:'none'}} key={chat.chat}>
            <div className={theme ? "box-dark box-darkHover" : "box-light box-lightHover"}>
              {chat.users.map(user => {
                if(user === login)
                return 
                return(
                  <div className="messages" key={user}>
                    <h3 style={{display:"inline"}}>{ user===login ? null : user} </h3>
                  </div>
                )
              })}
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
            </div>
          </Link>
        )
      })}
      </>
  )
}
export default Messages