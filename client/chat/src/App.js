import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/LoginInForm'
import Main from './components/Main'


function App() {
  const dispatch= useDispatch()
  const isAuth = useSelector(state => state.isAuth)
  function onSubmit(e){
    e.preventDefault()
    console.log(e.target[0].value, e.target[1].value);
  }
  return (
    <>
      {isAuth.isAuth ? <Main /> : <LoginForm onSubmit={() => dispatch({type:"LOGIN_IN"}) }/>}
    </>
  );
}

export default App;
