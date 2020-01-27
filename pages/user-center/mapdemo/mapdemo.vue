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
			<cover-view style="position: absolute;bottom: 0;right: 0;color: red;">lon:{{ test.longitude.toFixed(2) }} lat:{{ test.latitude.toFixed(2) }}</cover-view>
		</map>
	</view>
</template>

<script>
import { pathParam, pathParam2 } from './positions.js';
import { testPosition } from '@/api/usercenter.js';
export default {
	data() {
		return {
			test: {
				longitude: null,
				latitude: null
			},
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
		testBackend() {
			var watchId = plus.geolocation.watchPosition(
				function(p) {
					// console.log("监听位置变化信息:");
					// console.log(JSON.stringify(p));
					var f = JSON.stringify(p);
					console.log('in watch position');
					//console.log(f)
					try {
						var time = new Date();
						var time1 =
							time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
						var lo = '这是监听位置变化信息的内容' + ':' + time1 + '--' + f;
						var old = uni.getStorageSync('log_g');
						uni.setStorageSync('log_g', lo.concat(old));
					} catch (e) {
						console.log('catch watch2 error:');
						console.log(e.message);
					}
				},
				function(e) {
					console.log('监听位置变化信息失败：' + e.message);
					var g = e.message;
					try {
						var time = new Date();
						var time1 =
							time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
						var lo = '这是监听位置变化信息的内容' + ':' + time1 + '--' + g;
						var old = uni.getStorageSync('log_g');
						uni.setStorageSync('log_g', lo.concat(old));
					} catch (e) {
						// error
						console.log('catch watch1 error:');
						console.log(e.message);
					}
				},
				{
					enableHighAccuracy: true,
					geocode: false
				}
			);
		},
		getCurrentPosition() {
			this.isPositionType = true;
			// #ifdef APP-PLUS
			var watchId = plus.geolocation.watchPosition(
				p => {
					var f = JSON.stringify(p);

					console.log(p['coords']['latitude']);
					console.log(p['coords']['longitude']);
					let position = {
						longitude: p['coords']['longitude'],
						latitude: p['coords']['latitude']
					};
					this.test = position;
					this.mapCenter = position;
					this.points.push(position);
					testPosition(position).then(() => {
						console.log('http请求');
					});
				},
				function(e) {
					console.log('监听位置变化信息失败：' + e.message);
					var g = e.message;
				},
				{
					enableHighAccuracy: true,
					geocode: false
				}
			);
			// #endif

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
		}
	},
	watch: {
		'$store.state.isAppShow': {
			hadler: function(bl) {
				console.log(bl);
			}
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
	},
	onLoad() {
		//this.testBackend();
	}
};
</script>

<style>
#mapContainer {
	position: relative;
	width: 750rpx;
	height: 1000rpx;
}
</style>
