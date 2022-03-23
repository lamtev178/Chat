import React from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

function Main(){
 return(
  <>
    <Header />
    <div className='container'>
      <Content />
    </div>
    <Footer />
  </>
 )
}

export default Main