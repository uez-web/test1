import request from '@/utils/request'

export const getOrderList = (order_id: number) => {
    return request({
        url: "/bridge/orderlist",
        method: "post",
        data: {
            order_id
        }
    })
}