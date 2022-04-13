import React, {useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ChangeTheme from './ChangeTheme';
import {NavLink, useNavigate} from "react-router-dom";
import { BiExit } from 'react-icons/bi';
import {ThemeContext} from '../App'

function Header(){
  const redirect = useNavigate()
  const isAuth = useSelector(state => state.isAuth.isAuth)
  const {theme, setTheme} = useContext(ThemeContext)
  const login = useSelector(state => state.isAuth.user.login)
  const dispatch = useDispatch()
  function handleExit(){
    localStorage.user=''
    dispatch({type:"LOGIN_OUT"})
    redirect("/")
  }
  function handleTheme(){
    setTheme(!theme)
  }
  return(
  <div className={"navHeader " + (theme ? '' : "navHeaderLight")}>
    <nav className='Container Mb-5'>
      <NavLink to="/topics">
        Темы
      </NavLink>
      {isAuth ? 
      <>
        <NavLink to="/Messages">
          Сообщения
        </NavLink>      
        <NavLink to="/Friends">
          Подписки
        </NavLink>
        <NavLink to={`/users/${login}`}>
          Личный кабинет
        </NavLink>
      </> 
      :
        <NavLink to="/">
          Вход/Регистрация
        </NavLink>
      }
    </nav>
      <ChangeTheme theme={theme} handleTheme={handleTheme}/>
      {isAuth ? 
      <BiExit 
        onClick={handleExit} 
        className="box-darkHover" 
        style ={{fontSize:"35px", position: "absolute", right: "30px", top:"20px", cursor: "pointer", color: "white"}}
        />
        :
        null}
  </div>
  )
}
export default Header

