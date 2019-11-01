<template>
	<view id="editProfile">
		<!-- 编辑资料 -->
		<view class="header">
			<image src="../../../static/image/touxiang.png"></image>
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
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
			};
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
			//保存
			onNavigationBarButtonTap(val) {
				console.log("保存成功")
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
	}
</style>
