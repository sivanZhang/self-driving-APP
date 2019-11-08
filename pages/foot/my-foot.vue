<template>
	<view style="overflow-x: hidden;">
		<view style="position:relative;width:100%;background-color:#DAC2A6">
			<text style="position:relative;font-size:15px;left:2rem;top:0.5rem;">今天</text>
			<view class="uni-uploader-body">
				<view class="uni-uploader__files">
					<block v-for="(image,index) in imageList" :key="index">
						<view class="uni-uploader__file">
							<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage" mode="aspectFill"></image>
							<image src="../../static/image/journey/de.png" class="remove" :data-index="index" @tap='deleteImage' style=" position:relative;width: 38upx;height: 38upx;top:-5.5rem;left:4.5rem;"></image>

						</view>
					</block>
					<view class="uni-uploader__input-box">
						<view class="uni-uploader__input" @tap="chooseImage"></view>
					</view>
				</view>
			</view>
		</view>
		<view style="position:relative;width:100%;background-color:#DAC2A6;top:1rem">
			<view style="position:relative;font-size:15px;left:1rem;top:0.5rem;height:4rem;">10月13日</view>
			<view class="uni-uploader-box">
				<view class="uni-uploader__files">
					<block v-for="(image,index) in imageLis" :key="index">
						<view class="uni-uploader__file">
							<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage" mode="aspectFill"></image>
							<image src="../../static/image/journey/de.png" class="remov" :data-index="index" @tap='deleteImage' style=" position:relative;width: 38upx;height: 38upx;top:-5.5rem;left:4.5rem;"></image>
			
						</view>
					</block>
					<view class="uni-uploader__input-bo">
						<view class="uni-uploader__inpu" @tap="chooseImag"></view>
					</view>
				</view>
			</view>
			<text style="position:relative;font-size:15px;left:7rem;top:-9rem;">今天放假，专门去北京转转</text>
			<image style="width:3rem;height:3rem;top:-4rem;left:-1rem;position:relative;" src="../../static/image/journey/e.png"
			 @click="chooseLocation"></image>
			<block v-if="hasLocation === false">
				<view style="top:-6rem;left:12rem;position:relative;">未选择位置</view>
			</block>
			<block v-if="hasLocation === true">
				<view style="width:5rem;top:-6rem;left:12rem;position:relative;">
					{{locationAddress}}
				</view>
			</block>
		</view>
		<view style="position:relative;width:100%;background-color:#DAC2A6;top:2rem">
			<view style="position:relative;font-size:15px;left:1rem;top:0.5rem;height:4rem;">10月11日</view>
			<view class="uni-uploader-box">
				<view class="uni-uploader__files">
					<block v-for="(image,index) in imageLis" :key="index">
						<view class="uni-uploader__file">
							<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage" mode="aspectFill"></image>
							<image src="../../static/image/journey/de.png" class="remov" :data-index="index" @tap='deleteImage' style=" position:relative;width: 38upx;height: 38upx;top:-5.5rem;left:4.5rem;"></image>
			
						</view>
					</block>
					<view class="uni-uploader__input-bo">
						<view class="uni-uploader__inpu" @tap="chooseImag"></view>
					</view>
				</view>
			</view>
			<text style="position:relative;font-size:15px;left:7rem;top:-9rem;">今天放假，专门去北京转转</text>
			<image style="width:3rem;height:3rem;top:-4rem;left:-1rem;position:relative;" src="../../static/image/journey/e.png"
			 @click="chooseLocation"></image>
			<block v-if="hasLocation === false">
				<view style="top:-6rem;left:12rem;position:relative;">未选择位置</view>
			</block>
			<block v-if="hasLocation === true">
				<view style="width:5rem;top:-6rem;left:12rem;position:relative;">
					{{locationAddress}}
				</view>
			</block>
		</view>
		<view style="position:relative;width:100%;background-color:#DAC2A6;top:3rem">
			<view style="position:relative;font-size:15px;left:1rem;top:0.5rem;height:4rem;">10月10日</view>
			<view class="uni-uploader-box">
				<view class="uni-uploader__files">
					<block v-for="(image,index) in imageLis" :key="index">
						<view class="uni-uploader__file">
							<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage" mode="aspectFill"></image>
							<image src="../../static/image/journey/de.png" class="remov" :data-index="index" @tap='deleteImage' style=" position:relative;width: 38upx;height: 38upx;top:-5.5rem;left:4.5rem;"></image>
			
						</view>
					</block>
					<view class="uni-uploader__input-bo">
						<view class="uni-uploader__inpu" @tap="chooseImag"></view>
					</view>
				</view>
			</view>
			<text style="position:relative;font-size:15px;left:7rem;top:-9rem;">今天放假，专门去北京转转</text>
			<image style="width:3rem;height:3rem;top:-4rem;left:-1rem;position:relative;" src="../../static/image/journey/e.png"
			 @click="chooseLocation"></image>
			<block v-if="hasLocation === false">
				<view style="top:-6rem;left:12rem;position:relative;">未选择位置</view>
			</block>
			<block v-if="hasLocation === true">
				<view style="width:5rem;top:-6rem;left:12rem;position:relative;">
					{{locationAddress}}
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	var util = require('../../common/util.js');
	var formatLocation = util.formatLocation;
	import permision from "@/common/permission.js";
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data() {
			return {
				hasLocation: false,
				location: {},
				locationAddress: '',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		onUnload() {
			this.imageList = [],
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 8;
		},
		methods: {
			chooseLocation: function() {
				uni.chooseLocation({
					success: (res) => {
						this.hasLocation = true,
							this.location = formatLocation(res.longitude, res.latitude),
							this.locationAddress = res.address
					}
				})
			},
			//删除图片
			deleteImage: function(e) {
				var index = e.target.dataset.index;
				var that = this;
				var images = that.imageList;
				images.splice(index, 1);
				that.imageList = images;
			},
			sourceTypeChange: function(e) {
				this.sourceTypeIndex = parseInt(e.target.value)
			},
			sizeTypeChange: function(e) {
				this.sizeTypeIndex = parseInt(e.target.value)
			},
			countChange: function(e) {
				this.countIndex = e.target.value;
			},
			chooseImag:async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						// this.imageList = this.imageList.concat(res.tempFilePaths);
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
				},
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif

				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');

				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}

				return status;
			}
		}
	}
