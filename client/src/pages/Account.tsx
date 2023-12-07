import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Button, Input } from "@mui/material";
import { useRouter } from "~/hooks/useRouter";
import { useAppSelector } from "~/hooks/useAppSelector";
import BaseModal from "~/widgets/Modal";
const axios = require("axios");

function Account() {
  const [openModal, setOpenModal] = useState(false);

  const { redirect } = useRouter();

  const { user } = useAppSelector((state) => state.users);
  const { login } = useParams();

  // const chats = useSelector(state => state.chats) || []
  const comments = useSelector((state) => state.comments);

  async function newMessage() {
    let isExists = false;
    chats.forEach((ch) => {
      if (ch.users.length > 2) return false;
      if (ch.users.includes(myUser.login) && ch.users.includes(user.login)) isExists = ch;
      return false;
    });
    if (isExists) redirect(`/Messages/chat/${isExists.chat}`);
    else setOpenModal(true);
  }
  return (
    <div>
      <div className="justifyBetween">
        <h1>Личная информация</h1>
        {false ? (
          <Loader />
        ) : user.login === user.login || user.subscriptions.indexOf(user.login) > -1 ? null : (
          <Button variant="outlined" onClick={() => addSubscription({ login: user.login, subscription: user.login })}>
            Подписаться
          </Button>
        )}
        {user.login === user.login ? null : <Button onClick={newMessage}>Написать сообщение</Button>}
      </div>
      <h3>login : {user.login}</h3>
      <h3>Комментарии : {comments.filter((c) => c.author === user.login).length}</h3>
      <h3>
        Подписки :{" "}
        {user.login === user.login
          ? user.subscriptions.length
          : user.subscriptions === undefined
          ? null
          : user.subscriptions.length === 0
          ? "Подписок нет"
          : user.subscriptions.length}
      </h3>
      <BaseModal open={openModal} onClose={() => setOpenModal(false)}>
        <>
          <div>
            <h1>Написать сообщение {user.login}</h1>
          </div>
          <div>
            <Input value={mess} type="text" onChange={(e) => setMess(e.target.value)} title="Сообщение" />
          </div>
          <div>
            <Button onClick={() => newChat([login])}>Написать</Button>
          </div>
        </>
      </BaseModal>
    </div>
  );
}
export default Account;
