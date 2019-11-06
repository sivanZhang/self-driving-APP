<template>
	<view id="editProfile">
		<!-- 编辑资料 -->
		<view class="header">
			<view @tap="changeImage()" >
				<image :src="image"></image>
			</view>
		</view>
		<view class="body">
			<view class="bodyList">
				<view>昵称：</view>
				<view>
					<input type="text" />
				</view>
			</view>
			<view class="bodyList">
				<view>性别：</view>
				<view>
					<input type="text" />
				</view>
			</view>
			<view class="bodyList">
				<view>生日：</view>
				<view>
					<!-- <input type="text" /> -->
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
			</view>
			<view class="bodyList">
				<view>常住地：</view>
				<view>
					<input type="text" />
				</view>
			</view>
			<view class="bodyList">
				<view>签名：</view>
				<view>
					<input type="text" />
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :show="true">
			<view class="uni-changeimage">
				<view @tap="chooseImage">从手机相册选择</view>
				<view>查看上一张头像</view>
				<view>保存到手机</view>
				<view style="padding-top: 20upx;" @tap="cancel()">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				showUpImg:false,
				date: currentDate,
				image:'../../../static/image/touxiang.png',
			};
		},
		components: {
			uniPopup,
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
			//更换图像
			changeImage() {
				showUpImg:true,
				this.$refs.popup.open()
			},
			cancel() {
				this.$refs.popup.close()
			},
			chooseImage() {
			    uni.chooseImage({
					count:1,
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'],
			        success: (res) => {
						console.log(res.tempFilePaths)
			            this.image = JSON.stringify(res.tempFilePaths);
						console.log(this.image)
			        },
			    })
			},
			// previewImage: function(e) {
			//     var current = e.target.dataset.src
			//     uni.previewImage({
			//         current: current,
			//         urls: this.image
			//     })
			// },
			//保存
			onNavigationBarButtonTap(val) {
				console.log(val)
				// uni.showToast({
				// 	title: res.data.msg,
				// 	mask: false,
				// 	duration: 1500,
				// 	icon: "none"
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
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="scss">
	#editProfile {
		.header {
			padding-top: 45upx;
			padding-bottom: 45upx;
			text-align: center;
			border-bottom: 2.083upx solid #c8c8cc;

			image {
				width: 185rpx;
				height: 185rpx;
				border-radius: 50%;
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
