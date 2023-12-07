import React from 'react'
import { BsInstagram, BsFileEarmarkText } from 'react-icons/bs'
import { IoLogoGithub } from 'react-icons/io'
import { FaDiscord } from 'react-icons/fa'

function Footer() {
  return (
    <div>
      <div className="Container">
        <div style={{ color: "white", paddingTop: "20px", margin: 'auto' }} className="justifyAround">
          <div className="col">
            <h3>
              <BsFileEarmarkText />All rights reserved</h3>
          </div>
          <div className="col">
            <h3>Contact us :</h3>
            <a href="https://github.com/lamtev178" style={{ fontSize: '26px', marginTop: '5px', marginLeft: '10px', display: 'inline-block' }}><IoLogoGithub />lamtev178</a>
            <h3 style={{ fontSize: '26px', marginTop: '10px', marginLeft: '10px' }}>lamtev2000@gmail.com</h3>
          </div>
          <div className="col">
            <a href="https://www.instagram.com/"><h4><BsInstagram style={{ marginRight: '5px' }} />instagram</h4></a>
            <a href="https://www.discord.com/"><h4><FaDiscord style={{ marginRight: '5px' }} />discord</h4></a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer
