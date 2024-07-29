import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { Layout, Menu, Typography, Button, Modal } from "antd";
import getRoutes from "@/router";
import { useConfig } from "@/context";

const { Sider } = Layout;
const { confirm } = Modal;

const Sidebar: React.FC = () => {
  const { userInfo, clearUserInfo } = useConfig();
  const location = useLocation();
  const navigate = useNavigate();
  const items = (getRoutes() as any)[0].children
    .filter((item: any) => !item.hidden)
    .map((item: any) => ({
      label: item.title,
      key: item.path,
    }));

  const logout = useCallback(() => {
    confirm({
      title: "确定退出登录?",
      onOk() {
        clearUserInfo();
        navigate("/login", { replace: true });
      },
    });
  }, [clearUserInfo, navigate]);

  return (
    <Sider theme="light">
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Typography.Title level={4} style={{ textAlign: "center" }}>
          INFI SOL | Admin
        </Typography.Title>
        <Menu
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={items}
          onSelect={({ key }) => navigate(key)}
          style={{ border: "none", flex: 1 }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
          }}
        >
          <Typography.Title level={5} style={{ margin: 0 }}>
            {userInfo.username ?? ""}
          </Typography.Title>
          <Button type="link" danger style={{ padding: 0 }} onClick={logout}>
            退出登录
          </Button>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
