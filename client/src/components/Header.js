import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import {NavLink} from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

function Header(){
  const login = useSelector(store => store.isAuth.login)
  const [navOpen, setNavOpen] = useState(false)
  const [search, setSearch] = useState('')
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
    </div>
  )
}
export default Header

