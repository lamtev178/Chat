import React, {useState} from 'react'
import {ListGroupItem, ListGroupItemHeading, ListGroupItemText, ListGroup} from 'reactstrap'
import {Link} from 'react-router-dom'

function Topics(){
  const [topics, setTopics] = useState([
    {id:1, score:4 , title:"Ситуация на украине", description:"Здесь будет актуальная информация о ситуации на украине"},
    {id:2, score:14 , title:"Фондовый рынок", description:"Когда откроют российскую биржу?))))"},
    {id:3, score:24 , title:"Мемы", description:"Лол, кек"},
    {id:4, score:41 , title:"Помощь студентам", description:"Помогите молодым"},
  ])
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