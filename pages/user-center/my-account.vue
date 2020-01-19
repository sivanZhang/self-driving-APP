<template>
	<!-- 我的首页 -->
	<view id="MyAccount">
		<view class="wall">
			<!-- <view class="record" >{{longitude}}--{{latitude}}--{{speed}}</view> -->
			<view class="header" @tap="isLogin?target('/pages/user-center/track/alltrack?id='+this.id):toLogin()">

				<view class="top-left">
					<view class="milage">
						总里程数
					</view>
					<view class="total">
						<view class="number">{{distance}}</view>
						<view class="kilometers">公里</view>
					</view>
				</view>
				<!-- <image class="img" src="/static/image/journey/start.png" @tap="click"/>  -->
				<view class="top-right">
					<view class="showrank">
						<view class="name">名次</view>
						<view class="num">{{index}}</view>
					</view>
					<view class="look" @tap="target('/pages/user-center/rank/lookrank')">
						<image src="/static/icons/rank.png"></image>
						<view class="lookrank">查看排行</view>
					</view>
				</view>
			</view>

			<view class="wall-top">
				<image v-if="isLogin"  class="img" :src="imageUrl + thumbnail_portait" @tap="target('/pages/user-center/personalCenter/personalCenter')"></image>
				<image v-else class="img" src="/static/icons/zhuce.png"></image>
				<view class="top">
					<view class="information">
						<view v-if="sex == '女'">
							<image src="/static/icons/women.png"></image>
						</view>
						<view v-else>
							<image src="/static/icons/men.png"></image>
						</view>
						<template v-if="isLogin">
							<view class="username" @tap="target('/pages/user-center/personalCenter/personalCenter')">
								<span>{{username||UserInfo.phone}}</span>
							</view>
						</template>
						<navigator class="username" v-else url="/pages/login/login-page">登录 / 注册</navigator>
					</view>
					<view class="position">
						<image @tap="getLocation" src="../../static/image/position.png"></image>
						<view class="address">
							<view v-if="hasLocation === false">
								获取定位
							</view>
							<!-- #ifdef MP-WEIXIN -->
							<view v-if="hasLocation === true">
								定位失败
							</view>
							<!-- #endif -->
							<!-- #ifdef APP-PLUS -->
							<view v-if="hasLocation === true">
								{{address.city?address.city:""}}
								{{address.district?address.district:""}}
							</view>
							<!-- #endif -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view style="padding-top: 45upx;">
			<button type="primary" @tap="target1()">日志查看位置</button>
		</view> -->

		<view class="main">
			<view class="uni-content">
				<view class="uni-content-box" @tap="target('/pages/foot/my-foot')">
					<view class="uni-content-image">
						<image src="/static/icons/zuji.png" />
					</view>
					<view class="uni-content-text">车迹</view>
				</view>
				<view class="uni-content-box" @tap="target('/pages/activity/activity')">
					<view class="uni-content-image">
						<image src="/static/icons/dongtai.png" />
					</view>
					<view class="uni-content-text">动态</view>
				</view>
				<view class="uni-content-box">
					<view class="uni-content-image">
						<image class="img" v-show="stop" @tap="isLogin?track():toLogin()" src="/static/image/journey/start.png" />
						<image class="img2" v-show="!stop" @tap="isLogin?closetrack():toLogin()" src="/static/icons/open.jpg" />
					</view>
				</view>
				<view class="uni-content-box" @tap="target('/pages/user-center/track/look')">
					<view class="uni-content-image">
						<image src="/static/icons/xuanshang2.png" />
					</view>
					<view class="uni-content-text">悬赏</view>
				</view>
				<view class="uni-content-box">
					<view class="uni-content-image" @tap="target('/pages/user-center/message/mymessage')">
						<image src="/static/icons/xiaoxi.png" />
					</view>
					<view class="uni-content-text">通知</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="section" @tap="target('/pages/journey/journey')">
				<view>
					<image class="icon" src="/static/icons/mydriving.png"></image>
					正在进行的自驾之旅
				</view>
				<view>
					<block v-if="noticeData.length>0">
						<uni-badge type="error" class="badge" :text="String(noticeData.length)"></uni-badge>
					</block>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="section" @tap="target('/pages/user-center/myCollect/myclooect')">
				<view>
					<image class="icon" src="/static/icons/save.png"></image>
					我的收藏
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>

			<view class="section" @tap="target('/pages/user-center/browser-history')">
				<view>
					<image class="icon" src="/static/icons/viewhistory.png"></image>
					浏览历史
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<!-- <view class="section">
				<view>
					<image class="icon" src="/static/icons/invited.png"></image>
					邀请好友
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view> -->

			<view class="section" @tap="target('/pages/user-center/giftcenter/giftcenter')">
				<view>
					<image class="icon" src="../../static/image/journey/gift.png"></image>
					礼品中心

				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="section" @tap="target('/pages/user-center/currency/lookCurrency')">
				<view>
					<image class="icon" src="../../static/icons/xunibi.png"></image>
					虚拟币
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="section" @tap="target('/pages/user-center/user-settings')">
				<view>
					<image class="icon" src="/static/icons/setting.png"></image>
					设置
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
			<view class="section">
				<view>
					<image class="icon" src="/static/icons/fankui.png"></image>
					意见反馈
				</view>
				<view>
					<uni-icon type="arrowright"></uni-icon>
				</view>
			</view>
		</view>
		<view class="foot">
			版本:12.321.33.22
		</view>
		<uni-popup ref="popup" type="bottom">
			<map style="width: 100%; height: 300px;" :polyline='polylines' :latitude="latitude" :longitude="longitude" :markers="markers"
			 show-location="true" scale="17">
			</map> 
		</uni-popup>
	</view>
