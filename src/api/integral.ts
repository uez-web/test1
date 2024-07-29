import request from '@/utils/request'

export const getUserList = (data?: { page?: number; page_size?: number; month?: string }): Promise<any> => {
    const { page, page_size, month } = data ?? {}
    return request({
        url: "/point/userlist",
        method: "post",
        data: {
            page: page ?? 1,
            page_size: page_size ?? 10,
            month: month ?? ''
        }
    })
}

export const pointExport = () => {
    return request({
        url: "/point/userlist/export",
        method: "get"
    })
}