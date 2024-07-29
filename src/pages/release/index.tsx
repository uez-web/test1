import React, { useState, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Table,
  Button,
  Modal,
  TablePaginationConfig,
} from "antd";
import { useRequest } from "ahooks";
import dayjs from "dayjs";
import { releaseList, getReleaseList } from "@/api/release";

const detailColumns = [
  {
    title: "日期",
    dataIndex: "time",
    render: (time: number) => dayjs(time * 1000).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    title: "收入",
    dataIndex: "amount",
    render: (value: number) => `${value} ONFI`,
  },
];

const CrossChain: React.FC = () => {
  const [orderId, setOrderId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const { data, loading, run: runReleaseList } = useRequest(releaseList);
  const { data: detailList, loading: detailLoading } = useRequest(
    async () => {
      if (!open || !currentAddress) {
        return undefined;
      }
      return getReleaseList(currentAddress)
        .then((data) => data)
        .catch((error) => undefined);
    },
    {
      refreshDeps: [open, currentAddress],
    }
  );

  const columns = useMemo(
    () => [
      {
        title: "用户地址",
        dataIndex: "address",
      },
      {
        title: "总应收",
        dataIndex: "total_receive",
        render: (value: number) => `${value} ONFI`,
      },
      {
        title: "已收到",
        dataIndex: "has_received",
        render: (value: any) => `${value} ONFI`,
      },
      {
        title: "待释放",
        dataIndex: "unrelease",
        render: (value: any) => `${value} ONFI`,
      },
      {
        title: "可领取",
        dataIndex: "releaseable",
        render: (value: any) => `${value} ONFI`,
      },
      {
        title: "操作",
        width: 80,
        fixed: "right",
        render: (record: any) => {
          return (
            <Button
              type="link"
              onClick={() => {
                setCurrentAddress(record.address);
                setOpen(true);
              }}
            >
              详情
            </Button>
          );
        },
      },
    ],
    []
  );

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current } = pagination;
    runReleaseList({ page: current ?? 1, page_size: 10 });
  };

  return (
    <>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            非白SOL释放记录
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
            <Table
              bordered
              style={{ marginTop: 16 }}
              scroll={{
                x: "max-content",
              }}
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
      <Modal
        open={open}
        title={<div style={{ textAlign: "center" }}>用户释放详情</div>}
        footer={null}
        width={1000}
        onCancel={() => {
          setOpen(false);
          setCurrentAddress("");
        }}
      >
        <Table
          loading={detailLoading}
          columns={detailColumns}
          dataSource={detailList?.list ?? []}
          pagination={false}
          size="small"
        />
      </Modal>
    </>
  );
};

export default CrossChain;
