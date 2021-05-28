<template>
  <section class="forms">
    <div class="title">{{title}}</div>
    <p>
      <span class="warning">{{warningMsg}}</span>
    </p>
    <ul>
      <li v-for="(v,k) in msg.data">
        <span>{{getKey(k)}}</span>
        <div v-if="['id','create_time','update_time'].includes(k)">{{v}}</div>
        <input @blur="changeInput" :data-key="k" class="myInput" v-else type="text" v-model="msg.data[k]" />
      </li>
    </ul>
  </section>
</template>
<script>
import { getKey, validationFun, regFun } from '@/assets/js/myCommon'

export default {
  name: 'Form',
  data() {
    return {
      title: '',
      originData: {},
      warningMsg: '',
      proData: {},
      verification: {},
      canSave: false
    }
  },
  props: {
    msg: {
      type: Object,
      default: {}
    }
  },
  methods: {
    init() {
      this.originData = Object.assign({}, this.msg.data)
      Object.keys(this.msg.data).forEach(v => (this.verification[v] = 0))
      this.title = this.msg.mode == 'edit' ? '编辑商品信息' : '添加商品信息'
    },
    getKey(k) {
      return getKey(k)
    },
    check() {
      let sum = Object.values(this.verification).reduce((prv, v) => prv + v)
      if (this.msg.mode == 'edit') {
        this.canSave = sum >= 1
      } else {
        this.canSave = sum == 5
      }
      let popMsg = {}
      if (this.canSave) {
        popMsg = {
          canSave: true,
          mode: this.msg.mode,
          data: Object.assign({}, this.msg.data)
        }
      } else {
        popMsg = {
          canSave: false,
          mode: this.msg.mode,
          data: {}
        }
      }
      this.$emit('canSave', popMsg)
    },
    inputValidate(input, key, value, regMsg) {
      if (validationFun(value, regMsg.reg)) {
        this.verification[key] = 1
        this.warningMsg = ''
        input.style.borderColor = '#ccc'
        this.check()
      } else {
        this.warningMsg = regMsg.wMsg
        this.verification[key] = 0
        input.style.borderColor = '#f3bfa9'
      }
    },
    changeInput(e) {
      let value = e.target.value
      let key = e.target.dataset.key
      if (value == this.originData[key]) {
        if (this.msg.mode == 'edit') {
          this.verification[key] = 0
          this.check()
        }
        return
      }
      this.inputValidate(e.target, key, value, regFun(key))
    }
  },
  computed: {
    editFlag() {
      return this.$store.state.editFlag
    }
  },
  watch: {
    warningMsg(val) {
      if (val != '') {
        let timer = setTimeout(() => {
          this.warningMsg = ''
          clearTimeout(timer)
          timer = null
        }, 2000)
      }
    },
    editFlag() {
      console.log('编辑框发生变化了')
      if (this.editFlag) {
        this.canSave = false
        this.$emit('canSave', { canSave: false, data: {} })
      }
    },
    msg() {
      this.init()
    }
  }
}
</script>
<style scoped lang="less">
@import '~@/assets/stylesheet/theme';

.forms {
  padding: 30px;
  .title {
    font-size: 18px;
    color: @themeColor3;
  }
  & > p {
    text-align: center;
  }
  & > ul {
    padding: 0 40px 40px;
    li {
      width: 100%;
      height: 40px;
      margin: 10px;
      display: grid;
      grid-template-columns: 20% 50%;
      align-items: center;
      span {
        text-align: center;
      }
    }
  }
}
</style>
