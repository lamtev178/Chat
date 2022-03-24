import React, {useState} from 'react'
import {Navbar, Nav, NavItem, Collapse, NavbarText, NavbarToggler, InputGroup, Input, Button} from 'reactstrap'
import {NavLink} from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

function Header(){
  const [navOpen, setNavOpen] = useState(false)
  return(
  <div className='container mb-5'>
  <Navbar
    color="light"
    expand="md"
    light
    style={{fontSize:'20px'}}
  >
    <NavbarToggler onClick={() => setNavOpen(!navOpen)} />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
      >
        <NavItem>
          <InputGroup>
            <Input type="search" className="form-control" placeholder="Search"/>
            <Button>
              <i className="bi bi-search"><FaSearch /></i>
            </Button>
          </InputGroup>
        </NavItem>
        <NavItem>
          <NavLink to="/">
            Темы
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/Messages">
            Сообщения
          </NavLink>
        </NavItem>
      </Nav>
      <NavbarText>
          <NavLink to="/">
            Профиль
          </NavLink>
      </NavbarText>
    </Collapse>
  </Navbar>
  </div>
  )
}
export default Header