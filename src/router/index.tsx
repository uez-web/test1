import { lazy } from "react";
import { Layout } from "@/layout";

const getRoutes = () => {
  const Login = lazy(() => import("../pages/login"));
  const Release = lazy(() => import("../pages/release"));
  const WhiteList = lazy(() => import("../pages/white-list"));
  const Airdrop = lazy(() => import("../pages/airdrop"));
  const Integral = lazy(() => import("../pages/integral"));
  const CrossChain = lazy(() => import("../pages/cross-chain"));

  return [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <WhiteList />,
          title: "白名单",
        },
        {
          path: "/release",
          element: <Release />,
          title: "非白SOL释放记录",
        },
        {
          path: "/cross-chain",
          element: <CrossChain />,
          title: "跨链记录",
        },
        {
          path: "/integral",
          element: <Integral />,
          title: "积分管理",
        },
        {
          path: "/airdrop",
          element: <Airdrop />,
          title: "空投管理",
        },
        {
          path: "/login",
          element: <Login />,
          hidden: true,
        },
      ],
    },
  ];
};

export default getRoutes;
