import React, {useContext, useState} from 'react'
import MyInput from './UI/Input/MyInput'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { BiChat } from 'react-icons/bi';
import MySider from './MySider'
import {ThemeContext} from '../App'

function Topics(){
  const [search, setSearch] = useState('')
  const {theme} = useContext(ThemeContext)
  const topics = useSelector(action => action.topics)
  const [topicsSorted, setTopicsSorted] = useState(topics)
  const comments = useSelector(action => action.comments)
  console.log(topicsSorted);
  function handeChange(e){
    setSearch(e.target.value)
    setTopicsSorted(topics.filter(t => t.title.toUpperCase().includes(e.target.value.toUpperCase())))
  }
  return(
    <>
      <MyInput dark={theme ? true : null} value={search} title="Поиск темы" onChange={handeChange} />
      {topicsSorted.map(topic => {
        return (
          <Link to={`/${topic._id}`} key={topic._id} style={{textDecoration:'none'}}>
            <div className={theme ? "box-dark box-darkHover" : "box-light box-lightHover"}>
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