import './App.scss';
import React from 'react'
import { useSelector } from 'react-redux';
import LoginForm from './components/LoginInForm'
import Main from './components/Main'

function App() {
  const isAuth = useSelector(state => state.isAuth)
  return (
    <>
      {isAuth.isAuth ? <Main /> : <LoginForm />}
    </>
  );
}

export default App;
