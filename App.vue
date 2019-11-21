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
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import './common/uni.scss';
	@import './common/iconfont.css';
	@import url(/static/font/iconfont.css)
</style>
