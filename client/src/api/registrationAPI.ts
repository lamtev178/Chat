import axios from "axios";

export async function registration(login: string, email: string, password: string) {
  try {
    await axios.post("auth/registration/", {
      login: login,
      email: email,
      password: password,
    });
    alert("На вашу почту отправлено письмо с подтверждением");
  } catch (error: any) {
    alert(error.toString());
  }
}
