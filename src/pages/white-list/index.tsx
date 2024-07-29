import React, { useState, useMemo } from "react";
import {
  Input,
  Row,
  Col,
  Button,
  Card,
  Space,
  Table,
  Popconfirm,
  message,
  Modal,
  Typography,
  TablePaginationConfig,
} from "antd";
import { useRequest } from "ahooks";
import { getWhiteList, addWhiteList, delWhiteList } from "@/api/whiteList";

const { Search, TextArea } = Input;

const WhiteList: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const {
    data,
    loading: getLoading,
    run: runGetWhiteList,
  } = useRequest(getWhiteList);

  const dataSource = useMemo(() => {
    const list = data?.list ?? [];
    return keyword
      ? list.filter((item: any) => item.address.indexOf(keyword) > -1)
      : list;
  }, [data, keyword]);

  const { loading: addLoading, run: runAddWhiteList } = useRequest(
    async () => {
      if (!inputValue.trim()) {
        return;
      }
      const address = inputValue
        .split("\n")
        .map((addr) => addr.trim())
        .filter((addr) => !!addr);
      return addWhiteList(address);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success("添加成功");
        setOpen(false);
        setInputValue("");
        runGetWhiteList();
      },
    }
  );
  const { loading: delLoading, run: runDelWhiteList } = useRequest(
    delWhiteList,
    {
      manual: true,
      onSuccess: () => {
        message.success("删除成功");
        runGetWhiteList();
      },
    }
  );

  const columns = [
    {
      title: "白名单地址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "操作",
      dataIndex: "address",
      width: 100,
      render: (address: string) => (
        <Popconfirm
          title="提示"
          description={`确定从白名单中删除【${address}】？`}
          onConfirm={() => runDelWhiteList(address)}
          okButtonProps={{ loading: delLoading }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current } = pagination;
    runGetWhiteList(current);
  };

  return (
    <>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            白名单
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
            <Space style={{ marginBottom: 16 }}>
              <Search
                value={keyword}
                allowClear
                placeholder="搜索地址"
                enterButton="搜索"
                style={{ width: "400px" }}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button
                loading={addLoading}
                type="primary"
                onClick={() => setOpen(true)}
              >
                添加地址
              </Button>
            </Space>
            <Table
              bordered
              size="small"
              loading={getLoading}
              dataSource={dataSource}
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
        title="添加白名单"
        onCancel={() => setOpen(false)}
        onOk={runAddWhiteList}
      >
        <TextArea
          value={inputValue}
          placeholder="一行一个地址，注意结尾和开头不可有空格"
          autoSize={{ minRows: 10, maxRows: 40 }}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default WhiteList;