</script>

<style>
	/* 上传 */
	.uni-uploader {
		flex: 1;
		flex-direction: column;
	}

	.uni-uploader-head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.uni-uploader-info {
		color: #B2B2B2;
	}

	.uni-uploader-body {
		margin-top: 16upx;
	}

	.uni-uploader__files {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.uni-uploader__file {
		margin: 10upx;
		width: 210upx;
		height: 210upx;

	}
 
   
	.uni-uploader__img {
		display: block;

		width: 210upx;
		height: 210upx;

		left: 1rem;
	}

	.uni-uploader__input-box {
		position: relative;
		margin: 10upx;
		width: 208upx;
		height: 208upx;
		border: 2upx solid #F2F2F2;
	}

	.uni-uploader__input-box:before,
	.uni-uploader__input-box:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #F2F2F2;
	}

	.uni-uploader__input-box:before {
		width: 4upx;
		height: 79upx;
	}

	.uni-uploader__input-box:after {
		width: 79upx;
		height: 4upx;
	}

	.uni-uploader__input-box:active {
		border-color: #F2F2F2;
	}

	.uni-uploader__input-box:active:before,
	.uni-uploader__input-box:active:after {
		background-color: #F2F2F2;
	}

	.uni-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.uni-uploader__input-bo {
		position: relative;
		margin: 10upx;
		width: 208upx;
		height: 208upx;
		border: 2upx solid #F2F2F2;
	}
	
	.uni-uploader__input-bo:before,
	.uni-uploader__input-bo:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #F2F2F2;
	}
	
	.uni-uploader__input-bo:before {
		width: 4upx;
		height: 79upx;
	}
	
	.uni-uploader__input-bo:after {
		width: 79upx;
		height: 4upx;
	}
	
	.uni-uploader__input-bo:active {
		border-color: #F2F2F2;
	}
	
	.uni-uploader__input-bo:active:before,
	.uni-uploader__input-bo:active:after {
		background-color: #F2F2F2;
	}
	
	 .uni-uploader__inpu {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
