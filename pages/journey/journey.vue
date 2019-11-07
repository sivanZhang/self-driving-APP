<template>
    <view>
        <web-view src="/hybrid/html/line.html" ></web-view>
	    
    </view>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
		onBackPress(options) {
		            if (options.from === 'navigateBack') {
		                return false;
		            }
		            this.back();
		            return true;
		        },
		        methods: {
		            back() {
		                uni.navigateBack({
		                    delta: 1
		                });
		            }
		        },
	}
	</script>