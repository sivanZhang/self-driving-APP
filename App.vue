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
		}
	}
</script>

<style lang="scss">
	@import './common/uni.scss';
	@import './common/iconfont.css';
	@import url(/static/font/iconfont.css)
</style>
