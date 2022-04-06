import React, {useState, useContext} from 'react'
import { useDispatch } from 'react-redux';
import {NavLink} from "react-router-dom";
import { BiExit } from 'react-icons/bi';
import {ThemeContext} from '../App'

function Header(){
  const {theme, setTheme} = useContext(ThemeContext)
  const dispatch = useDispatch()
  const [navOpen, setNavOpen] = useState(false)
  const [search, setSearch] = useState('')
  function handleExit(){
    localStorage.user=''
    dispatch({type:"LOGIN_OUT"})
  }
  function handleTheme(){
    setTheme(!theme)
  }
  console.log(theme);
  return(
  <div className={"navHeader " + (theme ? '' : "navHeaderLight")}>
    <nav className='Container Mb-5'>
      <NavLink to="/">
        Темы
      </NavLink>
      <NavLink to="/Messages">
        Сообщения
      </NavLink>      
      <NavLink to="/Friends">
        Подписки
      </NavLink>
      <NavLink to="/Account">
        Личный кабинет
      </NavLink>
    </nav>
      <div className="toggle "  onClick={handleTheme}>
        <div className="toggleTrack">
          <div className="toggleTrackCheck">
            <span className="toggleIcon">🌞</span>
          </div>
          <div className="toggleTrackX">
            <span className="toggleIcon">🌜</span>
          </div>
          <div className={"toggleTrackThumb " + (theme ? null : "toggleTrackThumbActive")}/>
        </div>
      </div>
      <BiExit onClick={handleExit} className="box-darkHover" style ={{fontSize:"35px", position: "absolute", right: "30px", top:"20px", cursor: "pointer", color: "white"}}/>
  </div>
  )
}
export default Header

