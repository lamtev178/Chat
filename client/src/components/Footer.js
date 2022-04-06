import React, {useContext} from 'react'
import {Row, Col} from 'reactstrap'
import {BsInstagram, BsSkype, BsTwitter, BsFacebook, BsFileEarmarkText} from 'react-icons/bs'
import {IoLogoGithub} from 'react-icons/io'
import {ThemeContext} from '../App'

function Footer(){
  const {theme} = useContext(ThemeContext)
  return(
  <div className={"mt-5 " + (theme? "footer" : "footerLight")}>
    <Row style={{color:"white", paddingTop:"40px", margin:'auto'}}>
      <Col>
        <h3>
          <BsFileEarmarkText />All rights reserved</h3>
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