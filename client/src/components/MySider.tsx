import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import { Button, Input } from "@mui/material";
import { useAppDispatch, useAppSelector } from "~/hooks/useAppSelector";
const axios = require("axios").default;

function MySider() {
  // const isAuth = useAppSelector(state => state.isAuth.isAuth)
  const { user } = useAppSelector((state) => state.users);
  const [theme, setTheme] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const [toggleSider, setToggleSider] = useState(false);
  async function handleSubmitTopic(event) {
    event.preventDefault();
    try {
      const response = await axios.post("alltopics/topic", {
        title: theme,
        description: message,
        author: user.login,
      });
      console.log(response);
      dispatch({
        type: "POST_TOPICS",
        payload: { title: theme, description: message, author: author, _id: response.data.data._id },
      });
      setToggleSider(false);
      setMessage("");
      setTheme("");
    } catch (error) {
      alert("Ошибка", error.message);
    }
  }
  return (
    <>
      <div className={toggleSider ? "sider sider-active" : "sider"}>
        <BiX className="X" onClick={() => setToggleSider(false)} />
        <Input
          style={{ marginBottom: "10px" }}
          value={theme}
          title="Ваша тема"
          onChange={(e) => setTheme(e.target.value)}
        />
        <Input value={message} title="Описание" onChange={(e) => setMessage(e.target.value)} />
        <Button
          // isAuth={isAuth}
          onClick={handleSubmitTopic}
        >
          Создать тему
        </Button>
      </div>
      <div className="siderButton">
        <Button onClick={() => setToggleSider(true)}>Написать тему</Button>
      </div>
      {toggleSider ? <div className="sider-backdrop" /> : null}
    </>
  );
}

export default MySider;
