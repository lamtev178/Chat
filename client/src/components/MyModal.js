import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input} from 'reactstrap'
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
      alert('Ошибка',error.message);
    }
  }
  return(
    <Modal
    isOpen={toggle}
  >
    <ModalHeader >
      Регистрация
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