import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import user from './modules/user'
import shops from './modules/shops'


export default new Vuex.Store({
    modules: {
        user,
        shops
    }
});

