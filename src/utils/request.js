import axios from 'axios'
import { Message } from 'element-ui'
import { appUrl }  from '@/utils/env'


// create an axios instance
const service = axios.create({
	baseURL: appUrl,
	 timeout: 5000
})


service.interceptors.request.use(
 //  config => {
 //    //let token = Storage.get('admin_user') ? Storage.get('admin_user').token : ''
 //    // console.log(token)
 //    // if (token) {
 //    //   config.headers['Authorization'] = token
 //    //   config.headers['Content-Type'] = 'application/json'
 //    // }
	// config.headers['Content-Type'] = 'application/json'
 //    return config
 //  },
 //  error => {
 //    Promise.reject(error)
 //  }
)

service.interceptors.response.use(
  response => {

 const res = response.data
	 if(res.code ===0) {
		 return response.data
	 }
   if (res.code !== 200) {
     Message({
       message: res.message,
       type: 'error',
       duration: 5 * 1000
     })
     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
         confirmButtonText: '重新登录',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         store.dispatch('FedLogOut').then(() => {
           location.reload()
         })
       })
     }
     return Promise.reject('error')
   } else {
     return response.data
   }
 },
 error => {
   Message({
     message: error.message,
     type: 'error',
     duration: 5 * 1000
   })
   return Promise.reject(error)
  })






export default service