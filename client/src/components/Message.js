import React, {useContext} from 'react';
import {ThemeContext} from '../App'
import { BiUser } from 'react-icons/bi';

function Message({mess}){
  const {theme} = useContext(ThemeContext)
  return(
    <>
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
    </>
  )
}

export default Message
