import request from '@/utils/request'



export function getUserList(reqData) {
  return request({
    url:'/user/getUserList',
    method: 'post',
    data: reqData
  })
}


