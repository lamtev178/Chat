import React from 'react'
import {ListGroupItem, ListGroupItemHeading, ListGroupItemText, ListGroup, Button, Offcanvas, OffcanvasHeader, OffcanvasBody} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { BiChat } from 'react-icons/bi';
import MySider from './MySider'

function Topics(){
  const dispatch = useDispatch()
  const topic = useSelector(state => state.topics)
  return(
    <div className='container'>
      <ListGroup>
        {topic.map(topic => {
          return(
          <Link to={`/${topic.id}`} key={topic.id} style={{textDecoration:'none'}}>
            <ListGroupItem>
              <ListGroupItemHeading>
                {topic.title}
              </ListGroupItemHeading>
              <ListGroupItemText>
                {topic.description}
              </ListGroupItemText>
              <div className='topic-info'>
                <p>
                    <BiChat />Обсуждения : {topic.commentsList.length}</p>
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