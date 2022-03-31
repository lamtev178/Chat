import React, {useState} from "react";
import {Button, Offcanvas, OffcanvasHeader, OffcanvasBody, Form, Input, Label, FormGroup} from 'reactstrap'
import { BiX } from 'react-icons/bi';

function MySider(){
  const [toggleSider,setToggleSider] = useState(false)
  function handleSubmitTopic(event){
    event.preventDefault()
    console.log(event.target[0].value, event.target[1].value);
    setToggleSider(false)
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