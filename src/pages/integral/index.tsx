import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  DatePicker,
  Space,
  Typography,
  Button,
  Table,
  TablePaginationConfig,
  message,
} from "antd";
import { useRequest } from "ahooks";
import { getUserList, pointExport } from "@/api/integral";
import { downloadCSV } from "@/utils";
import dayjs from "dayjs";

const columns = [
  {
    title: "用户地址",
    dataIndex: "address",
  },
  {
    title: "积分",
    dataIndex: "points",
  },
];

const Integral: React.FC = () => {
  const [month, setMonth] = useState<any>(dayjs());
  const { data, loading, run: runGetUserList } = useRequest(getUserList);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current } = pagination;
    runGetUserList({ page: current, month });
  };

  const handlePointExport = async () => {
    try {
      const res = (await pointExport()) as unknown as string;
      downloadCSV(res, "point-list");
      message.success("download success!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          积分管理
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
          <Space>
            <Typography.Text>月份</Typography.Text>
            <DatePicker
              picker="month"
              onChange={(_, dateString: string | string[]) => {
                setMonth(dateString);
                runGetUserList({
                  month: dateString as string,
                });
              }}
            />
          </Space>
          <Space
            style={{
              width: "100%",
              justifyContent: "space-between",
              marginBottom: 16,
              marginTop: 16,
            }}
          >
            <Typography.Title level={5} style={{ margin: 0 }}>
              该月参与用户数：{data?.total ?? 0}
            </Typography.Title>
            <Button onClick={handlePointExport}>导出数据</Button>
          </Space>
          <Table
            bordered
            size="small"
            loading={loading}
            dataSource={data?.list ?? []}
            columns={columns}
            rowKey={(record) => record.id}
            pagination={{
              current: data?.page ?? 1,
              pageSize: 10,
              total: data?.total ?? 0,
            }}
            onChange={handleTableChange}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Integral;
