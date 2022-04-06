import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {NavLink} from "react-router-dom";
import { BiExit } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';

function Header(){
  const dispatch = useDispatch()
  const [navOpen, setNavOpen] = useState(false)
  const [search, setSearch] = useState('')
  function handleExit(){
    localStorage.user=''
    dispatch({type:"LOGIN_OUT"})
  }

  return(
  <div className="navHeader">
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
    <BiExit onClick={handleExit} className="topicDark" style ={{fontSize:"35px", position: "absolute", right: "30px", top:"30px", cursor: "pointer"}}/>
  </div>
  )
}
export default Header

