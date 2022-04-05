import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { BiChat } from 'react-icons/bi';
import MySider from './MySider'

function Topics(){
  const topics = useSelector(action => action.topics)
  const comments = useSelector(action => action.comments)
  return(
    <>
      {topics.map(topic => {
        return (
          <Link to={`/${topic._id}`} key={topic._id} style={{textDecoration:'none'}}>
            <div className="topic topicDark">
              <h3>{topic.title}</h3>
              <div className="comments-info">
                <p style={{wordBreak: "break-all"}}>{topic.description}</p>
                <p style={{minWidth:'180px'}}><BiChat />Обсуждения : {comments.filter(c => topic._id === c.postId).length}</p>
              </div>  
            </div>
          </Link>
        )
      })}
      <MySider />
    </>
  )
}
export default Topics