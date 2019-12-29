<template>

	<view id="track">
		
		<view class="top">
			<view>想要开始记录今天的车迹吗？</view>
			<image class="add" src="/static/image/journey/add1.png" @tap="target('/pages/user-center/my-account')"></image>
		</view>
		<mescroll-uni bottom="5" top="260" @down="downCallback" @up="upCallback" @init="mescrollInit">
			<view class="container">
				<view v-for="(item,index) of TrackList" :key="index">
					<view class="content" @tap="targe('/pages/user-center/track/signaltrack?id='+item.id)">
						<view class="content-top"></view>
						<view class="content-middle">
							<view class="uni-content-image">
								<image src="/static/icons/zuji.png" />
							</view>
							<view class="date">
								{{ item.start_date | dateFormat }}
							</view>
							<view class="start_date">
								{{item.start_date | datehmsFormat}}
								<view class="point">{{item.start_point}}</view>
							</view>
							<view class="end_date">
								{{item.end_date | datehmsFormat}}
								<view class="point">{{item.end_point}}</view>
							</view>
							<view class="totaltime">
								<image class="clock" src="/static/image/journey/clock.png"></image>
								{{item.dif_time}}
								<text class="mileage">{{item.mileage}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>
<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import {

		Show_CarTrack
	} from '@/api/cartrack.js'

	export default {
		components: {
			MescrollUni,
		},
		data() {
			return {
				
				TrackList: [],
				Tracklist: [],
				mescroll: null, //mescroll实例对象

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
				mescroll.endSuccess()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData) => {
					//curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置

					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
					console.log("mescroll.num=" + mescroll.num + ", mescroll.size=" + mescroll.size + ", curPageData.length=" +
						curPageData.length);

					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					//mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					// mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					//mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
					//mescroll.endSuccess(curPageData.length);

					mescroll.endSuccess(curPageData.length)
					//设置列表数据
					if (mescroll.num == 1) this.TrackList = []; //如果是第一页需手动制空列表
					this.TrackList = this.TrackList.concat(curPageData); //追加新数据
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},

			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				//延时一秒,模拟联网
				setTimeout(() => {
					try {
						Show_CarTrack().then(({
							data
						}) => {
                            // console.log(data)
							this.Tracklist = data.msg;
							var Data = this.Tracklist;
							//模拟分页数据
							var listData = [];
							for (var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
								if (i == Data.length) break;
								listData.push(Data[i]);
							}
							//联网成功的回调
							successCallback && successCallback(listData);
						})
					} catch (e) {
						//联网失败的回调
						errorCallback && errorCallback();
					}
				}, 1000)
			}
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
		border-radius: 5px;
		background-color: #fff;
		position: relative;
		margin-bottom: -1rem;
		border-right: 2px solid #fff;
		/*  display: flex;
				 flex-wrap: wrap; */
		padding-top: 3%;
		padding-left: 4%;
		box-shadow: 2px 2px 2px #848689;
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

	#track .container .content-middle .start_date,
	#track .container .content-middle .end_date {
		display: flex;
		flex-wrap: wrap;
		bottom: 1rem;
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
