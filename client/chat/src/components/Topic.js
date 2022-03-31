import React from "react";
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {Form, Input, FormGroup, Label, Button} from 'reactstrap'
import { BiUser } from 'react-icons/bi';

function Topic() {
  const {topicID} = useParams() 
  const topic = useSelector(state => state.topics.filter(t => t._id === topicID))[0]
  const comments = useSelector(state => state.comments.filter(c => c.postId === topicID))
  function handleSubmitMessage(event){
    event.preventDefault()
    let date = (new Date() + "").split(' ')
    console.log(event.target[0].value);
    console.log(date[2], date[1], date[4].slice(0,5));
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