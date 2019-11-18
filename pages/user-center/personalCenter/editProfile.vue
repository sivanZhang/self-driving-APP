<template>
	<view id="editProfile">
		<!-- 编辑资料 -->
		<view class="header">
			<!-- <cropper  selWidth="660rpx" selHeight="660rpx" @upload="myUpload" :avatarSrc="imageurl" avatarStyle="width:185rpx;height:185rpx;border-radius:50%;box-shadow: 1px 1px 2px #F2F2F2;border: 1.5px solid #F2F2F2;">
		</cropper> --> 
			<image @tap="target('/pages/user-center/personalCenter/portrait')"   class="i" :src="'https://tl.chidict.com'+'/'+UserInfo.thumbnail_portait"></image>
		</view>
  
		<view class="body">
			<view class="bodyList">
				<view>昵称：</view>
				<view>
					<input type="text" v-model="username" />  
				</view>
			</view>

			<view class="bodyList">
				<view>性别：</view>
				<view>
					<input type="text" v-model="sex" />  
				</view>
			</view>
			<view class="bodyList">
				<view>生日：</view>
				<view>
					<!-- <input type="text" /> -->
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input" v-model="birth">{{date}}</view>
					</picker>
				</view>
			</view>
			<view class="bodyList">
				<view>常住地：</view>
				<view>
					<input type="text" v-model="area" />
				</view>
			</view>
			<view class="bodyList">
				<view>签名：</view>
				<view>
					<input type="text" v-model="signature" />
				</view>
			</view>
		</view>
		<view style="padding: 15upx;">
			<button type="primary" @tap="save">保存</button>
			
		</view>
	</view>
</template>

<script>
	import {
		search_users,
		post_file,
		update_users
	} from '@/api/usercenter';
	import cropper from "@/components/cropper.vue";
	
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				imageurl:'https://tl.chidict.com'+'/'+this.$store.state.UserInfo.thumbnail_portait,
				username:this.$store.state.UserInfo.username,
				sex:this.$store.state.UserInfo.sex,    
				area:110100,
				signature: '',  
				birth: '',  
				method: 'put',
				showUpImg: false,
				date: currentDate,
				array: [{name:'男'},{name: '女'}],
				index: 0,
			};
		},
		components: {
			cropper
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			UserInfo() {
				return this.$store.state.UserInfo
			}
		},
		
		methods: {
			target(url) {
				uni.navigateTo({
					url
				})
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value
			},
			//上传返回图片
			// myUpload(rsp) {
				
			// 	console.log(rsp)
			// 	const self = this;
			// 	self.imageurl = rsp.path; //更新头像方式一	
			// 	uni.uploadFile({
			// 		url: 'https://tl.chidict.com/appfile/appfile/',
			// 		filePath:rsp.path,  
			// 		name: 'file', 
			// 		header: {
			// 			"Content-Type": "multipart/form-data",
			// 			'Authorization': uni.getStorageSync('estateToken') || this.$store.state.estateToken,
			// 		},
			// 		success: (res) => {
			// 			let data = JSON.parse(res.data)
			// 			this.msg = data.msg
			// 			console.log(this.msg)
			// 			uni.showToast({
			// 				title: '上传成功',
			// 				icon: "none",
			// 			});
			// 		},
			// 		fail: () => {
			// 			uni.showToast({
			// 				title: '上传失败'
			// 			});
			// 		}
			// 	});
			// 	rsp.avatar.imgSrc = rsp.path; //更新头像方式二
			// },
			//保存
			save(val) {
				let data = {
					userid: this.$store.state.UserInfo.id,
					username: this.username,
					sex: this.sex,
					signature: this.signature,
					area: this.area,
					method: 'put',
				};
				
				update_users(data).then(res => {
					console.log(res)
					uni.showToast({
						title: res.data.msg,
						icon: "none",
					});
					
				})
				uni.reLaunch({
					url:'/pages/user-center/my-account',
					animationDuration: 200
				});
				// search_users({
				// 	userid: this.$store.state.UserInfo.id
				// }).then(res => {
				// 	console.log(res)
				// })
			},  
			
				
			
			onNavigationBarButtonTap(val) {
				let data = {
					userid: this.$store.state.UserInfo.id,
					username: this.username,
					sex: this.sex,
					signature: this.signature,
					area: this.area,
					method: 'put',
				};
				
				update_users(data).then(res => {
					console.log(res)
					uni.showToast({
						title: res.data.msg,
						icon: "none",
					});
				})
				// uni.reLaunch({
				// 	url:'/pages/login/login-page',
				// 	animationDuration: 200
				// });
			},
			//选择出生日期
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}/${month}/${day}`;
			}
		},
		
	}
</script>

<style lang="scss">
	#editProfile {
		.header {
			padding-top: 45upx;
			padding-bottom: 45upx;
			text-align: center;
			border-bottom: 2.083upx solid #c8c8cc;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.i {
				width: 185rpx;
				height: 185rpx;
				border-radius: 50%;
				box-shadow: 1px 1px 2px #F2F2F2;
				border: 1.5px solid #F2F2F2;
			}
		}

		.body {
			.bodyList {
				display: flex;
				align-items: center;
				padding: 50.25upx 41.666upx;
				border-bottom: 2.083upx solid #c8c8cc;
			}
		}

		.uni-changeimage {

			// background: #fff;
			// background: #C8C8CC;
			&>view {
				background: #fff;
				padding: 0 41.666upx;
				height: 118upx;
				border-bottom: 2.083upx solid #c8c8cc;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
