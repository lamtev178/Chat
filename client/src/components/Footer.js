import React, {useContext} from 'react'
import {Row, Col} from 'reactstrap'
import {BsInstagram, BsSkype, BsTwitter, BsFacebook} from 'react-icons/bs'
import {IoLogoGithub} from 'react-icons/io'
import {ThemeContext} from '../App'

function Footer(){
  const {theme} = useContext(ThemeContext)
  return(
  <div className={"mt-5 " + (theme? "footer" : "footerLight")}>
    <Row style={{color:"white", paddingTop:"40px", margin:'auto'}}>
      <Col>
        <h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
          <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z"/>
          </svg>
          All rights reserved</h3>
      </Col>
      <Col>
        <h3>Contact us :</h3>
        <a href="https://github.com/lamtev178" style={{fontSize:'26px', marginTop:'30px', marginLeft:'10px', display: 'inline-block'}}><IoLogoGithub />lamtev178</a>
        <h3 style={{fontSize:'26px', marginTop:'30px', marginLeft:'10px'}}>lamtev2000@gmail.com</h3>
      </Col>
      <Col>
        <a href="https://www.instagram.com/"><h4><BsInstagram style={{marginRight:'5px'}} />instagram</h4></a>
        <a href="https://www.twitter.com/"><h4><BsTwitter style={{marginRight:'5px'}} />twitter</h4></a>
        <a href="https://www.skype.com/"><h4><BsSkype style={{marginRight:'5px'}} />skype</h4></a>
        <a href="https://www.facebook.com/"><h4><BsFacebook style={{marginRight:'5px'}} />facebook</h4></a>
      </Col>
    </Row>
    </div>
  )
}
export default Footer