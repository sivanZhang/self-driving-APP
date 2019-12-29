<template>
<!-- 我的收藏 -->
    <view id="myclooect">
        <view>
            {{collect}}
        </view>
    </view>
</template>
<script>
import {getCollect} from '@/api/likeCollect'
export default {
    data(){
        return{
           collect:[]
        }
    },
    onLoad(){
       this.getCollect();
    },
    methods:{
        getCollect(){
            getCollect({mine:""}).then(({data})=>{
               this.collect == data.msg
            })
        }
    }
}
</script>
<style lang="scss">
#myclooect{

}
</style>