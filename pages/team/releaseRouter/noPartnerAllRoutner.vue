<template>
	<!-- 展示所有的未创建搭伴的路线详情 -->
	<view id="noPartnerAllRoutner">
		<routerDetail ref="routerDetail" :RouterList="RouterList" @getRouterList="getRouterList"/>
	</view>
</template>

<script>
	import {
		queryRouterDetail,
	} from '@/api/router'
	import routerDetail from './components/routerDetail.vue'
	export default {
		data() {
			return {
				RouterList: [],
			};
		},
		onShow() {
			this.getRouterList();
		},
		components: {
			routerDetail
		},
		methods: {
			//获取所有的路线列表
			getRouterList() {
				queryRouterDetail({not_partner:''}).then(({
					data
				}) => {
					this.RouterList = data.msg;
				})
			},
		},
		onNavigationBarButtonTap(val) {
			// console.log(val.index);
			if (val.index == 0) {
				console.log("第一个按钮");
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
#noPartnerAllRoutner {

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
					font-size: 35upx;

				}

				.place-left {
					display: flex;
					align-items: center;
				}

				.place-point {
					// padding-left: 150upx;
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
