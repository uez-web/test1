import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Card, Button, Typography, message } from "antd";
import { useRequest } from "ahooks";
import { login } from "@/api/user";
import { useConfig } from "@/context";

const Login: React.FC = () => {
  const { setToken, setUserInfo } = useConfig();
  const navigate = useNavigate();
  const { loading, run: runLogin } = useRequest(login, {
    manual: true,
    onSuccess: (data, params) => {
      message.success("登录成功");
      setToken(data?.access_token ?? "");
      setUserInfo(params[0].username);
      navigate("/", { replace: true });
    },
  });
  const handleLogin = (values: { username: string; password: string }) => {
    runLogin(values);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{ width: 400 }}
        styles={{
          body: {
            padding: 16,
          },
        }}
      >
        <Typography.Title
          level={4}
          style={{ marginTop: 0, marginBottom: 24, textAlign: "center" }}
        >
          登录
        </Typography.Title>
        <Form colon={false} onFinish={handleLogin}>
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: "请输入账号" }]}
          >
            <Input placeholder="账号" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>
          <Form.Item style={{ marginBottom: 12 }}>
            <Button loading={loading} block htmlType="submit" type="primary">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
