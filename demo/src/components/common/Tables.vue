<template>
  <section class="tables">
    <ul class="ulTable">
      <li>
        <ul class="ulCell">
          <li v-for="(v,k) in list[0]">{{getKey(k)}}</li>
          <li>操作</li>
        </ul>
      </li>
      <li v-for="item in list">
        <ul class="ulCell">
          <li v-for="(v,k) in item">{{v}}</li>
          <li>
            <span class="btnSmaller" @click="edit(item.id)">编辑</span>
            <span class="btnSmaller" @click="deleteProduct(item.id)">删除</span>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>
<script>
import {getKey} from '@/assets/js/myCommon'
export default {
  name: 'Tables',
  props: {
    list: {
      Type: Array,
      default: () => []
    }
  },
  methods: {
    edit(pId) {
      this.$emit('edit',pId)
      this.$store.commit('setEditFlag', true)
    },
    deleteProduct(pId) {
      this.$emit('deleteProduct',pId)
    },
    getKey(k){
      return getKey(k)
    }
  }
}
</script>
<style scoped lang="less">
@import '~@/assets/stylesheet/theme';

.tables {
  .ulTable {
    width: 100%;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    li {
      width: 100%;
      .ulCell {
        display: flex;
        li {
          text-align: center;
          height: 60px;
          min-width: 100px;
          max-width: 300px;
          line-height: 60px;
          border-right: 1px solid #eee;
          border-bottom: 1px solid #eee;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:last-child{
            min-width: 140px;
          }
        }
      }
    }
  }
}
</style>
