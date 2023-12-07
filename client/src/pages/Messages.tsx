import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddUsersToChat from "../components/AddUsersToChat";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { Button, Input } from "@mui/material";
import { useAppSelector } from "~/hooks/useAppSelector";
import BaseModal from "~/widgets/Modal";

function Messages() {
  const [isOpen, setIsOpen] = useState(false);
  const subs = useSelector((state) => state.isAuth.user.subscriptions);
  const chats = useSelector((state) => state.chats) || [];
  const { login } = useAppSelector((state) => state.users.user);
  return (
    <>
      <div className="justifyBetween">
        <h1>Сообщения</h1>
        <Button variant="outlined" onClick={() => setIsOpen(true)}>
          Создать беседу
        </Button>
      </div>
      {chats.length === 0
        ? "У вас пока нет сообщений..."
        : chats.map((chat) => {
            const lastMessage = chat.messages[chat.messages.length - 1];
            return (
              <Link to={`chat/${chat.chat}`} style={{ textDecoration: "none" }} key={chat.chat}>
                <div>
                  <div className="messages">
                    <h3 style={{ display: "inline" }}>
                      {chat.chatName === "" ? chat.users[Number(!chat.users.indexOf(login))] : chat.chatName}{" "}
                    </h3>
                  </div>
                  {chat.messages.length === 0 ? null : lastMessage.isSystemMess ? (
                    <p>{lastMessage.message}</p>
                  ) : (
                    <div>
                      <p>{lastMessage.message}</p>
                      <p>
                        <BiUser />
                        {lastMessage.author}
                      </p>
                      <p>{lastMessage.date}</p>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
      <BaseModal open={isOpen}>
        <>
          <div>Создание беседы</div>
          <div>
            <Input title="Название беседы" value={chatName} onChange={(e) => setChatName(e.target.value)} />
            <Input title="Сообщение" value={mess} onChange={(e) => setMess(e.target.value)} />
            <AddUsersToChat allSubs={subs} checkedState={checkedState} handleChecked={handleChecked} />
          </div>
          <div>
            <Button variant="outlined" onClick={() => newChat(checkedState)}>
              Создать
            </Button>
          </div>
        </>
      </BaseModal>
    </>
  );
}
export default Messages;
