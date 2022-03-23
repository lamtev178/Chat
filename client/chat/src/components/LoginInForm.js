import React from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'

function LoginForm({onSubmit}){
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
      {/* <Button className='ms-3' color='primary' onClick={sub}>
        Sign In
      </Button> */}
    </Form>
  </div>
  )
}

export default LoginForm