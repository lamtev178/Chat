import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiExit } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "~/hooks/useAppSelector";
import { loginOut } from "~/store/user/userActions";
import { useRouter } from "~/hooks/useRouter";

function Header() {
  const { redirect } = useRouter();
  const { isAuth, user } = useAppSelector((state) => state.users);

  const { loginOut } = useAppDispatch();
  function handleExit() {
    loginOut();
    redirect("/");
  }
  return (
    <div className="navHeader">
      <nav className="Container Mb-5">
        <NavLink to="/topics">Темы</NavLink>
        {isAuth ? (
          <>
            <NavLink to="/messages">Сообщения</NavLink>
            <NavLink to="/friends">Подписки</NavLink>
            <NavLink to={`/users/${user.login}`}>Личный кабинет</NavLink>
          </>
        ) : (
          <NavLink to="/">Вход/Регистрация</NavLink>
        )}
      </nav>
      {isAuth ? <BiExit onClick={handleExit} className="box-darkHover exit" style={{ fontSize: "35px" }} /> : null}
    </div>
  );
}
export default Header;
