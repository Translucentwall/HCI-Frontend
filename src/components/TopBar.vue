<template>
  <el-menu
    :default-active="activeIndex"
    class="topBar"
    mode="horizontal"
    @select="handleSelect"
    active-text-color="#b04c50"
  >

  <el-menu-item class="home" index="/home">Home</el-menu-item>
    <el-submenu index="2">
      <template  class="submenu-title" slot="title">Rank</template>
      <el-submenu index="/rank">
        <template slot="title">Paper</template>
        <el-menu-item index="/rank?mode=1">被引用数排行</el-menu-item>
      </el-submenu>
      <el-submenu index="2-2">
        <template slot="title">Author</template>
        <el-menu-item index="/rank?mode=2">论文数排行</el-menu-item>
        <el-menu-item index="/rank?mode=3">被引用数排行</el-menu-item>
      </el-submenu>
      <el-submenu index="2-3">
        <template slot="title">Affiliation</template>
        <el-menu-item index="/rank?mode=4">论文数排行</el-menu-item>
      </el-submenu>
      <el-submenu index="2-4">
        <template slot="title">Publication</template>
        <el-menu-item index="/rank?mode=5">论文数排行</el-menu-item>
      </el-submenu>
      <el-submenu index="2-5">
        <template slot="title">Keyword</template>
        <el-menu-item index="/rank?mode=6">论文数排行</el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>

<script>
    export default {
        name: "TopBar",
        data() {
            return {
                activeIndex: '1'
            };
        },
        mounted(){
            let path = this.$route.path;
            let mode = window.location.href.split('mode=');
            if (mode.length > 1 && mode[1] !== ''){
                path = path + '?mode=' + mode[1][0];
            }
            this.activeIndex = path;
        },
        watch: {
            $route(){
                let path = this.$route.path;
                if (path!=='/home') {
                    let mode = window.location.href.split('mode=');
                    if (mode.length > 1 && mode[1] !== '') {
                        path = path + '?mode=' + mode[1][0];
                    }
                }
                this.activeIndex = path;
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                let url = keyPath[keyPath.length-1];
                this.$router.push(url);
            }
        }

    }
</script>

<style scoped>
  .topBar{
    background-color: transparent;

  }
  .topBar .el-menu-item{
    line-height: 40px;
    height: 40px;
  }
  .topBar .el-submenu {
    width: 10%;
    line-height: 40px;
    height: 40px;
  }
  .home{
    margin-left: 40%;
    width: 10%;
  }

</style>
