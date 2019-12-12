<template>
	<view>
		<view style="width: 80%;color:red;">
			{{newrecord}}			
		</view>
		<view style="width: 80%;color:blue;">
			{{done}}			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				newrecord:{},
			    done:{},
			}
			
		},
		onLoad(){

		},
		created() {
			this.getLocation();
		},
		methods:{
			
			getLocation(){
			   
				try {
					this.newrecord = uni.getStorageSync('log_ge');
					this.done = uni.getStorageSync('log_g');
					
					if (this.newrecord) {
					   console.log("数据缓存")
					   console.log(this.newrecord )
				    }
				} catch (e) {
				    // error
				}
			}
				
		}
	}
</script>

<style>
</style>
