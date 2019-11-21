<template>
	<view id="editProfile">
		<!-- 编辑资料 -->
		<view class="header">
			<!-- <cropper  selWidth="660rpx" selHeight="660rpx" @upload="myUpload" :avatarSrc="imageurl" avatarStyle="width:185rpx;height:185rpx;border-radius:50%;box-shadow: 1px 1px 2px #F2F2F2;border: 1.5px solid #F2F2F2;">
		</cropper> -->
			<!-- <image @tap="target('/pages/user-center/personalCenter/portrait')"   class="i" :src="'https://tl.chidict.com'+'/'+thumbnail_portait"></image> -->
			<image @tap="target('/pages/user-center/personalCenter/portrait?image='+encodeURIComponent(JSON.stringify(this.thumbnail_portait)))"
			 class="i" :src="'https://tl.chidict.com'+'/'+thumbnail_portait"></image>
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
				    <radio-group   @change="radioChange">
				    	
						<label>
					    <radio value="男" :checked="checked" />男</label>
						<label>
				       <radio value="女" :checked="checked1" />女</label>
				    </radio-group>
				</view> 
				
		         
			</view>
			<view class="bodyList">
				<view>车牌：</view>
				<view>
					<input type="text"  v-model="car_number"/>
				</view>
			</view>
			
			<view class="bodyList">
				<view>个性签名：</view>
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
		update_users
	} from '@/api/usercenter';
	import cropper from "@/components/cropper.vue";
	export default {
		data() {
			
			return {
				checked:false,
				checked1:false,
				username: '',
				sex:'',
				signature: '',
				birth: '',
				method: 'put',
				showUpImg: false,
				thumbnail_portait: '',
				car_number:null,
				
			};
		},
		components: {
			cropper
		},
		computed: {
			
			UserInfo() {
				return this.$store.state.UserInfo
			}
		},
		onLoad(option){
			// this.search();	
			
		},
		onShow() {
			this.search();

		},
		methods: {
			radioChange(e){
				this.sex = e.detail.value;
			},
			//查看用户信息
			search() {
				let data = '';
				data = this.UserInfo.id;
				search_users({
					userid: data
				}).then(({
					data
				}) => {
					this.thumbnail_portait = data.msg[0].thumbnail_portait;
                    this.username = data.msg[0].username;
					this.car_number = data.msg[0].car_number;
					this.signature = data.msg[0].signature;
					this.sex = data.msg[0].sex;
			        if(this.sex == '男'){
						this.checked = true;
						}
						else{
							this.checked1 = true;
						}
				})
				
					
			},


			target(url) {
				uni.navigateTo({
					url
				})
			},
			
			
			//保存
			save(val) {
				let data = {
					userid: this.UserInfo.id,
					sex: this.sex,
					signature: this.signature,
					carnum:this.car_number,
					method: 'put',
				};			
				update_users(data).then(res => {
					
					if (res.data.status == 0) {
						uni.showToast({
							title: res.data.msg,
							icon: "none",
						});
						uni.switchTab({
							url: '/pages/user-center/my-account',
							animationDuration: 200
						});

					}
				})


			},
			
		},
		onNavigationBarButtonTap(val) {
			let data = {
				userid: this.UserInfo.id,
				sex: this.sex,
				carnum:this.car_number,
				signature: this.signature,
				method: 'put',
			};
			
			update_users(data).then(res => {
				if (res.data.status == 0) {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
					});
					uni.switchTab({
						url: '/pages/user-center/my-account',
						animationDuration: 200
					});
			
				}
			})
			
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
