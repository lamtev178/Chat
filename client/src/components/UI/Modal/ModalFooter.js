import React from 'react'
import classes from './MyModal.module.css'

function ModalFooter({children, ...props}){
  return(
    <div className={classes.modalFooter}>
        {children}
    </div>
  )
}

export default ModalFooter