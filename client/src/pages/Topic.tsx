import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiUser } from "react-icons/bi";
import { Button, Input } from "@mui/material";
import { useAppSelector } from "~/hooks/useAppSelector";
const axios = require("axios").default;

function Topic() {
  const { isAuth, user } = useAppSelector((state) => state.users);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { topicID } = useParams();
  const topic = useSelector((state) => state.topics.filter((t) => t._id === topicID))[0];
  const comments = useSelector((state) => state.comments.filter((c) => c.postId === topicID));

  async function handleSubmitMessage() {
    try {
      let date = (new Date() + "").split(" ");
      date = date[2] + " " + date[1] + " " + date[4].slice(0, 5);

      const response = await axios.post("alltopics/comment", {
        author: user.login,
        postId: topicID,
        message: comment,
        date: date,
      });
      console.log(response);
      dispatch({
        type: "POST_COMMENTS",
        payload: { author: user.login, postId: topicID, message: comment, _id: response.data.data._id, date: date },
      });
    } catch (error: any) {
      alert("Ошибка", error.message);
    }
    setComment("");
  }
  return (
    <div className="Mt-5">
      <h1>{topic.title}</h1>
      <hr style={{ margin: "20px 40px" }} />
      <h4>{topic.description}</h4>
      {comments.map((comment) => {
        return (
          <div key={comment._id}>
            <p style={{ wordBreak: "break-all", fontSize: "20px" }}>{comment.message}</p>
            <div className="comments-info">
              <p>
                <Link to={isAuth ? `/users/${comment.author}` : "/"} style={{ textDecoration: "none" }}>
                  <BiUser />
                  {comment.author}
                </Link>
              </p>
              <p>{comment.date}</p>
            </div>
          </div>
        );
      })}
      <Input
        style={{ width: "80%", height: "60px", margin: "auto" }}
        value={comment}
        title="Ваш комментарий"
        onChange={(e) => setComment(e.target.value)}
      />
      <Button disabled={isAuth} onClick={handleSubmitMessage} style={{ marginTop: "15px" }}>
        Отправить
      </Button>
    </div>
  );
}

export default Topic;
