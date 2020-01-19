<template>

	<view id="track">
		<view class="top">
			<view>想要开始记录今天的车迹吗？</view>
			<image class="add" src="/static/image/journey/add1.png" @tap="target('/pages/user-center/my-account')"></image>
		</view>
		<mescroll-uni bottom="5" top="260" @down="downCallback" @up="upCallback" @init="mescrollInit">
			<view class="container">
				<view v-for="(item,index) of TrackList" :key="index">
					<view class="content">
						<view class="content-top" @tap="targe('/pages/user-center/track/signaltrack?id='+item.id)"></view>
						<uni-swipe-action>
							<uni-swipe-action-item :options="options" @click="delete_cartrack(item.id)">
								<view class="content-middle">
									<view class="uni-content-image" @tap="targe('/pages/user-center/track/signaltrack?id='+item.id)">
										<image src="/static/icons/zuji.png" />
									</view>
									<view class="date" @tap="targe('/pages/user-center/track/signaltrack?id='+item.id)">
										{{ item.start_date | dateFormat }}
									</view>
									<!-- <image class="del" src="/static/icons/delete.png" @tap="delete_cartrack(item.id)"></image> -->
									<view class="start_date" @tap="targe('/pages/user-center/track/signaltrack?id='+item.id)">
										{{item.start_date | datehmsFormat}}
										<view class="point">{{item.start_point}}</view>
									</view>
									<view class="end_date" @tap="targe('/pages/user-center/track/signaltrack?id='+item.id)">
										{{item.end_date | datehmsFormat}}
										<view class="point">{{item.end_point}}</view>
									</view>
									<view class="totaltime" @tap="targe('/pages/user-center/track/signaltrack?id='+item.id)">
										<image class="clock" src="/static/image/journey/clock.png"></image>
										{{item.dif_time}}
										<text class="mileage">{{item.mileage}}</text>
									</view>
								</view>
							</uni-swipe-action-item>
						</uni-swipe-action>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>
<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import uniSwipeAction from '@/components/swipe/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/swipe/uni-swipe-action-item.vue'
	import {
		Show_CarTrack,
		Delete_CarTrack
	} from '@/api/cartrack.js'

	export default {
		components: {
			MescrollUni,
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				TrackList: [],
				curPageData: [],
				mescroll: null, //mescroll实例对象
				pageNum: 0,
				pagesize: 0,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#DF5000'
					}
				}],
			}
		},
		onNavigationBarButtonTap(val) {
			if (val.index == 0) {
				uni.navigateTo({
					url: '/pages/user-center/track/lookLocation'
				})
			}
		},
		onLoad(option) {


		},
		onShow() {

		},

		methods: {
			target(url) {
				uni.switchTab({
					url
				})
			},
			targe(url) {
				uni.navigateTo({
					url
				})
			},

			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			downCallback(mescroll) {
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				this.pageNum = mescroll.num;
				this.pagesize = mescroll.size;
				Show_CarTrack({
					page: this.pageNum,
					pagenum: this.pagesize,
					sort: '-start',
				}).then(({
					data
				}) => {
					// console.log(data)
					this.curPageData = data.msg;
					var totalPage = data.page_count;
					var totalSize = data.count;
					//设置列表数据
					if (mescroll.num == 1) this.TrackList = []; //如果是第一页需手动置空列表
					this.TrackList = this.TrackList.concat(this.curPageData); //追加新数据
					mescroll.endByPage(this.curPageData.length, totalPage); 
				})

			},
			delete_cartrack(e) {
				var that = this;
				uni.showModal({
					content: '删除的车迹，无法恢复，是否确认删除？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							Delete_CarTrack({
								ids: e,
								method: 'delete',
							}).then(({
								data
							}) => {
								uni.showToast({
									title: data.msg,
									icon: "none",
								})
								that.mescroll.resetUpScroll()
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
		},
	}
</script>
<style scoped>
	/* #track {
		overflow-x: hidden;
	} */
	#track .top {
		z-index: 9990;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 285upx;
		color: white;
		font-size: 18px;
		padding: 5%;
		background-color: #DF5000;
	}

	#track .top .add {
		width: 100upx;
		height: 100upx;
		position: relative;
		left: 43%;
		top: 0.5rem;
	}

	#track .container {
		background-color: #F0F0F0;
		position: relative;
		padding-left: 0px;
		padding-right: 0px;
	}

	#track .container .content {
		position: relative;
		margin-bottom: -3%;
	}

	#track .container .content-top {
		padding-top: 4%;
		width: 70px;
		height: 0;
		border-width: 0 4px 10px 4px;
		border-style: solid solid solid;
		border-color: transparent transparent #fff;
		left: 5%;
		position: relative;
		margin-top: 3%;
	}

	#track .container .content-middle {
		flex: 1;
		background-color: #fff;
		position: relative;
		padding-top: 3%;
		padding-left: 4%;
		border-bottom: 2rpx solid #F0F0F0;
		/* box-shadow: 2px 2px 2px #848689; */
	}

	#track .container .content-middle .uni-content-image {

		position: relative;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
	}

	#track .container .content-middle .uni-content-image image {
		left: 1%;
		top: -0.5rem;
		position: relative;
		width: 70upx;
		height: 70upx;

	}


	#track .container .content-middle .date {
		left: 14%;
		bottom: 2rem;
		position: relative;
		display: flex;
		flex-direction: column;
		/*  align-items: center; */
	}

	/* #track .container .content-middle .del {
		left: 84%;
		width: 35upx;
		height: 35upx;
		bottom: 3rem;
		position: relative;
		display: flex;
		flex-direction: column;
	} */

	#track .container .content-middle .start_date,
	#track .container .content-middle .end_date {
		display: flex;
		flex-wrap: wrap;
		bottom: 0.8rem;
		position: relative;

	}

	#track .container .content-middle .start_date .point,
	#track .container .content-middle .end_date .point {
		position: relative;
		display: flex;
		flex-direction: column;
		left: 10%;
	}

	#track .container .content-middle .totaltime {
		display: flex;
		flex-wrap: wrap;
		left: 5%;
		position: relative;
	}

	#track .container .content-middle .totaltime .mileage {
		color: #0A98D5;
		font-size: 16px;
		position: relative;
		display: flex;
		flex-direction: column;
		left: 55%;

	}

	#track .container .content-middle .totaltime .clock {
		width: 50upx;
		height: 50upx;
		position: relative;
		right: 3%;
		bottom: 0.2rem;
	}
</style>
