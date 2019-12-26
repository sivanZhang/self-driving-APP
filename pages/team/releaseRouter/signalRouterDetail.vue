<template>
	<!-- 单个路线详情页 -->
	<view id="signalRouterDetail">
		<block>
			<view class="container section">
				<view class="detail">
					<view class="content" @click="chooseSetOutCity">
						<view>出发地</view>
						<input :value="SetOutCity" :disabled="true"  :placeholder="departure"/>
					</view>
					<view class="buttonlist">
						<view class="button" v-if="change" @tap="ChangeCity">
							<span>----------------------------------------</span>
							<image src="../../../static/icons/qiehuan.png"></image>
							<span>--</span>
						</view>
						<view class="button" v-else @tap="ChangeCity">
							<span>----------------------------------------</span>
							<image src="../../../static/icons/qiehuanchange.png"></image>
							<span>--</span>
						</view>
						<view class="button" v-if="addCity" @tap="addChange">
							<image src="../../../static/icons/add.png"></image>
							<span>--</span>
						</view>
						<view class="button" v-else @tap="addChange">
							<image src="../../../static/icons/addchange.png"></image>
							<span>--</span>
						</view>
					</view>
					<view class="content">
						<view>途经点</view>
						<view v-for="(item,index) in PassageCity" :key="index">
                           <input v-model="PassageCity[index]" :label="PassageCityList" :disabled="true" @tap="choosePassageCity(index)" placeholder="输入途经点"/>
						</view>
					</view>
					<view class="content" @click="chooseDestinationCity">
						<view>目的地</view>
						<input :value="DestinationCity" disabled :placeholder="destination"/>
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
								<input type="text" :value="startdate" :placeholder="startTime" disabled />
							</view>
						</picker>
					</view>
					<view>
						<picker mode="date" fields="day" :value="date" :start="startDate" :end="endDate" @change="bindDateChange($event,2)">
							<view class="group">
								<image src="../../../static/icons/date.png" mode="aspectFit"></image>
								<input type="text" :value="enddate" :placeholder="endTime" disabled />
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
		<!-- 选择城市插件 -->
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import {
		queryRouterDetail, editRouter
	} from '@/api/router'
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				routerid: '',
				RouterList: [],
				departure: '',
				PassageCityList: '',
				destination: '',
				startTime: '',
				endTime: '',
				contentDetail: '',
				creator_name: '',
				//选择城市
				mode:'',
				cityPickerValueDefault: [0, 0, 0],
				themeColor: '#007AFF',
				SetOutCity: '', //显示出发地名称
				DestinationCity: '', //显示目的地名称
				SetOutCityID: '', //显示出发地ID
				DestinationCityID: '', //显示目的地ID
				PassageCity: [//显示途经地名称和ID
					{peers:''}
				],
				PassageCityID:[
					{id:''}
				],
				cityid:'',
				//按钮
				change: true,
				addCity: true,
				//时间
				date: currentDate,
				startdate: "",
				enddate: "",
				//说明
				content:"",
				isLoading: false,
				// 状态
				status:''
			}
		},
		onLoad(option) {
			this.routerid = option.id;
			this.searchRouterList();
			// //选择城市
			// if (this.$refs.mpvueCityPicker.showPicker) {
			// 	this.$refs.mpvueCityPicker.pickerCancel()
			// }
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
				var areasID="";
				areasID = this.PassageCityID.map((item,index)=>{
					return item;
				}).join(",");
				let data = {
					method:"put",
					id:this.routerid,
					content : this.content,
					start:this.startdate,
					end:this.enddate,
					departure:this.SetOutCityID,
					destination:this.DestinationCityID,
					areas:areasID
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
					id: this.routerid
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
						[...item.via_list].map((res, index) => {
							if (res.sort == -1) {
								this.departure = res.area_name;
							}
							else if (res.sort == 0) {
								this.destination = res.area_name
							}else{								
								this.PassageCity[index-2] = res.area_name
							}
						})
					})
				})
			},
			//选择时间
			bindDateChange(e, type) {
				type == 1 && (this.startdate = e.target.value.replace(/-/g,'/'));
				type == 2 && (this.enddate = e.target.value.replace(/-/g,'/'));
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
			ChangeCity() {
				this.change = !this.change
			},
			//添加途经地点
			addChange() {
				this.addCity = false;
				this.PassageCity.push({peers:''});
			},
			// 取消选择城市
			onCancel(e) {
				console.log(e)
			},
			// 出发地城市选择
			chooseSetOutCity(){
			  this.mode = 'SetOutCity';
			  this.$refs.mpvueCityPicker.show();
			},
			//途经点城市选择
			choosePassageCity(e){
			   this.cityid = e
			   this.mode = 'PassageCity';
			   this.$refs.mpvueCityPicker.show();
			},
			//目的地城市选择
			chooseDestinationCity(){
			   this.mode = 'DestinationCity';
			   this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
				if(this.mode == 'SetOutCity'){
					this.SetOutCity = e.label;
				    this.SetOutCityID = e.cityCode;
				}else if(this.mode == 'PassageCity'){
					this.PassageCity[this.cityid] = e.label;
					this.PassageCityList = this.PassageCity[this.cityid];
					this.PassageCityID[this.cityid]= e.cityCode;
				}else if(this.mode == 'DestinationCity'){
					this.DestinationCity = e.label;
				    this.DestinationCityID = e.cityCode;
				}
			}
			
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
