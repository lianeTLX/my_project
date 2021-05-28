/* eslint-disable vue/require-v-for-key */
<template>
  <section class="product">
    <div class="setting">
      <div class="btnBigger" @click="getData()">
        <i class="iconfont icon-aixin1"></i> 刷新
      </div>
      <div class="btnBigger" @click="add()">
        <i class="iconfont icon-add"></i> 添加
      </div>
      <div class="search">
        <input v-model="searchId" @input="inputChange" placeholder="请输入商品ID" class="myInput" type="text" />
        <div class="btnBigger" @click="search">
          <i class="iconfont icon-search"></i>ID查询
        </div>
        <span class="warning">{{warningMsg}}</span>
      </div>
    </div>
    <tables v-if="showList.length>0" v-bind:list="showList" @edit="edit" @deleteProduct="setShowConfirm"></tables>
    <div v-else class="no-data">
      <i class="iconfont icon-kong"></i>
      <p>没有商品数据！</p>
    </div>
    <my-confirm v-show="showConfirm" @myClick="doDelete">删除后不能不能恢复，确定删除吗？</my-confirm>
  </section>
</template>
<script>
import Tables from '@/components/common/Tables'
import MyConfirm from '@/components/common/MyConfirm'
import { objFilter, getMyMap } from '@/assets/js/myCommon'

export default {
  name: 'Product',
  data() {
    return {
      productList: [],
      showList: [],
      showConfirm: false,
      deleteId: null,
      searchId: null,
      warningMsg: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.axios({
        method: 'get',
        url: '/goods'
      }).then(res => {
        this.refreshData(res.data.data.list)
      })
    },
    dataFilter(list) {
      let arr = ['id', 'name', 'price', 'stock', 'goods_code', 'status']
      list.forEach((obj, i) => {
        list[i] = objFilter(obj, arr)
      })
      return list
    },
    edit(pId) {
      let currentData = {
        mode: 'edit',
        data: Object.assign({}, this.productList[pId])
      }
      console.log(currentData)
      this.$store.commit('setCurrentData', currentData)
    },
    add() {
      let currentData = {
        mode: 'add',
        data: {
          name: '',
          price: '',
          stock: '',
          goods_code: '',
          status: ''
        }
      }
      this.$store.commit('setEditFlag', true)
      this.$store.commit('setCurrentData', currentData)
    },
    search() {
      console.log(this.searchId)
      if (!this.searchId) {
        this.warningMsg = '*查询ID不能为空哦！'
      }
      if (this.searchId) {
        this.axios({
          method: 'GET',
          url: `/goods/byId/${this.searchId}`
        }).then(res => {
          this.searchId = null
          this.refreshData(res.data.data)
        })
      }
    },
    refreshData(data) {
      //将数组转换成map
      this.productList = getMyMap(data, 'id')
      //过滤需要展示的数据
      this.showList = this.dataFilter(data)
    },
    inputChange() {
      let reg = /^\d+$/
      if (reg.test(this.searchId)) {
      } else {
        this.searchId = this.searchId.slice(0, this.searchId.length - 1)
        this.warningMsg = '*ID必须是数字哦'
      }
    },
    setShowConfirm(pId) {
      this.showConfirm = true
      this.deleteId = pId
    },
    doDelete(isDelete) {
      if (isDelete) {
        this.axios({
          method: 'DELETE',
          ContentType: '	application/x-www-form-urlencoded',
          url: `/goods/${this.deleteId}`
        }).then(res => {
          this.getData()
        })
      }
      this.showConfirm = false
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
      this.getData()
    }
  },
  components: {
    Tables,
    MyConfirm
  }
}
</script>
<style scoped lang="less">
@import '~@/assets/stylesheet/theme';

.product {
  .setting {
    display: flex;
    margin-bottom: 20px;
    .search {
      margin-left: 50px;
    }
  }
  .no-data {
    text-align: center;
    padding: 60px;
    i {
      color: @themeColor6;
      font-size: 80px;
    }
    p {
      color: #ddd;
      font-size: 18px;
      margin-top: 20px;
    }
  }
}
</style>
