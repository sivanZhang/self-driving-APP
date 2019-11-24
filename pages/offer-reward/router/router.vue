<template>
	<view id="router">
		<!-- 路线攻略 -->
		<view class="header">
			<view>点击添加封面(可以添加多张图片)</view>
		</view>
		<form>
			<view class="mian">
				<view class="title">
					<view class="title-left">标题</view>
					<input style="padding-left: 15upx;" type="text" placeholder-style="font-size:32upx" placeholder="请输入标题"/>
				</view>
				<view class="content">
					<view class="content-left">正文</view>
					<textarea auto-height placeholder-style="font-size:32upx" placeholder="请输入正文..." />
				</view>
			</view>
		</form>
	
	</view>
</template>

<script>
	export default{
		data(){
			return{
			
			};
		},
		components: {},
		methods:{
			
		},
		//导航栏右侧的按钮事件
		onNavigationBarButtonTap(val) {
			// console.log(val.index);
			if (val.index == 0) { //添加
				console.log("第一个按钮")
			};
			if (val.index == 1) { //添加
				console.log("第二个按钮")
			};
			
		},
		//导航栏左侧返回按钮事件
		//  onBackPress(options) {
		//         console.log('from:' + options.from);
		// 		if (options.from === 'navigateBack') {
		// 		                // return false;
		// 						uni.showModal({
		// 						    content: '保留此次编辑?',
		// 							confirmText:'保留',
		// 							cancelText:'不保留',
		// 						    success: function (res) {
		// 						        if (res.confirm) {
		// 						            console.log('用户点击确定');
		// 						        } else if (res.cancel) {
		// 						            console.log('用户点击取消');
		// 						        }
		// 						    },
		// 							fail:function(res){
		// 								console.log("-------")
		// 							}
		// 						});
		// 		            }
			
		//     }
	}
</script>

<style lang="scss">
#router{
  .header{
		padding: 30upx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #c8c8cc;
		height: 300upx;
		min-height: 300upx;
	}
  .mian{
      padding: 30upx;
  }
}
	
	
</style>