</template>

<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script>
	import store from '@/store'
	// var wv;
	import {
		search_users
	} from '@/api/usercenter'
	import {
		GET_Notice
	} from '@/api/notice'
	import {
		CarTrack_Share,
		Record_CarTrack,
		Close_CarTrack,
		Show_CarTrack,
		Show_Unclosetrack
	} from '@/api/cartrack.js'
	// import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	// #ifdef APP-PLUS
	import permision from "@/common/permission.js"
	// #endif
	import util from "@/common/util.js"
	var formatLocation = util.formatLocation;
	export default {
		components: {
			// uniBadge,
			uniIcon,
			uniPopup
		},
		data() {
			return {
				noticeData: [],
				thumbnail_portait: '',
				username: '',
				hasLocation: false,
				location: {},
				address: {},
				polylines: [],
				type: '',
				speed: '',
				sex: '',
				stop: true,
				open: '',
				close: '',
				id: '',
				unclose_id: '',
				user_id: '',
				longitude: '',
				latitude: '',
				markers: [],
				record: [],
				newrecord: [],
				locationinfo: '',
				test: [],
				newtest: [],
				oldtime:0,
				correct_test: [],
				SI: '',
				count: 0,
				add: 0,
				distance: '',
				index: '',
				new_record: [],
				newtrack: [],
				Track:[],
				list: '',
				imageUrl: '',
				startnum: 0,
				endnum: 9,
			};
		},
		computed: {
			UserInfo() {
				return this.$store.state.UserInfo
			},
			isLogin() {
				return this.$store.state.estateToken || uni.getStorageSync('estateToken')
			},
			randomNumber() {
				return Math.floor(Math.random() * (10000 - 10 + 1) + 10)
			}
		},
		methods: {
			async getLocation() {
				// #ifdef APP-PLUS
				let status = await this.checkPermission();
				// if (status !== 1) {
				// 	console.log(status)
				// 	return;
				// }
				// #endif
				this.doGetLocation();
				// this.chooseLocation()
			},
			doGetLocation() { 
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					altitude: true,
					success: (res) => {
						// console.log(res)
						this.locationinfo = res
						this.hasLocation = true;
						this.location = formatLocation(res.longitude, res.latitude);
						this.speed = res.speed
						this.address = res.address
						// console.log(this.locationinfo)
					},
					fail: (err) => {
						// console.log(err)
						try {
							var time = new Date();
							var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() +
								':' + time.getMinutes() + ':' + time.getSeconds();
							var c = '这是fail里的err内容' + ':' + JSON.stringify(err) + '--' + time1
							var old = uni.getStorageSync('log_ge');

							uni.setStorageSync('log_ge', c.concat(old));

						} catch (e) {
							// error
						}
					},
					complete: (a) => {
						// console.log(a)
						try {
							var time = new Date();
							var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() +
								':' + time.getMinutes() + ':' + time.getSeconds();
							var c = '这是complete里的内容' + ':' + time1 + '--' + JSON.stringify(a)
							var old = uni.getStorageSync('log_ge');

							uni.setStorageSync('log_ge', c.concat(old));

						} catch (e) {
							// error
						}

					}
				})



			},
			async checkPermission() {
				if (uni.getSystemInfoSync().platform == 'android') {
					// 判断平台
					var context = plus.android.importClass("android.content.Context");
					var locationManager = plus.android.importClass("android.location.LocationManager");
					var main = plus.android.runtimeMainActivity();
					var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
					if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
						uni.showModal({
							title: '提示',
							content: '请打开定位服务功能',
							showCancel: true, // 显示取消按钮
							success: function(res) {
								if (res.confirm) {
									if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
										var Intent = plus.android.importClass('android.content.Intent');
										var Settings = plus.android.importClass('android.provider.Settings');
										var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
										main.startActivity(intent); // 打开系统设置GPS服务页面
									} else {
										this.doGetLocation();
										console.log('GPS功能已开启');
									}
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					} else {
						this.doGetLocation();
					}
				} else {
					var cllocationManger = plus.ios.import("CLLocationManager");
					var enable = cllocationManger.locationServicesEnabled();
					var status = cllocationManger.authorizationStatus();
					plus.ios.deleteObject(cllocationManger);
					console.log("enable:" + enable);
					console.log("status:" + status);
					if (enable && status != 2) {
						console.log("手机系统的定位已经打开");
					} else {
						console.log("手机系统的定位没有打开");
						uni.showModal({
							title: '提示',
							content: '请打开定位服务功能',
							showCancel: true, // 不显示取消按钮
							success: function(res) {
								if (res.confirm) {
									var UIApplication = plus.ios.import("UIApplication");
									var application2 = UIApplication.sharedApplication();
									var NSURL2 = plus.ios.import("NSURL");
									var setting2 = NSURL2.URLWithString("App-Prefs:root=Privacy&path=LOCATION");
									application2.openURL(setting2);
									plus.ios.deleteObject(setting2);
									plus.ios.deleteObject(NSURL2);
									plus.ios.deleteObject(application2);
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}
			},
			getLocationTest() {
				if (this.hasLocation === true) {
					let SI = setInterval(() => {
						this.doGetLocation();
					}, 1000)
				} else {
					this.getLocation();
				}
			},
			search() {
				if (this.isLogin) {
					this.user_id = this.$store.state.UserInfo.id;
					let data = '';
					data = this.user_id;
					search_users({
						userid: data
					}).then(({
						data
					}) => {
						this.thumbnail_portait = data.msg[0].thumbnail_portait;
						this.username = data.msg[0].username;
						this.sex = data.msg[0].sex;
                        this.imageUrl = this.$store.state.BaseUrl;
					}).catch(function(err) {
						// console.log(err);
					})
				}
			},
			unclose(){
				Show_Unclosetrack().then(({ data }) => {
					// console.log(data.mark)
					if(data.mark==0){
						var that = this;
						uni.showModal({
							content: '您记录的车迹尚未结束,是否确认继续记录？',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									
								} else if (res.cancel) {
									console.log('用户点击取消');
									that.unclose_id = data.car;
									that.close = 0;
									Close_CarTrack({
										track_id: that.unclose_id,
										tag: that.close,
										method: 'put'
									}).then(({
										data
									}) => {
										uni.showToast({
											title: data.msg,
											icon: "none",
										})
										console.log(data)
									})
								}
							}
						});
					}
				});
			},
			target(url) {
				if (this.isLogin) {
					uni.navigateTo({
						url
					})
				} else {
					//为了将来返回页面
					this.$store.commit("redirect/SetRedirect", url)
					this.toLogin()
				}
			},
			// target1(url){
			// 	uni.navigateTo({
			// 		url:'/pages/user-center/track/lookLocation'
			// 	})
			// },
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/login-page"
				})
			},
			track() {
							this.doGetLocation();
							if (this.hasLocation === true) {
								this.$refs.popup.open();
								this.open = 1;
								CarTrack_Share({
									tag: this.open
								}).then(({
									data
								}) => {
									if (data.status === 0) {
										this.stop = false
										this.id = data.car_track_id
										uni.showToast({
											title: data.msg,
											icon: "none",
										})
										this.recordtrack();
									}
								})
							} else {
								uni.showToast({
									title: "请开启定位服务",
									icon: "none",
								})
							}
						},
			// track() {
			// 	this.doGetLocation();
			// 	if (this.hasLocation === true) {
			// 		this.$refs.popup.open();
			// 		let that = this;
			// 		uni.showActionSheet({
			// 			itemList: ['开始记录车迹'],
			// 			success: function(res) {
			// 				// #ifdef APP-PLUS
			// 				var styles = {};
			// 				if (!plus.webview.defaultHardwareAccelerated() && parseInt(plus.os.version) >= 5) {
			// 					styles.hardwareAccelerated = true;
			// 				}
			// 				wv = plus.webview.create("", "custom-webview", {
			// 					plusrequire: "none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
			// 					'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
			// 					top: uni.getSystemInfoSync().statusBarHeight + 300, //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
			// 					height: 500,
			// 					render: 'onscreen',
			// 				})
			// 				wv.loadURL("/hybrid/html/background.html?data=this.Track")
			// 				var currentWebview = that.$mp.page.$getAppWebview() //获取当前页面的webview对象
			// 				currentWebview.append(wv); //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
			// 				// #endif
			// 				CarTrack_Share({
			// 					tag: that.open
			// 				}).then(({
			// 					data
			// 				}) => {
			// 					if (data.status === 0) {
			// 						that.stop = false
			// 						that.id = data.car_track_id
			// 						uni.showToast({
			// 							title: data.msg,
			// 							icon: "none",
			// 						})
			// 						that.recordtrack();
			// 					}
			// 				})
			// 			}
			// 		});
			// 		this.open = 1;
			// 	} else {
			// 		uni.showToast({
			// 			title: "请开启定位服务",
			// 			icon: "none",
			// 		})
			// 	}
			// },

			recordtrack() {
				this.add = 0;
				this.startnum = 0;
				this.endnum = 9;
				this.polylines = []
				this.doGetLocation();
				this.speed = this.locationinfo.speed;
				// console.log(this.speed)
				if (this.speed < 5) {
					this.SI = setInterval(() => {
						this.doGetLocation();
						this.longitude = this.locationinfo.longitude;
						this.latitude = this.locationinfo.latitude;
						this.speed = this.locationinfo.speed;
						this.record = [this.longitude, this.latitude];
						this.test = JSON.stringify(this.locationinfo);
						var time = new Date();
						var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() +
							':' + time.getMinutes() + ':' + time.getSeconds();
						this.record1 = time1 + '--' + this.record + '--' + this.speed;
						this.newtest = this.newtest.concat(this.test);
						// console.log(this.newtest)
						this.new_record = this.new_record.concat('[' + this.record + ']');
						// console.log('['+ record2 + ']')
						this.newrecord = this.newrecord.concat('[' +
							this.record1 + ']');
						// console.log("1:前端记录发给后端的");
						// console.log('[' + this.newrecord + ']')	
						if (this.add == 0) {
							    this.add = this.add + 1;
								// console.log(this.add)
								this.oldtime = parseInt(time.getTime() / 1000);
								if(this.oldtime >0){
									var oldtest = {
										x: this.longitude.toFixed(6)*1,
										y: this.latitude.toFixed(6)*1,
										sp: this.speed,
										ag: 0,
										tm: this.oldtime
									}
									}
								var oldtast = JSON.stringify(oldtest);
								this.correct_test = this.correct_test.concat(oldtast);
								
							}
						   console.log(this.new_record.length)
						    if(this.new_record.length > 1){
								if (this.add != 0) {
									// console.log(this.oldtime)
								    	var newtime = parseInt(time.getTime() / 1000) - this.oldtime;
										// console.log(newtime)
								    	if(newtime >0){
								    	var	 oldtest = {
								    			x: this.longitude.toFixed(6)*1,
								    			y: this.latitude.toFixed(6)*1,
								    			sp: this.speed,
								    			ag: 0,
								    			tm: newtime
								    		}  
								    	}
								    	var oldtast = JSON.stringify(oldtest);
								    	this.correct_test = this.correct_test.concat(oldtast);
								}
							}
						//同步获取位置信息
						try {
							//    var old = uni.getStorageSync('log_geo' );
							// console.log(old);
							uni.setStorageSync('log_geo', this.newrecord);

						} catch (e) {
							// error
						}

						if (this.speed == 0 || 'null') {
							this.count += 1;

						}
						// console.log(this.speed)
						// console.log(this.count)

						// if((this.speed == 0 && this.count == 1) || (this.speed != 0 && record2.length > 9))
						if (((this.speed == 0 || 'null') && this.count == 1) || ((this.speed != 0 && this.speed != null) && (this.new_record).length > 9)) {
							Record_CarTrack({
								track_id: this.id,
								method: 'put',
								record: '[' + this.new_record + ']',
								test: '[' + this.newtest + ']',
								correct_test:'[' + this.correct_test + ']',
							}).then(({
								data
							}) => {
                                console.log('[' + this.correct_test + ']')
								console.log(data)

							})
							console.log('[' + this.new_record + ']');
							this.showtrack();
							this.new_record = []
							this.newtest = []
							this.add = 0;
							this.correct_test = []
						}
					}, 1000)

				} else {
					this.SI = setInterval(() => {
						this.doGetLocation();
						this.longitude = this.locationinfo.longitude;
						this.latitude = this.locationinfo.latitude;
						this.speed = this.locationinfo.speed;
						this.record = [this.longitude, this.latitude];

						this.test = JSON.stringify(this.locationinfo);
						var time = new Date();
						var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() +
							':' + time.getMinutes() + ':' + time.getSeconds();
						this.record1 = time1 + '--' + this.record + '--' + this.speed;
						this.newtest = this.newtest.concat(this.test);
						// console.log(this.newtest)
						this.new_record = this.new_record.concat('[' + this.record + ']');
						// console.log('['+ record2 + ']')
						this.newrecord = this.newrecord.concat('[' +
							this.record1 + ']');
						// console.log("1:前端记录发给后端的");
						// console.log('[' + this.newrecord + ']')	
						if (this.add == 0) {
							    this.add = this.add + 1;
								// console.log(this.add)
								this.oldtime = parseInt(time.getTime() / 1000);
								if(this.oldtime >0){
									var oldtest = {
										x: this.longitude.toFixed(6)*1,
										y: this.latitude.toFixed(6)*1,
										sp: this.speed,
										ag: 0,
										tm: this.oldtime
									}
									}
								var oldtast = JSON.stringify(oldtest);
								this.correct_test = this.correct_test.concat(oldtast);
								// console.log(this.correct_test)
							}
						
						    if(this.new_record.length > 1){
								if (this.add != 0) {
									// console.log(this.oldtime)
								    	var newtime = parseInt(time.getTime() / 1000) - this.oldtime;
										// console.log(newtime)
								    	if(newtime >0){
								    	var	 oldtest = {
								    			x: this.longitude.toFixed(6)*1,
								    			y: this.latitude.toFixed(6)*1,
								    			sp: this.speed,
								    			ag: 0,
								    			tm: newtime
								    		}  
								    	}
								    	var oldtast = JSON.stringify(oldtest);
								    	this.correct_test = this.correct_test.concat(oldtast);
								    	// console.log(this.correct_test)
								}
							}
						//同步获取位置信息
						try {
							//    var old = uni.getStorageSync('log_geo' );
							// console.log(old);
							uni.setStorageSync('log_geo', this.newrecord);

						} catch (e) {
							// error
						}

						if (this.speed == 0 || 'null') {
							this.count += 1;

						}
						// console.log(this.speed)
						// console.log(this.count)

						// if((this.speed == 0 && this.count == 1) || (this.speed != 0 && record2.length > 9))
						// console.log('[' + this.new_record + ']')

						if (((this.speed == 0 || 'null') && this.count == 1) || ((this.speed != 0 && this.speed != null) && (this.new_record).length > 9)) {
							Record_CarTrack({
								track_id: this.id,
								method: 'put',
								record: '[' + this.new_record + ']',
								test: '[' + this.newtest + ']',
								correct_test:'[' + this.correct_test + ']',
							}).then(({
								data
							}) => {

								console.log(data)

							})
							console.log('[' + this.new_record + ']');
							this.showtrack();
							this.new_record = []
							this.newtest = []
							this.add = 0;
							this.correct_test = []
						}
					}, 100)
				}

			},
			showtrack() {
				setTimeout(() => {
					console.log(this.startnum);
					console.log(this.endnum);
					console.log(this.id)
					Show_CarTrack({
						start_num: this.startnum,
						end_num: this.endnum,
						id: this.id,
					}).then(({
						data
					}) => {
						console.log(data)
						this.Track = data.msg[0].record;
						console.log("2:从后端接收的");
						console.log(this.Track)
						// if (track.length >= 0) {
						// var track1 = JSON.parse(track);
						// console.log(track1)
						// console.log(11111)
						var points = []
						this.Track.forEach((item, index) => {
							points.splice(index, 0, {
								latitude: item[1],
								longitude: item[0]
							})
						})
						this.latitude = points[0].latitude;
						this.longitude = points[0].longitude;
						if (points.length == 1) {
							this.polylines = [{
								points,
								color: "#0A98D5", //线的颜色
								width: 8, //线的宽度
								arrowLine: true, //带箭头的线 开发者工具暂不支持该属性					   		
							}];
							this.markers = [{
								iconPath: 'https://webapi.amap.com/images/car.png',
								latitude: points[0].latitude,
								longitude: points[0].longitude,
							}, ];
						}
						try {
							var oldline = uni.setStorageSync('log_polyline', this.polylines);
						} catch (e) {
							// error
						}
						try {
							var newline = uni.getStorageSync('log_polyline')
						} catch (e) {
							// error
						}
						if (points.length > 1) {
							this.polylines = [{
								points,
								color: "#0A98D5", //线的颜色
								width: 8, //线的宽度
								arrowLine: true, //带箭头的线 开发者工具暂不支持该属性					   		
							}];
							this.polylines = newline.concat(this.polylines);
							var endpoint = this.Track.length - 1
							this.markers = [{
								iconPath: 'https://webapi.amap.com/images/car.png',
								latitude: points[endpoint].latitude,
								longitude: points[endpoint].longitude,
							}, ];
							console.log(this.markers)
						}
						//}
						console.log(this.Track.length)
						if (this.Track.length != 10) {
							this.endnum = this.endnum + 10;
							this.startnum = this.endnum - 19;
						} else {
							this.endnum = this.endnum + 9;
							this.startnum = this.endnum - 9;
						}
					}).catch(function(err) {

					})
				}, 2000);
			},
			locate() {
				var watchId = plus.geolocation.watchPosition(function(p) {
					// console.log("监听位置变化信息:");
					// console.log(JSON.stringify(p));
					var f = JSON.stringify(p);
					try {
						var time = new Date();
						var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() +
							':' + time.getMinutes() + ':' + time.getSeconds();
						var lo = '这是监听位置变化信息的内容' + ':' + time1 + '--' + f
						var old = uni.getStorageSync('log_g');
						uni.setStorageSync('log_g', lo.concat(old));

					} catch (e) {
						// error
					}
				}, function(e) {
					console.log("监听位置变化信息失败：" + e.message);
					var g = e.message;
					try {
						var time = new Date();
						var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() +
							':' + time.getMinutes() + ':' + time.getSeconds();
						var lo = '这是监听位置变化信息的内容' + ':' + time1 + '--' + g
						var old = uni.getStorageSync('log_g');
						uni.setStorageSync('log_g', lo.concat(old));

					} catch (e) {
						// error
					}
				}, {
					'enableHighAccuracy': true,
					'geocode': false
				});
				var g_wakelock = null;
				//允许程序后台运行，以持续获取GPS位置  
				function wakeLock() {
					//Android  
					var main = plus.android.runtimeMainActivity();
					var Context = plus.android.importClass("android.content.Context");
					var PowerManager = plus.android.importClass("android.os.PowerManager");
					var pm = main.getSystemService(Context.POWER_SERVICE);
					g_wakelock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "ANY_NAME");
					g_wakelock.acquire();
				}
			},
			closetrack() {
				clearInterval(this.SI)
				this.new_record = []
				this.correct_test = []
				this.close = 0;
				var that = this;
				uni.showModal({
					content: '是否确认放弃记录轨迹？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							Close_CarTrack({
								track_id: that.id,
								tag: that.close,
								method: 'put'
							}).then(({
								data
							}) => {
								that.stop = true;
								uni.showToast({
									title: data.msg,
									icon: "none",
								})
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			showUserInfo() {
				Show_CarTrack({
					count: ''
				}).then(({
					data
				}) => {
					console.log('111111')
					console.log(data)
					this.list = data.msg;
					this.index = this.list.year_rank;
					this.distance = this.list.year_distance;
					this.imageUrl = this.$store.state.BaseUrl;
				})
					
			}
		},

		onLoad() {
			setTimeout(function() {
				uni.showToast({
					title: "点击中间的按钮可以开始记录车迹哦",
					icon: "none",
				})
			}, 1000);
			this.locate();
			this.getLocationTest();
			this.showUserInfo();
		},


		onShow: function() {
			this.doGetLocation();
			this.showUserInfo();
			this.search();
			this.unclose();
		},
	};
</script>

<style lang="scss">
	#MyAccount {
		overflow-x: hidden;

		.wall {
			height: 360rpx;
			position: relative;
			background: #fff;

			.record {
				margin-top: 80upx;
				margin-left: 20upx;
				font-size: 35upx;
				position: relative;
			}

			.header {
				padding-left: 30upx;
				padding-top: 50upx;
				display: flex;
				flex-wrap: wrap;

				// flex-direction: column;
				// align-items: center;
				// justify-content: center;
				// .img {
				// 	position:absolute;
				// 	width: 100upx;
				// 	height: 100upx;
				// 	margin-top:100upx;
				// 	margin-left:320upx;
				// }
				.top-left {
					padding-top: 36upx;
					padding-left: 14upx;

					// display:flex;
					// flex-direction: column;
					.milage {
						text-align: center;
						font-size: 30upx;
						border-bottom: 10upx solid #DF5000;
						width: 130upx;
					}

					.total {
						display: flex;
						// flex-wrap: wrap;
						padding-top: -8upx;

						.number {
							font-size: 84upx;
							// width:230upx;
							letter-spacing: -10upx;
						}

						.kilometers {
							font-size: 30upx;
							padding-left: 8upx;
							margin-top: 70upx;
						}
					}
				}

				.top-right {
					position: absolute;
					padding-top: 91upx;
					padding-left: 426upx;
					display: flex;
					flex-wrap: wrap;

					.showrank {
						padding: 0 10upx;
						padding-top: 8upx;
						background-color: #4D4D4D;
						height: 100upx;
						width: 100upx;
						color: #FFFFFF;
						text-align: center;

						.num {
							padding-top: 7upx;
							font-weight: bold;
						}
					}

					.look {
						padding-top: 8upx;
						display: flex;
						flex-direction: column;
						background-color: #DF5000;
						height: 100upx;
						width: 150upx;

						image {
							width: 98upx;
							height: 45upx;
							padding-left: 52upx;
						}

						.lookrank {
							color: #FFFFFF;
							padding-top: 2upx;
							// font-size:32upx;
							padding-left: 22upx;
						}
					}
				}
			}

			.wall-top {
				display: flex;
				position: absolute;
				z-index: 2;
				left: 25upx;
				top: 290upx;
				font-size: 32upx;

				.img {
					position: relative;
					left: 3%;
					width: 130rpx;
					height: 130rpx;
					border-radius: 50%;
					box-shadow: 1px 1px 2px #F2F2F2;
					border: 1.5px solid #F2F2F2;
				}

				.top {
					padding-top: 12upx;
					padding-left: 10upx;
					color: #848689;
					width: 480upx;

					.information {
						display: flex;

						image {
							width: 62upx;
							height: 28upx;
							padding-left: 34upx;
							z-index: 2;
						}

						.username {
							position: relative;
							padding-top: 6upx;
							left: 0.3rem;
						}
					}

					.position {
						padding-top: 6upx;
						display: flex;

						image {
							margin-top: 7upx;
							width: 64upx;
							height: 33upx;
							padding-left: 30upx;
							z-index: 2;
						}

						.address {
							padding-top: 15upx;
							position: relative;
							top: -0.5rem;
							left: 0.3rem;
							right: 2rem;
						}
					}
				}
			}
		}

		.main {
			height: 220upx;

			.uni-content {
				display: flex;
				flex-wrap: wrap;
				padding-left: 0upx;
				padding-top: 120upx;
				padding-right: 5upx;
			}

			.uni-content-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 20%;
				box-sizing: border-box;
			}

			.uni-content-image {
				display: flex;
				justify-content: center;
				align-items: center;

				.img {
					width: 80upx;
					height: 80upx;
				}

				.img2 {
					margin-top: -10upx;
					width: 90upx;
					height: 100upx;
				}

				image {
					width: 70upx;
					height: 70upx;
				}
			}

			.uni-content-text {
				font-size: 26upx;
				color: #333;
				padding-top: 5px;
				padding-bottom: 10px;
			}
		}

		.badge {
			background-color: #e60000 !important;
			font-size: 25upx !important;
		}

		.content {
			position: relative;
			top: -2.5rpx;

			.section {
				padding: 0 41.666upx;
				// height: 125upx;
				height: 118upx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				// border-bottom: 2.083upx solid #c8c8cc;
				&>view:nth-child(1) {

					// font-weight: bold;
					.icon {
						width: 62.5upx;
						height: 62.5upx;
						display: inline-block;
						margin-right: 37.5upx;
					}
				}

				&>view:nth-child(2) {
					color: #c8c8cc;
					display: flex;
					align-items: center;
				}
			}

			.profile {
				padding: 0 31.25rpx;
				width: 100%;
				display: flex;
				align-items: flex-end;

				image {
					width: 125rpx;
					height: 125rpx;
					border-radius: 50%;
				}
			}
		}

		.foot {
			padding-top: 40upx;
			opacity: 0.5;
			color: black;
			font-size: 25upx;
			display: flex;
			justify-content: center;
		}
	}
</style>


