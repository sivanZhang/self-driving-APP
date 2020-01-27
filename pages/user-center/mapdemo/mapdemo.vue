<template>
	<view>
		<!-- 可以注册事件触发 -->
		<map
			id="mapContainer"
			ref="mapContainer"
			:longitude="mapCenter.longitude"
			:latitude="mapCenter.latitude"
			:polyline="polylines"
			@controltap="handleControllerTap"
			:controls="controls"
			:show-location="true"
			:markers="[carMarkers]"
		>
			<cover-view class="map-btn" @click="stopGetPosition">停止</cover-view>
		</map>
	</view>
</template>

<script>
// 模拟数据
import { pathParam, pathParam2 } from './positions.js';
import { testPosition } from '@/api/usercenter.js';
export default {
	data() {
		return {
			watchId: null,
			// 是否在定位状态
			isPositionType: false,
			lineInterval: null,
			// 当前地图的上下文对象
			mapContext: null,
			//  当前地图的中心点
			mapCenter: {
				longitude: null,
				latitude: null
			},
			polylines: [],
			points: [],
			carMarkers: {
				id: 110,
				iconPath: '../../../static/car.png',
				width: 30,
				height: 30
			},
			controls: [
				{
					clickable: true,
					id: 1,
					position: {
						left: 5,
						top: 5,
						width: 36,
						height: 36
					},
					iconPath: '../../../static/end.png'
				}
			]
		};
	},
	methods: {
		getCurrentPosition() {
			this.isPositionType = true;
			// 系统检测判断
			if (uni.getSystemInfoSync().platform === 'android') {
				var g_wakelock = null;
				//允许程序后台运行，以持续获取GPS位置
				function wakeLock() {
					//Android
					var main = plus.android.runtimeMainActivity();
					var Context = plus.android.importClass('android.content.Context');
					var PowerManager = plus.android.importClass('android.os.PowerManager');
					var pm = main.getSystemService(Context.POWER_SERVICE);
					g_wakelock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, 'ANY_NAME');
					g_wakelock.acquire();
				}
			}
			this.watchId = plus.geolocation.watchPosition(
				result => {
					var f = JSON.stringify(result);
					let position = {
						longitude: result['coords']['longitude'],
						latitude: result['coords']['latitude']
					};
					this.mapCenter = position;
					this.points.push(position);
					testPosition({ ...position, speed: result.speed }).then(() => {
						console.log('发送http请求');
					});
				},
				function(err) {
					console.log('监听位置变化信息失败：' + err.message);
					var g = err.message;
				},
				{
					enableHighAccuracy: true,
					geocode: false
				}
			);

			// this.lineInterval = setInterval(() => {
			// 	uni.getLocation({
			// 		type: 'gcj02'
			// 	}).then(result => {
			// 		this.mapCenter.longitude = result[1].longitude;
			// 		this.mapCenter.latitude = result[1].latitude;
			// 		let position = {
			// 					longitude: result[1].longitude,
			// 					latitude: result[1].latitude
			// 				}
			// 		this.carMarkers.longitude = result[1].longitude;
			// 		this.carMarkers.latitude = result[1].latitude;
			// 		this.mapContext.translateMarker({
			// 			markerId: 110,
			// 			destination: position,
			// 			duration:3000,
			// 			autoRotate:true
			// 		})
			// 		points.push(position);
			// 	});
			// }, 3000);
		},
		handleControllerTap(e) {
			if (e.controlId === 1) {
				this.getCurrentPosition();
			}
		},
		handleMapReady() {
			this.mapContext = uni.createMapContext('mapContainer');
			uni.getLocation({
				type: 'gcj02'
			}).then(result => {
				this.mapCenter.longitude = result[1].longitude;
				this.mapCenter.latitude = result[1].latitude;
				this.mapContext.moveToLocation();
			});
		},
		stopGetPosition() {
			plus.geolocation.clearWatch(this.watchId);
		}
	},
	onReady() {
		this.handleMapReady();
		let polyline = {
			color: '#DC143C',
			arrowLine: true,
			width: 4,
			points: this.points
		};
		this.polylines.push(polyline);
	}
};
</script>

<style>
#mapContainer {
	position: relative;
	width: 750rpx;
	height: 100vh;
}
.map-btn {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		text-align: center;
		border-radius: 8rpx;
		color: red;
		padding: 6rpx 12rpx;
		border: 2rpx solid red;
		background-color: #FFFFFF;
	}
</style>
