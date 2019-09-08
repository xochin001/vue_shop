import Vue from 'vue'
import Router from 'vue-router'
import {getToken} from '@/utils/auth'
Vue.use(Router)
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

const Layout = resolve => require(['@/layout/home'], resolve)
const router = new Router({
	mode: 'history',
	routes:[{
		
	    path: '/login',
	    name: 'login',
	    component: resolve => require(['@/pages/login'], resolve)
		},{
		path:'/',
		component:Layout,
		children: [{
        name: 'index',
        path: '',
        redirect: '/homePage'
		}]
	},{
		path: '/homePage',
		component: Layout,
		children: [{
		  name: 'homePage',
		  path: '',
		  component: resolve => require(['@/pages/homePage'], resolve)
		}]
	},{
		path: '/shopList',
		component: Layout,
		children: [{
		  name: 'shopList',
		  path: '',
		  component: resolve => require(['@/pages/shopList'], resolve)
		}]
	},{
		path: '/hotBenefit',
		component: Layout,
		children: [{
		  name: 'hotBenefit',
		  path: '',
		  component: resolve => require(['@/pages/hotBenefit'], resolve)
		}]
	},{
		path: '/userManage',
		component: Layout,
		children: [{
		  name: 'userManage',
		  path: '',
		  component: resolve => require(['@/pages/userManage'], resolve)
		}]
	}, {
      path: '/404',
      component: Layout,
      children: [{
        name: '404',
        path: '',
        component: resolve => require(['@/pages/errorPage'], resolve)
      }]
	}
  ]
})

	router.beforeEach((to,from , next) => {
		NProgress.start()
		if(to.path === '/login') {
			if(!getToken()){
				next()
				NProgress.done()
			}else {

				next({path:'/'})
				NProgress.done()
			}
		} else {
			if ( getToken()){
				next()
				NProgress.done()
			}else {
				next({path: `/login` })
				NProgress.done()
			}
		}
	})
	router.afterEach(() => {
	  NProgress.done()
	})
	
	export default router