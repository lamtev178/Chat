import React from "react";
// import { getChats } from '~/store/ActionCreator'
import { Button, TextField } from "@mui/material";
import { useRouter } from "~/hooks/useRouter";
import { useAppDispatch } from "~/hooks/useAppSelector";
import RegistrationModal from "~/components/RegistrationModal";

function LoginForm() {
  const { loginAuth } = useAppDispatch();
  const { redirect } = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function loginUser() {
    loginAuth(login, password, redirect);
    setLogin("");
    setPassword("");
  }

  return (
    <div className="Container">
      <TextField
        label="Login"
        variant="outlined"
        value={login}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
      />
      <TextField
        type="password"
        variant="outlined"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        label="Password"
      />
      <div className="d-flex align-content-between">
        <Button variant="outlined" onClick={loginUser}>
          Login In
        </Button>
        <Button variant="outlined" onClick={() => setIsOpen((isOpen) => !isOpen)}>
          Sign In
        </Button>
      </div>
      <RegistrationModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default LoginForm;
