import request from '@/utils/request'

export const getUserList = (data?: {
    is_saga2?: number
    invite_status?: number
    is_bind_x?: number
    is_follower_x?: number
    page?: number
    page_size?: number
}): Promise<any> => {
    const {
        is_saga2 = 0,
        invite_status = 0,
        is_bind_x = 0,
        is_follower_x = 0,
        page = 1,
        page_size = 10
    } = data ?? {}
    return request({
        url: "/airdrop/userlist",
        method: "post",
        data: {
            is_saga2: +is_saga2,
            invite_status: +invite_status,
            is_bind_x: +is_bind_x,
            is_follower_x: +is_follower_x,
            page,
            page_size
        },
    })
}

export const setConfig = (data: { start_time: number, end_time: number }) => {
    return request({
        url: "/airdrop/setconf",
        method: "post",
        data
    })
}

export const delAllAirdrop = () => {
    return request({
        url: "/airdrop/userlist/del",
        method: "post",
        data: {}
    })
}

export const exportAirdrop = (invite_status: string, is_saga2: string) => {
    return request({
        url: "/airdrop/userlist/export",
        method: "get",
        params: {
            invite_status,
            is_saga2
        }
    })
}