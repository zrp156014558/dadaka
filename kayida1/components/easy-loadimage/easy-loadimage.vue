<template>
    <view class="lazy-img" :id="uid">
        <image class="origin-img" :src="imageSrc" mode="widthFix"
            v-if="loadImg&&!isLoadError" 
            v-show="showImg"
            :class="{'no-transition':!openTransition,'show-transition':showTransition&&openTransition}"
            @load="handleImgLoad" 
            @error="handleImgError">
        </image>
        <view class="loadfail-img" v-else-if="isLoadError"></view>
        <image class="loading-img" v-show="!showImg&&!isLoadError" src="../../static/easy-loadimage/loading.gif"></image>
    </view>
</template>
<script>
// 生成全局唯一id
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    })
}
export default{
    props:{
        imageSrc:{
            type: String,
        },
        scrollTop:{
            type: Number,
        },
        openTransition:{
            type: Boolean,
            default:false,
        },
        viewHeight:{
            type:Number,
            default() {
                return uni.getSystemInfoSync().windowHeight;
            }
        }
    },
    watch:{
        scrollTop(val){
            this.onScroll(val)
        }
    },
    data(){
        return {
            uid:'',
            loadImg:false,
            showImg:false,
            isLoadError:false,
            showTransition:false,
        }
    },
    methods:{
        init(){
            this.uid = 'uid-' + generateUUID();
            this.$nextTick(this.onScroll)
        },
        handleImgLoad(e){
            this.showImg = true;
            // this.$nextTick(function(){
            //     this.showTransition = true
            // })
            setTimeout(()=>{
                this.showTransition = true
            },50)
        },
        handleImgError(e){
            this.isLoadError = true;
        },
        onScroll(scrollTop){
            // 加载ing时才执行滚动监听判断是否可加载
            if(this.loadImg || this.isLoadError) return;
            const id = this.uid
            const query = uni.createSelectorQuery().in(this);
            query.select('#'+id).boundingClientRect(data => {
              if(data.top - this.viewHeight<0){
                  this.loadImg = true;
              }
            }).exec()
        },
    },
    mounted() {
        this.init()
    }
}
</script>

<style scoped>
    /* 官方优化图片tips */
    image{
        will-change: transform
    } 
    /* 保持占位图绝对居中 */
    .lazy-img{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /* 渐变过渡效果处理 */
    image.origin-img{
        opacity: 0.3;
    }
    image.origin-img.show-transition{
        transition: opacity 1.2s;
        opacity: 1;
    }
    image.origin-img.no-transition{
        opacity: 1;
    }
    /* 加载失败、加载中的占位图样式控制 */
    .loadfail-img{
         padding: 225rpx 0;
         width: 100%;
         height: 100%;
         background: url('~@/static/easy-loadimage/loadfail.png') no-repeat center;
         background-size: 160rpx;
    }
    image.loading-img{
        padding: 175rpx 0;
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
    }
</style>

