<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" fixed>
    <el-menu-item index="/home">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">排行</template>
      <el-submenu index="/rank">
        <template slot="title">论文</template>
        <el-menu-item index="/rank?mode=1">被引用数排行</el-menu-item>
      </el-submenu>
      <el-submenu index="2-2">
        <template slot="title">作者</template>
        <el-menu-item index="/rank?mode=2">论文数排行</el-menu-item>
        <el-menu-item index="/rank?mode=3">被引用数排行</el-menu-item>
      </el-submenu>
      <el-submenu index="2-3">
        <template slot="title">机构</template>
        <el-menu-item index="/rank?mode=4">论文数排行</el-menu-item>
      </el-submenu>
      <el-submenu index="2-4">
        <template slot="title">会议</template>
        <el-menu-item index="/rank?mode=5">论文数排行</el-menu-item>
      </el-submenu>
      <el-submenu index="2-5">
        <template slot="title">关键字</template>
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

</style>
