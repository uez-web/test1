import request from '@/utils/request'

export const login = (data: { username: string, password: string }): Promise<any> => {
    return request({
        url: "/login",
        method: "post",
        data,
    })
}