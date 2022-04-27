import React, {useContext, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {sendMess, messReaded} from '../redux/ActionCreator'
import {ThemeContext} from '../App'
import {useParams} from 'react-router-dom';
import MyInput from './UI/Input/MyInput';
import MyButton from './UI/Button/MyButton';
import { BiUser } from 'react-icons/bi';
const axios = require('axios')

function Chat({handleSendMess}){
  const dispatch = useDispatch()
  const {chatID} = useParams()
  const [message, setMessage] = useState('')
  const chat = useSelector(state => state.chats.find((ch) => ch.chat === chatID)) || []
  const {theme} = useContext(ThemeContext)
  async function hanleSubmit(){
    dispatch(sendMess(message, chatID, handleSendMess))
    setMessage('')
  }
  useEffect(async()=>{
    document.documentElement.scrollIntoView(false)
    dispatch(messReaded(chatID))
  },[])
  return(
    <div className="chat">
      {chat.length === 0 ? null : chat.messages.map(mess => {
        return(
          <>
        <div className={theme ? "box-dark" : "box-light"} style={{padding:'10px'}} key={mess._id}>
          <p style={{wordBreak: "break-all", fontSize:'20px', marginBottom:"0"}} className={(mess.isReaded ? "" :
            (theme ? "message-not-readed-dark" : "message-not-readed-light"))}>{mess.message}</p>
        </div>
        <div className="comments-info" style={{fontSize:'16px'}}>
          <p>
            <BiUser />{mess.author}
          </p>
          <p>{mess.date}</p>
        </div>
        </>
        )})
      }
      <div className="justifyBetween sendMessForm">
        <MyInput onChange={e => setMessage(e.target.value)} value={message}/>
        <MyButton onClick={hanleSubmit} style={{marginLeft:"15px"}}>Отправить</MyButton>
      </div>
    </div>
  )
}

export default Chat
