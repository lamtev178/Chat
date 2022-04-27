import React, {useContext, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
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
    let date = (new Date() + "").split(' ')
    date = date[2] + " " + date[1] + " " + date[4].slice(0,5)
    try{
      const  response = await axios.post('http://localhost:8000/messenger/message', {
          message: {
            message: message,
            date: date
          },
          chat: chatID
        },{headers: { "Authorization": 'Bearer '+localStorage.getItem('Token') }});
        console.log(response.data.data);
        dispatch({type: "POST_MESSAGE", payload: {data : response.data.data}})
    } catch (error) {
      alert(error.response.data.message)
    }
    handleSendMess({
          message: {
            message: message,
            date: date
          },
          chat: chatID})
    setMessage('')
  }
  useEffect(async()=>{
    document.documentElement.scrollIntoView(false)
    try{
    const response = await axios.post('http://localhost:8000/messenger/messageIsReaded',{
      chatId:chatID
    },{headers: { "Authorization": 'Bearer '+localStorage.getItem('Token') }})
    console.log(response);
    dispatch({type: "MESS_IS_READED", payload: {data : response.data.data}})
  } catch (error) {
    alert(error.response.data.message)
  }
  },[])
  return(
    <div className="chat">
      {chat.length == 0 ? null : chat.messages.map(mess => {
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
