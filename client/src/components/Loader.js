import React from "react"
import { BsArrowClockwise } from 'react-icons/bs';

function Loader({style}){
  return(
    <div className="loader" style={style}>
      <BsArrowClockwise
        className="spin" 
        style={{height:"30px", width:"30px"}}/>
    </div>
  );
}

export default Loader
