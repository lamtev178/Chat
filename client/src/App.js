import './App.scss';
import React, {useState} from 'react'
import Main from './components/Main'
export const ThemeContext = React.createContext()

function App() {
  const [theme, setTheme] = useState(false)
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div className={(theme ? 'app' : "ligth")}>
        <Main />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
