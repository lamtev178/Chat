import React from "react";
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {Form, Input, FormGroup, Label, Button} from 'reactstrap'
import { BiUser } from 'react-icons/bi';
const axios = require('axios').default;

function Topic() {
  const dispatch = useDispatch()
  const {topicID} = useParams() 
  const topic = useSelector(state => state.topics.filter(t => t._id === topicID))[0]
  const comments = useSelector(state => state.comments.filter(c => c.postId === topicID))
  const login = useSelector(state => state.isAuth.login)

  async function handleSubmitMessage(event){
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/alltopics/comment', {
        author:login,
        postId:topicID,
        message:event.target[0].value
      });
      console.log(response);
      dispatch({type:"POST_COMMENTS", payload:{author:login, postId:topicID, message:event.target[0].value, _id:response.data.data._id}})
    } catch (error) {
      alert('Ошибка',error.message);
    }
  }

  return (
    <div className="mt-5">
      <h1>
        {topic.title}
      </h1><hr style={{margin:"20px 40px"}}/>
      <h4>
        {topic.description}
      </h4>
      {comments.map( comment => {
        return(
        <div key={comment._id} className="comments">
          <p>{comment.message}</p>
          <div className="comments-info">
            <p>
              <BiUser />{comment.author}</p>
            {/* <p>{comment.date}</p> */}
          </div>
        </div>
        )
    })}
      <Form onSubmit={handleSubmitMessage} style={{paddingTop:'50px'}}>
        <FormGroup>
          <Label for="message">
            Ваш комментарий
          </Label>
          <Input
            style={{height:'200px'}}
            name="message"
            placeholder="Message"
            type='textarea'
          />
        </FormGroup>
        <Button color='primary'>
          Отправить
        </Button>
      </Form>
    </div>
  );
}

export default Topic; 