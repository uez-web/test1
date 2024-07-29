import React, { Suspense, useEffect, PropsWithChildren } from "react";
import { Outlet, useRoutes, useLocation, useNavigate } from "react-router-dom";
import { Layout as AntdLayout, Spin } from "antd";
import Sidebar from "./Sidebar";
import getRoutes from "@/router";
import { useConfig } from "@/context";

const { Content } = AntdLayout;

const RouterContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { token } = useConfig();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/login" && !token) {
      navigate("/login", { replace: true });
    }
  }, [location.pathname, token, navigate]);

  if (location.pathname === "/login" || !token) {
    return children;
  }

  return (
    <>
      <Sidebar />
      <AntdLayout
        style={{ padding: 16, overflowX: "hidden", overflowY: "auto" }}
      >
        <Content>{children}</Content>
      </AntdLayout>
    </>
  );
};

export const Layout: React.FC = () => (
  <AntdLayout style={{ width: "100%", height: "100vh" }}>
    <RouterContainer>
      <Suspense fallback={<Spin spinning />}>
        <Outlet />
      </Suspense>
    </RouterContainer>
  </AntdLayout>
);

const App: React.FC = () => useRoutes(getRoutes());

export default App;
