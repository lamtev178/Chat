import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input} from 'reactstrap'
import { BiX } from 'react-icons/bi';
const axios = require('axios');

function MyModal({toggleModal, toggle}){
  async function registration(e){
    e.preventDefault();
    try {
    await axios.post('http://localhost:8000/auth/registration/',{
      login:e.target[1].value,
      email:e.target[0].value,
      password:e.target[2].value
    })
    toggleModal()
    alert('На вашу почту отправлено письмо с подтверждением')
    } catch (error) {
      let err = ''
      error.response.data.message ? 
      alert(error.response.data.message) : 
      (error.response.data.errors.map(er => err += er.msg))
      alert(err)
    }
  }
  return(
    <Modal
    isOpen={toggle}
  >
    <ModalHeader>
      Регистрация
      <BiX style={{height:'45px', width:'45px', cursor:'pointer', marginLeft:'300px'}} onClick={()=>toggleModal()}/>
    </ModalHeader>
    <Form onSubmit={registration}>
      <ModalBody>
          <FormGroup>
            <Label for="mail">
              mail
            </Label>
            <Input
              name="mail"
              placeholder="mail"
              type="mail"
            />
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
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          type="submit"
        >
          Sign In
        </Button>
      </ModalFooter>
    </Form>
  </Modal>
  )
}

export default MyModal