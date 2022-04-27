import React, {useContext} from 'react'
import {Row, Col} from 'reactstrap'
import {BsInstagram, BsFileEarmarkText} from 'react-icons/bs'
import {IoLogoGithub} from 'react-icons/io'
import {FaDiscord} from 'react-icons/fa'
import {ThemeContext} from '../App'

function Footer(){
  const {theme} = useContext(ThemeContext)
  return(
  <div className={theme? "footer" : "footerLight"}>
    <Row style={{color:"white", paddingTop:"20px", margin:'auto'}}>
      <Col>
        <h3>
          <BsFileEarmarkText />All rights reserved</h3>
      </Col>
      <Col>
        <h3>Contact us :</h3>
        <a href="https://github.com/lamtev178" style={{fontSize:'26px', marginTop:'5px', marginLeft:'10px', display: 'inline-block'}}><IoLogoGithub />lamtev178</a>
        <h3 style={{fontSize:'26px', marginTop:'10px', marginLeft:'10px'}}>lamtev2000@gmail.com</h3>
      </Col>
      <Col>
        <a href="https://www.instagram.com/"><h4><BsInstagram style={{marginRight:'5px'}} />instagram</h4></a>
        <a href="https://www.discord.com/"><h4><FaDiscord style={{marginRight:'5px'}} />discord</h4></a>
      </Col>
    </Row>
    </div>
  )
}
export default Footer
