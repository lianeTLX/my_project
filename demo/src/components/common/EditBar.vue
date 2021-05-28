<template>
  <section class="edit-bar">
    <div class="editContainer">
      <i class="iconfont icon-close" @click="close()"></i>
      <forms @canSave="getMsg" v-bind:msg="currentData"></forms>
      <div class="btn btnBigger" :class="canSave ? '' : 'disabled'" @click="save()">保存</div>
    </div>
    <my-confirm v-show="showConfirm" @myClick="doConfClick">还没有保存，确定关闭吗？</my-confirm>
  </section>
</template>
<script>
import Forms from '@/components/common/Forms'
import MyConfirm from '@/components/common/MyConfirm'

export default {
  name: 'EditBar',
  data() {
    return {
      canSave: false,
      showConfirm: false,
      proData: {},
      mode: ''
    }
  },
  methods: {
    close() {
      if (this.canSave) {
        this.showConfirm = true
      } else {
        this.$store.commit('setEditFlag', false)
      }
    },
    save() {
      if (this.canSave) {
        console.log('保存')
        console.log(this.proData)
        let reqData = {
          goodsName: this.proData.name,
          price: this.proData.price * 100,
          stock: this.proData.stock,
          status: this.proData.status,
          goodsCode: this.proData.goods_code
        }
        this.submitForm(reqData)
      }
    },
    submitForm(data){
      let defaultConf = {}
      if(this.mode == 'edit'){
        defaultConf = {
          method: 'PUT',
          url: `/goods/${this.proData.id}`,
          data
        }
      }else{
        defaultConf = {
          method: 'POST',
          url: '/goods',
          data
        }
      }
      this.axios(defaultConf).then(res=>{
        console.log(res)
        if(res.data.code == 2000){
          this.$store.commit('setEditFlag', false)
        }
      })
    },
    getMsg(data) {
      console.log('得到数据了')
      this.canSave = data.canSave
      this.proData = data.data
      this.mode = data.mode
    },
    doConfClick(e) {
      if (e) {
        this.$store.commit('setEditFlag', false)
      }
      this.showConfirm = false
    }
  },
  computed: {
    currentData() {
      return this.$store.state.currentData
    }
  },
  components: {
    Forms,
    MyConfirm
  }
}
</script>
<style scoped lang="less">
@import '~@/assets/stylesheet/theme';

.edit-bar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  .editContainer {
    width: 900px;
    background: #fff;
    padding: 0 30px 50px;
    margin: 90px auto;
    border-radius: 15px;
    box-shadow: 10px 10px 20px;
    i {
      float: right;
      margin: 30px;
      font-size: 32px;
      cursor: pointer;
    }
    .btn {
      float: right;
      margin-top: -40px;
    }
  }
}
</style>
