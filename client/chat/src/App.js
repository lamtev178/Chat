import './App.css';
import LoginForm from './components/LoginInForm'
import Main from './components/Main'


function App() {
  function onSubmit(e){
    e.preventDefault()
    console.log(e.target[0].value, e.target[1].value);
  }
  return (
    <>
    {true ? <Main /> : <LoginForm onSubmit={onSubmit}/>}
    </>
  );
}

export default App;
