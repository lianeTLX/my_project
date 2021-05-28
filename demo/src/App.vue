<template>
  <div id="app">
    <header class="header">
      <img src="./assets/logo.png" />
      <h2>Liane's DEMO</h2>
    </header>
    <section class="appSection">
      <aside>
        <ul>
          <li class="active">商品管理</li>
        </ul>
      </aside>
      <article>
        <router-view />
      </article>
    </section>
    <edit-bar v-show="editFlag"></edit-bar>
  </div>
</template>

<script>
import EditBar from '@/components/common/EditBar'

export default {
  name: 'App',
  computed: {
    editFlag() {
      return this.$store.state.editFlag
    }
  },
  components: {
    EditBar
  }
}
</script>

<style scoped lang="less">
@import '~@/assets/stylesheet/theme';
#app {
  width: 100%;
  height: 100%;
  color: #666;
  overflow: hidden;
  header {
    width: 100%;
    height: 70px;
    background: @themeColor7;
    display: flex;
    align-items: center;
    padding: 0 20px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    h2 {
      padding: 0 20px;
      color: @themeColor2;
    }
  }
  .appSection {
    display: flex;
    position: absolute;
    top: 70px;
    bottom: 0;
    left: 0;
    right: 0;
    aside {
      width: 250px;
      color: @themeColor7;
      background: @themeColor6;
      ul {
        li {
          font-size: 18px;
          height: 70px;
          line-height: 70px;
          text-align: center;
          &.active {
            color: @themeColor3;
          }
        }
      }
    }
    article {
      flex: 1;
      padding: 50px;
    }
  }
}
</style>
