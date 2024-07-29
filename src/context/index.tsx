import React, {
  useState,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import {
  getToken,
  setToken as setTokenToCookie,
  removeToken,
  getUsername,
  setUsername,
  removeUsername,
} from "@/utils/token";

export type UserInfo = {
  username: string;
};

type ContextApi = {
  token: string;
  userInfo: UserInfo;
  setToken: (token: string) => void;
  setUserInfo: (username: string) => void;
  clearUserInfo: () => void;
};

export const ConfigContext = createContext<ContextApi | undefined>(undefined);

export const ConfigProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<Pick<ContextApi, "token" | "userInfo">>(
    () => ({
      token: getToken() ?? "",
      userInfo: {
        username: getUsername() ?? "",
      },
    })
  );

  const setToken = (token: string) => {
    setState((prevState) => ({
      ...prevState,
      token,
    }));
    if (token) {
      setTokenToCookie(token);
    } else {
      removeToken();
    }
  };

  const setUserInfo = (username: string) => {
    setState((prevState) => ({
      ...prevState,
      userInfo: {
        username,
      },
    }));
    if (username) {
      setUsername(username);
    } else {
      removeUsername();
    }
  };

  const clearUserInfo = () => {
    setToken("");
    setUserInfo("");
  };

  return (
    <ConfigContext.Provider
      value={{ ...state, setToken, setUserInfo, clearUserInfo }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const configContext = useContext(ConfigContext);

  if (configContext === undefined) {
    throw new Error("config context is undefined");
  }

  return configContext;
};
