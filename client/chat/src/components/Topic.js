import React from "react";
import {useParams} from 'react-router-dom';

function Topic() {
  const {topicID} = useParams() 
  return (
    <h1>
    {topicID}
    </h1>
  );
}

export default Topic;