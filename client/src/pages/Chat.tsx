import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMess, messReaded, delUser, addUsersToChat, delChat, getListOfCheckedUsers } from "../store/actionCreator";
import { useParams, useNavigate } from "react-router-dom";
import AddUsersToChat from "../components/AddUsersToChat";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { BiInfoCircle, BiX } from "react-icons/bi";
import { Button, Input } from "@mui/material";
import BaseModal from "~/widgets/Modal";

function Chat() {
  // async function newChat(users) {
  //   dispatch(createChat(users, mess, chatName, redirect, myUser, setToggle))
  //   setMess('')
  //   setCheckedState(new Array(myUser.subscriptions.length).fill(false))
  //   setChatName('')
  // }
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const { chatID } = useParams();
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("users");
  const [message, setMessage] = useState("");
  const chat = useSelector((state) => state.chats.find((ch) => ch.chat === chatID)) || [];
  const myUser = useSelector((state) => state.isAuth.user) || [];
  const subs = myUser.subscriptions.filter((user) => chat.users.indexOf(user) === -1);
  const chatCreator = chat.users[chat.users.length - 1] === myUser.login ? true : false;

  const [isLoading, setIsLoading] = useState(new Array(subs.length).fill(false));
  useEffect(() => {
    setIsLoading(new Array(chat.users.length).fill(false));
  }, [chat]);
  async function hanleSubmit() {
    dispatch(sendMess(message, chatID, handleSendMess));
    setMessage("");
  }
  async function addUsers() {
    await dispatch(addUsersToChat(chatID, checkedState, subs, setToggle));
    let res = getListOfCheckedUsers(checkedState, subs);
    await dispatch(sendMess(`${myUser.login} добавил в чат ${[...res]}`, chatID, handleSendMess, true));
  }
  async function delUserFromChat(user, index) {
    const newLoading = isLoading.map((l, position) => (position === index ? !l : l));
    setIsLoading(newLoading);
    await dispatch(delUser(chat.chat, user, redirect));
    const finishLoading = isLoading.map((l, position) => (position === index ? !l : l));
    setIsLoading(finishLoading);
    await dispatch(sendMess(`${myUser.login} исключил ${user} из чата`, chatID, handleSendMess, true));
  }
  let content;
  if (active === "users") {
    content = (
      <div className="users-list">
        {chat.users.map((user, index) => {
          return (
            <div className="justifyBetween" key={user}>
              <h3>{user}</h3>
              {user === myUser.login || chatCreator ? (
                isLoading[index] ? (
                  <Loader style={{ margin: "0", padding: "0 15px 0 0" }} />
                ) : (
                  <BiX
                    onClick={() => delUserFromChat(user, index)}
                    style={{ marginRight: "20px", cursor: "pointer", opacity: "0.7" }}
                  />
                )
              ) : null}
            </div>
          );
        })}
      </div>
    );
  } else if (active === "addUsers") {
    content = (
      <>
        <AddUsersToChat allSubs={subs} handleChecked={handleChecked} checkedState={checkedState} />
        {subs.length === 0 ? null : (
          <Button onClick={() => addUsers(chatID, checkedState, subs, setToggle)}>Добавить</Button>
        )}
      </>
    );
  } else if (active === "deleteChat")
    content = chatCreator ? (
      <>
        <h3> Вы действительно хотите удалить чат ? </h3>
        <Button onClick={() => dispatch(delChat(chatID, redirect))}>Удалить чат</Button>
      </>
    ) : (
      <h3>Удалить чат может только создатель</h3>
    );
  // useEffect(async()=>{
  //   document.documentElement.scrollIntoView(false)
  //   dispatch(messReaded(chatID))
  // },[])
  return (
    <>
      <div className={!theme ? "chat-ligth" : "chat-dark"}>
        <div className={"justifyBetween " + (!theme ? "chat-header-ligth" : "chat-header-dark")}>
          <h2>{chat.chatName.length > 0 ? chat.chatName : chat.users[Number(!chat.users.indexOf(myUser.login))]}</h2>
          <BiInfoCircle style={{ width: "28px", height: "28px", cursor: "pointer" }} onClick={() => setToggle(true)} />
        </div>
        {chat.length === 0
          ? null
          : chat.messages.map((mess) => {
              return <Message mess={mess} key={mess._id} />;
            })}
        <div className={"justifyBetween " + (!theme ? "sendMessForm" : "sendMessForm-dark")}>
          <Input onChange={(e) => setMessage(e.target.value)} value={message} />
          <Button onClick={hanleSubmit} style={{ marginLeft: "15px" }}>
            Отправить
          </Button>
        </div>
      </div>
      <BaseModal open={toggle}>
        <>
          <div onClick={() => setToggle(false)}>
            <div>
              <h3 className={active === "users" ? "active" : ""} onClick={() => setActive("users")}>
                Участники
              </h3>
              <h3 className={active === "addUsers" ? "active" : ""} onClick={() => setActive("addUsers")}>
                Добавить участников
              </h3>
              <h3
                style={{ marginRight: "50px" }}
                className={active === "deleteChat" ? "active" : ""}
                onClick={() => setActive("deleteChat")}
              >
                Удалить чат
              </h3>
            </div>
          </div>
          <div>{content}</div>
        </>
      </BaseModal>
    </>
  );
}

export default Chat;
