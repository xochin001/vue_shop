// 
import { createShops } from '@/api/shops'  // 导入商铺信息相关接口

const money = {
  state: {
		
  },
  getters:{

  },
  mutations: {

    },

  actions: {
     // 提交商铺数据
     CreateShops({commit},shopForm) {
		 console.log('???')
        return new Promise((resolve,reject) => {
            createShops(shopForm).then(response => {
                const data = response.data
                resolve(data)
            }).catch(error =>{
				console.log('错误了')
				reject(error)
			})
        })
    } 


  }
}

export default money
