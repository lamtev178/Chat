import React from "react";
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

function Topic() {
  const {topicID} = useParams() 
  const tipic = useSelector(state=>state.topics[topicID-1])
  console.log(tipic);
  return (
    <div className="mt-5">
      <h1>
        {tipic.title}
      </h1><hr style={{margin:"20px 40px"}}/>
      <h4>
        {tipic.description}
      </h4>
    </div>
  );
}

export default Topic; 