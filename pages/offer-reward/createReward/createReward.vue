<template>
	<view id="createRward">
		<!-- 创建悬赏 -->
		<view class="header">
			<form style="width:100%;" @submit="formSubmit" @reset="formReset">
				<view class="bodyList" style="display: flex;">
					<view class="body-start">
						<view>出发日：</view>
						<view>
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="uni-input">{{ date }}</view>
							</picker>
						</view>
					</view>
					<view class="body-end">
						<view>返回日：</view>
						<view>
							<picker mode="date" :value="date2" :start="startDate" :end="endDate" @change="bindDateChange2">
								<view class="uni-input">{{ date2 }}</view>
							</picker>
						</view>
					</view>
				</view>
				<view style="justify-content: space-between;" class="list" @tap="target('/pages/cityList/index')">
					<view>目的地</view>
					<view style="display: flex;width: 150upx;">
						<input type="text" placeholder="北京" v-model="destination" />
						<uni-icon type="arrowright"></uni-icon>
					</view>
				</view>
				<view style="justify-content: space-between;" class="list" @tap="target('/pages/cityList/index')">
					<view>出发地</view>
					<view style="display: flex;width: 150upx;">
						<input type="text" placeholder="北京" v-model="origin" />
						<uni-icon type="arrowright"></uni-icon>
					</view>
				</view>
				<view style="" class="list">
					<view>赏金</view>
					<input style="padding-left:15upx" focus />
				</view>
				<view style="justify-content: center;" class="list">
					<view>悬赏详情</view>
				</view>
				<!-- <view class="uni-btn-v">
					<button form-type="submit">Submit</button>
					<button type="default" form-type="reset">Reset</button>
				</view> -->
			</form>
			<!-- <ss-select-city v-if="showAddress" :hotCitys="hotCitys" v-model="value"></ss-select-city> -->
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	// import ssSelectCity from '@/components/ss-select-city/ss-select-city.vue'

	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				date: currentDate,
				date2: currentDate,
				hotCitys: ['杭州', '天津', '北京', '上海', '深圳', '广州', '成都', '重庆', '厦门'],
				value: '杭州',
				showAddress: false,
				destination: '',
				origin: '',
			};
		},
		components: {
			uniIcon,
			// ssSelectCity
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			//跳转到城市列表
			target(url) {
				uni.navigateTo({
					url
				});

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
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindDateChange: function(e) {
				this.date = e.target.value;
			},
			bindDateChange2: function(e) {
				this.date2 = e.target.value;
			},
			formSubmit: function(e) {
				console.log(this.date);
				console.log(this.date2);
			}
		},
		//点击导航栏确定按钮，触发事件
		onNavigationBarButtonTap(val) {
			console.log("保存成功");
		}
	};
</script>

<style lang="scss">
	#createRward {
		background-color: #efefef;
		height: 100vh;
		width: 100%;

		.header {
			font-size: 32upx;
			display: flex;
			align-items: center;

			.body-start {
				background-color: #FFFFFF;
				display: flex;
				justify-content: center;
				padding: 30upx 25upx;
				width: 50%;
				border-right: 1px solid #c8c8cc;
				border-bottom: 1px solid #c8c8cc;
				border-top: 1px solid #c8c8cc;
			}

			.body-end {
				background-color: #FFFFFF;
				display: flex;
				justify-content: center;
				padding: 30upx 20upx;
				width: 50%;
				border-bottom: 1px solid #c8c8cc;
				border-top: 1px solid #c8c8cc;
			}

			.uni-icon {
				color: #c8c8cc;
			}

			.list {
				background-color: #FFFFFF;
				padding: 20upx 25upx;
				display: flex;
				align-items: center;
				border-bottom: 2.083upx solid #efefef;
			}

		}

	}
</style>
