<template>
    <view id="groupList">
        <!-- 群聊 -->
        <view class="search" @tap="searchGroupName">
			<uni-icon type="search"></uni-icon>
			<input type="text" v-model="groupName" placeholder="搜索" />
		</view>
        <view v-for="(row,index) of groupList" :key="index" @longpress="longtap(row.id)">
			<view class="list" @tap="target('/pages/user-center/message/chatting?id='+row.id+'&mumbers='+row.members+'&name='+row.name)">
				<view class="list-left">
					<image src="../../../static/image/face.jpg"></image>
				</view>
				<view class="list-right">
					<view>{{row.name}}</view>
					<view>{{row.time|dateFormat}}</view>
				</view>
			</view>
		</view>
    </view>
</template>
<script>
import { LookGroupsChatting,DeleteGroupsChatting } from "@/api/chatting";
import uniIcon from "@/components/uni-icon/uni-icon.vue"
export default {
    components: {
			uniIcon
		},
    data(){
         return{
             groupList:[],
             groupName:null,
         };
     },
     onLoad() {
			// this.search();
			this.searchGroupList()
        },
    methods:{
        //长按事件
			longtap(e) {
				let id = e
				let that = this
				uni.showActionSheet({
					itemList: ['删除群组'],
					success: res => {
						if (res.tapIndex === 0) {
							uni.showModal({
								content: '删除后，将清空该群聊的消息记录',
								confirmColor: "#FF0000",
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
										that.deleteGroupList(id);
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						}
					}
				});
			},
            //查看群组
			searchGroupList() {
                console.log("chakanqidsssss")
                console.log(this.$store.state.UserInfo.id)
				LookGroupsChatting({include_me:this.$store.state.UserInfo.id}).then(({
					data
				}) => {
                    console.log("inciudeme")
                    console.log(data)
					this.groupList = data.msg;
					this.groupid = data.msg.id;
				})
            },
            //删除群组
			deleteGroupList(id) {
				DeleteGroupsChatting({
					id: id,
					method:'delete'
				}).then(({
					data
				}) => {
					this.searchGroupList()
				})
            },
            //按名称搜索群组
            searchGroupName(){
              LookGroupsChatting({ name:this.groupName }).then(({ data })=>{
                  console.log("按名称搜索群组")
                  console.log(data)
                //   this.groupList = data.msg;
              })
            },
            target(url) {
				uni.navigateTo({
					url
				});
			},
        }
}
</script>
<style lang="scss">
     #groupList{
         background-color: #efefef;
		height: 100vh;
		width: 100%;
         .search {
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			padding: 15upx 20upx;
			border-bottom: 2.083upx solid #c8c8cc;
        }
         .list {
			width: 100%;
			padding: 15upx 0upx;
			display: flex;
			border-bottom: 2.083upx solid #c8c8cc;
			align-items: center;
		}

		.list-left {
			padding: 15upx;

			&>image {
				width: 80upx;
				height: 80upx;
				border-radius: 10%;
			}
		}

		.list-right {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 35upx 30upx 25upx 30upx;
			width: 100%;
		}
     }
</style>