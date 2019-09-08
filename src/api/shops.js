import request from '@/utils/request'



	export function getAllShops ( params) {
	  return request({
		  url :'/api/x',
		  method:'GET',
		  params : params
	  })
	}



	export function createShops(shopsForm) {
	  return request({
		 url: '/api/createshops',
		 method: 'post',
		 data: shopsForm
	   })
	}
// 
// export function addNewPrice (id, value) {
//   return request({
//     url: `/iron/price`,
//     method: 'POST',
//     data: {
//       id: id,
//       price: parseFloat(value)
//     }
//   })
// }
// 
// export function deleteIron (id) {
//   return request({
//     url: '/iron',
//     method: 'DELETE',
//     data: {
//       id: id
//     }
//   })
// }