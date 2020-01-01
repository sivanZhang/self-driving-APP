<template>
	<!-- 消息首页 -->
	<view id="mymessage">
		<view class="aui-news-box">
			<view class="aui-news-item" @tap="target('/pages/user-center/message/reply')">
			<view class="aui-news-item-hd">
				<image src="../../../static/image/icon-item-003.png"></image>
			</view>
			<view class="aui-news-item-bd">
				<h4>回复</h4>
				<p>在哪里？</p>
			</view>
			<span class="aui-news-item-fr">11月12日</span>
		</view>
		<view class="aui-news-item" @tap="target('/pages/user-center/message/notice')">
			<view class="aui-news-item-hd">
				<image src="../../../static/image/icon-item-001.png"></image>
			</view>
			<view class="aui-news-item-bd">
				<h4>通知</h4>
				<p>我不知道</p>
			</view>
			<view class="aui-news-item-fr">
                <view >昨天</view>
				<view v-if="noticeCount!=0">
                  <uni-badge :text="String(noticeCount)" type="error" size="small"></uni-badge>
				</view>
			</view>
		</view>
		<view class="aui-news-item" @tap="target('/pages/user-center/message/remind')">
			<view class="aui-news-item-hd">
				<image src="../../../static/icons/tixing.png"></image>
			</view>
			<view class="aui-news-item-bd">
				<h4>提醒</h4>
				<p>内容</p>
			</view>
			<span class="aui-news-item-fr">昨天</span>
		</view>
		<view class="aui-news-item"  
		@tap="target('/pages/user-center/message/chatting')">
			<view class="aui-news-item-hd">
				<image src="../../../static/image/face.jpg"></image>
			</view>
			<view class="aui-news-item-bd">
				<h4>跟个人聊天</h4>
				<p>内容</p>
			</view>
			<span class="aui-news-item-fr">昨天</span>
			</view>
		<view class="aui-news-item" v-for="(row,index) of groupList" :key="index"
		 @longpress="longtap(row.id)"  
		 @tap="target('/pages/user-center/message/chatting?id='+row.id+'&mumbers='+row.members+'&name='+row.name)">
			<view class="aui-news-item-hd">
					<image src="../../../static/image/face.jpg"></image>
				</view>
				<view class="aui-news-item-bd">
                        <h4>{{row.name}}</h4>
						<p>要展示的聊天内容</p>		
				</view>
				<span class="aui-news-item-fr">{{row.time|dateTimeFormat}}</span>	
		</view>
		</view>
		<!-- 临时的一个创建群聊按钮，起作用的是导航栏的按钮 -->
		<view style="padding: 15upx;">
			<button type="primary" @tap="target1('/pages/user-center/message/groupchat')">临时发起群聊</button>
		</view>
		<view style="padding: 15upx;">
			<button type="primary" @tap="target1('/pages/user-center/message/addressList')">临时通讯录</button>
		</view>
		<!-- //弹出创建群聊 -->
		<uni-popup ref="popup" type="right" :custom="true" :show="true">
			<view class="uni-logout">
				<view class="iconfont icon-message4xinxi"></view>
				<view @tap="target1('/pages/user-center/message/groupchat')">发起群聊</view>
			</view>
			<view class="uni-logout">
				<view class="iconfont icon-tongxunlu"></view>
				<view @tap="target1('/pages/user-center/message/addressList')">通讯录</view>
			</view>
		</uni-popup>
	</view>


</template>

