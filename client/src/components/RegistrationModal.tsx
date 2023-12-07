import React, { useState } from "react";
import Loader from "./Loader";
import { Button, TextField } from "@mui/material";
import BaseModal from "~/widgets/Modal";
import useSWR from "swr";
import { registration } from "~/api/registrationAPI";

interface IRegistrationModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function RegistrationModal({ isOpen, setIsOpen }: IRegistrationModal) {
  const [registInProcess, setRegistInProcess] = useState(false);
  const [login, setLogin] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  async function handleRegistration() {
    setRegistInProcess(true);
    await registration(login, mail, password);
    setRegistInProcess(false);
  }
  if (registInProcess) return <Loader />;
  return (
    <BaseModal open={isOpen} onClose={() => setIsOpen(false)} title="Регистрация">
      <>
        <div className="d-flex flex-nowrap mt-2" style={{ gap: "8px" }}>
          <TextField
            value={login}
            type="text"
            variant="outlined"
            onChange={(e) => setLogin(e.target.value)}
            label="login"
          />
          <TextField
            value={password}
            type="password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            label="password"
          />
          <TextField
            value={mail}
            variant="outlined"
            type="text"
            onChange={(e) => setMail(e.target.value)}
            label="Email"
          />
        </div>
        <div className="mt-2">
          <Button onClick={handleRegistration}>Sign in</Button>
        </div>
      </>
    </BaseModal>
  );
}

export default RegistrationModal;
