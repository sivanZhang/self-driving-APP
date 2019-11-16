<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() { 
			plus.screen.lockOrientation('portrait-primary');
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
