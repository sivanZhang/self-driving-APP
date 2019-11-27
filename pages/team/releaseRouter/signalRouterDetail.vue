<template>
	<!-- 单个路线详情页 -->
	<view id="signalRouterDetail">
		<block>
			<view class="container section">
				<view class="detail">
					<view class="content" @click="showMulLinkageThreePicker">
						<view style="">出发地</view>
						<input style="" :value="pickerText" :disabled="true" :placeholder="departure"/>
					</view>
					<view class="buttonlist">
						<view class="button" v-if="change" @tap="qiehuanChange">
							<span>------------------------------------</span>
							<image src="../../../static/icons/qiehuan.png"></image>
							<span>--</span>
						</view>
						<view class="button" v-else @tap="qiehuanChange">
							<span>------------------------------------</span>
							<image src="../../../static/icons/qiehuanchange.png"></image>
							<span>--</span>
						</view>
						<view class="button" v-if="change1" @tap="addChange">
							<image src="../../../static/icons/add.png"></image>
							<span>--</span>
						</view>
						<view class="button" v-else @tap="addChange">
							<image src="../../../static/icons/addchange.png"></image>
							<span>--</span>
						</view>
					</view>
					<view class="content" v-if="change1== false">
						<view>途经点</view>
						<input :value="pickerText2" />
					</view>
					<view class="content" @click="showMulLinkageThreePicker1">
						<view>目的地</view>
						<input :value="pickerText1" disabled :placeholder="destination"></input>
					</view>
				</view>
			</view>
			<!-- //时间安排 -->
			<view class="container section">
				<view class="time">
					<view>
						<picker mode="date" fields="day" :value="date" :start="startDate" :end="endDate" @change="bindDateChange($event,1)">
							<view class="group">
								<image src="../../../static/icons/date.png" mode="aspectFit"></image>
								<input type="text" :value="date1" :placeholder="startTime" disabled />
							</view>
						</picker>
					</view>
					<view>
						<picker mode="date" fields="day" :value="date" :start="startDate" :end="endDate" @change="bindDateChange($event,2)">
							<view class="group">
								<image src="../../../static/icons/date.png" mode="aspectFit"></image>
								<input type="text" :value="date2" :placeholder="endTime" disabled />
							</view>
						</picker>
					</view>

				</view>
			</view>
			<!-- 路线说明 -->
			<view class="container section">
				<view class="detail">
					<textarea :value="content" :placeholder="contentDetail" @blur="bindTextAreaBlur" auto-height></textarea>
				</view>
			</view>
			<button class="submit common-btn" :loading="isLoading" @tap="submit">修改</button> 
		</block>
		<!-- 出发地 -->
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		<!-- 目的地 -->
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm1"></mpvue-city-picker>
	</view>
</template>

<script>
	import {
		queryRouterDetail, editRouter
	} from '@/api/router'
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				id: '',
				RouterList: [],
				departure: '',
				destination: '',
				startTime: '',
				endTime: '',
				contentDetail: '',
				creator_name: '',
				//选择城市
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '', //显示出发地名称
				pickerTextID: '', //显示出发地ID
				pickerText1: '', //显示目的地名称
				pickerText1ID: '', //显示目的地ID
				pickerValueDefault: [0],
				//按钮
				change: true,
				change1: true,
				//时间
				date: currentDate,
				date1: "",
				date2: "",
				//说明
				content:"",
				isLoading: false,
				// 状态
				status:''
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.searchRouterList();
			//选择城市
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
		components: {
			mpvueCityPicker
		},
		computed: {
			UserInfo() {
				return this.$store.state.UserInfo
			},
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindTextAreaBlur(e){
				this.content = e.detail.value;
			},
			//修改路线
			submit(){
				let data = {
					method:"put",
					id:this.id,
					content : this.content,
					start:this.date1,
					end:this.date2,
					departure:this.pickerTextID,
					destination:this.pickerText1ID,
				}
				editRouter(data).then(({ data })=>{
					if(data.status == 0){
						this.isLoading = false;
						uni.showToast({
							title: data.msg,
							icon: "none",
							duration: 4000
						})
						uni.navigateBack({
							delta: 1
						})
					}
				})
			},
			//查看路线详情
			searchRouterList() {
				function dateFormat(date) {
					return new Date(date * 1000).toLocaleDateString();
				}
				queryRouterDetail({
					id: this.id
				}).then(({
					data
				}) => {
					[...data.msg].map((item, index) => {
						this.contentDetail = item.content?item.content:'添加路线说明';
						this.startTime = new Date(dateFormat(item.start_date)) > 0 ?
							new Date(dateFormat(item.start_date)) : "";
						this.endTime = new Date(dateFormat(item.end_date)) > 0 ?
							new Date(dateFormat(item.end_date)) : "";
						this.creator_name = item.creator_name;
						[...item.via_list].forEach((res, index) => {
							if (res.sort == -1) {
								this.departure = res.area_name;
							}
							if (res.sort == 0) {
								this.destination = res.area_name
							}
						})
					})
				})
			},
			//选择时间
			bindDateChange(e, type) {
				type == 1 && (this.date1 = e.target.value.replace(/-/g,'/'));
				type == 2 && (this.date2 = e.target.value.replace(/-/g,'/'));
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year;
				} else if (type === 'end') {
					year = year + 10;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//切换出发地目的地
			qiehuanChange() {
				this.change = !this.change
			},
			//添加途经地点
			addChange() {
				this.change1 = !this.change1
			},
			//选择城市
			onCancel(e) {
				console.log(e)
			},
			// 出发地城市选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.pickerText = e.label;
				this.pickerTextID = e.cityCode;
			},
			// 目的地城市选择
			showMulLinkageThreePicker1() {
				this.$refs.mpvueCityPicker1.show()
			},
			onConfirm1(e) {
				this.pickerText1 = e.label;
				this.pickerText1ID = e.cityCode;
			},
			
		}
	}
</script>

<style lang="scss">
	#signalRouterDetail {
		.section {
			padding-top: 25upx;

			.detail {
				padding: 20.833rpx;
				min-height: 212.5upx;
				border: 2.083upx solid #c8c8cc;
				font-size: 27.083upx;
			}

			.content {
				padding: 15upx 10upx;

				&>view {
					padding: 5upx 10upx;
				}

				&>input {
					font-size: 32upx;
					padding-left: 10upx;
				}
			}

			.buttonlist {
				padding: 0upx 20upx;
				color: #c8c8cc;
				display: flex;
			}

			.button {
				&>image {
					height: 60upx;
					width: 60upx;
				}
			}

			.time {
				display: flex;
				padding: 25upx 20.833rpx;
				// min-height: 212.5upx;
				border: 2.083upx solid #c8c8cc;
				font-size: 27.083upx;
			}

			.group {
				display: flex;
				align-items: center;

				&>image {
					height: 60upx;
					width: 60upx;
				}

				&>input {
					padding-left: 10upx;

				}
			}
		}

		.submit {
			width: 90%;
			background-color: #DF5000;
			font-size: 32upx;
			text-align: center;
			font-family: "OpenSans-SemiBold";
			height: 100upx;
			margin-left: 38upx;
			margin-top: 80upx;
			color: #FFFFFF;
			border-radius: 50upx;
		}
	}
</style>
