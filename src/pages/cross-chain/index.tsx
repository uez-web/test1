import React, { useState, useMemo } from "react";
import { Row, Col, Card, Input, Typography, Table, Space, Tag } from "antd";
import { useRequest } from "ahooks";
import dayjs from "dayjs";
import { getList } from "@/api/crossChain";

const { Search } = Input;

const columns = [
  {
    width: 80,
    title: "订单ID",
    dataIndex: "id",
    fixed: "left",
  },
  {
    title: "时间",
    width: 200,
    dataIndex: "create_time",
    render: (create_time: number) =>
      dayjs(create_time * 1000).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    title: "桥",
    width: 100,
    render: (record: any) => `${record.from_chain}-${record.to_chain}`,
  },
  {
    title: "币种",
    width: 100,
    dataIndex: "token",
  },
  {
    title: "数量",
    render: (record: any) => `${record.amount} ${record.token}`,
  },
  {
    title: "手续费",
    render: (record: any) => `${record.fee} ${record.token}`,
  },
  {
    title: "发起/接收地址",
    render: (record: any) => (
      <Space direction="vertical" size={0}>
        <Typography.Text>发起地址：{record.from_address}</Typography.Text>
        <Typography.Text>接受地址：{record.to_address}</Typography.Text>
      </Space>
    ),
  },
  {
    title: "Hash",
    dataIndex: "txid",
  },
  {
    title: "状态",
    width: 80,
    dataIndex: "status",
    fixed: "right",
    render: (status: number) => {
      const state = {
        0: {
          text: "验证中",
          color: "orange",
        },
        1: {
          text: "处理中",
          color: "orange",
        },
        2: {
          text: "成功",
          color: "green",
        },
        3: {
          text: "失败",
          color: "red",
        },
      }[status];

      return <Tag color={state?.color}>{state?.text ?? ""}</Tag>;
    },
  },
];

const CrossChain: React.FC = () => {
  const [orderId, setOrderId] = useState<string>("");
  const { data, loading } = useRequest(getList);

  const dataSource = useMemo(() => {
    const list = data?.list ?? [];
    return orderId
      ? list.filter((item: any) => item.id === Number(orderId))
      : list;
  }, [data, orderId]);

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          跨链记录
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Card
          styles={{
            body: {
              padding: 16,
            },
          }}
        >
          <Search
            value={orderId}
            allowClear
            placeholder="搜索订单ID"
            enterButton="搜索"
            style={{ width: "400px" }}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <Table
            bordered
            style={{ marginTop: 16 }}
            scroll={{
              x: "max-content",
            }}
            size="small"
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            rowKey={(record) => record.id}
            pagination={false}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default CrossChain;
