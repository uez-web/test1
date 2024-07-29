import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ConfigProvider as AntdConfigProvider } from "antd";
import locale from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { ConfigProvider } from "./context";
import App from "@/layout";
import "./index.css";

dayjs.locale("zh-cn");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider>
    <AntdConfigProvider locale={locale}>
      <HashRouter>
        <App />
      </HashRouter>
    </AntdConfigProvider>
  </ConfigProvider>
);
