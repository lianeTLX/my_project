<template>
  <section class="myConfirm">
    <div class="title">
      <i class="iconfont icon-tanhao"></i>
      <span>提示</span>
    </div>
    <p class="msg">
      <slot></slot>
    </p>
    <div class="btns">
      <div class="btnBigger" @click="result(1)">确定</div>
      <div class="btnBigger" @click="result(0)">取消</div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'MyConfirm',
  methods: {
    result(boo) {
      this.$emit('myClick', boo)
    }
  }
}
</script>
<style scoped lang="less">
@import '~@/assets/stylesheet/theme';

.myConfirm {
  text-align: center;
  color: #666;
  font-size: 16px;
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 500px;
  height: 300px;
  box-sizing: border-box;
  padding-top: 20px;
  background: @themeColor6;
  border-radius: 12px;
  box-shadow: 10px 10px 20px #888;
  .title {
    color: @themeColor7;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 38px;
    }
    span{
      margin-left: 6px;
      font-size: 24px;
    }
  }
  p {
    margin-top: 40px;
  }
  .btns {
    width: 100%;
    position: absolute;
    bottom: 30px;
    display: flex;
    justify-content: center;
    div {
      margin: 40px;
    }
  }
}
</style>