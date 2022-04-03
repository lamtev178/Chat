import React, {useState} from "react";
import {Button, Offcanvas, OffcanvasHeader, OffcanvasBody, Form, Input, Label, FormGroup} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { BiX } from 'react-icons/bi';
const axios = require('axios').default;

function MySider(){
  const dispatch = useDispatch()
  const author = useSelector(state => state.isAuth.login)
  console.log(author);
  const [toggleSider,setToggleSider] = useState(false)
  async function handleSubmitTopic(event){
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/alltopics/topic',{
        title: event.target[0].value,
        description: event.target[1].value,
        author: author
      })
      console.log(response);
      dispatch({type:"POST_TOPICS", payload: {title:event.target[0].value, description: event.target[1].value, author: author, _id:response.data.data._id}})
      setToggleSider(false)
    }
    catch (error) {
      alert('Ошибка',error.message);
    }

  }
  return(
    <div>
      <Button
        color="primary"
        onClick={()=>setToggleSider(!toggleSider)}
        style={{position:'fixed',bottom:'50px',right:'30px'}}
      >
        Создать тему
      </Button>
      <Offcanvas isOpen={toggleSider}>
        <OffcanvasHeader >
          Ваше обсуждение
          <BiX style={{height:'45px', width:'45px', marginLeft:'145px', cursor:'pointer'}} onClick={()=>setToggleSider(false)}/>
      </OffcanvasHeader>
      <OffcanvasBody>
        <Form onSubmit={handleSubmitTopic} style={{paddingTop:'50px'}}>
          <FormGroup>
            <Label for="topic">
              Ваша тема
            </Label>
            <Input
              name="topic"
              placeholder="Topic"
            />            
            <Label for="description" style={{paddingTop:'20px'}}>
              Описание
            </Label>
            <Input
              style={{height:'200px', paddingTop:'20px'}}
              name="description"
              placeholder="Description"
              type='textarea'
            />
          </FormGroup>
          <Button color='primary'>
            Отправить
          </Button>
        </Form>
      </OffcanvasBody>
    </Offcanvas>
  </div>
  )
}

export default MySider