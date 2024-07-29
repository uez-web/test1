import request from '@/utils/request'

export const getList = (order_id?: string): Promise<any> => {
    return request({
        url: "/bridge/orderlist",
        method: "post",
        data: {
            order_id: order_id ?? ''
        }
    })
}