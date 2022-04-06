import './App.scss';
import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import LoginForm from './components/LoginInForm'
import Main from './components/Main'
export const ThemeContext = React.createContext()

function App() {
  const [theme, setTheme] = useState(true)
  const isAuth = useSelector(state => state.isAuth)
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div className={(theme ? 'app' : "ligth")}>
        {isAuth.isAuth ? <Main /> : <LoginForm />}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
