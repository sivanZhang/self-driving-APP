export default {
    estateToken:uni.getStorageSync('estateToken')||'',
    UserInfo: uni.getStorageSync('UserInfo')||{},
	BaseUrl: 'https://tl.chidict.com/',
	user: {
		home: {
			id: 1,
			name: 'tax',
			img: 'static/image/face.jpg'
		},
		customer: {
			id: 2,
			name: 'customer',
			img: 'static/image/p10.jpg'
		}
	},
	isAppShow:false
}