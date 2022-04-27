import React, {useContext, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {sendMess, messReaded, delUser} from '../redux/ActionCreator'
import {ThemeContext} from '../App'
import {useParams, useNavigate} from 'react-router-dom';
import MyInput from './UI/Input/MyInput';
import MyButton from './UI/Button/MyButton';
import Loader from './Loader'
import MyModal from './UI/Modal/MyModal';
import ModalBody from './UI/Modal/ModalBody';
import ModalHeader from './UI/Modal/ModalHeader'
import { BiUser, BiInfoCircle, BiX } from 'react-icons/bi';

function Chat({handleSendMess}){
  const dispatch = useDispatch()
  const redirect = useNavigate()
  const {chatID} = useParams()
  const [toggle, setToggle] = useState(false)
  const [message, setMessage] = useState('')
  const chat = useSelector(state => state.chats.find((ch) => ch.chat === chatID)) || []
  const login = useSelector(state => state.isAuth.user.login) || []
  const [isLoading, setIsLoading] = useState(
    new Array(chat.users.length).fill(false)
)
  useEffect(()=>{
    setIsLoading(
      new Array(chat.users.length).fill(false)
    )
  },[chat])
  const {theme} = useContext(ThemeContext)
  async function hanleSubmit(){
    dispatch(sendMess(message, chatID, handleSendMess))
    setMessage('')
  }
  function delUserFromChat(user, index){
    const newLoading = isLoading.map((l, position) =>
      position === index ? !l : l
    )
    setIsLoading(newLoading)
    dispatch(delUser(chat.chat, user, redirect))
    const finishLoading = isLoading.map((l, position) =>
      position === index ? !l : l
    )
    setIsLoading(finishLoading)
  }
  useEffect(async()=>{
    document.documentElement.scrollIntoView(false)
    dispatch(messReaded(chatID))
  },[])
  return(
    <>
      <div className={!theme ? "chat-ligth" : "chat-dark"}>
        <div className={"justifyBetween " + (!theme ? "chat-header-ligth" : "chat-header-dark")}>
          <h2>{chat.chatName.length > 0 ? chat.chatName : chat.users[Number(!chat.users.indexOf(login))]}</h2>
          <BiInfoCircle style={{width:"28px", height:"28px", cursor:"pointer"}} onClick={()=>setToggle(true)}/>
        </div>
        {chat.length === 0 ? null : chat.messages.map(mess => {
          return(
            <div key={mess._id}>
              <div className={theme ? "box-dark" : "box-light"} style={{padding:'10px'}} >
                <p style={{wordBreak: "break-all", fontSize:'20px', marginBottom:"0"}} className={(mess.isReaded ? "" :
                  (theme ? "message-not-readed-dark" : "message-not-readed-light"))}>{mess.message}</p>
              </div>
              <div className="comments-info" style={{fontSize:'16px'}} >
                <p>
                  <BiUser />{mess.author}
                </p>
                <p>{mess.date}</p>
              </div>
            </div>
          )})
        }
        <div className={"justifyBetween " + (!theme ?  "sendMessForm" : "sendMessForm-dark")}>
          <MyInput onChange={e => setMessage(e.target.value)} value={message}/>
          <MyButton onClick={hanleSubmit} style={{marginLeft:"15px"}}>Отправить</MyButton>
        </div>
      </div>
      <MyModal toggle={toggle}>
      <ModalHeader onClick={() => setToggle(false)}>
        Участники
      </ModalHeader>
      <ModalBody>
        <div className="users-list">
          {chat.users.map( (user, index) => {
            return(
              <div className="justifyBetween" key={user}>
                <h3>
                  {user}
                </h3>
                {
                  isLoading[index] ? <Loader style={{margin:"0", padding:"0 15px 0 0"}}/> :
                  <BiX
                    onClick={() => delUserFromChat(user, index)}
                    style={{marginRight:"20px", cursor:"pointer"}}
                  />
                }
              </div>
            )
          })}
        </div>
      </ModalBody>
      </MyModal>
    </>
  )
}

export default Chat
