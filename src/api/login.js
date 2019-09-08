import request from '@/utils/request'



export function login(username, password) {
  return request({
    url: '/api/postlogin',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/getlogin',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'post'
  })
}

export function getImgToken() {
	return request({
		url: '/api/getQiniuToken',
		method: 'get'
	})
}