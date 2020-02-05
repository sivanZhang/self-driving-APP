<script>
	import Vue from 'vue'
	import permision from "@/common/permission.js"
	export default {
		onLaunch: function() { 
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary');
			// #endif
		},
		onShow: function() {
			// #ifdef APP-PLUS
				this.$store.commit('setIsAppShow',true)
			// #endif
		},
		onHide: function() {
			// #ifdef APP-PLUS
				this.$store.commit('setIsAppShow',false)
			// #endif
		}, 
		onError: function(err) {  
				// 这里只能捕获方法内的异常，不能捕获生命周期中的逻辑异常  
				console.log('方法内异常');  
				var json = JSON.stringify(err);  

				var time = new Date(); 
				var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' 
						+ time.getDate() + ' ' + time.getHours() +
					':' + time.getMinutes() + ':' + time.getSeconds();
				var lo = "<h4>APP onError "+time1 +"</h4>" + json ;
					
				uni.setStorageSync('log', lo + uni.getStorageSync('log') + "<br/>")


				
				var arr = json.split("\\n");   
				var log = {  
					message : arr[1],  
					stack: err  
				}    
				this.$throw(log)  

				
		}


	}
</script>

<style lang="scss">
	@import './common/uni.scss';
	@import './common/iconfont.css';
	@import url(/static/font/iconfont.css)
</style>
