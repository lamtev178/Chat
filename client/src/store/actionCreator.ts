const axios = require("axios").default;

const addUsers = (users) => {
  return {
    type: "GET_USERS",
    payload: users,
  };
};
// export const getUsers = () => async (dispatch) => {
//   try {
//     const response = await axios.get('auth/users')
//     dispatch(addUsers(response.data))
//   }
//   catch (error) {
//     alert(error.response.data.message)
//   }
// }

const addComments = (comments) => {
  return {
    type: "GET_COMMENTS",
    payload: comments,
  };
};
export const getComments = () => async (dispatch) => {
  try {
    const response = await axios.get("alltopics/comment");
    dispatch(addComments(response.data));
  } catch (error) {
    alert(error.response.data);
  }
};
const addChats = (chats) => {
  return {
    type: "GET_CHATS",
    payload: chats,
  };
};
export const getChats = () => async (dispatch) => {
  try {
    const response = await axios.get("messenger/chat", {
      headers: { Authorization: "Bearer " + localStorage.getItem("Token") },
    });
    dispatch(addChats(response.data.reverse()));
  } catch (error) {
    alert(error.response.data.message);
  }
};
const addChat = (chat) => {
  return {
    type: "CREATE_CHAT",
    payload: chat,
  };
};
export const createChat = (users, mess, chatName, redirect, myUser) => async (dispatch) => {
  let date = (new Date() + "").split(" ");
  date = date[2] + " " + date[1] + " " + date[4].slice(0, 5);
  let message = {
    message: mess,
    date: date,
    author: myUser.login,
  };
  if (mess === "" || chatName === "") {
    alert("Введите название беседы и сообщение");
    return;
  }
  if (users.length === 0) {
    alert("У вас нет подписок");
    return;
  }
  const res = [];
  if (typeof users[0] === "boolean") {
    if (users.indexOf(true) === -1) {
      alert("At least one user");
      return;
    } else {
      for (let i = 0; i < users.length; i++) {
        if (users[i]) res.push(myUser.subscriptions[i]);
      }
    }
  }
  try {
    const response = await axios.post(
      "messenger/chat",
      {
        users: res.length > 0 ? res : users,
        messages: [message],
        chatName: chatName.length === 0 ? "" : chatName,
      },
      { headers: { Authorization: "Bearer " + localStorage.getItem("Token") } },
    );
    dispatch(addChat(response.data.data));
    redirect(`/Messages/chat/${response.data.data.chat}`);
  } catch (error) {
    alert(error.response.data.message);
  }
};
const loginIn = (user) => {
  return {
    type: "LOGIN_IN",
    payload: user,
  };
};
export const loginAuth = (log, pass, redirect, login, password) => async (dispatch) => {
  try {
    const response = await axios.post("auth/login", {
      login: login ? login : log,
      password: password ? password : pass,
    });
    localStorage.setItem("user", (login ? login : log) + " " + (password ? password : pass));
    localStorage.setItem("Token", response.data.token);
    redirect("/topics");
    dispatch(loginIn(response.data));
  } catch (error) {
    let err = "";
    error.response.data.message
      ? alert(error.response.data.message)
      : error.response.data.errors.map((er) => (err += er.msg));
    alert(err);
  }
};
const addSub = (sub) => {
  return {
    type: "ADD_SUB",
    payload: sub,
  };
};
export const createSub = (login, subscription, setIsLoading) => async (dispatch) => {
  setIsLoading(true);
  try {
    const response = await axios.post("auth/addsub", {
      login: login,
      subscription: subscription,
    });
    dispatch(addSub(subscription));
  } catch (error) {
    alert(error.response.data.message);
  }
  setIsLoading(false);
};
const postMess = (mess) => {
  return {
    type: "POST_MESSAGE",
    payload: { data: mess },
  };
};
export const sendMess =
  (message, chatID, handleSendMess, isSystemMess = false) =>
  async (dispatch) => {
    let date = (new Date() + "").split(" ");
    date = date[2] + " " + date[1] + " " + date[4].slice(0, 5);
    try {
      const response = await axios.post(
        "messenger/message",
        {
          message: {
            message: message,
            date: date,
            isSystemMess: isSystemMess,
          },
          chat: chatID,
        },
        { headers: { Authorization: "Bearer " + localStorage.getItem("Token") } },
      );
      await dispatch(postMess(response.data.data));
    } catch (error) {
      alert(error.response);
    }
    handleSendMess({
      message: {
        message: message,
        date: date,
      },
      chat: chatID,
    });
  };
const messIsReaded = (mess) => {
  return {
    type: "MESS_IS_READED",
    payload: { data: mess },
  };
};
export const messReaded = (chatID) => async (dispatch) => {
  try {
    const response = await axios.post(
      "messenger/messageIsReaded",
      {
        chatId: chatID,
      },
      { headers: { Authorization: "Bearer " + localStorage.getItem("Token") } },
    );
    dispatch(messIsReaded(response.data.data));
  } catch (error) {
    alert(error.response.data.message);
  }
};
const delUserDispatch = (chat) => {
  return {
    type: "DELETE_USER_FROM_CHAT",
    payload: chat,
  };
};
const delChatDispatch = (chat) => {
  return {
    type: "DELETE_CHAT",
    payload: chat,
  };
};
export const delUser = (chat, user, redirect) => async (dispatch) => {
  try {
    const response = await axios.delete(`messenger/chat/${chat}/${user}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("Token") },
    });
    if (response.data.data === false || user === localStorage.getItem("user").split(" ")[0]) {
      redirect("/Messages");
      dispatch(delChatDispatch(chat));
    } else dispatch(delUserDispatch(response.data.data));
  } catch (error) {
    alert(error.response.data.message);
  }
};

const addUserDispatch = (res, chatId) => {
  return {
    type: "ADD_USERS_TO_CHAT",
    payload: { users: res, chat: chatId },
  };
};
export const getListOfCheckedUsers = (users, subs) => {
  const res = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i]) res.push(subs[i]);
  }
  return res;
};
export const addUsersToChat = (chat, users, subs, setToggle) => async (dispatch) => {
  if (users.length === 0) {
    alert("У вас нет подписок");
    setToggle(false);
    return;
  }
  let res = [];
  if (typeof users[0] === "boolean") {
    if (users.indexOf(true) === -1) {
      alert("At least one user");
      return;
    } else res = getListOfCheckedUsers(users, subs);
  }
  try {
    const response = await axios.put(
      "messenger/chat/",
      {
        users: res,
        chatId: chat,
      },
      { headers: { Authorization: "Bearer " + localStorage.getItem("Token") } },
    );
    dispatch(addUserDispatch(res, chat));
  } catch (error) {
    alert(error.response.data.message);
  }
};
export const delChat = (chatId, redirect) => async (dispatch) => {
  try {
    const response = await axios.delete(`messenger/chat/${chatId}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("Token") },
    });
    console.log(response);
    if (response.data.message === "complete") {
      redirect("/Messages");
      dispatch(delChatDispatch(chatId));
    } else alert("Error!");
  } catch (error) {
    alert(error.response.data.message);
  }
};
