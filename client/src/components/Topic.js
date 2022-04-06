import React, {useState, useContext} from "react";
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import MyInput from './UI/Input/MyInput'
import MyButton from './UI/Button/MyButton'
import { BiUser } from 'react-icons/bi';
import {ThemeContext} from '../App'
const axios = require('axios').default;

function Topic() {
  const {theme} = useContext(ThemeContext)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const {topicID} = useParams() 
  const topic = useSelector(state => state.topics.filter(t => t._id === topicID))[0]
  const comments = useSelector(state => state.comments.filter(c => c.postId === topicID))
  const login = useSelector(state => state.isAuth.user.login)
  async function handleSubmitMessage(event){
    event.preventDefault()
    try {
      let date = (new Date() + "").split(' ')
      date = date[2] + " " + date[1] + " " + date[4].slice(0,5)
      console.log(date);
      const response = await axios.post('http://localhost:8000/alltopics/comment', {
        author:login,
        postId:topicID,
        message:comment,
        date : date
      });
      console.log(response);
      dispatch({type:"POST_COMMENTS", payload:{author:login, postId:topicID, message:comment, _id:response.data.data._id, date:date}})
    } catch (error) {
      alert('Ошибка',error.message);
    }
    setComment('')
  }
  return (
    <div className="Mt-5">
      <h1>
        {topic.title}
      </h1><hr style={{margin:"20px 40px"}}/>
      <h4>
        {topic.description}
      </h4>
      {comments.map( comment => {
        return(
          <div key={comment._id} className={theme ? "box-dark" : "box-light"}>
            <p style={{wordBreak: "break-all", fontSize:'20px'}}>{comment.message}</p>
            <div className="comments-info">
              <p>
                <BiUser />{comment.author}
              </p>
              <p>{comment.date}</p>
            </div>
          </div>
        )
    })}
    <MyInput dark={theme ? true : null} textarea value={comment} style={{height:'250px'}} title='Ваш комментарий' onChange={e => setComment(e.target.value)} />
    <MyButton onClick={handleSubmitMessage} style={{marginTop:'30px'}}>Отправить</MyButton>
    </div>
  );
}

export default Topic; 