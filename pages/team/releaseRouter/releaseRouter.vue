<template>
	<!-- 发布路线 -->
	<view id="releaseRouter">
		<view>
			<view style="color: #fbb10e;text-align:center">欢迎{{UserInfo.username||UserInfo.phone}}</view>
			<view style="text-align:center">开始创建一个与他人联系的旅行吧！</view>
		</view>
		<block>
			<view class="container section">
				<view class="detail">
					<view class="content" @click="chooseSetOutCity">
						<view>出发地</view>
						<input disabled :value="SetOutCity" placeholder="北京市"/>
					</view>
					<view class="buttonlist">
						<view class="button" v-if="change" @tap="ChangeCity">
							<span>---------------------------------------</span>
							<image src="../../../static/icons/qiehuan.png"></image>
							<span>--</span>
						</view>
						<view class="button" v-else @tap="ChangeCity">
							<span>---------------------------------------</span>
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
                           <input v-model="PassageCity[index].peers" :disabled="true" @tap="choosePassageCity(index)" placeholder="输入途经点"/>
						</view>
					</view>
					<view class="content" @click="chooseDestinationCity">
						<view>目的地</view>
						<input disabled :value="DestinationCity" placeholder="北京市"/>
					</view>
				</view>
			</view>
			<!-- //时间安排 -->
			<view class="container section">
					<view class="time">
						<view>
							<picker mode="date" fields="day" :value="date" :start="startDate" :end="endDate" @change="bindDateChange($event,1)">
								<view class="group" >
									<image src="../../../static/icons/date.png" mode="aspectFit"></image>
									<input type="text" :value="startdate" placeholder="出发日期" disabled />
								</view>
							</picker>
						</view>
						<view>
							<picker mode="date" fields="day" :value="date" :start="startDate" :end="endDate" @change="bindDateChange($event,2)">
								<view class="group">
									<image src="../../../static/icons/date.png" mode="aspectFit"></image>
									<input type="text" :value="enddate" placeholder="返回日期" disabled />
								</view>
							</picker>
						</view>
						
					</view>
			</view>
			<!-- 路线说明 -->
			<view class="container section">
				<view class="detail">
					<textarea :value="content" placeholder="添加路线说明" @blur="bindTextAreaBlur" auto-height></textarea>
				</view>
			</view>
			<button class="submit common-btn" :loading="isLoading" @tap="submit">发布</button>
			
		</block>
		<!-- 城市插件 -->
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import {
		createRouterDetail
	} from '@/api/router'
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				//选择城市
				cityPickerValueDefault: [0, 0, 0],
				themeColor: '#007AFF',
				SetOutCity: '', //显示出发地名称
				SetOutCityID: '', //显示出发地ID
				DestinationCity: '', //显示目的地名称
				DestinationCityID: '', //显示目的地ID
				// pickerValueDefault: [0],
				PassageCity: [//显示途经地名称和ID
					{peers:''}
				],
				PassageCityID:[
					{id:''}
				],
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
				status:'',
				cityid:''

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
		onLoad() {

		},
		methods: {
			bindTextAreaBlur(e){
				this.content = e.detail.value;
			},
			//发布
			submit(){
				this.isLoading = true;
				var areasID="";
				areasID = this.PassageCityID.map((item,index)=>{
					return item.id;
				}).join(",");
				let data = {
					content : this.content,
					start:this.startdate,
					end:this.enddate,
					departure:this.SetOutCityID,
					destination:this.DestinationCityID,
					status:1,
                    areas:areasID
				}
				createRouterDetail(data).then(({ data })=>{
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
			//取消选择城市
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
					this.PassageCity[this.cityid].peers = e.label;
					this.PassageCityID[this.cityid].id= e.cityCode;
				}else if(this.mode == 'DestinationCity'){
					this.DestinationCity = e.label;
				    this.DestinationCityID = e.cityCode;
				}
			}
		},
		onNavigationBarButtonTap(val) {
			if (val.index == 0) {
				console.log("第一个按钮");
				// uni.navigateTo({
				// 	url: '/pages/team/releaseRouter/releaseRouter'
				// });
			};
		}
	}
</script>

<style lang="scss">
	#releaseRouter {
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
			.time{
				display: flex;
				padding: 25upx 20.833rpx;
				// min-height: 212.5upx;
				border: 2.083upx solid #c8c8cc;
				font-size: 27.083upx;
			}
			.group{
				display: flex;
				align-items:center ;
				&>image{
					height: 60upx;
					width: 60upx;
				}
				&>input{
					padding-left: 10upx ;
					
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
