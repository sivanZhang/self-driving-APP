<template>
	<!-- 我的首页 -->
	<view id="MyAccount">
		<view class="wall">

			<view class="header">

				<image src="../../static/image/journey/map.png"  style="width:100vw;height:40vw;position:absolute;z-index:1;top:5%;"></image>
				<image class="img" src="/static/image/journey/start.png" />  
				<!-- <web-view      src="/hybrid/html/line.html" ></web-view> -->
			</view>
			
			<view class="wall-top" >
				<view style="display: flex;">
					<image   class="i" :src="'https://tl.chidict.com'+'/'+thumbnail_portait" @tap="target('/pages/user-center/personalCenter/personalCenter')"></image>
					<view class="top" style="display:flex;padding-top:20upx;padding-left:10upx;">
						<view class="position">
							<image @tap="getLocation"  src="../../static/image/position.png"></image>
							<view class="address">
								<view v-if="hasLocation === false">
									获取定位
								</view>
								<view v-if="hasLocation === true">
									{{address.province}}{{address.city}}{{address.district}}
								</view>
							</view>
						</view>
						<view class="top-header" @tap="target('/pages/user-center/personalCenter/personalCenter')">
							<span style="font-weight: bold">{{username||'用户'+UserInfo.phone}}</span>
							<!-- <view v-if="UserInfo.sex == '女'">
								<image src="/static/icons/women.png"></image>
							</view>
							<view v-else>
								<image src="/static/icons/men.png"></image>
							</view> -->

						

						</view>
					</view>
				</view>
			</view>
		</view>
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
			<view class="section">
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
			<view class="section">
				<view>
					<image class="icon" src="/static/icons/invited.png"></image>
					邀请好友
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
			版本:12.321.33
		</view>

	</view>
</template>

<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script>
	// var wv;
	import {
		search_users
	} from '@/api/usercenter'
	import {
		GET_Notice
	} from '@/api/notice'
	// import uniBadge from "@/components/uni-badge/uni-badge.vue"
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
		},
		data() {
			return {
				noticeData: [],
				thumbnail_portait: '',
				username:'',
				hasLocation: false,
				location: {},
				address: {},
				type: '',
				name:null,
			};
		},
		computed: {
			UserInfo() {
				return this.$store.state.UserInfo
			},
            
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
					success: (res) => {
						console.log(res)
						this.hasLocation = true;
						this.location = formatLocation(res.longitude, res.latitude);
					    this.address = res.address
						this.name = res.address.poiName
					},
					fail: (err) => {
						console.log((err))
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
							success: function (res) {
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
							success: function (res) {
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
			async getLocationTest() {
			    if(this.hasLocation === true){
					let SI = setInterval(()=> {
			           this.doGetLocation();
			        },1000)
				} else {
					this.getLocation();
				}
			},
			search(){
				let data = '';
				data=this.UserInfo.id;
				search_users({
					userid: data
				}).then(({
					data
				}) => {
					this.thumbnail_portait = data.msg[0].thumbnail_portait;
					this.username = data.msg[0].username;
				})
			},
			target(url) {
				uni.navigateTo({
					url
				})
			},
		},
		onLoad() { 
			const Token = this.$store.state.estateToken || uni.getStorageSync('estateToken');
			if (!Token) {
				uni.navigateTo({
					url: "/pages/login/login-page"
				})
			}
			   //     // #ifdef APP-PLUS
			   //      wv = plus.webview.create("","custom-webview",{
			   //          plusrequire:"none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
			   //           'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
			   //          top:uni.getSystemInfoSync().statusBarHeight,//放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
						// height:100,
			   //      })
			   //      wv.loadURL("/hybrid/html/background.html")
			   //      var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			   //      currentWebview.append(wv);//一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
			   //      setTimeout(function() {
			   //          console.log(wv.getStyle())
			   //      }, 1000);//如果是首页的onload调用时需要延时一下，二级页面无需延时，可直接获取
			   //      // #endif
			this.getLocationTest();
		},
		onShow: function(){
			this.doGetLocation();
			this.search();
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
			.wall-top {
				position: relative;
				z-index: 2;
				left: 12upx;
				top:5rem;
				font-size: 32upx;
				.i {
					position:relative;
					left:3%;
 				    width: 130rpx;
					height: 130rpx;
					border-radius: 50%;
					box-shadow: 1px 1px 2px #F2F2F2;
					border: 1.5px solid #F2F2F2;
				}
			}
			.header {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				
				.img {
					width: 100upx;
					height: 100upx;
					position:relative;
					z-index:2;
					top:3rem;
				}
			}
            .position{
				image {
					width: 70upx;
					height: 45upx;
					padding-left: 30upx;
					z-index: 2;
				}
				.address{
					
					position:relative;
					top:-1.5rem;
					right:-2rem;
				}
			}
			.top-header {
				position:relative;
				left:2.5rem;
				color: black;
			}
			.top-bottom {
				display: flex;
				flex-wrap: nowrap;
				padding-left: 15upx;
				padding-top: 10upx;
			}
		}
		.main {
			height: 220upx;
			.uni-content {
				display: flex;
				flex-wrap: wrap;
				padding-left: 0upx;
				padding-top: 85upx;
				padding-right: 5upx;
			}
			.uni-content-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 25%;
				box-sizing: border-box;
			}
			.uni-content-image {
				display: flex;
				justify-content: center;
				align-items: center;
		
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