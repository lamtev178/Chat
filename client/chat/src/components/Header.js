import React, {useState} from 'react'
import {Navbar, Nav, NavItem, NavLink, Collapse, NavbarText, NavbarToggler, InputGroup, Input, Button} from 'reactstrap'
import { FaSearch } from 'react-icons/fa';

function Header(){
  const [navOpen, setNavOpen] = useState(false)
  return(
  <div className='container'>
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
          <NavLink href="/components/">
            Темы
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/reactstrap/reactstrap">
            Сообщения
          </NavLink>
        </NavItem>
      </Nav>
      <NavbarText>
          <NavLink href="https://github.com/reactstrap/reactstrap">
            Профиль
          </NavLink>
      </NavbarText>
    </Collapse>
  </Navbar>
  </div>
  )
}
export default Header