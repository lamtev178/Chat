import React from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@mui/material";
import { useAppDispatch, useAppSelector } from "~/hooks/useAppSelector";
import useSWR from "swr";
import axios from "axios";

function Friends() {
  const { createSub } = useAppDispatch();

  const [login, setLogin] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const { user } = useAppSelector((state) => state.users);
  const { subscriptions } = useAppSelector((state) => state.users.user);
  const { data: usersList } = useSWR(["usersList"], async () => {
    return await axios.get("auth/users");
  });

  React.useEffect(() => {
    setLogin(usersList.filter((user) => user.login.startsWith(search) && user.login !== user.login));
  }, [search]);
  function handeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  return (
    <>
      <Input value={search} title="Поиск по логину" onChange={handeChange} />
      {!search ? (
        subscriptions.length !== 0 ? (
          subscriptions.map((login) => {
            return (
              <Link to={`/users/${login}`} key={login} style={{ textDecoration: "none" }}>
                <div>
                  <h2>{login}</h2>
                </div>
              </Link>
            );
          })
        ) : (
          <h5 style={{ marginTop: "30px" }}>Список ваших подписок пуст.</h5>
        )
      ) : (
        login.map((user) => {
          return (
            <div key={user._id} className={"justifyBetween"}>
              <Link to={`/users/${user.login}`} key={user._id} style={{ textDecoration: "none" }}>
                <h2>{user.login}</h2>
              </Link>
              {subscriptions.indexOf(user.login) === -1 ? (
                <Button variant="outlined" onClick={() => createSub(user, subscription)}>
                  Подписаться
                </Button>
              ) : null}
            </div>
          );
        })
      )}
    </>
  );
}
export default Friends;
