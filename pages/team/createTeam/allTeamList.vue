<template>
	<!-- 搭伴(组队)列表 -->
	<view id="allTeamList">
		<teamDetail :TeamList="TeamList" @getTeamList="getTeamList"/>
		<!-- //弹出创建群聊 -->
		<uni-popup ref="popup" type="right" :custom="true" :show="true">
			<view class="uni-logout">
				<view class="iconfont icon-message4xinxi"></view>
				<view @tap="target1('/pages/team/releaseRouter/myAllRouter')">创建搭伴</view>
			</view>
			<view class="uni-logout">
				<view @tap="target1('/pages/team/createTeam/myTeamList')">我的搭伴</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
// import uniCard from '@/components/uni-card/uni-card';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import teamDetail from './components/teamDetail.vue'
import { QUERY_TEAMDETAIL } from '@/api/team';
export default {
	data() {
		return {
			TeamList: []
		};
	},
	components: {
		// uniCard,
		uniPopup,
		teamDetail
	},
	//触发屏幕右上角添加按钮跳转创建搭伴页面
	onNavigationBarButtonTap(val) {
		if (val.index == 0) {
			this.$refs.popup.open();
		}
	},
	onLoad() {
		this.getTeamList();
	},
	methods: {
		//获取所有的搭伴详情列表
		getTeamList: function() {
			QUERY_TEAMDETAIL().then(({ data }) => {
				if (data.status == 0) {
					this.TeamList = [...data.msg];
					console.log(this.TeamList)
				}
			});
		},
		//页面跳转
		target(url) {
			uni.navigateTo({
				url
			});
		},
		//创建搭伴页面跳转
		target1(url) {
			this.target(url);
			this.$refs.popup.close();
		}
	}
};
</script>

<style lang="scss">
#allTeamList {
	.section {
		padding-top: 25upx;

		.detail {
			display: flex;
			justify-content: space-between;
			padding: 20.833rpx;
			min-height: 212.5upx;
			border: 2.083upx solid #ececec;
			box-shadow: 0 6.25upx 6.25upx rgba(200, 200, 204, 0.8);
			font-size: 27.083upx;

			.content {
				flex: 0 1 100%;
				width: 0;
				font-size: 27.083upx;

				.name {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					line-height: 1.8;
					font-size: 32upx;
				}
				.footer-left {
					width: 50%;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					& > image {
						width: 60upx;
						height: 60upx;
						border-radius: 50%;
					}
					& > view {
						padding-left: 10upx;
					}
				}
				.forwardContent {
					font-size: 32upx;
					padding: 10upx 0upx;
					& > view {
						padding: 10upx;
						min-height: 100upx;
						border: 2.083upx solid #ececec;
						box-shadow: 0 6.25upx 6.25upx rgba(200, 200, 204, 0.8);
					}
				}

				.footer {
					padding: 10upx;
					display: flex;
					justify-content: flex-end;
					.footer-right {
						display: flex;
						align-items: center;
						& > image {
							width: 60upx;
							height: 60upx;
							border-radius: 50%;
						}
						& > view {
							padding-left: 10upx;
						}
					}
				}
			}
		}
	}
	.uni-popup {
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		z-index: 998;
		overflow: hidden;
	}
	.uni-logout {
		background: #404040;
		color: #fff;
		display: flex;
		width: 100%;

		.iconfont {
			padding: 0upx 10upx 0upx 20upx;
		}

		& > view {
			padding: 0upx 30upx 0upx 10upx;
			height: 118upx;
			border-bottom: 2.083upx solid #c8c8cc;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32upx;
		}
	}
}
</style>
