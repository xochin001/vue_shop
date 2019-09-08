
import * as mUtils from '@/utils/mUtils'
import { login, logout, getInfo ,getImgToken} from '@/api/login'  // 导入登录相关接口
import { getUserList } from '@/api/user'  // 导入用户信息相关接口
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'

const user = {
  state: {
    name: '',
    token: getToken(),
	ImgToken : '',
  },
  getters: {
    token: state => state.token,
    name: state => state.name,
	ImgToken : state => state.ImgToken,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
	SET_IMGTOKEN:(state , ImgToken) => {
		state.ImgToken = ImgToken 
	},
    SET_NAME: (state, name) => {
      state.name = name
    },
	  LOG_OUT: (state) => {
	    state.user = null
	  },

  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const token = response.token;
		  commit('SET_NAME', username)
          // 登录成功之后主要目的获取token;
          // token保存方式为：setToken,'SET_TOKEN';
		  setToken(token)
          commit('SET_TOKEN', token)
          resolve()
        }).catch(error => {
          console.log(error);
          reject(error)
        })
      })
    },

    // 根据token获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data // obj
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log('LogOut-----111----');
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve, reject) => {
        console.log('LogOut-----111----');
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        // commit('CLEAR_LOCK')
        removeToken()
        resolve()
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   commit('CLEAR_LOCK')
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },




    Information({ commit }, infoForm){
      commit('INFORMATION',infoForm)
    },
	
	//用户的图片上传凭证
	TokenImg({ commit}) {
      return new Promise((resolve ,reject) => {
		getImgToken().then(response => {
			const ImgToken = response.data.data
			commit('SET_IMGTOKEN', ImgToken)
			resolve(response.data)
		}).catch(error => {
			reject(error)
		})
      })
	},

  }
}

export default user;

