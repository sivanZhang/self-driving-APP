<template>
	<!-- 路线详情页 -->
	<view id="signalRouterDetail">
		<view class="top">
			<view class="header" v-for="(item,index) of RouterList" :key="index">
				<view class="header-top-left" style="display: flex;">
					<image src="../../../static/image/p10.jpg"></image>
					<view>
						<view class="header-name">{{item.creator_name}}</view>
						<view class="header-time">发布日期:{{item.create_date|dateFormat}}</view>
					</view>
				</view>
				<view class="header-body">
					<view class="list">
						<span>是否开启行程共享:</span>
						<span>{{item.share|shareFormat}}</span>
					</view>
					<view class="list">
						<span>路线状态:</span>
						<span>{{item.status|statusFormat}}</span>
					</view>
					<view class="list">
						<span>时间安排：</span>
						<span>{{item.start_date | dateFormat }}--{{ item.end_date | dateFormat }}</span>
					</view>
					<view class="list">
						<span>坐标轨迹记录:</span>
						<span>{{item.track?item.track:"无"}}</span>
					</view>
					<view class="list">
						<span>途经地点:</span>
						<span v-for="(row,index) of item.via_list" :key="index">{{row.area_name}}--</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryRouterDetail,
	} from '@/api/router'
	export default {
		data() {
			return {
				routerID: '',
				RouterList: [],
			}
		},
		onLoad(option) {
			this.routerID = option.id;
			this.queryRouterDetail();
		},
		methods: {
			queryRouterDetail() {
				queryRouterDetail({
					id: this.routerID
				}).then(({
					data
				}) => {
					this.RouterList = data.msg;
				})
			}
		}
	}
</script>

<style lang="scss">
#signalRouterDetail{
	.top {
			border-bottom: 2.083upx solid #c8c8cc;
		}
		.header {
			padding: 30upx;
			.header-top-left {
				padding-left: 10upx;
				&>image {
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
				}
				.header-name {
					font-size: 34upx;
					padding: 15upx 20upx 5upx 20upx;
				}
				.header-time{
                    padding-left:20upx
				}
			}
		}
		.header-body {
			padding: 15upx 30upx 15upx 30upx;
			font-size: 27.083upx;

			.list {
				padding: 10upx 10upx;
				font-size: 32upx;
				.span{
                  font-weight: bold;padding-right: 15upx;
				}
			}
		}
}
</style>
