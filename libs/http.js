
import uniRequest from 'uni-request'
import store from '@/store'
let Ajax = Object.create(uniRequest);
Ajax.defaults.baseURL = store.state.BaseUrl
Ajax.interceptors.request.use(
	config => {
		let token = store.state.estateToken || uni.getStorageSync('estateToken')
		token && (config.headers.Authorization = token);
		return config;
	},
	err => {
		return Promise.reject(err);
	});
Ajax.interceptors.response.use(
  response => {
    return response;
  },
  err => {
	uni.showToast({
	title: err.errMsg,
	duration: 2000,
	icon: "none"
})
    return Promise.reject(err) // 返回接口返回的错误信息
  });
	
export default Ajax