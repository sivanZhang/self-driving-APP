<template>
	<!-- 展示所有的路线详情 -->
	<view id="allRouterDetail">
		<view style="padding: 15upx;">
			<button type="primary" @tap="target('/pages/team/releaseRouter/releaseRouter')">临时发布路线按钮</button>
		</view>
		<block v-for="(item,index) of RouterList" :key="index">
			<view class="container section">
				<view class="detail">
					<view class="content">
						<view class="content-top">
							<image src="../../../static/image/face.jpg"></image>
							<view class="content-middle">
								<h4>{{item.creator_name}}</h4>
								<p>发布日期:{{item.create_date|dateFormat}}</p>
							</view>
							<view class="content-right">
								<view class="content-right-follow" v-if="followClick" @tap="addConcern(item.id,index)">
									<view style="font-size: 24upx;" class="iconfont icon-jiahao"></view>
									<view>关注</view>
								</view>
								<view class="content-right-followover" v-else>
									<view style="font-size: 24upx;" class="iconfont icon-duigou"></view>
									<view>已关注</view>
								</view>
							</view>
						</view>
						<view class="place-list">
							<view class="place" v-for="(row,index) of item.via_list" :key="index">
								<view @tap="target('/pages/team/releaseRouter/signalRouterDetail?id='+item.id)">
									<view style="align-items: center;">
										<view class="place-left" v-if="row.sort == -1">
											<text>{{row.area_name}}</text>
											<image style="width:80upx ;height: 60upx;" src="../../../static/icons/youjiantou.png"></image>
										</view>
										<view class="place-left" v-if="row.sort == 0">
											<text>{{row.area_name}}</text>
										</view>
									</view>
									<view v-if="show">
										<text style="font-size: 22upx;">{{row.area_name}}-</text>
									</view>
								</view>
							</view>
							<view class="place-point" @tap="placePoint">
								<image style="height:40upx;width: 40upx;" src="../../../static/image/position.png"></image>
								<text>途经点</text>
							</view>
						</view>
						<view class="place-list">
							<view>
							<span style="font-weight: bold;">时间安排：</span>
							{{ item.start_date | dateFormat }}--{{ item.end_date | dateFormat }}
							</view>
						    <!-- <view v-if="item.creator_id == UserInfo.id" @tap="deleteRouter(item.id)"><span style="color: #848689;">删除</span></view> -->
						</view>
					</view>
				</view>
				<view class="footer" v-if="item.creator_id == UserInfo.id"> 
					<view class="footer-left" @tap="target('/pages/team/releaseRouter/signalRouterChange?id='+item.id)">修改</view>
					<view class="footer-right" @tap="deleteRouter(item.id)">删除</view>
				</view>
				<view class="footer" v-else>
					<view class="footer-left" @tap="target('/pages/team/createTeam/index')">组队</view>
					<view  class="footer-right">保存</view>
				</view>
			</view>

		</block>
	</view>
</template>

<script>
	import {
		queryRouterDetail,
		deleteRouter
	} from '@/api/router'
	import {
		addConcern
	} from '@/api/followsFans'
	export default {
		data() {
			return {
				show: false,
				RouterList: [],
				followClick: true,
				activeColor: '#fbb10e',
			};
		},
		computed: {
			UserInfo() {
				return this.$store.state.UserInfo
			},
		},
		onShow() {
			this.getRouterList();
		},
		methods: {
			//添加关注
			addConcern(id,key) {
				this.RouterList.forEach((item,index)=>{
                  if(index == key){
                   this.followClick = false;
				addConcern({follow_ids:id}).then(({data})=>{
				})}
				})	
			},
			//删除路线
			deleteRouter(id) {
				var that = this;
				uni.showModal({
					content: '确定删除此路线吗？',
					confirmColor: "#FF0000",
					success: function(res) {
						if (res.confirm) {
							deleteRouter({
								method: "delete",
								ids: id
							}).then(({
								data
							}) => {
								if (data.status == 0) {
									uni.showToast({
										title: '删除成功',
										duration: 2000
									});
									that.getRouterList();
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			//展示途经点
			placePoint() {
				this.show = !this.show
			},
			//获取所有的路线列表
			getRouterList() {
				queryRouterDetail().then(({
					data
				}) => {
					this.RouterList = data.msg;
				})
			},
			//页面跳转
			target(url) {
				uni.navigateTo({
					url
				});
			},
		},
		onNavigationBarButtonTap(val) {
			console.log(val.index);
			if (val.index == 0) {
				console.log("第一个按钮");
				uni.navigateTo({
					url: '/pages/team/releaseRouter/releaseRouter'
				});
			};
			if (val.index == 1) {
				// uni.reLaunch({
				// 	url:"/pages/joinPartner/creatPartner"
				// })
				console.log("第二个按钮");
			};
			if (val.index == 2) {
				// uni.reLaunch({
				// 	url:"/pages/joinPartner/creatPartner"
				// })
				console.log("第三个按钮");
			}
		}
	}
</script>

<style lang="scss">
	#allRouterDetail {

		// background-color: #efefef;
		// height: 100vh;
		// width: 100%;
		.section {
			padding-top: 25upx;

			.detail {
				// background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				padding: 20.833rpx;
				min-height: 212.5upx;
				border: 2.083upx solid #c8c8cc;
				// border: 2.083upx solid #ececec;
				// box-shadow: 0 6.25upx 6.25upx rgba(200, 200, 204, 0.8);
				font-size: 27.083upx;

				.content {
					padding: 20.833rpx;
					flex: 0 1 100%;
					width: 100%;
					font-size: 27.083upx;

					.content-top {
						display: flex;
						justify-content: space-between;
						align-items: center;

						&>image {
							width: 90upx;
							height: 90upx;
							border-radius: 50%;
						}
					}

					.content-middle {
						padding-left: 15upx;
						-webkit-box-flex: 1;
						-webkit-flex: 1;
						flex: 1;
						min-width: 0;
					}

					.content-middle h4 {
						font-weight: 400;
						font-size: 16px;
						width: auto;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						word-wrap: normal;
						word-wrap: break-word;
						word-break: break-all;
						padding-bottom: 5px;
						color: #333;
					}

					.content-middle p {
						color: #848689;
						font-size: 13px;
						line-height: 1.2;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
					}

					.content-right {
						width: 20%;

						.content-right-follow {
							font-size: 24upx;
							height: 20px;
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 50px;
							border: 1px solid #DF5000;
							color: #DF5000
						}

						.content-right-followover {
							font-size: 24upx;
							height: 20px;
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 50px;
							border: 1px solid #c8c8cc;
						}
					}
				}

				.place-list {
					padding: 25upx 0upx;
					display: flex;
					justify-content: space-between;
				}

				.place {
					// width: 50%;
					font-size: 40upx;

				}

				.place-left {
					display: flex;
					align-items: center;
				}

				.place-point {
					padding-left: 150upx;
				}
			}

			.footer {
				font-size: 32upx;
				display: flex;
				align-items: center;
				background-color: #fbfbfb;

				.footer-left {
					display: flex;
					justify-content: center;
					padding: 30upx 20upx;
					width: 50%;
					border: 1px solid #c8c8cc;
					border-top: 0px solid #c8c8cc;
				}

				.footer-right {
					display: flex;
					justify-content: center;
					padding: 30upx 20upx;
					width: 50%;
					border-bottom: 1px solid #c8c8cc;
					// border-top: 1px solid #c8c8cc;
					border-right: 1px solid #c8c8cc;
				}
			}

		}

	}
</style>
