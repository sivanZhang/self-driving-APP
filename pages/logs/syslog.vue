<template>
	<view>
		<view  v-html="logs_reocrds">  </view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				logs_reocrds:[], 
			} 
		}, 
		created() {
			this.getsyslog();
		},
		methods:{
			//日志信息
			getsyslog(){ 
				this.logs_reocrds = uni.getStorageSync('log'); 
			} 
		}
	}
</script>

<style>
</style>
