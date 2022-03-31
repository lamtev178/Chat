import React from 'react'
import {ListGroupItem, ListGroupItemHeading, ListGroupItemText, ListGroup} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { BiChat } from 'react-icons/bi';
import MySider from './MySider'

function Topics(){
  const dispatch = useDispatch()
  const topics = useSelector(action => action.topics)
  const comments = useSelector(action => action.comments)
  return(
    <div className='container'>
      <ListGroup>
        {topics.map(topic => {
          return(
          <Link to={`/${topic._id}`} key={topic._id} style={{textDecoration:'none'}}>
            <ListGroupItem>
              <ListGroupItemHeading>
                {topic.title}
              </ListGroupItemHeading>
              <ListGroupItemText>
                {topic.description}
              </ListGroupItemText>
              <div className='topic-info'>
                <p><BiChat />Обсуждения : {comments.filter(c => topic._id === c.postId).length}</p>
              </div>
            </ListGroupItem>
          </Link>
          )
        })}
      </ListGroup>
      <MySider />
    </div>
  )
}
export default Topics