import React from "react";
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

function Topic() {
  const {topicID} = useParams() 
  const tipic = useSelector(state=>state.topics[topicID-1])
  console.log(tipic);
  return (
    <div>
      <h1>
        {tipic.title}
      </h1>
      <p>
        {tipic.description}
      </p>
    </div>
  );
}

export default Topic; 