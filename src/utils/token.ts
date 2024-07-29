import Cookies from "js-cookie";

const TokenKey = "INFI_SOL_TOKEN";
const UserInfoKey = "INFI_SOL_USERNAME";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getUsername() {
  return Cookies.get(UserInfoKey);
}

export function setUsername(username: string) {
  return Cookies.set(UserInfoKey, username);
}

export function removeUsername() {
  return Cookies.remove(UserInfoKey);
}