<script>
	import {
		LookGroupsChatting,
		DeleteGroupsChatting,
		Receive_Chatting
	} from "@/api/chatting";
	import {
		searchFollow
	} from '@/api/followsFans'
	import {look_Notice} from '@/api/notice'
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup,
			uniBadge
		},
		data() {
			return {
				user_name: '',
				followlist: [],
				groupList: [],
				noticeCount:'',
			};
		},
		onLoad() {
			this.search();
			this.searchGroupList();
			this.look_Notice();
		},
		methods: {
			//查看路线通知
			look_Notice(){
				look_Notice({read:0}).then(({data})=>{
					this.noticeCount =data.unread_count;
				})
			},
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
				LookGroupsChatting({
					mine: this.$store.state.UserInfo.id
				}).then(({
					data
				}) => {
					this.groupList = data.msg;
					this.groupid = data.msg.id;
				})
			},
			//删除群组
			deleteGroupList(id) {
				// setTimeout(() => {
				DeleteGroupsChatting({
					id: id,
					method:'delete'
				}).then(({
					data
				}) => {
					this.searchGroupList()
				})
				// },200)
			},
			target(url) {
				uni.navigateTo({
					url
				});
			},
			target1(url) {
				this.target(url);
				this.$refs.popup.close();
			},
			search() {
				searchFollow({
					followfans: ''
				}).then(res => {
					this.followlist = res.data.msg.follow_lst;
				})

			},
		},
		//发起群聊
		onNavigationBarButtonTap(val) {
			console.log(val.index);
			if (val.index == 0) {
				console.log("第一个按钮");
				this.$refs.popup.open()
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
	#mymessage {
		text-decoration: none;
    color: #000;
/* 必要布局样式css */
.aui-flexView {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
}

.aui-scrollView {
    width: 100%;
    height: 100%;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    position: relative;
    /* margin-top: -44px; */
}

.aui-navBar {
    height: 44px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    z-index: 1002;
    background: #ffffff;
}

.aui-navBar:after {
    content: '';
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #ffffff;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
}

.aui-navBar-item {
    height: 44px;
    min-width: 25%;
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 25%;
    -ms-flex: 0 0 25%;
    flex: 0 0 25%;
    padding: 0 0.9rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
    color: #a0a0a0;
    position: relative;
}

.aui-navBar-item:first-child {
    -webkit-box-ordinal-group: 2;
    -webkit-order: 1;
    -ms-flex-order: 1;
    order: 1;
    margin-right: -25%;
    font-size: 0.9rem;
    font-weight: bold;
}

.aui-navBar-item:last-child {
    -webkit-box-ordinal-group: 4;
    -webkit-order: 3;
    -ms-flex-order: 3;
    order: 3;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
}

.aui-center {
    -webkit-box-ordinal-group: 3;
    -webkit-order: 2;
    -ms-flex-order: 2;
    order: 2;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    height: 44px;
    width: 50%;
    margin-left: 25%;
}

.aui-center-title {
    text-align: center;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    font-size: 0.95rem;
    color: #3c3c3c;
}

.icon {
    width: 20px;
    height: 20px;
    display: block;
    border: none;
    float: left;
    background-size: 20px;
    background-repeat: no-repeat;
}

.icon-return {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAACh0lEQVRoQ+3ZMW8TMRQH8PcOsTBQISExVCIRCwgWFvZ+hZYBpIrEcTYkBsTGlI2VDamL3YEBpWJoR1BJaOlXYEzyDYp0bMRGRjnJoDuWs/1e3EbKeHf55b33vzsb4YJ98IJ54RKce8XZV1gIcQ8AviDiD2vtC631pzZFYQ2WUt611p4CwM0VcqqU2soSXIN1ztdKqTfZgRuw75RSz9tg3bHsWjomlh04NpYVOAWWDbjf7z8oimLipbH7bUopJdvO7L/Hk8+wwyLiCSLe8H6cww4BwGYFTo0lbWkKLBmYCksCrsNaa99rrZ/FmFnS0GrCdrvd3mg0MqEDqu58yVKaAzZZSwshHgLAsX/rcW2csrJVtaNXeIWdIuL16qJU2OgVrsMCwEGn03mSamaThVYTtizLp+PxeJkioJKFFldslJbmjA0O5o4NCm7AHpZluUM5s1FCSwjxCAA++7ceADiczWaPJ5PJL6qAihJaUspdY8w+Il7xLsASG6SlhRA/EfGa91BxNJ/Pd7hVNtiT1mAwOAeADXdCa637Hi0Wi3zBUsptY8wHRLzqwIh/nlbzbWmna0roLEOrmo11QQd9W1oHdFDwOrR3cLCH/uuFn0uQRQE7dMPKJHl6RwNzRUcF/w9N9VIRHVyhazbLDihWP5KAHbphOzQ5OhmYCzopmAM6OZgaTQL20FMAuOUtHESfaTLwCn3HWnuWEk0KpkCTg1OjWYArtDHmKyJu+jMdeh+KDdghh8NhZ7lcfvPRoXcaWYFToNmBY6NZgj20m+nb3pr3W631yzY7GWzBDtXr9TaLojjz0N+VUvezBXvoPQBw0Fda649Zg9vg6o5l3dKhse58l+AY/yqnc/4GvNDoTFOq8FwAAAAASUVORK5CYII=");
}

.icon-sys {
    background-image: url("data:image/png;base64,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");
    margin-right: 10px;
}

.icon-fre {
    background-image: url("data:image/png;base64,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");
}

.aui-news-box {
    margin-top: 8px;
    background: #fff;
}

.aui-news-item {
    padding: 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}

.aui-news-item-hd {
    margin-right: .8em;
    width: 55px;
    height: 55px;
    line-height: 55px;
    text-align: center;
    background: #fff;
    border-radius: 15px;
}

.aui-news-item-hd image {
    width: 100%;
    max-height: 100%;
	vertical-align: top;
	border-radius: 10%;
}

.aui-news-item-bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-width: 0;
}

.aui-news-item-bd h4 {
    font-weight: 400;
    font-size: 16px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    word-wrap: break-word;
    word-break: break-all;
    padding-bottom: 10px;
    color: #333;
}

.aui-news-item-bd p {
    color: #848689;
    font-size: 13px;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}

.aui-news-item:before {
    content: '';
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #d8d8d8;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    left: 20px;
}

.aui-news-item-fr {
    text-align: right;
    font-size: 13px;
    color: #8c8c8c;
    margin-top: -25px;
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


			&>view {
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
