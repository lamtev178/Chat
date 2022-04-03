import React, {useState} from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import MyModal from './MyModal'

function LoginForm({onSubmit}){
  const [toggle, setToggle] = useState(false)
  function toggleModal(){
    setToggle(!toggle)
  }
  return(
  <div className='container mt-5'>
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="login">
          login
        </Label>
        <Input
          name="login"
          placeholder="login"
          type="login"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Password">
          Password
        </Label>
        <Input
          name="password"
          placeholder="password"
          type="password"
        />
      </FormGroup>
      <Button color='primary' type='submit'>
        Login In
      </Button>
      <Button className='ms-3' color='primary' onClick={toggleModal}>
        Sign In
      </Button>
    </Form>
    <MyModal toggleModal={toggleModal} toggle={toggle}/>
  </div>
  )
}

export default LoginForm