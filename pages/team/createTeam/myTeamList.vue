<template>
    <view id="myTeamList">
        <!-- 我创建的搭伴 -->
        <teamDetail :TeamList="TeamList" @getTeamList="getTeamList"/>
    </view>
</template>
<script>
import { QUERY_TEAMDETAIL } from '@/api/team';
import teamDetail from './components/teamDetail.vue'
export default {
    data() {
		return {
			TeamList: []
		};
	},
	components: {
		teamDetail
    },
    onLoad() {
		this.getTeamList();
    },
    methods: {
		//获取我的搭伴详情列表
		getTeamList() {
			QUERY_TEAMDETAIL({mine:''}).then(({ data }) => {
				if (data.status == 0) {
					this.TeamList = [...data.msg];
					console.log("0000000")
					console.log(data.msg)
				}
			});
        }
    }
}
</script>
<style lang="scss">
#myTeamList {
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
}
</style>