import React from "react";
import {
  Form,
  Row,
  Col,
  Card,
  DatePicker,
  Button,
  Typography,
  Space,
  Divider,
  Select,
  Table,
  TablePaginationConfig,
  message,
} from "antd";
import { useRequest } from "ahooks";
import dayjs from "dayjs";
import {
  getUserList,
  setConfig,
  delAllAirdrop,
  exportAirdrop,
} from "@/api/airdrop";
import { downloadCSV } from "@/utils";

const { RangePicker } = DatePicker;

const columns = [
  {
    title: "注册时间",
    dataIndex: "create_time",
    render: (create_time: number) =>
      dayjs(create_time * 1000).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    title: "用户地址",
    dataIndex: "address",
  },
  {
    title: "Saga2手机",
    dataIndex: "is_saga2",
    render: (is_saga2: number) => (is_saga2 === 1 ? "已购买" : "未购买"),
  },
  {
    title: "邀请情况",
    dataIndex: "invite_count",
    render: (invite_count: number) => (invite_count > 0 ? "已完成" : "未完成"),
  },
  {
    title: "邀请人数",
    dataIndex: "invite_count",
  },
  {
    title: "Twitter绑定",
    dataIndex: "x_username",
    render: (x_username: string) => (x_username ? "已绑定" : "未绑定"),
  },
  {
    title: "Twitter关注",
    dataIndex: "is_follower_x",
    render: (is_follower_x: number) =>
      is_follower_x === 1 ? "已关注" : "未关注",
  },
  {
    title: "当前权重",
    dataIndex: "is_follower_x",
    render: () => 0,
  },
];

const Airdrop: React.FC = () => {
  const [form] = Form.useForm();
  const {
    data,
    loading,
    run: runGetUserList,
  } = useRequest(getUserList, { debounceWait: 200 });

  const { loading: setConfigLoading, run: runSetConfig } = useRequest(
    setConfig,
    {
      manual: true,
      onSuccess: () => {
        getUserList();
      },
    }
  );

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current } = pagination;
    runGetUserList({ ...form.getFieldsValue(), page: current });
  };

  const handleDelAllAirdrop = async () => {
    try {
      await delAllAirdrop();
      runGetUserList({ ...form.getFieldsValue(), page: 1, page_size: 10 });
      message.success("清除成功");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAirdropExport = async () => {
    try {
      const state = form.getFieldsValue();
      const res = (await exportAirdrop(
        state.invite_status,
        state.is_saga2
      )) as unknown as string;
      downloadCSV(res, "airdrop-list");
      message.success("download success!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          空投管理
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
          <Form
            colon={false}
            layout="inline"
            onFinish={(values) => {
              const [startTime, endTime] = values.range;
              runSetConfig({
                start_time: dayjs(startTime).toDate().getTime(),
                end_time: dayjs(endTime).toDate().getTime(),
              });
            }}
          >
            <Form.Item
              label="保存周期"
              name="range"
              rules={[{ required: true, message: "请选择保存周期" }]}
            >
              <RangePicker />
            </Form.Item>
            <Form.Item>
              <Button
                loading={setConfigLoading}
                htmlType="submit"
                type="primary"
              >
                保存
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={24}>
        <Card
          styles={{
            body: {
              padding: 16,
            },
          }}
        >
          <Form
            form={form}
            colon={false}
            initialValues={{
              is_saga2: "-1",
              invite_status: "-1",
              is_bind_x: "-1",
              is_follower_x: "-1",
            }}
            onValuesChange={(_, values) => {
              runGetUserList({ ...values, page: 1, page_size: 10 });
            }}
          >
            <Row gutter={[16, 8]}>
              <Col span={6}>
                <Form.Item
                  label="手机购买"
                  name="is_saga2"
                  style={{ marginBottom: 0 }}
                >
                  <Select
                    options={[
                      { value: "-1", label: "全部" },
                      { value: "1", label: "已购买" },
                      { value: "0", label: "未购买" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="邀请情况"
                  name="invite_status"
                  style={{ marginBottom: 0 }}
                >
                  <Select
                    options={[
                      { value: "-1", label: "全部" },
                      { value: "1", label: "已完成" },
                      { value: "0", label: "未完成" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Twitter绑定"
                  name="is_bind_x"
                  style={{ marginBottom: 0 }}
                >
                  <Select
                    options={[
                      { value: "-1", label: "全部" },
                      { value: "1", label: "已绑定" },
                      { value: "0", label: "未绑定" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Twitter关注"
                  name="is_follower_x"
                  style={{ marginBottom: 0 }}
                >
                  <Select
                    options={[
                      { value: "-1", label: "全部" },
                      { value: "1", label: "已关注" },
                      { value: "0", label: "未关注" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Divider />
          <Space
            size={16}
            style={{
              width: "100%",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <Typography.Title level={5} style={{ margin: 0 }}>
              参与总人数：{data?.total ?? 0}
            </Typography.Title>
            <Space>
              <Button danger onClick={handleDelAllAirdrop}>
                清除所有用户
              </Button>
              <Button onClick={handleAirdropExport}>导出数据</Button>
            </Space>
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

export default Airdrop;
