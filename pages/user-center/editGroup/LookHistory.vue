<template>
    <view id="lookHistory">
        <!-- 查看聊天记录 -->
        <view class="search">
			<uni-icon type="search"></uni-icon>
			<input type="text" placeholder="搜索" />
		</view>
        <view class="mian">
        </view>
    </view>
</template>
<script>
export default {
	data(){
		return{
			groupname:'',
		};
	},
    onLoad(option){
            this.groupid = option.id;
			this.groupname = option.name;
			this.mumbers = option.mumbers;
			// console.log("查看聊天记录")
			// console.log(option)
			// console.log(this.groupname )
		},
}
</script>
<style lang="scss">
#lookHistory{
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
}
</style>