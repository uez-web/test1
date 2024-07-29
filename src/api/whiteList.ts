import request from '@/utils/request'

export const getWhiteList = (page?: number, pageSize?: number): Promise<any> => {
    return request({
        url: "/onfi/whitelist/list",
        method: "post",
        data: {
            page: page ?? 1,
            page_size: pageSize ?? 10
        },
    })
}

export const addWhiteList = (address: string[]): Promise<any> => {
    return request({
        url: "/onfi/whitelist/add",
        method: "post",
        data: {
            address
        },
    })
}

export const delWhiteList = (address: string): Promise<any> => {
    return request({
        url: "/onfi/whitelist/delete",
        method: "post",
        data: {
            address
        },
    })
}