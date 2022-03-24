import React, {useState} from 'react'
import {ListGroupItem, ListGroupItemHeading, ListGroupItemText, ListGroup} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

function Topics(){
  const dispatch = useDispatch()
  const topic = useSelector(state => state.topics)
  const [topics, setTopics] = useState(topic)
  return(
    <div className='container'>
      <ListGroup>
        {topics.map(topic => {
          return(
          <Link to={`/${topic.id}`} key={topic.id} style={{textDecoration:'none'}}>
            <ListGroupItem>
              <ListGroupItemHeading>
                {topic.title}
              </ListGroupItemHeading>
              <ListGroupItemText>
                {topic.description}
              </ListGroupItemText>
            </ListGroupItem>
          </Link>
          )
        })}
      </ListGroup>
    </div>
  )
}
export default Topics