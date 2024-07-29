import request from '@/utils/request'

export const releaseList = (data: { page: number; page_size: number; address?: string }) => {
    const { page = 1, page_size = 10, address = undefined } = data ?? {}
    return request({
        url: "/onfi/sol/release",
        method: "post",
        data: {
            page,
            page_size,
            address
        },
    })
}

export const getReleaseList = (address: string) => {
    return request({
        url: `/onfi/sol/release/${address}`,
        method: "get",
    })
}